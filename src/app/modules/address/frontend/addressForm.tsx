/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Space,
  Select,
  Typography,
  Input,
  Form,
  Button,
  DatePicker,
} from 'antd';

import {
  UploadOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router';
//* above are the default imports

// Additional imports
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';

//* Application imports
import RequestFactory from '../../../common/backend/RequestFactory';
import FormTools from '../../../common/frontend/FormTools';
import FormPropertiesInterface from '../../../common/frontend/types/FormPropertiesInterface';
import TransformerInterface from '../../../common/frontend/types/TransformerInterface';
import { MyInputURLField } from '../../../common/frontend/myInputFields';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
function AddressForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'address';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState(null);
  const [addressTypes, setAddressTypes] = useState([]);

  const props: FormPropertiesInterface = {
    id,
    moduleLabel: 'Adresse',
    moduleId: moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, 'ipc-database'),
    segment: `${moduleId}es`,
  };

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info('Request some data from backend...');
    FormTools.loadDataRequest(props.requests, id);
    FormTools.customRequest('ipc-database', 'request:addressTypes-list-custom','','');
  }, []);

  FormTools.loadDataResponse(dataOrigin, props, (data:any) => {
    // Die Originaldaten heben wir auf,
    // um später zu prüfen ob sich was geändert hat.

    // TODO: Eine klassische Transform Aufgabe
    // TODO: Das muss natürlich beim speichern auch auch gemacht werden...
    let v = data[props.segment][0].birthdate;
    data[props.segment][0].birthdate = dayjs(v);

    setDataOrigin(data);
    form.setFieldsValue(data[props.segment][0]);
  });

  FormTools.customResponse(
    'ipc-database',
    'request:addressTypes-list-custom',
    (data:any) => {
      setAddressTypes(data.addressTypes);
    }
  );

  const onFormFinish = (valuesForm: any) => {
    FormTools.saveDataRequest(id, dataOrigin, valuesForm, [] ,props);
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info('Failed:', errorInfo);
  };

  const onFormReset = () => {
    form.resetFields();
  };

  const onFormFill = () => {
    form.setFieldsValue({
      title: 'Eine Notiz',
    });
  };

  const onFormClose = (key: any) => {
    console.log('---------- onFormClose', key);
    navigate(
      FormTools.getGotoViewPath(
        props.moduleId,
        dataOrigin[props.segment][0].id
      )
    );
  };


  class Transform implements TransformerInterface {

    toView(data: any): void {
      throw new Error('Method not implemented.');
    }
    
    toForm(data: any){

    }

    toData(data: any){

    }
  }

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

   function getAddressTypeOptions(): Array<any> {
    return addressTypes.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

    const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
      // console.info(date, dateString);
    };

    const handleAddressTypeChange = (value: string) => {
        // TODO: Form.Items anzeigen und ausblenden siehe saleForm
    }

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <div>
      <Title level={3}> {props.moduleLabel} bearbeiten</Title>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space wrap>
            <Button type="dashed" htmlType="button" onClick={onFormClose}>
              <CloseCircleOutlined /> Close Form
            </Button>
            <Button type="primary" htmlType="submit">
              <UploadOutlined /> Änderungen speichern
            </Button>
            <Button htmlType="button" onClick={onFormReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFormFill}>
              Fill form
            </Button>
          </Space>
        </Form.Item>


        <Form.Item
          label="Typ"
          name="addressType"
          tooltip={{ title: 'Typ des Kontakts / der Addresse', icon: <InfoCircleOutlined /> }}
        >
          <Select
            defaultValue="0ae7570a-603c-43f3-9667-5aa019dd27eb" // Print (Standard)
            onChange={handleAddressTypeChange}
            options={getAddressTypeOptions()}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Namen eingeben.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Geburtstag" name="birthdate">
          <DatePicker onChange={onDatePickerChange} />
        </Form.Item>
        <Form.Item label="Postleitzahl" name="postalCode">
          <Input />
        </Form.Item>
        <Form.Item label="Ort" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Strasse und Hausnummer" name="street">
          <Input />
        </Form.Item>
        <Form.Item label="Webseite" name="url">
          <MyInputURLField />
        </Form.Item>
        <Form.Item label="eMail" name="mail">
          <Input />
        </Form.Item>
        <Form.Item label="Telefon" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="note">
          <Input />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddressForm;

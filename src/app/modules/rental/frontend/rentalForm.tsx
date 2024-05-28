/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Space,
  Typography,
  Input,
  Form,
  Button,
  Select,
  SelectProps,
} from 'antd';

import {
  UploadOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router';
//* above are the default imports

//* Room for additional imports

//* Application imports
import RequestFactory from '../../../common/backend/RequestFactory';
import FormTools from '../../../common/frontend/FormTools';
import FormPropertiesInterface from '../../../common/frontend/types/FormPropertiesInterface';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


/**
 * TODO Search the Artwork / Edition / Publication.
 * https://ant.design/components/select
 * https://codesandbox.io/s/dx685g
 * https://codesandbox.io/s/3d5zcp?file=/demo.tsx:1248-1255
 * https://codesandbox.io/s/j25fgl?file=/demo.tsx:2219-2227
 *
 * @param props
 * @returns
 */
// eslint-disable-next-line no-undef
const SearchInput: React.FC<{
  placeholder: string;
  // eslint-disable-next-line no-undef
// eslint-disable-next-line react/function-component-definition
}> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const showSearch = true;

  const handleSearch = (searchValue: string) => {
    console.log('############### query artworks');
    // TODO fetch(newValue, setData); from DB...
    // https://pouchdb.com/api.html#batch_fetch
    FormTools.customRequest('ipc-database', 'request:artworks-query-custom', searchValue, {});
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch={showSearch}
      value={value}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
function RentalForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'sale';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState();

  const [saleTypes, setSaleTypes] = useState([]);

  const props: FormPropertiesInterface = {
    id,
    moduleLabel: 'Verkauf',
    moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, 'ipc-database'),
    segment: `${moduleId}s`,
  };

  console.log(`############### Props-ID ${props.id}`);
  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info('Request some data from backend...');
    FormTools.loadDataRequest(props.requests, id); // Standard Formular request (Hole Daten oder neues Objekt
    FormTools.customRequest('ipc-database', 'request:saleTypes-list-custom', '','');
    // TODO: evtl Standard dafür nutzen?
    // const r = RequestFactory.getListRequestsFor('saleType', 'ipc-database');
  }, []);

  FormTools.loadDataResponse(dataOrigin, props, (data:any) => {
    // Die Originaldaten heben wir auf,
    // um später zu prüfen ob sich was geändert hat.
    setDataOrigin(data);
    form.setFieldsValue(data[props.segment][0]);
  });

  FormTools.customResponse(
    'ipc-database',
    'request:saleTypes-list-custom',
    (data:any) => {
      setSaleTypes(data.saleTypes);
    }
  );

  const onFormHandleSubmit = (valuesForm: any) => {
    FormTools.saveDataRequest(id, dataOrigin, valuesForm, [], props);
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
      FormTools.getGotoViewPath(props.moduleId, id)
    );
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  //* SaleTypes
  // TODO refactorieren wegen publicationTypes etc...
   function getSaleTypeOptions(): Array<any> {
    return saleTypes.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }

   //* Required Fields, and FormItems show/hide
  // Wir haben drei Optionen bei den Feldern, abhängig vom SalesType:
  // Zwei Dinge müssen damit eingestellt werden:
  // 1.) Ist das Feld (oder die Felder) required.
  // 2.) Ist das Feld (oder die Felder) sichtbar.
  const [isArtwork, setIsArtwork] = useState<boolean>(true);
  const [isEdition, setIsEdition] = useState<boolean>(false);
  const [isPublication, setIsPublication] = useState<boolean>(false);

  const editSaleTypeOptions = () => {
    console.log('editSaleTypeOptions');
  }


  const handleSaleTypeChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    // console.log(`selected ${value}`);

    // TODO Clear the other fields (aber erst beim speichern?)
    switch (value) {
      case '0ad711be-179b-4fd6-b069-3ee8ada9591a': {
        // Fineartprint (Edition)
        setIsArtwork(false); // false = 'optional'
        setIsEdition(true);
        setIsPublication(false);
        break;
      }
      case '2932a605-48aa-4368-96b7-21aed8103e38': {
        // Buchverkauf, Publication
        setIsArtwork(false);
        setIsEdition(false);
        setIsPublication(true);
        break;
      }
      case '2fa71a66-03e5-49c5-bfeb-b98108ea49ea': {
        // Dienstleistung
        setIsArtwork(false);
        setIsEdition(false);
        setIsPublication(false);
        break;
      }
      default: {
        // Artwork;
        setIsArtwork(true);
        setIsEdition(false);
        setIsPublication(false);
        break;
      }
    }
  };

  //* Search the Artwork / Edition / Publication



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
        onFinish={onFormHandleSubmit}
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
          name="saleType"
          tooltip={{ title: 'Was wird verkauft', icon: <InfoCircleOutlined /> }}
        >
          <Space wrap>
          <Select
            defaultValue="0ae7570a-603c-43f3-9667-5aa019dd27eb" // Print (Standard)
            onChange={handleSaleTypeChange}
            options={getSaleTypeOptions()}
            style={ {width: 270 } }
          />
          <Button onClick={editSaleTypeOptions}><EditOutlined /></Button>
          </Space>
        </Form.Item>
        <Form.Item
          style={isArtwork ? {} : { display: 'none' }}
          label="Werk"
          name="artwork"
          tooltip="Das Kunstwerk"
          rules={[
            {
              required: isArtwork,
              message: `Bitte das Werk angeben!`,
            },
          ]}
        >
          <SearchInput placeholder="search an Artwork" />

        </Form.Item>
        <Form.Item
          style={isEdition ? {} : { display: 'none' }}
          label="Edition"
          name="edition"
          rules={[
            {
              required: isEdition,
              message: `Bitte die Edition angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={isPublication ? {} : { display: 'none' }}
          label="Publikation"
          name="publication"
          rules={[
            {
              required: isPublication,
              message: `Bitte die Publikation angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={isEdition ? {} : { display: 'none' }}
          label="Nummer der Edition"
          name="editionNumber"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Kalkulierter Preis" name="calculatedPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Bezahlter Preis" name="paid">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote." />
        </Form.Item>
      </Form>
    </div>
  );
}

export default RentalForm;

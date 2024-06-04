/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Typography, Input, Form, Button, Select} from 'antd';

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
import { FormPropertiesInterface } from '../../../common/frontend/types/FormPropertiesInterface';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
function PublicationForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'publication';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState();

  const [publicationTypes, setPublicationTypes] = useState([]);
  const [publicationWhats, setPublicationWhats] = useState([]);
  const [publicationMediums, setPublicationMediums] = useState([]);

  const props: FormPropertiesInterface = {
    id: id,
    moduleLabel: 'Publikation',
    moduleId: moduleId,
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
    FormTools.loadDataRequest(props.requests, id);
    FormTools.customRequest('ipc-database', 'request:publicationType-list-custom', '','');
    FormTools.customRequest('ipc-database', 'request:publicationWhat-list-custom','','');
    FormTools.customRequest('ipc-database', 'request:publicationMedium-list-custom','','');

  }, []);

  FormTools.loadDataResponse(
    dataOrigin,
    props,
    (data:any) => {
        // Die Originaldaten heben wir auf,
        // um später zu prüfen ob sich was geändert hat.
        setDataOrigin(data);
        form.setFieldsValue(data[props.segment][0]);
    }
  );

  FormTools.customResponse(
    'ipc-database',
    'request:publicationType-list-custom',
    (data:any) => {
      setPublicationTypes(data.publicationTypes);
    }
  );
  FormTools.customResponse(
    'ipc-database',
    'request:publicationWhat-list-custom',
    (data:any) => {
      setPublicationWhats(data.publicationWhats);
    }
  );
  FormTools.customResponse(
    'ipc-database',
    'request:publicationMedium-list-custom',
    (data:any) => {
      setPublicationMediums(data.publicationMediums);
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
    navigate(FormTools.getGotoViewPath(props.moduleId, id));
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

     // TODO refactorieren wegen publicationTypes etc...
     function getPublicationTypeOptions(): Array<any> {
      return publicationTypes.map((item: { id: any; name: any }) => {
        return { value: item.id, label: item.name };
      });
    }

    /**
    [
      {
        label: 'Manager',
        options: [
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
        ],
      },
      {
        label: 'Engineer',
        options: [{ label: 'yiminghe', value: 'Yiminghe' }],
      },
    ]
     */
    function getPublicationWhatOptions(): Array<any> {
      return publicationWhats.map((item: { id: any; name: any; children:any; }) => {

        const test =  {
          label: item.name,
          options: item.children.map((child: { id: any; name: any; }) => {
            return { value: child.id, label: child.name };
          })
        }

        return test; // { value: item.id, label: item.name }
      });
    }

    function getPublicationMediumOptions(): Array<any> {
      return publicationMediums.map((item: { id: any; name: any; children:any; }) => {

        const test =  {
          label: item.name,
          options: item.children.map((child: { id: any; name: any; }) => {
            return { value: child.id, label: child.name };
          })
        }

        return test; // { value: item.id, label: item.name };
      });
    }

  const handlePublicationTypeChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
  };
  const handlePublicationWhatChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
  };
  const handlePublicationMediumChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
  };
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
          label="Titel"
          name="title"
          rules={[
            {
              required: true,
              message: `Bitte den Titel der ${props.moduleLabel} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Untertitel"
          name="subtitle"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Typ"
          name="publicationType"
          tooltip={{ title: 'Der Typ der  Publikation', icon: <InfoCircleOutlined /> }}
        >
          <Select
            defaultValue="11f51946-81ce-4aa4-8229-8d64687f4e08" // Eigene Publikation
            onChange={handlePublicationTypeChange}
            options={getPublicationTypeOptions()}
            style={ {width: 270 } }
          />
        </Form.Item>
        <Form.Item
          label="Art"
          name="publicationWhat"
          tooltip={{ title: 'Art der Publikation', icon: <InfoCircleOutlined /> }}
        >
          <Select
            defaultValue="88c68507-4c4e-41cb-bf26-79f94e46b7f8" // Buch
            onChange={handlePublicationWhatChange}
            options={getPublicationWhatOptions()}
            style={ {width: 270 } }
          />
        </Form.Item>
        <Form.Item
          label="Medium"
          name="publicationMedium"
          tooltip={{ title: 'Das Medium...', icon: <InfoCircleOutlined /> }}
        >
          <Select
            defaultValue="ced67c12-73bd-48d9-b460-1d03c4f92097" // Medium Papier
            onChange={handlePublicationMediumChange}
            options={getPublicationMediumOptions()}
            style={ {width: 270 } }
          />
        </Form.Item>
        <Form.Item label="ISBN" name="isbn">
          <Input />
        </Form.Item>
        <Form.Item label="Verlag" name="publisher">
          <Input />
        </Form.Item>
        <Form.Item label="Nationalbibliothek" name="nationallibrary">
          <Input />
        </Form.Item>
        <Form.Item label="Webadresse" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="Please enter some Content." />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default PublicationForm;

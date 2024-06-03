/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Typography, Input, Form, Button, Select } from 'antd';

import {
  UploadOutlined, CloseCircleOutlined, EyeInvisibleOutlined, EyeTwoTone
} from '@ant-design/icons';

import { useNavigate } from 'react-router';
//* above are the default imports

//* Room for additional imports

//* Application imports
import RequestFactory from '../../../common/backend/RequestFactory';
import FormTools from '../../../common/frontend/FormTools';
import { FormPropertiesInterface } from '../../../common/frontend/types/FormPropertiesInterface';

// TODO Die Daten kommen alle aus den Settings, aber
// ich kann das aber ganz normal abfackeln...
// Liste, View, Edit --- create, new usw...

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/**
 * Formular für das Modul Catalog.
 *
 * @returns CatalogsForm
 */
function CatalogsForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'catalogs';

  const templateLocal =  '${dbName}';
  const templateRemote = 'http://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}';

  const [showRemote, setShowRemote] = useState(false);
  const [template, setTemplate] = useState<string>(templateLocal);



  const handleDBOptionsChange = (value: string) => {
    switch (value) {
      case 'local': {
        setShowRemote(false);
        setTemplate(templateLocal);
        break;
      }
      case 'remote': {
        setShowRemote(true);
        setTemplate(templateRemote);
        break;
      }
      default: {
        setShowRemote(false);
        setTemplate(templateLocal);
        break;
      }
    }
  };



  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const props: FormPropertiesInterface = {
    id: id,
    moduleLabel: 'Katalog',
    moduleId: moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, 'ipc-settings'),
    segment: `${moduleId}`,
  };

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

   useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info('Request some data from backend...');
    FormTools.loadDataRequest(props.requests, id);
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


  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <div>
      <Title level={3}> Kataloge verwalten</Title>
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
              <UploadOutlined /> Katalog speichen
            </Button>
          </Space>
        </Form.Item>



        <Form.Item label="Name" name="templateName">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="templateDescription">
          <Input />
        </Form.Item>
        <Form.Item label="Art der Datenbank" name="dbOptions">
            <Select
              defaultValue="local"
              onChange={handleDBOptionsChange}
              options={[
                {
                  value: 'local',
                  label: 'Ich nutze eine lokale Datenbank.',
                },
                {
                  value: 'remote',
                  label: 'Ich nutze einen Datenbank Server.',
                },
              ]}
            />
          </Form.Item>
        <Form.Item label="Datenbank Host" name="dbHost" style={showRemote ? {} : { display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="Port" name="dbPort" style={showRemote ? {} : { display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="Datenbank Name" name="dbName">
          <Input />
        </Form.Item>
        <Form.Item label="Datenbank User" name="dbUser">
          <Input />
        </Form.Item>
        <Form.Item label="Datenbank Passwort" name="dbPassword">
          <Input.Password
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} />
        </Form.Item>
        <Form.Item label="Template" name="dbTemplate">
          {template}
        </Form.Item>
      </Form>
    </div>
  );
}

export default CatalogsForm;

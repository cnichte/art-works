/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Typography, Input, Form, Button } from 'antd';

import {
  UploadOutlined,
  CloseCircleOutlined,
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
function NoteForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'note';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState();

  const props: FormPropertiesInterface = {
    id: id,
    moduleLabel: 'Notiz',
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
        <Form.Item label="Inhalt" name="content">
          <Input.TextArea rows={4} placeholder="Please enter some Content." />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default NoteForm;

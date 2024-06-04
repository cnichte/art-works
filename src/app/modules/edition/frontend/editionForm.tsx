/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Typography, Input, Form, Button } from 'antd';
import { v4 as uuidv4 } from "uuid";

import { UploadOutlined, CloseCircleOutlined,
   PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

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
function EditionForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = 'edition';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState(null);

  const props: FormPropertiesInterface = {
    id,
    moduleLabel: 'Edition',
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
    FormTools.loadDataRequest(props.requests, id);
  }, []);

  FormTools.loadDataResponse(dataOrigin, props, (data:any) => {
    // Die Originaldaten heben wir auf,
    // um später zu prüfen ob sich was geändert hat.
    setDataOrigin(data);
    form.setFieldsValue(data[props.segment][0]);
  });

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
      FormTools.getGotoViewPath(
        props.moduleId,
        dataOrigin[props.segment][0].id
      )
    );
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: `Bitte den Namen der ${props.moduleLabel} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="Please enter some Content." />
        </Form.Item>
        <Form.Item label="Edition Nummer" name="edition">
          <Input />
        </Form.Item>
        <Form.Item label="Anzahl Artist Prints" name="artistsPrint">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
        <Form.Item label="Preise" name="prices">
        <Form.List name="prices" >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'id']}
                    rules={[{ required: true, message: 'ID Fehlt' }]}
                    style={{ display: 'none' }}
                   >
                    <Input placeholder="ID" defaultValue={uuidv4()} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    rules={[{ required: true, message: 'Bezeichnung fehlt.' }]}
                  >
                    <Input placeholder="Bezeichnung" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'numberStart']}
                    rules={[{ required: true, message: 'Startnummer fehlt' }]}
                  >
                    <Input placeholder="Startnummmer" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'numberEnd']}
                    rules={[{ required: true, message: 'Endnummer fehlt' }]}
                  >
                    <Input placeholder="Endnumber" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    rules={[{ required: true, message: 'Preis fehlt' }]}
                  >
                    <Input placeholder="Price" />
                  </Form.Item>
                  <Button onClick={() => remove(name)} type="primary" icon={<MinusCircleOutlined/>} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Preis hinzufügen
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditionForm;

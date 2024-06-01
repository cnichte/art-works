/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Typography, Input, Form, Button,
  Upload } from 'antd';

import type { RcFile } from 'antd/es/upload';

import {
  UploadOutlined, CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router';
//* above are the default imports

//* Room for additional imports
import ImgCrop from 'antd-img-crop';

//* Application imports
import RequestFactory from '../../../common/backend/RequestFactory';
import FormTools from '../../../common/frontend/FormTools';
import FormPropertiesInterface from '../../../common/frontend/types/FormPropertiesInterface';
import { MyInputURLField } from '../../../common/frontend/myInputFields';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

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

  const moduleId = 'artist';

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState(null);

  const props: FormPropertiesInterface = {
    id: id,
    moduleLabel: 'Künstler',
    moduleId: moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, 'ipc-database'),
    segment: `${moduleId}s`,
  };

  const [uploading, setUploading] = useState(false);

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

  FormTools.saveDataResponse(dataOrigin, props, (result: any) => {
    setUploading(false);
    // We keep the original data,
    // to check later if anything has changed.
    if (dataOrigin !== undefined && dataOrigin !== null) {
      if (dataOrigin[props.segment][0].id === result.data.id) {
        //* update rev
        // The ID should of course match...
        // The rev ID is transferred so that I can save again...
        // TODO wie mit einem Konflikt umgehen... (Konfliktmeldung)
        // TODO dataOrigin ist possibly nicht definiert:
        dataOrigin[props.segment][0].rev = result.data.rev;

        setDataOrigin(dataOrigin);
        // TODO: Das ich hier auf .segment][0] gehe ist auch gefährlich.
        // Ich sollte das Dokument mit der ID suchen statt die [0] zu nehmen...

        // TODO Hier gibt es data nicht:
        // console.log('####### SET FIELDS VALUE', data[props.segment][0]);
        // form.setFieldsValue(data[props.segment][0]);
      }
    }
  });

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

   const [dataAvatarImageAsBase64, setDataAvatarImageAsBase64] =
    useState<string>();

  /**
   * Encodes the Avatar Image as a bas64 string.
   *
   * @param file The File
   * @returns Promise
   */
  function getAvatarImageAsBase64(file: RcFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Validating the Avatar Image, and load manually.
   *
   * @param file
   * @returns
   */
  const onAvatarBeforeUpload = (file: RcFile) => {
    console.log(`onAvatarBeforeUpload`);
    console.log(file);

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // TODO: message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // TODO: message.error('Image must smaller than 2MB!');
    }

    // Upload files manually after 'onAvatarBeforeUpload' returns false.
    getAvatarImageAsBase64(file as RcFile)
      .then((value) => {
        setDataAvatarImageAsBase64(value);
        return value;
      })
      .catch((value) => console.log(`error: ${value}`));

    return false;
  };

  /**
   * I do the Upload the Avatar Image manually, and do not use the internal Ajax upload,
   * so this function does nothing?
   *
   * @param info
   * @returns
   */
  function onAvatarHandleUpload(info: UploadChangeParam<UploadFile>) { // TODO Sind die Pakete korrekt?
    console.log(`onAvatarHandleUpload`);
    console.log(info);
  }

  /**
   * The Avatar Images Upload Button.
   */
  const buttonUploadAvatar = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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



        <Form.Item label="Bild" name="image">
                <ImgCrop rotationSlider>
                  <Upload
                    maxCount={1}
                    listType="picture-card"
                    className="avatar-uploader"
                    action=""
                    showUploadList={false}
                    beforeUpload={onAvatarBeforeUpload}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onAvatarHandleUpload}
                  >
                    {dataAvatarImageAsBase64 ? (
                      <img
                        src={dataAvatarImageAsBase64}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      buttonUploadAvatar
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Namen eingeben.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Künstlername" name="alias">
                <Input />
              </Form.Item>
              <Form.Item label="Geburtstag" name="birthdate">
                <Input />
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
              <Form.Item label="Notiz" name="shortnote">
                <Input.TextArea rows={4} placeholder="Please enter a note." />
              </Form.Item>
      </Form>
    </div>
  );
}

export default NoteForm;

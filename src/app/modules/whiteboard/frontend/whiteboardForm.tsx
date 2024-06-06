import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { Button, Form, Input, Space, Typography } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";

import RequestFactory from "../../../common/backend/RequestFactory";
import FormTools from "../../../common/frontend/FormTools";
import { FormPropertiesInterface } from "../../../common/frontend/types/FormPropertiesInterface";

import { Tldraw, createTLStore, defaultShapeUtils, useEditor } from "tldraw";
import "tldraw/tldraw.css";

import TEST_PNG from "../../../../test.png"; // Das klappt

/**
 * Das Formular ist in Tabs organisiert.
 * https://ant.design/components/tabs
 *
 * @returns
 * <Tldraw />
 */
function WhiteboardForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = "whiteboard";

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState(null);

  const props: FormPropertiesInterface = {
    id: id,
    moduleLabel: "Whiteboard",
    moduleId: moduleId,
    requests: RequestFactory.getFormRequestsFor(moduleId, "ipc-database"),
    segment: `${moduleId}s`,
  };

  const editor = useEditor();
	const [store] = useState(() => {
		// Create the store
		const newStore = createTLStore({
			shapeUtils: defaultShapeUtils,
		})
		// Get the snapshot
		// const stringified = localStorage.getItem('my-editor-snapshot')
		// const snapshot = JSON.parse(stringified)
		// Load the snapshot
		// newStore.loadSnapshot(snapshot)

		return newStore
	})
  
  const [uploading, setUploading] = useState(false);

  // Custom Title and Save-Button
  // depends on Formulars Modus ('new' or 'edit' content from uuid)
  const theTitle =
    id === "new"
      ? `Neues ${props.moduleLabel} hinzufügen`
      : `${props.moduleLabel} bearbeiten`;
  const theSaveButtonLabel =
    id === "new" ? "Whiteboard anlegen" : "Änderungen speichern";

  console.log(`############### Props-ID ${props.id}`);

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
    FormTools.loadDataRequest(props.requests, id);
  }, []);

  FormTools.loadDataResponse(dataOrigin, props, (data: any) => {
    // Die Originaldaten heben wir auf,
    // um später zu prüfen ob sich was geändert hat.
    setDataOrigin(data);
    try {
      const snapshot = JSON.parse(data[props.segment][0].content);
      store.loadSnapshot(snapshot);
  } catch (e) {
      console.log('whiteboard ist kein json');
  }


  });

  const onFormHandleSubmit = (valuesForm: any) => {
    // TODO https://tldraw.dev/docs/persistence
    const snapshot = store.getSnapshot();
    // const stringified = JSON.stringify(snapshot);
    dataOrigin[props.segment][0].content = ""; //  stringified;

    setUploading(true);

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

        //! setDataOrigin(dataOrigin);
        // TODO: Das ich hier auf .segment][0] gehe ist auch gefährlich.
        // Ich sollte das Dokument mit der ID suchen statt die [0] zu nehmen...

        // TODO Hier gibt es data nicht:
        //! console.log('####### SET FIELDS VALUE', data[props.segment][0]);
        //! form.setFieldsValue(data[props.segment][0]);
      }
    }
  });

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  const onFormClose = (key: any) => {
    console.log("---------- onFormClose", key);
    navigate(FormTools.getGotoViewPath(props.moduleId, id));
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  const onParentChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onParentSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <>
      <Space wrap style={{ display: 'flex' }}>
        <Button type="dashed" htmlType="button" onClick={onFormClose}>
          <CloseCircleOutlined /> Close Form
        </Button>
        <Button type="primary" htmlType="submit" onClick={onFormHandleSubmit}>
          <UploadOutlined /> Änderungen speichern
        </Button>
      </Space>
      <Tldraw store={store} />
    </>
  );
}

export default WhiteboardForm;

/*


      <div className="tlDrawContainer">
      <Tldraw store={store} />
      </div>

      <Image
    width={200}
    src={TEST_PNG}
    
    <Tldraw assetUrls={assetUrls} />
		
    <div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw />
		</div>

      <MyBasicList
        moduleLabel="Whiteboard"
        moduleId={moduleId}
        requests={requests}
        segment="whiteboards"
        columns={columns}
      />
      



*/

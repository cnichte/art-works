/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  Steps,
  Typography,
  theme,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import { MyAttachments_ImagesMeta_Input } from "../../../frontend/custom/components/myAttachments_ImagesMeta_Input";
import { MySelectEditField } from "../../../frontend/custom/components/myInputFields";
// TODO import TransportTool from './TransportTool';


const { TextArea } = Input;
const { Text } = Typography;

const theJob: any = {
  action: "transform",
  source: {
    type: "wordpress",
    data: {
      file: [],
      mapping: [
        {
          fieldNameSource: "",
          fieldNameTarget: "",
          mappingAction: "?",
        },
      ],
    },
    target: {
      type: "markdown_fm",
      target: {
        folderImages: "",
        folderDocs: "",
      },
    },
  },
};

function Step1() {
  const [form] = Form.useForm();

  const [buttonName, setButtonName] = useState("");

  const [transportAction, setTransportAction] = useState<string>("transform");
  const [sourceOptions, setSourceOptions] = useState([]);
  const [targetOptions, setTargetOptions] = useState([]);

  const [sourceOptionSelected, setSourceOptionSelected] = useState("wordpress");
  const [targetOptionSelected, setTargetOptionSelected] =
    useState("markdown_fm");

  // Markdown Front Matter FormatStyle
  const mdFmFormatExamples = {
    markdownFormatStyleYaml: `
  categories:
    - Development
    - VIM
  date: "2012-04-06"
  description: some description text
  slug: spf13-vim-3-0-release-and-new-website
  tags:
  - .vimrc
  - plugins
  - spf13-vim
  - vim
  title: spf13-vim 3.0 release and new website
  `,
    markdownFormatStyleToml: `
  categories = ['Development', 'VIM']
  date = '2012-04-06'
  description = 'spf13-vim is a cross platform distribution of vim plugins and resources for Vim.'
  slug = 'spf13-vim-3-0-release-and-new-website'
  tags = ['.vimrc', 'plugins', 'spf13-vim', 'vim']
  title = 'spf13-vim 3.0 release and new website'
  `,
    markdownFormatStyleJson: `
      {
        "categories": [
           "Development",
           "VIM"
        ],
        "date": "2012-04-06",
        "description": "spf13-vim is a cross platform distribution of vim plugins and resources for Vim.",
        "slug": "spf13-vim-3-0-release-and-new-website",
        "tags": [
           ".vimrc",
           "plugins",
           "spf13-vim",
           "vim"
        ],
        "title": "spf13-vim 3.0 release and new website"
     }
  `,
  };

    useEffect(() => {
    // Beim laden der Seite...
    setSourceOptions([
      { value: "exportFromArtworks", label: "Export aus Art.Works" },
      { value: "wordpress", label: "Wordpress (xml)" },
      { value: "imagesONLY", label: "Bilder importieren" },
      { value: "imagesXMP", label: "Bilder mit XMP importieren" },
      { value: "imagesXLS", label: "Bilder mit Excel importieren" },
    ]);
    setSourceOptionSelected("wordpress");

    setTargetOptions([
      { value: "importToArtworks", label: "Import nach Art.Works" },
      { value: "excel", label: "Excel Tabelle" },
      { value: "pdf", label: "PDF" },
      { value: "markdown", label: "Markdown ohne Front Matter" },
      { value: "markdown_fm", label: "Markdown mit Front Matter" },
    ]);
    setSourceOptionSelected("markdown_fm");

    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
  }, []);

  const onFormHandleSubmit = (valuesForm: any) => {
    // FormTools.saveDataRequest(id, dataOrigin, valuesForm, [], props);
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  const onFormReset = () => {
    form.resetFields();
  };

  const onFormClose = (key: any) => {
    console.log("---------- onFormClose", key);
    // navigate( FormTools.getGotoViewPath( props.moduleId, dataOrigin[props.segment][0].id));
  };

  /*
      https://stackoverflow.com/questions/63711080/how-to-set-value-dynamically-inside-form-list-using-setfieldsvalue-in-antd-4
      const fields = form.getFieldsValue()
      const { projects } = fields
      Object.assign(projects[key], { type: value })
      form.setFieldsValue({ projects })

      https://github.com/ant-design/ant-design/issues/21238
    */

  const ontransportActionChange = (e: RadioChangeEvent) => {
    console.log("ontransportActionChange", e.target.value);

    switch (e.target.value) {
      case "import": {
        setButtonName("Import starten");
        setSourceOptions([
          { value: "wordpress", label: "Wordpress (xml)" },
          { value: "imagesONLY", label: "Bilder importieren" },
          { value: "imagesXMP", label: "Bilder mit XMP importieren" },
          { value: "imagesXLS", label: "Bilder mit Excel importieren" },
        ]),
          setSourceOptionSelected("wordpress");

        setTargetOptions([
          { value: "importToArtworks", label: "Import nach Art.Works" },
        ]);
        setTargetOptionSelected("importToArtworks");
        break;
      }
      case "export": {
        setButtonName("Export starten");
        setSourceOptions([
          { value: "exportFromArtworks", label: "Export aus Art.Works" },
        ]);
        setSourceOptionSelected("exportFromArtworks");

        setTargetOptions([
          { value: "excel", label: "Excel Tabelle" },
          { value: "pdf", label: "PDF" },
          { value: "markdown", label: "Markdown ohne Front Matter" },
          { value: "markdown_fm", label: "Markdown mit Front Matter" },
        ]);
        setTargetOptionSelected("markdown_fm");

        break;
      }
      case "transform": {
        setButtonName("Transformation starten");
        setSourceOptions([{ value: "wordpress", label: "Wordpress (xml)" }]);
        setSourceOptionSelected("wordpress");

        setTargetOptions([
          { value: "markdown", label: "Markdown ohne Front Matter" },
          { value: "markdown_fm", label: "Markdown mit Front Matter" },
        ]);
        setTargetOptionSelected("markdown_fm");
      }
      default: {
        // statements;
        break;
      }
    }

    setTransportAction(e.target.value);
  };

  const handleSourceChange = (value: string) => {
    setSourceOptionSelected(value);
    console.log(`selected ${value}`);
  };

  const handleTargetChange = (value: string) => {
    setTargetOptionSelected(value);
    console.log(`selected ${value}`);
  };

  const handleMarkdownFrontmatterStyleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: "100%", maxWidth: 1000 }}
      initialValues={{ remember: true }}
      onFinish={onFormHandleSubmit}
      onFinishFailed={onFormFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Template benutzen" name="template">
        <MySelectEditField
          defaultValue=""
          onChange={handleMarkdownFrontmatterStyleChange}
          options={[
            {
              value: "00ee99a4-aaf2-42b9-92a2-f97a3431efff",
              label: "nein",
            },
            {
              value: "61a15f58-c462-4e3e-a9ff-c87849bfc8bf",
              label: `Mein Template 1`,
            },
            {
              value: "c47c0cab-59c0-4dc3-8c4d-3d956d1148dd",
              label: `Mein Template 2`,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Aktion" name="transportAction">
        <Radio.Group
          defaultValue={transportAction}
          buttonStyle="solid"
          onChange={ontransportActionChange}
          value={transportAction}
        >
          <Radio.Button value="import">Import</Radio.Button>
          <Radio.Button value="export">Export</Radio.Button>
          <Radio.Button value="transform">Transform</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Quelle" name="transportSource">
        <Select
          defaultValue="wordpress"
          value={sourceOptionSelected}
          onChange={handleSourceChange}
          options={sourceOptions}
        />
      </Form.Item>
      <Form.Item label="Ziel" name="transportTarget">
        <Select
          defaultValue="markdown_fm"
          onChange={handleTargetChange}
          options={targetOptions}
          value={targetOptionSelected}
        />
      </Form.Item>
      <Form.Item label="Frontmatter Header" name="markdownFrontmatterHeader">
        <TextArea rows={6} />
        <Text>
          Hier musst du deinen Frontmatter Header rein posten. Er wird dann
          ausgewertet, und benutzt um Inhalte für dein Zielsysten passend zu
          erzeugen.
        </Text>
      </Form.Item>
      <Form.Item label="Beispiel">TODO: Beispiel ausgeben</Form.Item>
    </Form>
  );
}

function Step2() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: "100%", maxWidth: 1000 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item label="Quelldatei oder Ordner Auswählen " name="sourceFile">
        <MyAttachments_ImagesMeta_Input
          id=""
          doctype=""
          onChange={(value: any) => {
            console.log("artworkForm -> MyAttachments -> ValueChanged:", value);
          }}
        />
      </Form.Item>
      <Form.Item>Daten-Quellen sichten, und ggfs. aufs Ziel mappen.</Form.Item>
    </Form>
  );
}

/**
 * TODO: Importieren, Exportieren, Transformiern, Transportieren.
 *
 * https://gohugo.io/content-management/front-matter/
 *
 * @returns Tabs
 */
function ExportForm() {
  const navigate = useNavigate();
  const { Title } = Typography;

  const moduleId = "export";

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Aufgaben",
      content: Step1(),
    },
    {
      title: "Daten",
      content: Step2(),
    },
    {
      title: "Orte",
      content: "Wohin soll was geschrieben werden...",
    },
    {
      title: "Summary",
      content: "Zusammenfassung anschauen, und den Jon starten.",
    },
    {
      title: "Ausführung",
      content: "Durchführung und Ergebnis anschauen.",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 16,

    /*
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    */
  };

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */

  return (
    <div>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              // TODO TransportTool.transporRequest('request:export-xxxx', '', '');
            }}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default ExportForm;

/*

      <Tabs onChange={onTabChange} tabPosition="top" type="card">
        <TabPane tab="Katalog (PDF)" key="settingsPDF">
          Das Werkverzeichnis als PDF-Katalog exportieren.
        </TabPane>
        <TabPane tab="Webseite" key="settingsPage">
          Das Werkverzeichnis als statische Webseite exportieren.
        </TabPane>
        <TabPane tab="Tabelle" key="settingsTable">
          Das Werkverzeichnis als Excel Tabelle exportieren.
        </TabPane>
        <TabPane tab="Markdown" key="settingsMarkdown">
          Das Werkverzeichnis als Markdown exportieren.
        </TabPane>
        <TabPane tab="JSON" key="settingsJson">
          Das Werkverzeichnis als JSON exportieren.
        </TabPane>
      </Tabs>

*/

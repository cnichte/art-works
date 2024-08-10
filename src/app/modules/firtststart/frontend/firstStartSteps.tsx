import React, { useEffect, useState } from 'react';
import { Button, message, Steps, theme, Typography } from 'antd';
import { Header_Buttons_IPC } from '../../../frontend/Header_Buttons_IPC';
import { DocType } from '../../../common/types/DocType';
import { Action_Request } from '../../../common/types/RequestTypes';

// https://ant.design/components/typography
const { Text } = Typography;

const steps = [
  {
    title: 'Hi!',
    content: (
      <Text>
        Willkommen bei Art.Works, der Werkverzeichnis App für die Verwaltung
        deines künstlerischen, oder auch einfach LebensWerkes. Art.Works
        unterstützt dich beim Kuratieren, Organisieren, und Verwalten deines
        Werkes.
      </Text>
    ),
  },
  {
    title: 'Katalog',
    content: 'Second-content',
  },
  {
    title: 'Benutzer',
    content: 'Third-content',
  },
  {
    title: 'Zusammenfassung',
    content: 'Last-content',
  },
];

function FirstStartSteps() {
  const doclabel: string = "Erster Start";
  const doctype: DocType = "firststart";
  const segment: string = "";
  
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    padding: 20,
    lineHeight: '10px',
    textAlign: 'left',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  useEffect(() => { 
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
    Header_Buttons_IPC.request_buttons("list", doctype, "", true);

        //! Listen for Header-Button Actions.
    // Register and remove the event listener
    const buaUnsubscribe = window.electronAPI.listen_to(
      "ipc-button-action",
      (response: Action_Request) => {
        if (response.target === doctype && response.view == "form") {
          console.log("Form says ACTION: ", response);
          // triggerSaveRef.current?.click();
          // message.info(response.type);
        }
      }
    );

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe();
    };

  }, []);

  return (
    <>
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
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default FirstStartSteps;

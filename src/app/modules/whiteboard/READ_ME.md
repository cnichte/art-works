# Module whiteboard

Whiteboards:

* https://docs.tldraw.dev
  * `npm install @tldraw/tldraw@canary`
  * gibt fehler
  * `npm uninstall @tldraw/tldraw@canary`
* https://excalidraw.com
* http://fabricjs.com
  * `npm i fabric.js`
  * `npm uninstall fabric.js`
  * `npm uninstall fabric`
* http://paperjs.org
* https://github.com/flairNLP/flair ???






## Fabrics

```js
import React, { useEffect, useRef } from 'react';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

import { fabric, HTMLCanvasElement } from 'fabric'; // v5

/**
 * Die Settings sind in Tabs organisiert.
 * https://ant.design/components/tabs
 *
 * @returns Tabs
 */
function WhiteboardForm() {
  const onTabChange = (key: string) => {
    console.log(key);
  };

  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current, options);
    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas);
    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
    }
  }, []);


  return (
    <div>
      <Tabs onChange={onTabChange} tabPosition="top" type="card">
        <TabPane tab="Whiteboard" key="whiteboards">
          Hier entsteht ein Whiteboard...
          <canvas width="300" height="300" ref={canvasEl}/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default WhiteboardForm;
```

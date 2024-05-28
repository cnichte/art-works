import React from 'react';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

/**
 * Die Settings sind in Tabs organisiert.
 * https://ant.design/components/tabs
 *
 * @returns Tabs
 */
function SettingsForm() {
  const onTabChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs onChange={onTabChange} tabPosition="top" type="card">
        <TabPane tab="Datenbank" key="settingsDatabase">
          Einstellungen zur Datenbank.
        </TabPane>
        <TabPane tab="Synchronisierung" key="settingsDatabaseSync">
          Wenn ich mit einer anderen Datenbank synchronisieren will.
        </TabPane>
        <TabPane tab="Übersetzungen" key="settingsTranslations">
          Unterstützte Sprachen für Übersetzungen einstellen.
        </TabPane>
        <TabPane tab="Sprache" key="settingsLanguage">
          Sprachen Einstellungen.
        </TabPane>
        <TabPane tab="Verschiedenes" key="settingsMisc">
          Verschiedene Einstellungen.
        </TabPane>
      </Tabs>
    </div>
  );
}

export default SettingsForm;

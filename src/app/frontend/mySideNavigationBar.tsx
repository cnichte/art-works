import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  HeartOutlined,
  CoffeeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { MenuProps, Divider, } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

// TODO Das Menü sollte sich automatisch aus den Modulen aufbauen.

/**
 * Helperfunction, builds a MenuItem.
 *
 * <Menu.Item key="1" onClick={handleMyClick}>
 *  <HeartOutlined /><span> Werke</span>
 * </Menu.Item>
 *
 * @param label The Label (must have)
 * @param key The identifier (must have)
 * @param icon The Icon (optional)
 * @param onClick The onClick Function (optinal)
 * @param children Menue Children (optional)
 * @param type The Type (optional)
 * @returns the MenueItem
 */
function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: Function | undefined,
  children?: MenuItem[],
  type?: 'group',
  style?: any
): MenuItem {
  return {
    key,
    icon,
    onClick,
    children,
    label,
    type,
  } as MenuItem;
}

/**
 * Builds the Sidebar for Navigation.
 *
 * @returns The Sidebar.
 */
function SideNavigationBar() {
  const navigate = useNavigate();

  const handleFirstStartClick = () => {
    navigate('/firststart');
  };

  const handleCatalogClick = () => {
    navigate('/catalogs/list');
  };

  //* onClick Handler
  // Goto List
  const handleAddressesClick = () => {
    navigate('/address/list');
  };
  const handleArtistsClick = () => {
    navigate('/artist/list');
  };
  const handleArtworksClick = () => {
    navigate('/artwork/list'); // ,{ state: UserData }
  };
  const handleAwardsClick = () => {
    navigate('/award/list');
  };
  const handleCompilationsClick = () => {
    navigate('/compilation/list');
  };
  const handleEditionsClick = () => {
    navigate('/edition/list');
  };
  const handleExhibitionsClick = () => {
    navigate('/exhibition/list');
  };
  const handleGenresClick = () => {
    navigate('/genre/list');
  };
  const handleGroupsOfWorkClick = () => {
    navigate('/groupofwork/list');
  };
  const handleNotesClick = () => {
    navigate('/note/list');
  };
  const handlePublicationsClick = () => {
    navigate('/publication/list');
  };
  const handleCalculationsClick = () => {
    navigate('/calculation/list');
  };
  const handleRentalClick = () => {
    navigate('/rental/list');
  };
  const handleSaleClick = () => {
    navigate('/sale/list');
  };
  const handleSaleRightOfUseClick = () => {
    navigate('/salerightsofuse/list');
  };
  const handleTagsClick = () => {
    navigate('/tag/list');
  };

  const handleWhiteboardClick = () => {
    navigate('/whiteboard/list');
  };

  // Goto Form
  const handleSettingsClick = () => {
    navigate('/settings/form');
  };

  // Goto View
  const handleStatisticClick = () => {
    navigate('/statistic/view');
  };

  /**
   * This is the Menu Structure.
   */
  const items: MenuItem[] = [
    getMenuItem('Katalog', '00', <HomeOutlined />, handleCatalogClick),
    {
      type: 'divider',
    },
    getMenuItem('Künstler', '10', <UserOutlined />, handleArtistsClick),
    getMenuItem('Werke', '20', <HeartOutlined />, handleArtworksClick),

    getMenuItem('Sammlungen', 'sub1', <AppstoreOutlined />, undefined, [
      getMenuItem('Notizen', '30', null, handleNotesClick),
      getMenuItem('Werkgruppen', '40', null, handleGroupsOfWorkClick),
      getMenuItem('Zusammenstellungen', '50', null, handleCompilationsClick),
      getMenuItem('Editionen', '60', null, handleEditionsClick),
      getMenuItem('Genres', '70', null, handleGenresClick),
      getMenuItem('Tags', '80', null, handleTagsClick),
    ]),

    getMenuItem('Präsentation', 'sub2', <BankOutlined />, undefined, [
      getMenuItem('Whiteboards', '85', null, handleWhiteboardClick),
      getMenuItem('Publikationen', '90', null, handlePublicationsClick),
      getMenuItem('Ausstellungen', '100', null, handleExhibitionsClick),
      getMenuItem('Auszeichnungen', '110', null, handleAwardsClick),
    ]),

    getMenuItem('Büro', 'sub3', <CoffeeOutlined />, undefined, [
      getMenuItem('Kalkulationen', '130', null, handleCalculationsClick),
      getMenuItem('Verleih', '135', null, handleRentalClick),
      getMenuItem('Verkauf', '140', null, handleSaleClick),
      getMenuItem('Nutzungsrechte', '150', null, handleSaleRightOfUseClick),
      getMenuItem('Kontakte', '160', null, handleAddressesClick),
      getMenuItem('Statistik', '170', null, handleStatisticClick),
    ]),
    getMenuItem(
      'Firststart',
      '190',
      <PlayCircleOutlined />,
      handleFirstStartClick
    ),
  ];

  return (
    <div>
      <div
        style={{
          height: '0px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      />
      <Menu
        defaultSelectedKeys={['20']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
}

export default SideNavigationBar;

export enum AppConfigsEnum {
  HOST_DND = 'host-dnd',
}

export type IHostDndConfig = {
  title: 'host-dnd';
  apps: {
    'mfe-spells': {
      api: {
        dndApi: 'TODO: DnD API';
      };
    };
  };
};

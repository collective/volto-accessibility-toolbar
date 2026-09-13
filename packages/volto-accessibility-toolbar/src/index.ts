import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import { accessibility } from './reducers/accessibility';

function applyConfig(config: ConfigType) {
  // Install accessibility toolbar settings
  installSettings(config);

  // Reducers
  config.addonReducers = {
    ...config.addonReducers,
    accessibility,
  };

  return config;
}

export default applyConfig;

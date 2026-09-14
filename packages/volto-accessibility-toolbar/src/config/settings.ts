/**
 * Settings.
 * @module settings
 */

import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  // Enable or disable the accessibility toolbar features
  config.settings.enable_link = true;
  // URL of the accessibility page
  config.settings.link_url = '/accessibility';
  // Enable or disable the font size feature
  config.settings.enable_font = true;
  // Enable or disable the contrast feature
  config.settings.enable_contrast = true;
  return config;
}

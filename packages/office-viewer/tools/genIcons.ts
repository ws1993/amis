/**
 * 生成图标定义，不想依赖任何打包工具，所以自己生成
 */
import {readFileSync, writeFileSync, readdirSync} from 'fs';

import prettier from 'prettier';

const iconFiles = readdirSync('design/icons').filter(item =>
  item.endsWith('.svg')
);

const iconContents: Record<string, string> = {};

for (const icon of iconFiles) {
  const content = readFileSync(`design/icons/${icon}`, 'utf-8');
  iconContents[icon.replace(/\.svg$/, '')] = content;
}

const outputFile = `
/** generated by genIcons.ts, do not edit */

export const Icons = ${JSON.stringify(iconContents, null, 2)};
`;

prettier.resolveConfig('../../../.prettierrc').then(options => {
  const formatted = prettier.format(outputFile, {
    ...options,
    parser: 'typescript'
  });
  writeFileSync('src/excel/render/Icons.ts', formatted);
});

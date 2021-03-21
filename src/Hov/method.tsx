import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hov from './Hov';
import type { HovProps } from './Hov';

let defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

// type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type HovFuncProps = HovProps<any> & {};

export type HovFunc = (
  props: HovFuncProps,
) => {
  destroy: () => void;
};

// export type ModalStaticFunctions = Record<NonNullable<HovFuncProps['type']>, HovFunc>;

export default function show(config: HovFuncProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    // const triggerCancel = args.some(param => param && param.triggerCancel);
    // if (config.onCancel && triggerCancel) {
    //   config.onCancel(...args);
    // }
    // for (let i = 0; i < destroyFns.length; i++) {
    //   const fn = destroyFns[i];
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   if (fn === close) {
    //     destroyFns.splice(i, 1);
    //     break;
    //   }
    // }
  }

  ReactDOM.render(
    <Hov
      {...config}
      visible={true}
      onFinish={(value: any, record: any) => {
        if (config.onFinish) {
          config.onFinish(value, record);
        }
        destroy();
      }}
    />,
    div,
  );
}

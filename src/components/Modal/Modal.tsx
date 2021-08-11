import { Button, View } from "@tarojs/components";
import { FC, ReactNode } from "react";

import './Modal.scss';

interface IModalProps {
  opened: boolean;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}
const prefixClass = "modal-com"
const Modal: FC<IModalProps> = (props: IModalProps) => {
  const { opened, children, onCancel, onConfirm } = props;

  if (!opened) {
    return <></>
  }

  return (
    <View className={prefixClass}>
      <View className={`${prefixClass}__overlay`}></View>
      <View className={`${prefixClass}__container`} style={{ backgroundColor: '#fff' }}>
        <View className={`${prefixClass}__content`}>
          {children}
        </View>
        <View className={`${prefixClass}__btn-wrapper`}>
          <Button className={`${prefixClass}__btn`} onClick={onCancel}>取消</Button>
          <Button type='primary' style={{ marginLeft: '12px' }} className={`${prefixClass}__btn`} onClick={onConfirm}>确定</Button>
        </View>
      </View>
    </View>
  )
}

export default Modal;

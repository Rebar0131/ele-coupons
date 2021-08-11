import { View } from "@tarojs/components";
import { FC } from "react";
import IconFont from "../iconfont/h5";

import './PageHeader.scss';

interface IPageHeaderProps {
  title: string;
  backEvent?: () => void;
}

const prefixClass = "page-header";
const PageHeader: FC<IPageHeaderProps> = (props: IPageHeaderProps) => {
  const { title, backEvent } = props;

  return (
    <View className={prefixClass}>
      <View className={`${prefixClass}__back`} onClick={() => backEvent?.()}>
        <IconFont name='back' size={30} color='#67778A' />
      </View>
      <View>{title}</View>
    </View>
  );
}

export default PageHeader;

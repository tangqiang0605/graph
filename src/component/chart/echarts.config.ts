import * as echarts from 'echarts/core';
// 引入用到的图表
import { BarChart, PieChart } from 'echarts/charts';
// 引入提示框、数据集等组件
import { TitleComponent, TooltipComponent } from 'echarts/components';
// 引入标签自动布局、全局过渡动画等特性
import { LabelLayout } from 'echarts/features';
// 引入 Canvas 渲染器，必须
import { CanvasRenderer } from 'echarts/renderers';

// 类型相关
// 系列类型的定义后缀都为 SeriesOption
import type { BarSeriesOption, PieSeriesOption } from 'echarts/charts';
// 组件类型的定义后缀都为 ComponentOption
import type { TooltipComponentOption, TitleComponentOption } from 'echarts/components';
// 通过引入 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
import type { ComposeOption } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
>;

// 注册必须的组件
echarts.use([
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  LabelLayout
]);

export default echarts;


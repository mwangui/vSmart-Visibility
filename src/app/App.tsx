import svgPaths from "../imports/4LogOmpStatistics-1/svg-xu79yoskty";
import imgHeader from "figma:asset/73ec653e128edda67501b4df083e58e8150cd4b3.png";
import { imgWarningBorder, imgWarningBorder1 } from "../imports/4LogOmpStatistics-1/svg-w8riy";
import { OmpStatistics } from "./omp/OmpStatistics";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { LoginScreen } from "./auth/LoginScreen";
// TODO(ai-assistant): re-enable once Cisco EGAI/CIRCUIT LLM client is wired up.
// Hidden temporarily because the Anthropic-SDK path can't reach the Cisco gateway.
// import { AIAssistant } from "./components/ai-assistant/AIAssistant";
import { DeviceSidebarSections } from "./sidebar/DeviceSidebarSections";

function Left() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-name="Left">
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Breadcrumbs">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name=".Breadcrumb text">
          <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-tertiary)] text-[14px] whitespace-nowrap">Devices</p>
        </div>
        <div className="relative shrink-0 size-[12px]" data-name="CaretRight">
          <div className="absolute inset-[14.06%_26.56%_14.06%_32.81%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.875 8.625">
              <path clipRule="evenodd" d={svgPaths.p162cd760} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name=".Breadcrumb text">
          <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-tertiary)] text-[14px] whitespace-nowrap">Logs</p>
        </div>
      </div>
    </div>
  );
}

function RightContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-center min-w-px relative" data-name="Right content">
      <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name=".⚠ / Button">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[14px] whitespace-nowrap">View old version</p>
      </div>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[399px]" data-name="Left">
      <p className="font-['Sharp_Sans:Bold',sans-serif] leading-[34px] not-italic relative shrink-0 text-[var(--color-text-heading)] text-[24px] whitespace-nowrap">Devices</p>
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex h-full items-center relative shrink-0" data-name=".Filters">
          <div className="content-stretch flex items-start relative shrink-0" data-name=".⚠ / Single Select">
            <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[8px] items-center px-[8px] py-[5px] relative rounded-[6px] shrink-0" data-name=".⚠ / Input field without label">
              <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[18px] min-w-px not-italic relative text-[var(--color-text-primary)] text-[12px]">CG113-SDRA</p>
              <div className="relative shrink-0 size-[14px]" data-name="DropdownCaretDown">
                <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.65625 4.59375">
                    <path clipRule="evenodd" d={svgPaths.p3331fd80} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Overview</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">WAN</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Interfaces</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Applications</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Security</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-primary)] text-[16px] text-ellipsis whitespace-nowrap">Logs</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Commands</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Troubleshooting</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[22px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-ellipsis whitespace-nowrap">Hosted edge services</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Title">
      <Left1 />
      <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Tabs primary">
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text1 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text2 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text3 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text4 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text5 />
          </div>
          <div className="bg-[var(--color-brand-green)] h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text6 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text7 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab primary">
          <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
            <Text8 />
          </div>
          <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
        </div>
      </div>
    </div>
  );
}

function PageTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start py-[24px] relative shrink-0 w-full" data-name="Page title">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name=".Top line">
        <Left />
      </div>
      <Title />
    </div>
  );
}

function Description() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Description">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[var(--color-text-secondary)] text-[16px] text-center w-full">No image available</p>
    </div>
  );
}

function Location() {
  return (
    <div className="relative shrink-0 w-full" data-name="Location">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[16px] relative size-full">
        <div className="bg-[var(--color-bg-secondary)] content-stretch flex flex-col h-[216px] items-center justify-center px-[16px] py-[12px] relative rounded-[6px] shrink-0 w-[335px]" data-name="Empty state">
          <Description />
        </div>
      </div>
    </div>
  );
}

function GenericLeftColSectionsHeaderMapHeader() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Generic left col sections / Header / Map header">
      <Location />
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative z-[3]" data-name="Text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] w-[min-content]">Information</p>
    </div>
  );
}

function Box() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="box">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="box">
          <g id="check" />
        </g>
      </svg>
    </div>
  );
}

function Controls() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 z-[1]" data-name="Controls">
      <div className="content-stretch flex items-start relative shrink-0" data-name=".Add-on">
        <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center p-[5px] relative rounded-[4px] shrink-0" data-name="Control">
          <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <Box />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] isolate items-start min-w-px relative" data-name="Header">
      <Text9 />
      <Controls />
    </div>
  );
}

function Caret() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="Caret">
      <div className="relative shrink-0 size-[16px]" data-name="CaretUp">
        <div className="absolute inset-[26.56%_14.06%_32.81%_14.06%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
            <path clipRule="evenodd" d={svgPaths.p2d532000} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Key() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Hostname</p>
      </div>
    </div>
  );
}

function Key1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Version</p>
      </div>
    </div>
  );
}

function Key2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Site ID</p>
      </div>
    </div>
  );
}

function Key3() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">System IP</p>
      </div>
    </div>
  );
}

function Key4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Up since</p>
      </div>
    </div>
  );
}

function Key5() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Timezone</p>
      </div>
    </div>
  );
}

function Key6() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <div className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">
          <p className="leading-[18px] mb-0">Location</p>
          <p className="leading-[18px]">​</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[2px] py-px relative shrink-0 size-[16px]" data-name="Icon">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Info">
        <div className="absolute inset-[7.81%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8125 11.8125">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p3bfb4700} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p3e3edd80} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path d={svgPaths.p3bd00400} fill="var(--fill-0, var(--color-icon-primary))" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Key7() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Health</p>
      </div>
      <Icon />
    </div>
  );
}

function Key8() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Chassis number/ID</p>
      </div>
    </div>
  );
}

function Key9() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Chassis model</p>
      </div>
    </div>
  );
}

function Key10() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Serial number</p>
      </div>
    </div>
  );
}

function Key11() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Connected vManage</p>
      </div>
    </div>
  );
}

function Key12() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Tags</p>
      </div>
    </div>
  );
}

function Keys() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Keys">
      <Key />
      <Key1 />
      <Key2 />
      <Key3 />
      <Key4 />
      <Key5 />
      <Key6 />
      <Key7 />
      <Key8 />
      <Key9 />
      <Key10 />
      <Key11 />
      <Key12 />
    </div>
  );
}

function Value() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">CG113-SDRA</p>
      </div>
    </div>
  );
}

function Value1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">17.13.01.0.1247</p>
      </div>
    </div>
  );
}

function Value2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value3() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">1.1.1.113</p>
      </div>
    </div>
  );
}

function Value4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-pre">{`Nov 30, 2024  04:02:00 GMT`}</p>
      </div>
    </div>
  );
}

function Value5() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">CST +0800</p>
      </div>
    </div>
  );
}

function Value6() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[0px] whitespace-nowrap">
          <p className="mb-0 text-[12px] whitespace-pre">
            <span className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic">Lat</span>
            <span className="leading-[18px]">{`  37.666684`}</span>
          </p>
          <p className="text-[12px] whitespace-pre">
            <span className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic">Long</span>
            <span className="leading-[18px]">{`  -122.777023`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Value7() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Requires setup</p>
      </div>
    </div>
  );
}

function Value8() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value9() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value10() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value11() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value12() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">None set</p>
      </div>
    </div>
  );
}

function Values() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Values">
      <Value />
      <Value1 />
      <Value2 />
      <Value3 />
      <Value4 />
      <Value5 />
      <Value6 />
      <Value7 />
      <Value8 />
      <Value9 />
      <Value10 />
      <Value11 />
      <Value12 />
    </div>
  );
}

function KeyPosition() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name=".Key position">
      <Keys />
      <Values />
    </div>
  );
}

function KeyValuePairs() {
  return (
    <div className="content-stretch flex gap-[60px] items-start relative shrink-0" data-name="Key-value pairs">
      <KeyPosition />
    </div>
  );
}

function SectionContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section content">
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[4px] px-[24px] relative size-full">
        <KeyValuePairs />
      </div>
    </div>
  );
}

function Collapse() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-2px] py-[2px] relative shrink-0 w-[383px]" data-name="Collapse">
      <div aria-hidden="true" className="absolute border-[var(--color-text-muted)] border-b-2 border-solid border-t-2 inset-0 pointer-events-none" />
      <div className="relative shrink-0 w-full" data-name=".Header">
        <div className="content-stretch flex gap-[16px] items-start px-[24px] py-[12px] relative size-full">
          <Header />
          <Caret />
        </div>
      </div>
      <SectionContent />
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative z-[3]" data-name="Text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] w-[min-content]">Status</p>
    </div>
  );
}

function Box1() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="box">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="box">
          <g id="check" />
        </g>
      </svg>
    </div>
  );
}

function Controls1() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 z-[1]" data-name="Controls">
      <div className="content-stretch flex items-start relative shrink-0" data-name=".Add-on">
        <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center p-[5px] relative rounded-[4px] shrink-0" data-name="Control">
          <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <Box1 />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] isolate items-start min-w-px relative" data-name="Header">
      <Text10 />
      <Controls1 />
    </div>
  );
}

function Caret1() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="Caret">
      <div className="relative shrink-0 size-[16px]" data-name="CaretUp">
        <div className="absolute inset-[26.56%_14.06%_32.81%_14.06%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
            <path clipRule="evenodd" d={svgPaths.p2d532000} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Key13() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Reboot (last 90 days)</p>
      </div>
    </div>
  );
}

function Key14() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Crash</p>
      </div>
    </div>
  );
}

function Key15() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">CPU load</p>
      </div>
    </div>
  );
}

function Key16() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Memory utilization</p>
      </div>
    </div>
  );
}

function Key17() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Module</p>
      </div>
    </div>
  );
}

function Keys1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Keys">
      <Key13 />
      <Key14 />
      <Key15 />
      <Key16 />
      <Key17 />
    </div>
  );
}

function Value13() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value14() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Value15() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">30% average</p>
      </div>
    </div>
  );
}

function Value16() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">73% average</p>
      </div>
    </div>
  );
}

function Value17() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[12px] whitespace-nowrap">Controller</p>
      </div>
    </div>
  );
}

function Values1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Values">
      <Value13 />
      <Value14 />
      <Value15 />
      <Value16 />
      <Value17 />
    </div>
  );
}

function KeyPosition1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name=".Key position">
      <Keys1 />
      <Values1 />
    </div>
  );
}

function KeyValuePairs1() {
  return (
    <div className="content-stretch flex gap-[60px] items-start relative shrink-0" data-name="Key-value pairs">
      <KeyPosition1 />
    </div>
  );
}

function SectionContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section content">
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[4px] px-[24px] relative size-full">
        <KeyValuePairs1 />
      </div>
    </div>
  );
}

function Collapse1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-2px] py-[2px] relative shrink-0 w-[383px]" data-name="Collapse">
      <div aria-hidden="true" className="absolute border-[var(--color-text-muted)] border-b-2 border-solid border-t-2 inset-0 pointer-events-none" />
      <div className="relative shrink-0 w-full" data-name=".Header">
        <div className="content-stretch flex gap-[16px] items-start px-[24px] py-[12px] relative size-full">
          <Header1 />
          <Caret1 />
        </div>
      </div>
      <SectionContent1 />
    </div>
  );
}

function Text11() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative z-[3]" data-name="Text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] w-[min-content]">Control</p>
    </div>
  );
}

function Box2() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="box">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="box">
          <g id="check" />
        </g>
      </svg>
    </div>
  );
}

function Controls2() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 z-[1]" data-name="Controls">
      <div className="content-stretch flex items-start relative shrink-0" data-name=".Add-on">
        <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center p-[5px] relative rounded-[4px] shrink-0" data-name="Control">
          <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <Box2 />
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] isolate items-start min-w-px relative" data-name="Header">
      <Text11 />
      <Controls2 />
    </div>
  );
}

function Caret2() {
  return (
    <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="Caret">
      <div className="relative shrink-0 size-[16px]" data-name="CaretUp">
        <div className="absolute inset-[26.56%_14.06%_32.81%_14.06%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 6.5">
            <path clipRule="evenodd" d={svgPaths.p2d532000} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Key18() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Control connections</p>
      </div>
    </div>
  );
}

function Key19() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Reachability</p>
      </div>
    </div>
  );
}

function Key20() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Control</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[2px] py-px relative shrink-0 size-[16px]" data-name="Icon">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Info">
        <div className="absolute inset-[7.81%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8125 11.8125">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p3bfb4700} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p3e3edd80} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path d={svgPaths.p3bd00400} fill="var(--fill-0, var(--color-icon-primary))" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Key21() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Controller control connection</p>
      </div>
      <Icon1 />
    </div>
  );
}

function Key22() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">BFD</p>
      </div>
    </div>
  );
}

function Key23() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Key">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">TLOC</p>
      </div>
    </div>
  );
}

function Keys2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Keys">
      <Key18 />
      <Key19 />
      <Key20 />
      <Key21 />
      <Key22 />
      <Key23 />
    </div>
  );
}

function Value18() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Not reported</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Status icon">
        <div className="absolute inset-[9.38%]" data-name="bg">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <circle cx="6.5" cy="6.5" fill="var(--fill-0, var(--color-brand-green))" id="bg" r="6.5" />
          </svg>
        </div>
        <div className="absolute inset-[37.14%_31.25%_34.01%_31.25%]" data-name="status">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4.61686">
            <path d={svgPaths.p21434600} fill="var(--fill-0, white)" id="status" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Value19() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">1/1</p>
      </div>
    </div>
  );
}

function Value20() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">1/1</p>
      </div>
    </div>
  );
}

function Value21() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">0/0</p>
      </div>
    </div>
  );
}

function Value22() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">0/1</p>
      </div>
    </div>
  );
}

function Values2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Values">
      <Value18 />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Generic left col value">
        <div className="flex flex-col font-['Inter:SemiBold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">
          <p className="leading-[18px]">Reachable</p>
        </div>
        <Icon2 />
      </div>
      <Value19 />
      <Value20 />
      <Value21 />
      <Value22 />
    </div>
  );
}

function KeyPosition2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name=".Key position">
      <Keys2 />
      <Values2 />
    </div>
  );
}

function KeyValuePairs2() {
  return (
    <div className="content-stretch flex gap-[60px] items-start relative shrink-0" data-name="Key-value pairs">
      <KeyPosition2 />
    </div>
  );
}

function SectionContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section content">
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[4px] px-[24px] relative size-full">
        <KeyValuePairs2 />
      </div>
    </div>
  );
}

function Collapse2() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-2px] py-[2px] relative shrink-0 w-[383px]" data-name="Collapse">
      <div aria-hidden="true" className="absolute border-[var(--color-text-muted)] border-b-2 border-solid border-t-2 inset-0 pointer-events-none" />
      <div className="relative shrink-0 w-full" data-name=".Header">
        <div className="content-stretch flex gap-[16px] items-start px-[24px] py-[12px] relative size-full">
          <Header2 />
          <Caret2 />
        </div>
      </div>
      <SectionContent2 />
    </div>
  );
}

function LeftColumn1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0 w-[383px]" data-name="Left column">
      <Collapse />
      <Collapse1 />
      <Collapse2 />
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch drop-shadow-[0px_3px_4px_rgba(0,0,0,0.08)] flex flex-col items-start pb-[24px] pt-[12px] relative rounded-[12px] shrink-0" data-name="Left column">
      <GenericLeftColSectionsHeaderMapHeader />
      <DeviceSidebarSections />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[14px] text-ellipsis whitespace-nowrap">Alarms</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[14px] text-ellipsis whitespace-nowrap">Events</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-secondary)] text-[14px] text-ellipsis whitespace-nowrap">AC logs</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-link)] text-[14px] text-ellipsis whitespace-nowrap">OMP statistics</p>
    </div>
  );
}

function Size() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="Clock">
        <div className="absolute inset-[7.81%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2f37fe00} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p129a3500} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[3]" data-name="Icon">
      <Size />
    </div>
  );
}

function Type() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-primary)] text-[14px] text-ellipsis whitespace-nowrap">12 hours</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type />
    </div>
  );
}

function Size1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size1 />
    </div>
  );
}

function Field() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 w-[140px] z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0 w-full" data-name=".Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[2px] isolate items-start px-[10px] py-[6px] relative size-full">
            <Icon3 />
            <Text16 />
            <Icon4 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Type1() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-muted)] text-[14px] text-ellipsis whitespace-nowrap">Select tenant</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type1 />
    </div>
  );
}

function Size2() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size2 />
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 w-[140px] z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0 w-full" data-name=".Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[2px] isolate items-start px-[10px] py-[6px] relative size-full">
            <Text17 />
            <Icon5 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="text">
      <p className="font-['Sharp_Sans:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[var(--color-text-heading)] text-[18px] whitespace-nowrap">OMP process usage</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Heading">
      <Text18 />
    </div>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Texts">
      <Heading />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Title">
      <Texts />
    </div>
  );
}

function Controls3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Controls">
      <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[7px] relative rounded-[6px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-link)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[14px] whitespace-nowrap">Export</p>
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Title1 />
      <Controls3 />
    </div>
  );
}

function Warning() {
  return (
    <div className="absolute contents inset-[19.25%_0_16.01%_0]" data-name="warning">
      <div className="absolute inset-[21.18%_0_78.82%_0] mask-position-[0px_-35.154px,_0px_-3.192px]" style={{ maskImage: `url('${imgWarningBorder}'), url('${imgWarningBorder1}')` }} data-name="Warning border">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1181 3">
            <line id="Warning border" stroke="var(--stroke-0, var(--color-brand-orange))" strokeDasharray="3 3" strokeWidth="3" x2="1181" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Average() {
  return (
    <div className="absolute contents inset-[58.74%_-0.3%_-2.41%_-0.38%]" data-name="average">
      <div className="absolute inset-[58.74%_-0.3%_-2.41%_-0.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4.5px_-97.503px] mask-size-[1181px_166px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name="Line">
        <div className="absolute inset-[-1.39%_0_-1.38%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1191 74.5065">
            <path d={svgPaths.pe392300} id="Line" stroke="var(--stroke-0, var(--color-brand-pink))" strokeDasharray="2 2" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Average1() {
  return (
    <div className="absolute contents inset-[43.37%_-0.47%_-2.43%_-0.34%]" data-name="average">
      <div className="absolute flex inset-[43.37%_-0.47%_-2.43%_-0.34%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.999px_-72.001px] mask-size-[1181px_166px] relative size-full" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name="Line">
            <div className="absolute inset-[-1.03%_0_-1.02%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1192.52 100.036">
                <path d={svgPaths.p1c9af00} id="Line" stroke="var(--stroke-0, var(--color-brand-purple))" strokeDasharray="2 2" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Line1() {
  return (
    <div className="absolute contents inset-[42.21%_0_0_0]">
      <div className="absolute inset-[44.63%_0_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-74.082px] mask-size-[1181px_166px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name="Line">
        <div className="absolute inset-[-2.25%_-0.17%_-2.18%_-0.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1185 95.9887">
            <path d={svgPaths.pe933f80} id="Line" stroke="var(--stroke-0, var(--color-brand-cyan))" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[53.65%_90.36%_41.59%_8.55%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-101px_-89.051px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[68.75%_81.22%_26.49%_17.7%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-209px_-114.125px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[42.21%_72.16%_53.03%_26.76%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-316px_-70.063px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[53.13%_63.01%_42.11%_35.9%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-424px_-88.188px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[48.37%_53.95%_46.86%_44.96%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-531px_-80.301px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[61.45%_44.89%_33.79%_54.02%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-638px_-102.012px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[43.58%_35.75%_51.66%_63.17%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-746px_-72.344px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[57.23%_26.69%_38.01%_72.23%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-853px_-95px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[42.46%_17.54%_52.78%_81.37%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-961px_-70.488px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[51.68%_8.48%_43.56%_90.43%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1068px_-85.781px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <div className="relative size-[9px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                <path d="M4.5 0L9 9H0L4.5 0Z" fill="var(--fill-0, var(--color-brand-cyan))" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute contents inset-[12.65%_-0.08%_-0.52%_-0.04%]">
      <div className="absolute inset-[16.15%_-0.08%_-0.52%_-0.04%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.5px_-26.803px] mask-size-[1181px_166px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name="Line">
        <div className="absolute inset-[-1.66%_-0.17%_-1.43%_-0.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1186.5 144.386">
            <path d={svgPaths.p7144500} id="Line" stroke="var(--stroke-0, var(--color-brand-blue))" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[64.58%_90.28%_30.65%_8.64%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-102px_-107.209px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[27.05%_81.22%_68.19%_17.7%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-209px_-44.904px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[70.31%_72.16%_24.93%_26.76%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-316px_-116.719px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[64.5%_63.01%_30.73%_35.9%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-424px_-107.076px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[12.65%_53.95%_82.59%_44.96%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-531px_-20.998px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[42.17%_44.81%_53.07%_54.11%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-639px_-69.998px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[51.81%_35.75%_43.43%_63.17%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-746px_-85.998px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[33.13%_26.61%_62.11%_72.31%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-854px_-54.998px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[61.89%_17.54%_33.35%_81.37%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-961px_-102.736px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[2px] inset-[64.06%_8.48%_31.18%_90.43%] items-center justify-center mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1068px_-106.344px] mask-size-[1181px_166px] p-[2px]" style={{ maskImage: `url('${imgWarningBorder}')` }} data-name=".Legend - Line Pattern">
        <div className="relative shrink-0 size-[9px]">
          <div className="absolute inset-[-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineChart() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Line chart">
      <Warning />
      <Average />
      <Average1 />
      <Line1 />
      <Line />
    </div>
  );
}

function DataViz() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="Data viz">
      <div className="content-stretch flex flex-col items-start justify-between pb-[32px] pl-[44px] pr-[24px] pt-[12px] relative size-full">
        <LineChart />
      </div>
    </div>
  );
}

function XAxis1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">00:00</p>
      </div>
    </div>
  );
}

function XAxis2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">01:00</p>
      </div>
    </div>
  );
}

function XAxis3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">02:00</p>
      </div>
    </div>
  );
}

function XAxis4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">03:00</p>
      </div>
    </div>
  );
}

function XAxis5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">04:00</p>
      </div>
    </div>
  );
}

function XAxis6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">05:00</p>
      </div>
    </div>
  );
}

function XAxis7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">06:00</p>
      </div>
    </div>
  );
}

function XAxis8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">07:00</p>
      </div>
    </div>
  );
}

function XAxis9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">08:00</p>
      </div>
    </div>
  );
}

function XAxis10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">09:00</p>
      </div>
    </div>
  );
}

function XAxis11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">10:00</p>
      </div>
    </div>
  );
}

function XAxis12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start justify-center relative shrink-0 w-0" data-name="x-axis">
      <div className="-translate-x-1/2 absolute bottom-[-31px] content-stretch flex h-[18px] items-center justify-center left-[calc(50%+0.5px)] w-px" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-heading)] text-[12px] text-right whitespace-nowrap">11:00</p>
      </div>
    </div>
  );
}

function XAxis() {
  return (
    <div className="absolute content-stretch flex inset-[0_0_-13px_0] items-end justify-between pb-[12px]" data-name="x-axis">
      <XAxis1 />
      <XAxis2 />
      <XAxis3 />
      <XAxis4 />
      <XAxis5 />
      <XAxis6 />
      <XAxis7 />
      <XAxis8 />
      <XAxis9 />
      <XAxis10 />
      <XAxis11 />
      <XAxis12 />
    </div>
  );
}

function ChartLine() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis1() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">100%</p>
      </div>
    </div>
  );
}

function ChartLine1() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis2() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine1 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">80%</p>
      </div>
    </div>
  );
}

function ChartLine2() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis3() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine2 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">60%</p>
      </div>
    </div>
  );
}

function ChartLine3() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis4() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine3 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">40%</p>
      </div>
    </div>
  );
}

function ChartLine4() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis5() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine4 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">20%</p>
      </div>
    </div>
  );
}

function ChartLine5() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis6() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine5 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">0%</p>
      </div>
    </div>
  );
}

function YAxis() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_-13px_0] items-start justify-between pb-[12px]" data-name="y-axis">
      <YAxis1 />
      <YAxis2 />
      <YAxis3 />
      <YAxis4 />
      <YAxis5 />
      <YAxis6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <XAxis />
      <YAxis />
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-between pb-[32px] pl-[44px] pr-[24px] pt-[12px] z-[1]" data-name=".Grid">
      <Container1 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex h-full isolate items-end relative shrink-0 w-[1249px]" data-name=".Data 📈📊">
      <DataViz />
      <Grid />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-start min-h-px relative" data-name="Data">
      <div className="flex h-full items-center justify-center relative shrink-0 w-[18px]" style={{ containerType: "size", "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-[100cqh]">
          <div className="content-stretch flex gap-[4px] h-[18px] items-center justify-center relative w-full" data-name=".Axis description">
            <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">CPU / memory (%)</p>
          </div>
        </div>
      </div>
      <Data1 />
    </div>
  );
}

function Chart1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[210px] items-start relative shrink-0 w-full" data-name="Chart">
      <Data />
    </div>
  );
}

function LegendShape() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="Legend shape">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="Legend shape">
          <path clipRule="evenodd" d="M4 13H1V10H4V13Z" fill="var(--fill-0, var(--color-brand-purple))" fillRule="evenodd" id="line" />
          <path clipRule="evenodd" d="M10 13H7V10H10V13Z" fill="var(--fill-0, var(--color-brand-purple))" fillRule="evenodd" id="line_2" />
          <path clipRule="evenodd" d="M16 13H13V10H16V13Z" fill="var(--fill-0, var(--color-brand-purple))" fillRule="evenodd" id="line_3" />
          <path clipRule="evenodd" d="M22 13H19V10H22V13Z" fill="var(--fill-0, var(--color-brand-purple))" fillRule="evenodd" id="line_4" />
        </g>
      </svg>
    </div>
  );
}

function LegendIcon() {
  return (
    <div className="content-stretch flex items-start p-[2px] relative shrink-0 size-[28px]" data-name="Legend icon">
      <LegendShape />
    </div>
  );
}

function Value23() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 18">
      <LegendIcon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">OMP CPU average</p>
    </div>
  );
}

function LegendShape1() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="Legend shape">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="Legend shape">
          <path clipRule="evenodd" d="M4 13H1V10H4V13Z" fill="var(--fill-0, var(--color-brand-pink))" fillRule="evenodd" id="line" />
          <path clipRule="evenodd" d="M10 13H7V10H10V13Z" fill="var(--fill-0, var(--color-brand-pink))" fillRule="evenodd" id="line_2" />
          <path clipRule="evenodd" d="M16 13H13V10H16V13Z" fill="var(--fill-0, var(--color-brand-pink))" fillRule="evenodd" id="line_3" />
          <path clipRule="evenodd" d="M22 13H19V10H22V13Z" fill="var(--fill-0, var(--color-brand-pink))" fillRule="evenodd" id="line_4" />
        </g>
      </svg>
    </div>
  );
}

function LegendIcon1() {
  return (
    <div className="content-stretch flex items-start p-[2px] relative shrink-0 size-[28px]" data-name="Legend icon">
      <LegendShape1 />
    </div>
  );
}

function Value24() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 17">
      <LegendIcon1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">OMP memory average</p>
    </div>
  );
}

function LegendShape2() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="Legend shape">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="Legend shape">
          <path clipRule="evenodd" d="M6.5 13.5H2.5V9.5H6.5V13.5Z" fill="var(--fill-0, var(--color-brand-orange))" fillRule="evenodd" id="line" />
          <path clipRule="evenodd" d={svgPaths.p1e4f2770} fill="var(--fill-0, var(--color-brand-orange))" fillRule="evenodd" id="line_2" />
          <path clipRule="evenodd" d={svgPaths.pb362f80} fill="var(--fill-0, var(--color-brand-orange))" fillRule="evenodd" id="line_3" />
        </g>
      </svg>
    </div>
  );
}

function LegendIcon2() {
  return (
    <div className="content-stretch flex items-start p-[2px] relative shrink-0 size-[28px]" data-name="Legend icon">
      <LegendShape2 />
    </div>
  );
}

function Value25() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 11">
      <LegendIcon2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">{`CPU & memory warning threshold`}</p>
    </div>
  );
}

function Component1stLine() {
  return (
    <div className="content-start flex flex-[1_0_0] flex-wrap gap-[4px_24px] items-start min-w-px relative" data-name="1st Line">
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 2">
        <div className="content-stretch flex items-start p-[2px] relative shrink-0 size-[28px]" data-name="Legend icon">
          <div className="content-stretch flex gap-[6px] items-start p-[7px] relative shrink-0" data-name="Legend shape">
            <div className="-translate-y-1/2 absolute h-[3px] left-0 right-0 top-1/2" data-name="line">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 3">
                <path clipRule="evenodd" d="M23 3H0V0H23V3Z" fill="var(--fill-0, var(--color-brand-blue))" fillRule="evenodd" id="line" />
              </svg>
            </div>
            <div className="relative shrink-0 size-[9px]" data-name="icon">
              <div className="absolute inset-[-11.11%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                  <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-blue))" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">OMP CPU usage</p>
      </div>
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 3">
        <div className="content-stretch flex items-start p-[2px] relative shrink-0 size-[28px]" data-name="Legend icon">
          <div className="content-stretch flex gap-[6px] items-start p-[7px] relative shrink-0" data-name="Legend shape">
            <div className="-translate-y-1/2 absolute h-[3px] left-0 right-0 top-1/2" data-name="line">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 3">
                <path clipRule="evenodd" d="M23 3H0V0H23V3Z" fill="var(--fill-0, var(--color-brand-cyan))" fillRule="evenodd" id="line" />
              </svg>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="-scale-y-100 flex-none">
                <div className="relative size-[9px]" data-name="icon">
                  <div className="absolute inset-[-24.85%_-17.98%_-11.11%_-17.98%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2361 12.2361">
                      <path d={svgPaths.p121b6d00} fill="var(--fill-0, var(--color-brand-cyan))" id="icon" stroke="var(--stroke-0, white)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">OMP memory usage</p>
      </div>
      <Value23 />
      <Value24 />
      <Value25 />
    </div>
  );
}

function Legends() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name=".Legends">
      <Component1stLine />
    </div>
  );
}

function Chart() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative rounded-[12px] shrink-0 w-[1277px]" data-name="Chart">
      <Header3 />
      <Chart1 />
      <Legends />
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="text">
      <p className="font-['Sharp_Sans:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[var(--color-text-heading)] text-[18px] whitespace-nowrap">Event</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Heading">
      <Text19 />
    </div>
  );
}

function Texts1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Texts">
      <Heading1 />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Title">
      <Texts1 />
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Title2 />
    </div>
  );
}

function DataViz1() {
  return <div className="absolute h-[184px] left-0 top-0 w-[346px] z-[2]" data-name="Data viz" />;
}

function ChartLine6() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis8() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine6 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">100</p>
      </div>
    </div>
  );
}

function ChartLine7() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis9() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine7 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">80</p>
      </div>
    </div>
  );
}

function ChartLine8() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis10() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine8 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">60</p>
      </div>
    </div>
  );
}

function ChartLine9() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis11() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine9 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">40</p>
      </div>
    </div>
  );
}

function ChartLine10() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis12() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine10 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">20</p>
      </div>
    </div>
  );
}

function ChartLine11() {
  return (
    <div className="h-0 relative w-full" data-name="Chart line">
      <div className="absolute inset-[-1px_-0.68%_0_-0.76%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1198 1">
          <g id="Chart line">
            <line id="Line" stroke="var(--stroke-0, var(--color-icon-primary))" strokeDasharray="2 2" x2="1198" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function YAxis13() {
  return (
    <div className="content-stretch flex gap-[8px] h-px items-start relative shrink-0 w-full" data-name="y-axis">
      <div className="flex flex-[1_0_0] items-center justify-center min-w-px relative">
        <div className="flex-none rotate-180 w-full">
          <ChartLine11 />
        </div>
      </div>
      <div className="absolute content-stretch flex h-[18px] items-center justify-end left-[-33px] top-[-8.5px] w-[21px]" data-name=".Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-right whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function YAxis7() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_-13px_0] items-start justify-between pb-[12px]" data-name="y-axis">
      <YAxis8 />
      <YAxis9 />
      <YAxis10 />
      <YAxis11 />
      <YAxis12 />
      <YAxis13 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <YAxis7 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full isolate items-end min-w-px relative" data-name=".Data 📈📊">
      <DataViz1 />
      <div className="absolute content-stretch flex flex-col inset-0 items-start justify-between pb-[22px] pl-[44px] pr-[24px] pt-[12px] z-[1]" data-name=".Grid">
        <Container2 />
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-start min-h-px relative w-full" data-name="Data">
      <div className="flex h-full items-center justify-center relative shrink-0 w-[18px]" style={{ containerType: "size", "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-[100cqh]">
          <div className="content-stretch flex gap-[4px] h-[18px] items-center justify-center relative w-full" data-name=".Axis description">
            <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Number of events</p>
          </div>
        </div>
      </div>
      <Data3 />
    </div>
  );
}

function Chart4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[210px] items-start relative shrink-0 w-full" data-name="Chart">
      <Data2 />
    </div>
  );
}

function Component1stLine1() {
  return (
    <div className="content-start flex flex-[1_0_0] flex-wrap gap-[4px_24px] items-start min-w-px relative" data-name="1st Line">
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 1">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Main Legend">
          <div className="content-stretch flex gap-[6px] isolate items-start p-[6px] relative shrink-0" data-name="Legend - Color/Pattern">
            <div className="bg-[var(--color-brand-blue)] overflow-clip rounded-[2px] shrink-0 size-[16px] z-[1]" data-name="Visual pattern" />
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Control connection state change</p>
      </div>
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 2">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Main Legend">
          <div className="content-stretch flex gap-[6px] isolate items-start p-[6px] relative shrink-0" data-name="Legend - Color/Pattern">
            <div className="bg-[var(--color-brand-cyan)] overflow-clip rounded-[2px] shrink-0 size-[16px] z-[1]" data-name="Visual pattern" />
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">{`OMP peer state change `}</p>
      </div>
      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Value 3">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Main Legend">
          <div className="content-stretch flex gap-[6px] isolate items-start p-[6px] relative shrink-0" data-name="Legend - Color/Pattern">
            <div className="bg-[var(--color-brand-purple)] overflow-clip rounded-[2px] shrink-0 size-[16px] z-[1]" data-name="Visual pattern" />
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">Policy change</p>
      </div>
    </div>
  );
}

function Chart3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative rounded-[12px] shrink-0 w-full" data-name="Chart">
      <Header4 />
      <Chart4 />
      <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Legend">
        <Component1stLine1 />
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">21</p>
    </div>
  );
}

function Data5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">14</p>
    </div>
  );
}

function Data6() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">18</p>
    </div>
  );
}

function Bars() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-center min-h-px relative w-full" data-name="Bars">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data4 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[25px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data5 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[29px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data6 />
      </div>
    </div>
  );
}

function BarSingle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[124px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">00:00</p>
      </div>
    </div>
  );
}

function Bar() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-col gap-[4px] h-[7px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">16</p>
    </div>
  );
}

function Bar1() {
  return (
    <div className="content-stretch flex flex-col h-[31px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-col gap-[4px] h-[31px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data7 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">9</p>
    </div>
  );
}

function Bar2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-col gap-[4px] h-[19px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data8 />
      </div>
    </div>
  );
}

function Bars1() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <Bar />
      <Bar1 />
      <Bar2 />
    </div>
  );
}

function BarSingle1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars1 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">01:00</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">18</p>
    </div>
  );
}

function Bar3() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data9 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">13</p>
    </div>
  );
}

function Bar4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-col gap-[4px] h-[24px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data10 />
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">21</p>
    </div>
  );
}

function Bar5() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data11 />
      </div>
    </div>
  );
}

function Bars2() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <Bar3 />
      <Bar4 />
      <Bar5 />
    </div>
  );
}

function BarSingle2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[124px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars2 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">02:00</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">24</p>
    </div>
  );
}

function Bar6() {
  return (
    <div className="content-stretch flex flex-col h-[45px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data12 />
      </div>
    </div>
  );
}

function Bar7() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Bar8() {
  return (
    <div className="content-stretch flex flex-col h-[11px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Bars3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-center justify-end min-h-px relative w-full" data-name="Bars">
      <Bar6 />
      <Bar7 />
      <Bar8 />
    </div>
  );
}

function BarSingle3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[99px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars3 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">03:00</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">22</p>
    </div>
  );
}

function Bar9() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data13 />
      </div>
    </div>
  );
}

function Bar10() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">19</p>
    </div>
  );
}

function Bar11() {
  return (
    <div className="content-stretch flex flex-col h-[31px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data14 />
      </div>
    </div>
  );
}

function Bars4() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] h-[84px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <Bar9 />
      <Bar10 />
      <Bar11 />
    </div>
  );
}

function BarSingle4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[106px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars4 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-full" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">04:00</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">27</p>
    </div>
  );
}

function Bar12() {
  return (
    <div className="content-stretch flex flex-col h-[64px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data15 />
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">25</p>
    </div>
  );
}

function Bar13() {
  return (
    <div className="content-stretch flex flex-col h-[47px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data16 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">16</p>
    </div>
  );
}

function Bar14() {
  return (
    <div className="content-stretch flex flex-col h-[31px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data17 />
      </div>
    </div>
  );
}

function Bars5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-center justify-end min-h-px relative w-full" data-name="Bars">
      <Bar12 />
      <Bar13 />
      <Bar14 />
    </div>
  );
}

function BarSingle5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[168px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars5 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">05:00</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">10</p>
    </div>
  );
}

function Data19() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">13</p>
    </div>
  );
}

function Data20() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">22</p>
    </div>
  );
}

function Bars6() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] h-[99px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <div className="content-stretch flex flex-col gap-[4px] h-[23px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data18 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[27px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data19 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[43px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data20 />
      </div>
    </div>
  );
}

function BarSingle6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[121px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars6 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">06:00</p>
      </div>
    </div>
  );
}

function Bar15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-col gap-[4px] h-[9px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Bar16() {
  return (
    <div className="content-stretch flex flex-col h-[7px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">10</p>
    </div>
  );
}

function Bar17() {
  return (
    <div className="content-stretch flex flex-col h-[21px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data21 />
      </div>
    </div>
  );
}

function Bars7() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <Bar15 />
      <Bar16 />
      <Bar17 />
    </div>
  );
}

function BarSingle7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[65px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars7 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">07:00</p>
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">11</p>
    </div>
  );
}

function Data23() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">23</p>
    </div>
  );
}

function Bars8() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <div className="content-stretch flex flex-col gap-[4px] h-[26px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data22 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[46px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data23 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[9px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
    </div>
  );
}

function BarSingle8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[109px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars8 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">08:00</p>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">26</p>
    </div>
  );
}

function Data25() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">5</p>
    </div>
  );
}

function Bars9() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <div className="content-stretch flex flex-col gap-[4px] h-[65px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data24 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[6px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[18px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data25 />
      </div>
    </div>
  );
}

function BarSingle9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[117px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars9 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">09:00</p>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">19</p>
    </div>
  );
}

function Data27() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">12</p>
    </div>
  );
}

function Data28() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">21</p>
    </div>
  );
}

function Bars10() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <div className="content-stretch flex flex-col gap-[4px] h-[37px] items-center relative rounded-tl-[3px] rounded-tr-[3px] shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
        <Data26 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[29px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data27 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[43px] items-center relative shrink-0 w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data28 />
      </div>
    </div>
  );
}

function BarSingle10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[137px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars10 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">10:00</p>
      </div>
    </div>
  );
}

function Bar18() {
  return (
    <div className="content-stretch flex flex-col h-[9px] items-center justify-end overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative rounded-tl-[3px] rounded-tr-[3px] w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-purple)] flex-[1_0_0] min-h-px rounded-tl-[6px] rounded-tr-[6px] w-full" data-name="BG" />
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">8</p>
    </div>
  );
}

function Bar19() {
  return (
    <div className="content-stretch flex flex-col h-[25px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-cyan)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data29 />
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 top-1/2" data-name="Data">
      <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">7</p>
    </div>
  );
}

function Bar20() {
  return (
    <div className="content-stretch flex flex-col h-[23px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-h-px relative w-full" data-name="Fill">
        <div className="bg-[var(--color-brand-blue)] flex-[1_0_0] min-h-px w-full" data-name="BG" />
        <Data30 />
      </div>
    </div>
  );
}

function Bars11() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center justify-end relative shrink-0 w-full" data-name="Bars">
      <Bar18 />
      <Bar19 />
      <Bar20 />
    </div>
  );
}

function BarSingle11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-end min-w-px relative" data-name="Bar - Single">
      <Bars11 />
      <div className="content-stretch flex h-[18px] items-start justify-center relative shrink-0 w-[24px]" data-name="Label">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] text-center whitespace-nowrap">11:00</p>
      </div>
    </div>
  );
}

function StackedBars() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[185px] items-end justify-center left-[64px] px-[32px] top-[74px] w-[1198px]" data-name="Stacked Bars">
      <BarSingle />
      <BarSingle1 />
      <BarSingle2 />
      <BarSingle3 />
      <BarSingle4 />
      <BarSingle5 />
      <BarSingle6 />
      <BarSingle7 />
      <BarSingle8 />
      <BarSingle9 />
      <BarSingle10 />
      <BarSingle11 />
    </div>
  );
}

function Chart2() {
  return (
    <div className="content-stretch drop-shadow-[0px_3px_4px_rgba(0,0,0,0.08)] flex flex-col gap-[16px] items-start py-[8px] relative shrink-0 w-full" data-name="Chart">
      <Chart3 />
      <StackedBars />
    </div>
  );
}

function Size3() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="MagnifyingGlass">
        <div className="absolute inset-[7.81%_7.82%_7.81%_7.81%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4996 13.5001">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p1fecfe00} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p2f0a18f0} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[2]" data-name="Icon">
      <Size3 />
    </div>
  );
}

function Indicator() {
  return (
    <div className="h-[18px] relative shrink-0 w-px" data-name="Indicator">
      <div className="absolute bg-[var(--color-text-primary)] h-[20px] left-0 opacity-0 top-[-2px] w-px" data-name="|" />
    </div>
  );
}

function Type2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[var(--color-text-muted)] text-[14px] whitespace-nowrap">Search</p>
      <Indicator />
    </div>
  );
}

function Size4() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative shrink-0 size-[18px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="XCircle">
        <div className="absolute inset-[7.81%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2f37fe00} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pd422380} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Clear() {
  return (
    <div className="absolute content-stretch flex items-start opacity-0 pr-[2px] py-px right-[-10px] top-px" data-name="Clear">
      <Size4 />
    </div>
  );
}

function Text20() {
  return (
    <div className="flex-[1_0_0] min-w-px relative z-[1]" data-name="Text">
      <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative size-full">
        <Type2 />
        <Clear />
      </div>
    </div>
  );
}

function Type3() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-muted)] text-[14px] text-ellipsis whitespace-nowrap">System IP</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type3 />
    </div>
  );
}

function Size5() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size5 />
    </div>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 w-[140px] z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0 w-full" data-name=".Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[2px] isolate items-start px-[10px] py-[6px] relative size-full">
            <Text21 />
            <Icon7 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Type4() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-muted)] text-[14px] text-ellipsis whitespace-nowrap">Site name</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type4 />
    </div>
  );
}

function Size6() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size6 />
    </div>
  );
}

function Field3() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 w-[140px] z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0 w-full" data-name=".Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[2px] isolate items-start px-[10px] py-[6px] relative size-full">
            <Text22 />
            <Icon8 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Type5() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-muted)] text-[14px] text-ellipsis whitespace-nowrap">Event type</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type5 />
    </div>
  );
}

function Size7() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size7 />
    </div>
  );
}

function Field4() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 w-[140px] z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0 w-full" data-name=".Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[2px] isolate items-start px-[10px] py-[6px] relative size-full">
            <Text23 />
            <Icon9 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Results() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="results">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[var(--color-text-secondary)] text-[14px] whitespace-nowrap">316 results</p>
    </div>
  );
}

function AdvanceFilters() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pl-[8px] py-[7px] relative shrink-0" data-name="Advance filters">
      <Results />
    </div>
  );
}

function PrimaryAndSecondaryButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Primary and secondary buttons">
      <div className="bg-[var(--color-bg-primary)] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[7px] relative rounded-[6px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-link)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[14px] whitespace-nowrap">Export</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="icon">
      <div className="relative shrink-0 size-[20px]" data-name="SortDown">
        <div className="absolute inset-[60.73%_35.42%_22.61%_35.42%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83336 3.33337">
            <path d={svgPaths.p761a300} fill="var(--fill-0, var(--color-icon-primary))" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[23.23%_35.42%_60.1%_35.42%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83336 3.33337">
            <path d={svgPaths.pb91c6c0} fill="var(--fill-0, var(--color-icon-disabled))" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HeaderTitle() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Event time</p>
      <Icon10 />
    </div>
  );
}

function HeaderTitle1() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">System IP</p>
    </div>
  );
}

function HeaderTitle2() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Hostname</p>
    </div>
  );
}

function HeaderTitle3() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Site name</p>
    </div>
  );
}

function HeaderTitle4() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Event name</p>
    </div>
  );
}

function HeaderTitle5() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Details</p>
    </div>
  );
}

function HeaderTitle6() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Routes sent</p>
    </div>
  );
}

function HeaderTitle7() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Routes received</p>
    </div>
  );
}

function HeaderTitle8() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Header title">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] whitespace-nowrap">Peers</p>
    </div>
  );
}

function Header5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle />
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[38px] items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle1 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle2 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle3 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle4 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] min-w-px relative" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle5 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle6 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle7 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Cell: Header">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start py-[4px] relative size-full">
            <HeaderTitle8 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-text-tertiary)] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Settings">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="GearSix">
                <div className="absolute inset-[6.89%_4.6%_6.93%_4.68%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5141 13.7902">
                    <g id="Vector">
                      <path clipRule="evenodd" d={svgPaths.p15990d00} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p1c5da700} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 04:00 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <div className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
                <p className="leading-[20px] mb-0">1.1.1.52</p>
                <p className="leading-[20px]">​</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-101</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">San Jose</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Control connection state change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.3;peer-new-state=control-connection-up</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">53</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">40</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">2</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Apr 05, 2025 04:10 AM</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">1.1.1.53</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">vSmart2</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">San Francisco</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Policy change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">policy-type:control-policy</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">53</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">41</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">3</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 05:20 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <div className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
                <p className="leading-[20px] mb-0">1.1.1.51</p>
                <p className="leading-[20px]">​</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-2001</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">San Jose</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Control connection state change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.3;peer-new-state=control-connection-up</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">70</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">40</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">2</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 05:30 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">1.1.1.50</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-301</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Mountain View</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">OMP peer state change</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.4;new-omp-state=up-in-gr</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">62</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">36</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">1</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Apr 05, 2025 05:35 AM</p>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">1.1.1.45</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">vSmart2</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">San Francisco</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Policy change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">policy-type:control-policy</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">53</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">41</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">3</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 06:00 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <div className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
                <p className="leading-[20px] mb-0">1.1.1.59</p>
                <p className="leading-[20px]">​</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-401</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">San Jose</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Control connection state change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.3;peer-new-state=control-connection-up</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">70</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">40</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">2</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Apr 05, 2025 05:35 AM</p>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">1.1.1.45</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">vSmart2</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">San Francisco</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Policy change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">policy-type:control-policy</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">53</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">41</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">3</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Apr 05, 2025 07:20 AM</p>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <p className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">1.1.1.56</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">vSmart2</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">San Francisco</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Policy change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">policy-type:control-policy</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">62</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">36</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">1</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 07:40 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <div className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
                <p className="leading-[20px] mb-0">1.1.1.58</p>
                <p className="leading-[20px]">​</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-5001</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">San Jose</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">Control connection state change</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.3;peer-new-state=control-connection-up</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">53</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">40</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">2</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="bg-[var(--color-bg-primary)] content-stretch flex items-stretch relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Apr 05, 2025 07:43 AM</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative self-stretch shrink-0 w-[99px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Monospace">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
              <div className="flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
                <p className="leading-[20px] mb-0">1.1.1.48</p>
                <p className="leading-[20px]">​</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[104px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Branch-101</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[121px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">Mountain View</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[189px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">
              <p className="leading-[20px] mb-0">OMP peer state change</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[266px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start py-[4px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px]">peer-type=vedge;peer=1.1.2.4;new-omp-state=up-in-gr</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[98px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">62</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[127px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">36</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-end pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[56px]" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Type=Body">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start justify-end py-[4px] relative size-full">
            <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-px not-italic relative self-stretch text-[var(--color-text-primary)] text-[14px] text-right">
              <p className="leading-[20px] mb-0">1</p>
              <p className="leading-[20px]">​</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex h-[57px] items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0" data-name="Cell">
        <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0" data-name="Type=Overflow">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start py-[4px] relative size-full">
            <div className="content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
              <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DotsThree">
                <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                    <g id="Vector">
                      <path d={svgPaths.p25258f70} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p39bde000} fill="var(--fill-0, var(--color-icon-primary))" />
                      <path d={svgPaths.p23e70e80} fill="var(--fill-0, var(--color-icon-primary))" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <Header5 />
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
    </div>
  );
}

function Type6() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[186px]" data-name="Type">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[var(--color-text-primary)] text-[14px] text-ellipsis whitespace-nowrap">10</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex gap-[8px] items-start px-[2px] py-px relative shrink-0 z-[2]" data-name="Text">
      <Type6 />
    </div>
  );
}

function Size8() {
  return (
    <div className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 size-[20px]" data-name="Size">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0 z-[1]" data-name="Icon">
      <Size8 />
    </div>
  );
}

function Field5() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-start relative rounded-[6px] shrink-0 z-[2]" data-name="field">
      <div className="bg-[var(--color-bg-primary)] relative rounded-[6px] shrink-0" data-name=".Input">
        <div className="content-stretch flex gap-[2px] isolate items-start overflow-clip px-[10px] py-[6px] relative rounded-[inherit] size-full">
          <Text24 />
          <Icon11 />
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-text-muted)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function RowsPerPage() {
  return (
    <div className="content-stretch flex gap-[8px] h-[34px] items-center justify-end relative shrink-0" data-name="Rows per page">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Rows per page</p>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative rounded-[6px] shrink-0" data-name="Select input">
        <Field5 />
      </div>
    </div>
  );
}

function PageSelection() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Page selection">
      <div className="content-stretch flex items-center justify-center p-[7px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[20px]" data-name="CaretLeft">
          <div className="absolute inset-[14.06%_32.81%_14.06%_26.56%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.125 14.375">
              <path clipRule="evenodd" d={svgPaths.p34e27e80} fill="var(--fill-0, var(--color-icon-disabled))" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name=".PageNumber">
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-brand-blue-light)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[var(--color-text-primary)] text-[14px] text-center">1</p>
      </div>
      <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name=".PageNumber">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[var(--color-text-primary)] text-[14px] text-center">2</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 size-[34px] text-[var(--color-text-primary)] text-[14px] text-center">
        <p className="leading-[20px]">...</p>
      </div>
      <div className="bg-[var(--color-bg-primary)] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name=".PageNumber">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[var(--color-text-primary)] text-[14px] text-center">10</p>
      </div>
      <div className="content-stretch flex items-center justify-center p-[7px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="relative shrink-0 size-[20px]" data-name="CaretRight">
          <div className="absolute inset-[14.06%_26.56%_14.06%_32.81%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.125 14.375">
              <path clipRule="evenodd" d={svgPaths.pf671600} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[var(--color-bg-primary)] drop-shadow-[0px_3px_4px_rgba(0,0,0,0.08)] relative rounded-[12px] shrink-0 w-full" data-name="container">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Tabs secondary">
          <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab secondary">
            <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
              <Text12 />
            </div>
            <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab secondary">
            <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
              <Text13 />
            </div>
            <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab secondary">
            <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
              <Text14 />
            </div>
            <div className="h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0" data-name=".Tab secondary">
            <div className="content-stretch flex gap-[6px] items-center px-px py-[8px] relative shrink-0" data-name=".Tab">
              <Text15 />
            </div>
            <div className="bg-[var(--color-brand-blue-light)] h-[3px] rounded-[2px] shrink-0 w-full" data-name="shape" />
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Filter bar">
          <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative rounded-[6px] shrink-0" data-name="Time filter">
            <Field />
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Filters">
            <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative rounded-[6px] shrink-0" data-name="Select input">
              <Field1 />
            </div>
          </div>
        </div>
        <OmpStatistics />
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div className="content-stretch flex items-center justify-center pr-[36px] relative shrink-0" data-name="Copyright">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[var(--color-text-primary)] text-[12px] whitespace-nowrap">© 2026 Cisco Systems, Inc.</p>
    </div>
  );
}

function Links() {
  return (
    <div className="content-start flex flex-[1_0_0] flex-wrap gap-[12px_16px] items-start justify-end min-w-px relative" data-name="Links">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text link">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[12px] whitespace-nowrap">Privacy policy</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text link">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[var(--color-text-link)] text-[12px] whitespace-nowrap">Terms of service</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-start flex flex-wrap gap-[10px] items-start relative shrink-0 w-full" data-name="Container">
      <Copyright />
      <Links />
    </div>
  );
}

function RightColumn() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="right column">
      <Container />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[36px] relative shrink-0 w-full" data-name="Footer">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Divider">
          <div className="h-0 relative shrink-0 w-full" data-name="line">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1325 1">
                <path d="M0 0.5H1325" id="line" stroke="var(--stroke-0, var(--color-border-primary))" />
              </svg>
            </div>
          </div>
        </div>
        <Container3 />
      </div>
    </div>
  );
}

function ContentArea() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Content area">
      <LeftColumn />
      <RightColumn />
    </div>
  );
}

function PageContent() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[136px] pl-[24px] pr-[36px] top-[56px] w-[1784px]" data-name="Page content">
      <PageTitle />
      <ContentArea />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:SemiBold',sans-serif] font-semibold justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[var(--color-text-primary)] text-[12px] text-center text-ellipsis">
        <p className="leading-[18px]">Citi Bank</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <div className="relative shrink-0 size-[64px]" data-name="Icon / Organization Switcher">
            <div className="absolute inset-[58.33%_8.33%_8.33%_8.33%]" data-name="Weak">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6667 10.6667">
                <path clipRule="evenodd" d={svgPaths.p1d46f700} fill="var(--fill-0, var(--color-icon-tertiary))" fillRule="evenodd" id="Weak" />
              </svg>
            </div>
            <div className="absolute inset-[14.23%_18.39%_47.56%_54.42%]" data-name="Medium">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.70017 12.2288">
                <path d={svgPaths.p2b30df40} fill="var(--fill-0, var(--color-icon-secondary))" id="Medium" />
              </svg>
            </div>
            <div className="absolute inset-[14.23%_43.39%_47.56%_18.39%]" data-name="Default">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2288 12.2288">
                <path d={svgPaths.p2b048a50} fill="var(--fill-0, var(--color-icon-primary))" id="Default" />
              </svg>
            </div>
          </div>
          <Content />
        </div>
      </div>
    </div>
  );
}

function Indicator1() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-0 overflow-clip rounded-bl-[8px] rounded-tl-[8px] top-0 w-[8px] z-[3]" data-name="Indicator">
      <div className="bg-[var(--color-brand-green)] h-full shrink-0 w-[4px]" data-name="Selected Indicator" />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-primary)] text-[12px] text-center text-ellipsis">Monitor</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Monitor">
        <div className="absolute inset-[10.42%_16.67%_27.08%_8.33%]" data-name="Weak">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15">
            <g id="Weak">
              <path d={svgPaths.p2a28ad00} fill="var(--fill-0, var(--color-brand-green-light))" />
              <path d={svgPaths.p30e26800} fill="var(--fill-0, var(--color-brand-green-light))" />
            </g>
          </svg>
        </div>
        <div className="absolute bottom-[10.42%] left-1/2 right-[8.33%] top-[47.92%]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10.0002">
            <path clipRule="evenodd" d={svgPaths.p26e8a00} fill="var(--fill-0, var(--color-brand-green))" fillRule="evenodd" id="Default" />
          </svg>
        </div>
      </div>
      <Content1 />
    </div>
  );
}

function SubItems() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Configuration</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Configuration">
        <div className="absolute inset-[56.87%_58.77%_6.91%_8.75%]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.79423 8.6906">
            <path clipRule="evenodd" d={svgPaths.p2178b300} fill="var(--fill-0, var(--color-icon-secondary))" fillRule="evenodd" id="Medium" />
          </svg>
        </div>
        <div className="absolute bottom-[22.92%] left-1/4 right-[6.25%] top-[8.33%]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5002">
            <path d={svgPaths.p27baadf0} fill="var(--fill-0, var(--color-icon-primary))" id="Default" />
          </svg>
        </div>
      </div>
      <Content2 />
    </div>
  );
}

function SubItems1() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Tools</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon /  Tools">
        <div className="absolute inset-[10.21%_9.59%_55.91%_56.53%]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.13088 8.13116">
            <path d={svgPaths.p2e750370} fill="var(--fill-0, var(--color-icon-secondary))" id="Medium" />
          </svg>
        </div>
        <div className="absolute inset-[55.56%_55.14%_10.21%_10.63%]" data-name="Weak">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.21458 8.21495">
            <path d={svgPaths.p295d5500} fill="var(--fill-0, var(--color-icon-tertiary))" id="Weak" />
          </svg>
        </div>
        <div className="absolute inset-[10.21%_13.33%_12.71%_9.59%]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 18.5002">
            <path d={svgPaths.p260afd30} fill="var(--fill-0, var(--color-icon-primary))" id="Default" />
          </svg>
        </div>
      </div>
      <Content3 />
    </div>
  );
}

function SubItems2() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Maintenance</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Maintenance">
        <div className="absolute inset-[64.58%_12.5%_6.25%_12.5%]" data-name="Weak">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 7">
            <path clipRule="evenodd" d={svgPaths.p10fd3540} fill="var(--fill-0, var(--color-icon-tertiary))" fillRule="evenodd" id="Weak" />
          </svg>
        </div>
        <div className="absolute inset-[6.25%_26.87%_43.75%_26.87%]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1028 12">
            <path clipRule="evenodd" d={svgPaths.pde9c800} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Default" />
          </svg>
        </div>
      </div>
      <Content4 />
    </div>
  );
}

function SubItems3() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Administration</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Admin">
        <div className="absolute inset-[16.67%_48.55%_20.83%_4.17%]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3471 15">
            <path d={svgPaths.p2735700} fill="var(--fill-0, var(--color-icon-secondary))" id="Medium" />
          </svg>
        </div>
        <div className="absolute inset-[45.83%_1.97%_9.62%_58.33%]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.52628 10.6906">
            <path clipRule="evenodd" d={svgPaths.p11b4b400} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" id="Default" />
          </svg>
        </div>
      </div>
      <Content5 />
    </div>
  );
}

function SubItems4() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Workflows</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Workflows">
        <div className="absolute inset-[13.54%_7.29%_13.54%_10.42%]" data-name="Weak">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.75 17.5">
            <path clipRule="evenodd" d={svgPaths.p1dbfc100} fill="var(--fill-0, var(--color-icon-tertiary))" fillRule="evenodd" id="Weak" />
          </svg>
        </div>
        <div className="absolute inset-[36.71%_0]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6.37868">
            <g id="Default">
              <path d={svgPaths.pa116a00} fill="var(--fill-0, var(--color-icon-primary))" />
              <path d={svgPaths.p7e01800} fill="var(--fill-0, var(--color-icon-primary))" />
              <path d={svgPaths.p9666b00} fill="var(--fill-0, var(--color-icon-primary))" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[8.33%_20.83%_8.33%_37.5%]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 20">
            <g id="Medium">
              <path d={svgPaths.p3dfcb940} fill="var(--fill-0, var(--color-icon-secondary))" />
              <path d={svgPaths.p2f12100} fill="var(--fill-0, var(--color-icon-secondary))" />
            </g>
          </svg>
        </div>
      </div>
      <Content6 />
    </div>
  );
}

function SubItems5() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Analytics</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon / Analytics">
        <div className="absolute bottom-[12.5%] left-[12.5%] right-3/4 top-[54.17%]" data-name="Weak">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 8">
            <path d={svgPaths.p2edaca00} fill="var(--fill-0, var(--color-icon-tertiary))" id="Weak" />
          </svg>
        </div>
        <div className="absolute inset-[45.83%_33.33%_12.5%_54.17%]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 10">
            <path d={svgPaths.p255fee40} fill="var(--fill-0, var(--color-icon-secondary))" id="Medium" />
          </svg>
        </div>
        <div className="absolute bottom-[12.5%] left-[33.33%] right-[12.5%] top-1/4" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 15">
            <g id="Default">
              <path d={svgPaths.p1812200} fill="var(--fill-0, var(--color-icon-primary))" />
              <path d={svgPaths.pfe13100} fill="var(--fill-0, var(--color-icon-primary))" />
            </g>
          </svg>
        </div>
      </div>
      <Content7 />
    </div>
  );
}

function SubItems6() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function Content8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Content">
      <p className="flex-[1_0_0] font-['Inter:SemiBold',sans-serif] font-semibold leading-[18px] min-w-px not-italic overflow-hidden relative text-[var(--color-text-secondary)] text-[12px] text-center text-ellipsis">Report</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-w-px relative z-[2]" data-name="Container">
      <div className="relative shrink-0 size-[24px]" data-name="Icon /  Reports">
        <div className="absolute h-[21.5px] left-[3.25px] top-[1.25px] w-[17.5px]" data-name="Default">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 21.5">
            <g id="Default">
              <path clipRule="evenodd" d={svgPaths.p4581a00} fill="var(--fill-0, var(--color-icon-primary))" fillRule="evenodd" />
              <path d={svgPaths.p23e50600} fill="var(--fill-0, var(--color-icon-primary))" />
              <path d={svgPaths.pce57cf0} fill="var(--fill-0, var(--color-icon-primary))" />
            </g>
          </svg>
        </div>
        <div className="absolute h-[11.75px] left-[6.25px] top-[7.5px] w-[10.5px]" data-name="Medium">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 11.75">
            <g id="Medium">
              <path clipRule="evenodd" d={svgPaths.p38635680} fill="var(--fill-0, var(--color-icon-secondary))" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p20243ff2} fill="var(--fill-0, var(--color-icon-secondary))" fillRule="evenodd" />
              <path d={svgPaths.p26e9ca00} fill="var(--fill-0, var(--color-icon-secondary))" />
              <path d={svgPaths.p6c95400} fill="var(--fill-0, var(--color-icon-secondary))" />
            </g>
          </svg>
        </div>
      </div>
      <Content8 />
    </div>
  );
}

function SubItems7() {
  return <div className="absolute bottom-0 left-0 top-0 w-[120px] z-[1]" data-name="Sub Items" />;
}

function NavItems() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 z-[1]" data-name="Nav Items">
      <div className="bg-[var(--color-bg-tertiary)] content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Indicator1 />
        <Container5 />
        <SubItems />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container6 />
        <SubItems1 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container7 />
        <SubItems2 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container8 />
        <SubItems3 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container9 />
        <SubItems4 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container10 />
        <SubItems5 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container11 />
        <SubItems6 />
      </div>
      <div className="content-stretch flex isolate items-center justify-center min-h-[70px] px-[8px] py-[4px] relative rounded-[8px] shrink-0 w-[104px]" data-name=".Nav item">
        <Container12 />
        <SubItems7 />
      </div>
    </div>
  );
}

function NavGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-center min-h-px relative" data-name="Nav Group">
      <div className="content-stretch flex items-start min-h-[70px] relative rounded-[8px] shrink-0 w-[104px] z-[2]" data-name=".Switcher">
        <div aria-hidden="true" className="absolute border-2 border-[var(--color-border-primary)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Container4 />
      </div>
      <NavItems />
    </div>
  );
}

function NavGroups() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px px-[16px] relative" data-name="Nav Groups">
      <NavGroup />
    </div>
  );
}

function Cisco() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.583px]" data-name="cisco">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.5827 20.0001">
        <g id="cisco">
          <path d={svgPaths.p2614f700} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector" />
          <path d={svgPaths.p1c785300} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_2" />
          <path d={svgPaths.p2982ab00} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_3" />
          <path d={svgPaths.p12fbd700} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_4" />
          <path d={svgPaths.pf160900} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_5" />
          <path d={svgPaths.p2c229540} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_6" />
          <path d={svgPaths.p2b68e100} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_7" />
          <path d={svgPaths.p18a55af0} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_8" />
          <path d={svgPaths.p358739c0} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_9" />
          <path d={svgPaths.p28381700} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_10" />
          <path d={svgPaths.p25147200} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_11" />
          <path d={svgPaths.p11665980} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_12" />
          <path d={svgPaths.p36126e80} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_13" />
          <path d={svgPaths.p36009b50} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0" data-name="Logo">
      <Cisco />
    </div>
  );
}

function ProductName() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Product Name">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[var(--color-bg-secondary)] text-[19px] whitespace-nowrap">
        <p className="leading-[18px]">Catalyst SD-WAN</p>
      </div>
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[6px] relative shrink-0" data-name="Logo container">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Header logotype">
        <Logo />
        <ProductName />
      </div>
    </div>
  );
}

function LeftSideBlocks() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="left side blocks">
      <LogoContainer />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[12.5%_8.46%_8.54%_8.33%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.97 18.9505">
        <g id="Group 164110">
          <path d={svgPaths.p2a10f400} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector" />
          <path d={svgPaths.p6e68940} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_2" />
          <path d={svgPaths.p29494780} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_3" />
          <path d={svgPaths.p3ce67c00} fill="var(--fill-0, var(--color-bg-secondary))" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Toggle() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="toggle">
      <Group />
    </div>
  );
}

function HeaderDivider() {
  return (
    <div className="bg-[var(--color-bg-secondary)] h-[24px] relative shrink-0 w-px" data-name="Header / Divider">
      <div className="size-full" />
    </div>
  );
}

function OutlineIcons() {
  return (
    <div className="content-stretch flex items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Outline Icons">
      <div className="relative shrink-0 size-[24px]" data-name="User">
        <div className="absolute inset-[7.81%_7.42%_10.94%_7.42%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4379 19.5001">
            <path clipRule="evenodd" d={svgPaths.pa7743d0} fill="var(--fill-0, var(--color-bg-secondary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start justify-center leading-[0] not-italic pb-[4px] relative shrink-0 text-[var(--color-bg-secondary)] text-[14px] whitespace-nowrap" data-name="Text">
      <div className="flex flex-col font-['Inter:SemiBold',sans-serif] font-semibold justify-center mb-[-4px] relative shrink-0">
        <p className="leading-[20px]">Alexander</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center mb-[-4px] relative shrink-0">
        <p className="leading-[20px]">Business Corp, Inc</p>
      </div>
    </div>
  );
}

function Caret3() {
  return (
    <div className="content-stretch flex items-center justify-end px-[8px] py-[10px] relative shrink-0" data-name="Caret">
      <div className="relative shrink-0 size-[16px]" data-name="DropdownCaretDown">
        <div className="absolute inset-[36.72%_22.66%_30.47%_22.66%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 5.25">
            <path clipRule="evenodd" d={svgPaths.p2a9a0100} fill="var(--fill-0, var(--color-bg-secondary))" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAndCaret() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center relative shrink-0" data-name="Text and caret">
      <Text25 />
      <Caret3 />
    </div>
  );
}

function RightSideBlocks() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0" data-name="right side blocks">
      <div className="content-stretch flex items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Header icon">
        <div className="relative shrink-0 size-[24px]" data-name="Cloud">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector">
            <div className="absolute inset-[-10%_-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 18">
                <path d={svgPaths.p22185f00} id="Vector" stroke="var(--stroke-0, var(--color-bg-secondary))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Header icon">
        <div className="relative shrink-0 size-[24px]" data-name="CheckCircle">
          <div className="absolute inset-[7.81%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.25 20.25">
              <g id="Vector">
                <path d={svgPaths.p2f60c380} fill="var(--fill-0, var(--color-bg-secondary))" />
                <path clipRule="evenodd" d={svgPaths.p11fe1580} fill="var(--fill-0, var(--color-bg-secondary))" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Header icon">
        <div className="relative shrink-0 size-[24px]" data-name="Question">
          <div className="absolute inset-[7.81%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.25 20.25">
              <g id="Vector">
                <path d={svgPaths.p2d46780} fill="var(--fill-0, var(--color-bg-secondary))" />
                <path d={svgPaths.p26053f00} fill="var(--fill-0, var(--color-bg-secondary))" />
                <path clipRule="evenodd" d={svgPaths.p2533dd80} fill="var(--fill-0, var(--color-bg-secondary))" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Sub-variants">
        <Toggle />
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0" data-name="Header icon">
        <div className="relative shrink-0 size-[24px]" data-name="Bell">
          <div className="absolute inset-[7.81%_11.34%_4.69%_11.34%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5572 21.0002">
              <path clipRule="evenodd" d={svgPaths.p2ecf0eb0} fill="var(--fill-0, var(--color-bg-secondary))" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="relative shrink-0 size-[7px]" data-name="Dot">
          <div className="absolute inset-[-28.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <circle cx="5.5" cy="5.5" fill="var(--fill-0, var(--color-brand-red))" id="Dot" r="4.5" stroke="var(--stroke-0, white)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start py-[6px] relative shrink-0" data-name="Header divider">
        <HeaderDivider />
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center relative rounded-[8px] shrink-0" data-name="Header switcher">
        <OutlineIcons />
        <TextAndCaret />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="bg-[var(--color-bg-secondary)] relative size-full" data-name="4. Log - OMP statistics">
      <PageContent />
      <div className="absolute content-stretch flex flex-col items-start left-0 top-[56px]" data-name="SD-WAN Navigation Menu">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[136px]" data-name="SD-WAN Navigation Menu">
          <div className="bg-[var(--color-bg-secondary)] content-stretch flex flex-col h-[919px] items-start pb-[24px] pt-[16px] relative shrink-0 w-full" data-name="Navigation menu">
            <NavGroups />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex items-start left-0 top-0 w-[1920px]" data-name="Headers (SD-WAN)">
        <div className="flex-[1_0_0] min-w-px relative" data-name="Header">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeader} />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">
              <LeftSideBlocks />
              <RightSideBlocks />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[var(--color-text-tertiary)] h-[165px] left-[1176px] opacity-0 top-[361px] w-[33px]" />
      <div className="absolute bg-[var(--color-text-tertiary)] h-[34px] left-[1154px] opacity-0 top-[944px] w-[33px]" />
    </div>
  );
}

/**
 * Login is currently disabled (backend ``DISABLE_AUTH=true``). The first call
 * to ``/api/auth/me`` causes the backend to auto-issue a session cookie, so
 * the user lands directly on the Dashboard. We still render a brief loading
 * state during that round-trip so child components can rely on the session
 * being established before they fire authenticated requests.
 *
 * The ``LoginScreen`` and password-gate plumbing remain in the codebase
 * (just not mounted) so flipping ``DISABLE_AUTH`` back to ``false`` is a
 * one-line change.
 */
function AuthGate() {
  const { status } = useAuth();
  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b1220] text-slate-400 text-sm">
        Loading…
      </div>
    );
  }
  return (
    <>
      <Dashboard />
      {/* <AIAssistant /> — temporarily hidden; re-enable when LLM backend is reachable */}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
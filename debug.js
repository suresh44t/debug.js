/*!
 * debug.js
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = DebugJS || function() {
  this.v = '201810112145';

  this.DEFAULT_OPTIONS = {
    visible: false,
    keyAssign: {
      key: 113,
      shift: undefined,
      ctrl: undefined,
      alt: undefined,
      meta: undefined
    },
    popupOnError: {
      scriptError: true,
      loadError: true,
      errorLog: true
    },
    lines: 18,
    bufsize: 300,
    width: 533,
    zoom: 1,
    position: 'se',
    adjPosX: 20,
    adjPosY: 20,
    fontSize: 12,
    fontFamily: 'Consolas, monospace',
    fontColor: '#fff',
    logColorV: '#99bcc8',
    logColorD: '#ccc',
    logColorI: '#9ef',
    logColorW: '#eee000',
    logColorE: '#f88',
    logColorS: '#fff',
    clockColor: '#8f0',
    timerColor: '#9ef',
    timerColorExpr: '#fcc',
    sysInfoColor: '#ddd',
    btnColor: '#6cf',
    btnHoverColor: '#8ef',
    promptColor: '#0cf',
    promptColorE: '#f45',
    background: 'rgba(0,0,0,0.65)',
    border: 'solid 1px #888',
    borderRadius: '0',
    opacity: '1',
    showLineNums: true,
    showTimeStamp: true,
    resizable: true,
    togglableShowHide: true,
    useClock: true,
    useClearButton: true,
    useSuspendLogButton: true,
    usePinButton: true,
    useWinCtrlButton: true,
    useStopWatch: true,
    useWindowSizeInfo: true,
    useMouseStatusInfo: true,
    useKeyStatusInfo: true,
    useLed: true,
    useMsgDisplay: true,
    msgDisplayPos: 'right',
    msgDisplayBackground: 'rgba(0,0,0,0.2)',
    useScreenMeasure: true,
    useSystemInfo: true,
    useHtmlSrc: true,
    useElementInfo: true,
    useTools: true,
    useJsEditor: true,
    useLogFilter: true,
    useCommandLine: true,
    cmdHistoryMax: 100,
    timerLineColor: '#0cf',
    disableAllCommands: false,
    disableAllFeatures: false,
    mode: '',
    lockCode: null,
    target: null
  };
  this.DFLT_ELM_ID = '_debug_';
  this.id = null;
  this.bodyEl = null;
  this.bodyCursor = '';
  this.styleEl = null;
  this.win = null;
  this.winBody = null;
  this.headPanel = null;
  this.infoPanel = null;
  this.clockLabel = null;
  this.clockUpdIntHCnt = 0;
  this.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
  this.measBtn = null;
  this.measBox = null;
  this.sysInfoBtn = null;
  this.sysInfoPanel = null;
  this.htmlSrcBtn = null;
  this.htmlSrcPanel = null;
  this.htmlSrcHeaderPanel = null;
  this.htmlSrcUpdInpLbl = null;
  this.htmlSrcUpdInpLbl2 = null;
  this.htmlSrcUpdBtn = null;
  this.htmlSrcUpdateInput = null;
  this.htmlSrcBodyPanel = null;
  this.htmlSrcUpdateInterval = 0;
  this.htmlSrcUpdateTimerId = 0;
  this.elmInfoBtn = null;
  this.elmInfoPanel = null;
  this.elmInfoHeaderPanel = null;
  this.elmPrevBtn = null;
  this.elmTitle = null;
  this.elmNextBtn = null;
  this.elmSelectBtn = null;
  this.elmHighlightBtn = null;
  this.elmUpdateBtn = null;
  this.elmCapBtn = null;
  this.elmDelBtn = null;
  this.elmUpdateInput = null;
  this.elmNumPanel = null;
  this.elmInfoBodyPanel = null;
  this.elmInfoStatus = DebugJS.ELMINFO_ST_SELECT | DebugJS.ELMINFO_ST_HIGHLIGHT;
  this.elmUpdateInterval = 0;
  this.elmUpdateTimerId = 0;
  this.elmInfoShowHideStatus = {text: false, allStyles: false, elBorder: false, htmlSrc: false};
  this.targetElm = null;
  this.toolsBtn = null;
  this.toolsPanel = null;
  this.toolsHeaderPanel = null;
  this.toolsBodyPanel = null;
  this.timerBtn = null;
  this.timerBasePanel = null;
  this.timerClockSubPanel = null;
  this.timerClockLabel = null;
  this.timerClockSSS = false;
  this.clockSSSbtn = null;
  this.timerStopWatchCuSubPanel = null;
  this.timerStopWatchCuLabel = null;
  this.timerStopWatchCdSubPanel = null;
  this.timerStopWatchCdLabel = null;
  this.timerStopWatchCdInpSubPanel = null;
  this.timerStopWatchCdInput = null;
  this.timerTimeUpTime = 0;
  this.timerSwTimeCd = 0;
  this.timerSwTimeCdContinue = false;
  this.timerStartStopBtnCu = null;
  this.timerSplitBtnCu = null;
  this.timerStartStopBtnCd = null;
  this.timerSplitBtnCd = null;
  this.timer0CntBtnCd1 = null;
  this.timer0CntBtnCd2 = null;
  this.timerStartStopBtnCdInp = null;
  this.txtChkBtn = null;
  this.txtChkPanel = null;
  this.txtChkTxt = null;
  this.txtChkFontSizeRange = null;
  this.txtChkFontSizeInput = null;
  this.txtChkFontSizeUnitInput = null;
  this.txtChkFontWeightRange = null;
  this.txtChkFontWeightLabel = null;
  this.txtChkInputFgRGB = null;
  this.txtChkRangeFgR = null;
  this.txtChkRangeFgG = null;
  this.txtChkRangeFgB = null;
  this.txtChkLabelFgR = null;
  this.txtChkLabelFgG = null;
  this.txtChkLabelFgB = null;
  this.txtChkInputBgRGB = null;
  this.txtChkRangeBgR = null;
  this.txtChkRangeBgG = null;
  this.txtChkRangeBgB = null;
  this.txtChkLabelBgR = null;
  this.txtChkLabelBgG = null;
  this.txtChkLabelBgB = null;
  this.txtChkTargetEl = null;
  this.txtChkItalic = false;
  this.fileVwrBtn = null;
  this.fileVwrPanel = null;
  this.fileInput = null;
  this.fileVwrLabelB64 = null;
  this.fileVwrRadioB64 = null;
  this.fileVwrLabelBin = null;
  this.fileVwrRadioBin = null;
  this.fileReloadBtn = null;
  this.fileClrBtn = null;
  this.fileVwrFooter = null;
  this.fileLoadProgressBar = null;
  this.fileLoadProgress = null;
  this.fileLoadCancelBtn = null;
  this.fileLoadFormat = DebugJS.FILE_LOAD_FMT_B64;
  this.filePreviewWrapper = null;
  this.filePreview = null;
  this.fileVwrDtUrlWrp = null;
  this.fileVwrDtUrlScheme = null;
  this.fileVwrDtTxtArea = null;
  this.fileVwrDecMode = 'b64';
  this.fileVwrDecModeBtn = null;
  this.fileVwrDataSrcType = null;
  this.fileVwrFile = null;
  this.fileVwrDataSrc = null;
  this.fileVwrByteArray = null;
  this.fileVwrBinViewOpt = {mode: 'hex', addr: true, space: true, ascii: true},
  this.fileVwrSysCb = null;
  this.fileReader = null;
  this.jsBtn = null;
  this.jsPanel = null;
  this.jsEditor = null;
  this.jsBuf = '';
  this.htmlPrevBtn = null;
  this.htmlPrevBasePanel = null;
  this.htmlPrevPrevPanel = null;
  this.htmlPrevEditorPanel = null;
  this.htmlPrevEditor = null;
  this.htmlPrevBuf = '';
  this.batBtn = null;
  this.batBasePanel = null;
  this.batEditorPanel = null;
  this.batTextEditor = null;
  this.batRunBtn = null;
  this.batStopBtn = null;
  this.batResumeBtn = null;
  this.batStartTxt = null;
  this.batEndTxt = null;
  this.batArgTxt = null;
  this.batCurPc = null;
  this.batTotalLine = null;
  this.batNestLv = null;
  this.swBtnPanel = null;
  this.swLabel = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.swElapsedTimeDisp = DebugJS.TIME_RST_STR;
  this.clearBtn = null;
  this.wdBtn = null;
  this.suspendLogBtn = null;
  this.preserveLogBtn = null;
  this.pinBtn = null;
  this.winCtrlBtnPanel = null;
  this.closeBtn = null;
  this.mousePosLabel = null;
  this.mousePos = {x: '-', y: '-'};
  this.mouseClickLabel = null;
  this.mouseClick0 = DebugJS.COLOR_INACTIVE;
  this.mouseClick1 = DebugJS.COLOR_INACTIVE;
  this.mouseClick2 = DebugJS.COLOR_INACTIVE;
  this.winSizeLabel = null;
  this.clientSizeLabel = null;
  this.bodySizeLabel = null;
  this.pixelRatioLabel = null;
  this.scrollPosLabel = null;
  this.scrollPosX = 0;
  this.scrollPosY = 0;
  this.keyDownLabel = null;
  this.keyPressLabel = null;
  this.keyUpLabel = null;
  this.keyDownCode = DebugJS.KEY_ST_DFLT;
  this.keyPressCode = DebugJS.KEY_ST_DFLT;
  this.keyUpCode = DebugJS.KEY_ST_DFLT;
  this.ledPanel = null;
  this.led = 0;
  this.msgLabel = null;
  this.msgString = '';
  this.mainPanel = null;
  this.overlayBasePanel = null;
  this.overlayPanels = [];
  this.logHeaderPanel = null;
  this.fltrBtnAll = null;
  this.fltrBtnStd = null;
  this.fltrBtnVrb = null;
  this.fltrBtnDbg = null;
  this.fltrBtnInf = null;
  this.fltrBtnWrn = null;
  this.fltrBtnErr = null;
  this.fltrInputLabel = null;
  this.fltrInput = null;
  this.fltrText = '';
  this.fltrCase = false;
  this.fltrCaseBtn = null;
  this.fltrTxtHtml = true;
  this.fltrTxtHtmlBtn = null;
  this.logPanel = null;
  this.logPanelHeightAdjust = '';
  this.cmdPanel = null;
  this.cmdLine = null;
  this.fromCmdLine = false;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = this.DEFAULT_OPTIONS.cmdHistoryMax;
  this.cmdHistoryIdx = this.CMD_HISTORY_MAX;
  this.cmdTmp = '';
  this.cmdEchoFlg = true;
  this.cmdDelayData = {tmid: 0, cmd: null};
  this.timers = {};
  this.initWidth = 0;
  this.initHeight = 0;
  this.orgSizePos = {w: 0, h: 0, t: 0, l: 0};
  this.expandModeOrg = {w: 0, h: 0, t: 0, l: 0};
  this.winExpandHeight = DebugJS.DBGWIN_EXPAND_C_H * this.DEFAULT_OPTIONS.zoom;
  this.winExpandCnt = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.prevOffsetTop = 0;
  this.prevOffsetLeft = 0;
  this.savedFunc = null;
  this.computedFontSize = this.DEFAULT_OPTIONS.fontSize;
  this.computedWidth = this.DEFAULT_OPTIONS.width;
  this.computedMinW = DebugJS.DBGWIN_MIN_W;
  this.computedMinH = DebugJS.DBGWIN_MIN_H;
  this.featStack = [];
  this.featStackBak = [];
  this.status = 0;
  this.uiStatus = 0;
  this.toolStatus = 0;
  this.toolTimerMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
  this.sizeStatus = 0;
  this.logFilter = DebugJS.LOG_FILTER_ALL;
  this.toolsActiveFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
  this.msgBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.INT_CMD_TBL = [
    {cmd: 'alias', fn: this.cmdAlias, desc: 'Define or display aliases', usage: 'alias [name=[\'command\']]'},
    {cmd: 'base64', fn: this.cmdBase64, desc: 'Encodes/Decodes Base64', usage: 'base64 [-e|-d] str'},
    {cmd: 'bat', fn: this.cmdBat, desc: 'Operate BAT Script', usage: 'bat run [-s s] [-e e] [-arg arg]|pause|stop|list|status|pc|symbols|clear|exec b64-encoded-bat|set key val'},
    {cmd: 'bin', fn: this.cmdBin, desc: 'Convert a number to binary', usage: 'bin num digit'},
    {cmd: 'bsb64', fn: this.cmdBSB64, desc: 'Encodes/Decodes BSB64(Bit Shifted Base64) reversible encryption string', usage: 'bsb64 -e|-d -i "&lt;str&gt;" [-n &lt;n&gt[L|R]]'},
    {cmd: 'call', fn: this.cmdCall, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'close', fn: this.cmdClose, desc: 'Close a function', usage: 'close [measure|sys|html|dom|js|tool|ext]'},
    {cmd: 'clock', fn: this.cmdClock, desc: 'Open clock mode'},
    {cmd: 'cls', fn: this.cmdCls, desc: 'Clear log message', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'condwait', fn: this.cmdCondWait, desc: 'Suspends processing of batch file until condition key is set', usage: 'condwait set -key key | pause [-timeout ms] | init'},
    {cmd: 'dbgwin', fn: this.cmdDbgWin, desc: 'Control the debug window', usage: 'dbgwin show|hide|pos|size|opacity|status|lock'},
    {cmd: 'date', fn: this.cmdDate, desc: 'Convert ms <--> Date-Time', usage: 'date [ms|YYYY/MM/DD HH:MI:SS.sss]'},
    {cmd: 'delay', fn: this.cmdDelay, desc: 'Delay command execution', usage: 'delay [-c] ms|YYYYMMDDTHHMISS command'},
    {cmd: 'echo', fn: this.cmdEcho, desc: 'Display the ARGs on the log window'},
    {cmd: 'elements', fn: this.cmdElements, desc: 'Count elements by #id / .className / tagName', usage: 'elements [#id|.className|tagName]'},
    {cmd: 'event', fn: this.cmdEvent, desc: 'Manipulate an event', usage: 'event create|set|dispatch|clear type|prop value'},
    {cmd: 'exit', fn: this.cmdExit, desc: 'Close the debug window and clear all status', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'goto', fn: this.cmdGoto, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'help', fn: this.cmdHelp, desc: 'Displays available command list', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'hex', fn: this.cmdHex, desc: 'Convert a number to hexadecimal', usage: 'hex num digit'},
    {cmd: 'history', fn: this.cmdHistory, desc: 'Displays command history', usage: 'history [-c] [-d offset]', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'http', fn: this.cmdHttp, desc: 'Send an HTTP request', usage: 'http [method] url [--user user:pass] [data]'},
    {cmd: 'input', fn: this.cmdInput, desc: 'Input a value into an element', usage: 'input text #id "data" [-speed speed(ms)] [-start seqStartPos] [-end seqEndPos]'},
    {cmd: 'js', fn: this.cmdJs, desc: 'Operate JavaScript code in JS Editor', usage: 'js exec'},
    {cmd: 'json', fn: this.cmdJson, desc: 'Parse one-line JSON', usage: 'json [-l&lt;n&gt;] [-p] one-line-json'},
    {cmd: 'jump', fn: this.cmdJump, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'keypress', fn: this.cmdKeyPress, desc: 'Dispatch a key event to active element', usage: 'keypress keycode [-shift] [-ctrl] [-alt] [-meta]'},
    {cmd: 'keys', fn: this.cmdKeys, desc: 'Displays all enumerable property keys of an object', usage: 'keys object'},
    {cmd: 'laptime', fn: this.cmdLaptime, desc: 'Lap time test'},
    {cmd: 'led', fn: this.cmdLed, desc: 'Set a bit pattern to the indicator', usage: 'led bit-pattern'},
    {cmd: 'log', fn: this.cmdLog, desc: 'Manipulate log output', usage: 'log bufsize|dump|filter|html|load|preserve|suspend|lv'},
    {cmd: 'msg', fn: this.cmdMsg, desc: 'Set a string to the message display', usage: 'msg message'},
    {cmd: 'nexttime', fn: this.cmdNextTime, desc: 'Returns next time from given args', usage: 'nexttime T0000|T1200|...|1d2h3m4s|ms'},
    {cmd: 'now', fn: this.cmdNow, desc: 'Returns the number of milliseconds elapsed since Jan 1, 1970 00:00:00 UTC'},
    {cmd: 'open', fn: this.cmdOpen, desc: 'Launch a function', usage: 'open [measure|sys|html|dom|js|tool|ext] [timer|text|file|html|bat]|[idx] [clock|cu|cd]|[b64|bin]'},
    {cmd: 'p', fn: this.cmdP, desc: 'Print JavaScript Objects', usage: 'p [-l&lt;n&gt;] object'},
    {cmd: 'pause', fn: this.cmdPause, desc: 'Suspends processing of batch file', usage: 'pause [-key key [-timeout ms]|-s]'},
    {cmd: 'pin', fn: this.cmdPin, desc: 'Fix the window in its position', usage: 'pin on|off'},
    {cmd: 'point', fn: this.cmdPoint, desc: 'Show the pointer to the specified coordinate', usage: 'point [+|-]x [+|-]y|click|cclick|rclick|dblclick|contextmenu|mousedown|mouseup|keydown|keypress|keyup|focus|blur|change|show|hide|getprop|setprop|verify|init|#id|.class [idx]|tagName [idx]|center|mouse|move|drag|text|selectoption|value|scroll|hint|cursor src [w] [h]'},
    {cmd: 'prop', fn: this.cmdProp, desc: 'Displays a property value', usage: 'prop property-name'},
    {cmd: 'props', fn: this.cmdProps, desc: 'Displays property list', usage: 'props [-reset]'},
    {cmd: 'random', fn: this.cmdRandom, desc: 'Generate a rondom number/string', usage: 'random [-d|-s] [min] [max]'},
    {cmd: 'resume', fn: this.cmdResume, desc: 'Resume a suspended batch process', usage: 'resume [-key key]'},
    {cmd: 'return', fn: this.cmdReturn, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'rgb', fn: this.cmdRGB, desc: 'Convert RGB color values between HEX and DEC', usage: 'rgb values (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {cmd: 'rot', fn: this.cmdROT, desc: 'Encodes/Decodes ROTx', usage: 'rot 5|13|47 -e|-d -i "&lt;str&gt;" [-n &lt;n&gt]'},
    {cmd: 'scrollto', fn: this.cmdScrollTo, desc: 'Set scroll position', usage: '\nscrollto log top|px|bottom [+|-]px(x)|left|center|right|current\nscrollto window [+|-]px(y)|top|middle|bottom|current [-speed speed(ms)] [-step step(px)]'},
    {cmd: 'select', fn: this.cmdSelect, desc: 'Select an option of select element', usage: 'select selectors get|set text|value val'},
    {cmd: 'set', fn: this.cmdSet, desc: 'Set a property value', usage: 'set property-name value'},
    {cmd: 'setattr', fn: this.cmdSetAttr, desc: 'Set the value of an attribute on the specified element', usage: 'setattr selector [idx] name value'},
    {cmd: 'sleep', fn: this.cmdSleep, desc: 'Causes the currently executing thread to sleep', usage: 'sleep ms'},
    {cmd: 'stopwatch', fn: this.cmdStopwatch, desc: 'Manipulate the stopwatch', usage: 'stopwatch [sw0|sw1|sw2] start|stop|reset|split|end|val'},
    {cmd: 'test', fn: this.cmdTest, desc: 'Manage unit test', usage: 'test init|set|count|result|last|status|verify got-val method expected-val|fin'},
    {cmd: 'time', fn: this.cmdTime, desc: 'Time duration calculator', usage: 'time ms|-t1 ms|"datestr" -t2 ms|"datestr"'},
    {cmd: 'timer', fn: this.cmdTimer, desc: 'Manipulate the timer', usage: 'time start|split|stop|list [timer-name]'},
    {cmd: 'unalias', fn: this.cmdUnAlias, desc: 'Remove each NAME from the list of defined aliases', usage: 'unalias [-a] name [name ...]'},
    {cmd: 'unicode', fn: this.cmdUnicode, desc: 'Displays unicode code point / Decodes unicode string', usage: 'unicode [-e|-d] str|codePoint(s)'},
    {cmd: 'uri', fn: this.cmdUri, desc: 'Encodes/Decodes a URI component', usage: 'uri [-e|-d] str'},
    {cmd: 'utf8', fn: this.cmdUtf8, desc: 'Dump UTF-8 byte sequence', usage: 'utf8 "str"'},
    {cmd: 'v', fn: this.cmdV, desc: 'Displays version info', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'vals', fn: this.cmdVals, desc: 'Displays variable list'},
    {cmd: 'watchdog', fn: this.cmdWatchdog, desc: 'Start/Stop watchdog timer', usage: 'watchdog [start|stop] [time(ms)]'},
    {cmd: 'win', fn: this.cmdWin, desc: 'Set the debugger window size/pos', usage: 'win min|normal|expand|full|center|restore|reset', attr: DebugJS.CMD_ATTR_DYNAMIC | DebugJS.CMD_ATTR_NO_KIOSK},
    {cmd: 'zoom', fn: this.cmdZoom, desc: 'Zoom the debugger window', usage: 'zoom ratio', attr: DebugJS.CMD_ATTR_DYNAMIC},
    {cmd: 'wait', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'nop', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN}
  ];
  this.CMD_TBL = [];
  this.EXT_CMD_TBL = [];
  this.CMD_ALIAS = {b64: 'base64'};
  this.CMDVALS = {};
  this.opt = null;
  this.errStatus = DebugJS.ERR_ST_NONE;
  this.PROPS_RESTRICTION = {
    batcont: /^on$|^off$/,
    batstop: /^[^|][a-z|]+[^|]$/,
    esc: /^enable$|^disable$/,
    dumplimit: /^[0-9]+$/,
    dumpvallen: /^[0-9]+$/,
    prevlimit: /^[0-9]+$/,
    hexdumplimit: /^[0-9]+$/,
    hexdumplastrows: /^[0-9]+$/,
    radix: /^[^|][a-z|]+[^|]$/,
    pointspeed: /^[0-9]+$/,
    pointstep: /^[0-9]+$/,
    scrollspeed: /^[0-9]+$/,
    scrollstep: /^[0-9]+$/,
    textinputspeed: /^[0-9\-]+$/,
    textinputstep: /^[0-9\-]+$/,
    testvallimit: /^[0-9\-]+$/,
    wait: /^[0-9]+$/,
    timer: /.*/,
    wdt: /^[0-9]+$/,
    mousemovesim: /^true$|^false$/,
    consolelog: /^native$|^me$/
  };
  this.PROPS_DFLT_VALS = {
    batcont: 'off',
    batstop: 'error',
    esc: 'enable',
    dumplimit: 1000,
    dumpvallen: 4096,
    prevlimit: 5 * 1024 * 1024,
    hexdumplimit: 1048576,
    hexdumplastrows: 16,
    radix: 'bin|dec|hex',
    pointspeed: DebugJS.point.move.speed,
    pointstep: DebugJS.point.move.step,
    scrollspeed: DebugJS.scrollWinTo.data.speed,
    scrollstep: DebugJS.scrollWinTo.data.step,
    textinputspeed: 30,
    textinputstep: 1,
    testvallimit: 4096,
    wait: 500,
    timer: '00:03:00.000',
    wdt: 500,
    mousemovesim: 'false',
    consolelog: 'native'
  };
  this.PROPS_CB = {
    batcont: this.setPropBatContCb,
    timer: this.setPropTimerCb,
    consolelog: this.setPropConsoleLogCb
  };
  this.props = {};
  this.extBtn = null;
  this.extBtnLabel = 'EXT';
  this.extPanel = null;
  this.extHeaderPanel = null;
  this.extBodyPanel = null;
  this.extActivePanel = null;
  this.extPanels = [];
  this.extActPnlIdx = -1;
  this.evtListener = {
    'batstart': [],
    'batstop': [],
    'ctrlc': [],
    'error': [],
    'fileloaded': [],
    'watchdog': []
  };
  this.unlockCode = null;
  this.setupDefaultOptions();
  DebugJS.deepCopy(this.PROPS_DFLT_VALS, this.props);
};
DebugJS.MAX_SAFE_INT = 0x1FFFFFFFFFFFFF;
DebugJS.DFLT_UNIT = 32;
DebugJS.INIT_CAUSE_ZOOM = 1;
DebugJS.ST_INITIALIZED = 1;
DebugJS.ST_MEASURE = 1 << 2;
DebugJS.ST_MEASURING = 1 << 3;
DebugJS.ST_SYS_INFO = 1 << 4;
DebugJS.ST_ELM_INSPECTING = 1 << 5;
DebugJS.ST_ELM_EDIT = 1 << 6;
DebugJS.ST_TOOLS = 1 << 7;
DebugJS.ST_JS = 1 << 8;
DebugJS.ST_HTML_SRC = 1 << 9;
DebugJS.ST_LOG_SUSPENDING = 1 << 10;
DebugJS.ST_LOG_PRESERVED = 1 << 11;
DebugJS.ST_STOPWATCH_RUNNING = 1 << 12;
DebugJS.ST_STOPWATCH_LAPTIME = 1 << 13;
DebugJS.ST_WD = 1 << 14;
DebugJS.ST_EXT_PANEL = 1 << 15;
DebugJS.ST_BAT_RUNNING = 1 << 16;
DebugJS.ST_BAT_PAUSE = 1 << 17;
DebugJS.ST_BAT_PAUSE_CMD = 1 << 18;
DebugJS.ST_BAT_PAUSE_CMD_KEY = 1 << 19;
DebugJS.ST_BAT_CONT = 1 << 20;
DebugJS.ST_BAT_BREAK = 1 << 21;
DebugJS.UI_ST_VISIBLE = 1;
DebugJS.UI_ST_DYNAMIC = 1 << 1;
DebugJS.UI_ST_SHOW_CLOCK = 1 << 2;
DebugJS.UI_ST_DRAGGABLE = 1 << 3;
DebugJS.UI_ST_DRAGGING = 1 << 4;
DebugJS.UI_ST_RESIZABLE = 1 << 5;
DebugJS.UI_ST_RESIZING = 1 << 6;
DebugJS.UI_ST_RESIZING_N = 1 << 7;
DebugJS.UI_ST_RESIZING_E = 1 << 8;
DebugJS.UI_ST_RESIZING_S = 1 << 9;
DebugJS.UI_ST_RESIZING_W = 1 << 10;
DebugJS.UI_ST_RESIZING_ALL = DebugJS.UI_ST_RESIZING | DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_E | DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_W;
DebugJS.UI_ST_POS_AUTO_ADJUST = 1 << 11;
DebugJS.UI_ST_NEED_TO_SCROLL = 1 << 12;
DebugJS.UI_ST_PROTECTED = 1 << 13;
DebugJS.TOOL_ST_SW_CU_RUNNING = 1;
DebugJS.TOOL_ST_SW_CU_END = 1 << 1;
DebugJS.TOOL_ST_SW_CD_RUNNING = 1 << 2;
DebugJS.TOOL_ST_SW_CD_RST = 1 << 3;
DebugJS.TOOL_ST_SW_CD_EXPIRED = 1 << 4;
DebugJS.TOOL_ST_SW_CD_END = 1 << 5;
DebugJS.TOOL_TIMER_MODE_CLOCK = 0;
DebugJS.TOOL_TIMER_MODE_SW_CU = 1;
DebugJS.TOOL_TIMER_MODE_SW_CD = 2;
DebugJS.TOOL_TIMER_BTN_COLOR = '#eee';
DebugJS.LOG_FILTER_LOG = 0x1;
DebugJS.LOG_FILTER_VRB = 0x2;
DebugJS.LOG_FILTER_DBG = 0x4;
DebugJS.LOG_FILTER_INF = 0x8;
DebugJS.LOG_FILTER_WRN = 0x10;
DebugJS.LOG_FILTER_ERR = 0x20;
DebugJS.LOG_FILTER_ALL = DebugJS.LOG_FILTER_LOG | DebugJS.LOG_FILTER_DBG | DebugJS.LOG_FILTER_INF | DebugJS.LOG_FILTER_WRN | DebugJS.LOG_FILTER_ERR;
DebugJS.LOG_TYPE_LOG = 0x1;
DebugJS.LOG_TYPE_VRB = 0x2;
DebugJS.LOG_TYPE_DBG = 0x4;
DebugJS.LOG_TYPE_INF = 0x8;
DebugJS.LOG_TYPE_WRN = 0x10;
DebugJS.LOG_TYPE_ERR = 0x20;
DebugJS.LOG_TYPE_SYS = 0x40;
DebugJS.LOG_TYPE_MLT = 0x80;
DebugJS.LOG_TYPE_RES = 0x100;
DebugJS.LOG_TYPE_ERES = 0x200;
DebugJS.ELMINFO_ST_SELECT = 0x1;
DebugJS.ELMINFO_ST_HIGHLIGHT = 0x2;
DebugJS.ERR_ST_NONE = 0;
DebugJS.ERR_ST_SCRIPT = 0x1;
DebugJS.ERR_ST_LOAD = 0x2;
DebugJS.ERR_ST_LOG = 0x4;
DebugJS.TOOLS_FNC_TIMER = 0x1;
DebugJS.TOOLS_FNC_TEXT = 0x2;
DebugJS.TOOLS_FNC_HTML = 0x4;
DebugJS.TOOLS_FNC_FILE = 0x8;
DebugJS.TOOLS_FNC_BAT = 0x10;
DebugJS.TOOLS_DFLT_ACTIVE_FNC = DebugJS.TOOLS_FNC_TIMER;
DebugJS.FILE_LOAD_FMT_BIN = 0;
DebugJS.FILE_LOAD_FMT_B64 = 1;
DebugJS.CMD_ATTR_SYSTEM = 0x1;
DebugJS.CMD_ATTR_HIDDEN = 0x2;
DebugJS.CMD_ATTR_DYNAMIC = 0x4;
DebugJS.CMD_ATTR_NO_KIOSK = 0x8;
DebugJS.CMD_ATTR_DISABLED = 0x10;
DebugJS.CMD_ECHO_MAX_LEN = 256;
DebugJS.DBGWIN_MIN_W = 292;
DebugJS.DBGWIN_MIN_H = 155;
DebugJS.DBGWIN_EXPAND_C_W = 960;
DebugJS.DBGWIN_EXPAND_C_H = 640;
DebugJS.DBGWIN_EXPAND_W = 850;
DebugJS.DBGWIN_EXPAND_H = 580;
DebugJS.SIZE_ST_MIN = -1;
DebugJS.SIZE_ST_NORMAL = 0;
DebugJS.SIZE_ST_EXPANDED = 1;
DebugJS.SIZE_ST_EXPANDED_C = 2;
DebugJS.SIZE_ST_FULL_W = 4;
DebugJS.SIZE_ST_FULL_H = 5;
DebugJS.SIZE_ST_FULL_WH = 6;
DebugJS.DBGWIN_POS_NONE = -9999;
DebugJS.WIN_SHADOW = 10;
DebugJS.WIN_BORDER = 1;
DebugJS.WIN_PADDING = 1;
DebugJS.WIN_ADJUST = ((DebugJS.WIN_BORDER * 2) + (DebugJS.WIN_PADDING * 2));
DebugJS.OVERLAY_PANEL_HEIGHT = 77;
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.SBPNL_COLOR_ACTIVE = '#6cf';
DebugJS.SBPNL_COLOR_INACTIVE = '#ccc';
DebugJS.COLOR_INACTIVE = '#999';
DebugJS.MEASURE_BTN_COLOR = '#6cf';
DebugJS.SYS_BTN_COLOR = '#3cf';
DebugJS.HTML_BTN_COLOR = '#8f8';
DebugJS.DOM_BTN_COLOR = '#f63';
DebugJS.JS_BTN_COLOR = '#6df';
DebugJS.TOOLS_BTN_COLOR = '#ff0';
DebugJS.EXT_BTN_COLOR = '#f8f';
DebugJS.LOG_PRESERVE_BTN_COLOR = '#0f0';
DebugJS.LOG_SUSPEND_BTN_COLOR = '#f00';
DebugJS.PIN_BTN_COLOR = '#fa0';
DebugJS.FLT_BTN_COLOR = '#eee';
DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.KEY_ST_DFLT = '- <span style="color:' + DebugJS.COLOR_INACTIVE + '">SCAM</span>';
DebugJS.WDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
DebugJS.WDAYS_COLOR = ['f74', 'fff', 'fff', 'fff', 'fff', 'fff', '8fd'];
DebugJS.UPDATE_INTERVAL_H = 21;
DebugJS.UPDATE_INTERVAL_L = 500;
DebugJS.DFLT_TIMER_NAME = 'timer0';
DebugJS.TIMER_NAME_SW_CU = 'sw1';
DebugJS.TIMER_NAME_SW_CD = 'sw2';
DebugJS.LED_BIT = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80];
DebugJS.LED_COLOR = ['#4cf', '#0ff', '#6f6', '#ee0', '#f80', '#f66', '#f0f', '#ddd'];
DebugJS.LED_COLOR_INACTIVE = '#777';
DebugJS.ITEM_NAME_COLOR = '#cff';
DebugJS.KEYWORD_COLOR = '#0ff';
DebugJS.RND_TYPE_NUM = '-d';
DebugJS.RND_TYPE_STR = '-s';
DebugJS.ELM_HL_CLASS_SUFFIX = '-elhl';
DebugJS.EXPANDBTN = '&gt;';
DebugJS.CLOSEBTN = 'v';
DebugJS.OMIT_LAST = 0;
DebugJS.OMIT_MID = 1;
DebugJS.OMIT_FIRST = 2;
DebugJS.DISP_BIN_DIGITS_THRESHOLD = 5;
DebugJS.TIME_RST_STR = '00:00:00.000';
DebugJS.EXIT_SUCCESS = 0;
DebugJS.EXIT_FAILURE = 1;
DebugJS.EXIT_SIG = 128;
DebugJS.EXIT_CLEARED = -1;
DebugJS.SIGINT = 2;
DebugJS.SIGTERM = 15;
DebugJS.BAT_TKN_JS = '!__JS__!';
DebugJS.BAT_TKN_TXT = '!__TEXT__!';
DebugJS.BAT_TKN_IF = 'IF';
DebugJS.BAT_TKN_ELIF = 'ELSE IF';
DebugJS.BAT_TKN_ELSE = 'ELSE';
DebugJS.BAT_TKN_LOOP = 'LOOP';
DebugJS.BAT_TKN_BREAK = 'BREAK';
DebugJS.BAT_TKN_CONTINUE = 'CONTINUE';
DebugJS.BAT_TKN_BLOCK_START = '(';
DebugJS.BAT_TKN_BLOCK_END = ')';
DebugJS.BAT_TKN_LABEL = ':';
DebugJS.BAT_TKN_FNC = 'FUNCTION';
DebugJS.BAT_TKN_RET = 'return';
DebugJS.RE_ELIF = new RegExp('^\\' + DebugJS.BAT_TKN_BLOCK_END + '\\s?' + DebugJS.BAT_TKN_ELIF + '\\s?\\' + DebugJS.BAT_TKN_BLOCK_START + '?.+');
DebugJS.RE_ELSE = DebugJS.BAT_TKN_BLOCK_END + DebugJS.BAT_TKN_ELSE + DebugJS.BAT_TKN_BLOCK_START;
DebugJS.CHR_LED = '&#x25CF;';
DebugJS.CHR_DELTA = '&#x22BF;';
DebugJS.CHR_CRLF = '&#x21b5;';
DebugJS.CHR_LF = '&#x2193;';
DebugJS.CHR_CR = '&#x2190;';
DebugJS.CHR_CRLF_S = '<span style="color:#0cf" class="dbg-cc">' + DebugJS.CHR_CRLF + '</span>';
DebugJS.CHR_LF_S = '<span style="color:#0f0" class="dbg-cc">' + DebugJS.CHR_LF + '</span>';
DebugJS.CHR_CR_S = '<span style="color:#f00" class="dbg-cc">' + DebugJS.CHR_CR + '</span>';
DebugJS.EOF = '<span style="color:#08f" class="dbg-cc">[EOF]</span>';
DebugJS.CHR_WIN_FULL = '&#x25A1;';
DebugJS.CHR_WIN_RST = '&#x2750;';
DebugJS.LOG_HEAD = '[LOG]';
DebugJS.LOG_BOUNDARY_BUF = '-- ORIGINAL LOG BUFFER --';
DebugJS.SYS_INFO_FULL_OVERLAY = true;
DebugJS.HTML_SRC_FULL_OVERLAY = true;
DebugJS.HTML_SRC_EXPAND_H = false;
DebugJS.ELM_INFO_FULL_OVERLAY = false;
DebugJS.LS_AVAILABLE = false;
DebugJS.SS_AVAILABLE = false;
DebugJS.G_EL_AVAILABLE = false;
DebugJS.JS_SNIPPET = [
'dbg.time.s();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ndbg.time.e();\n\'done\';\n',
'',
'',
' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
'// Logging performance check\nvar i = 0;\nvar n = 1000;\ndbg.msg(\'loop = \' + n);\ndbg.time.s(\'total\');\ntest();\nfunction test() {\n  dbg.time.s();\n  dbg.time.e();\n  i++;\n  if (i == n) {\n    dbg.msg.clear();\n    dbg.time.e(\'total\');\n  } else {\n    if (i % 100 == 0) {\n      dbg.msg(\'i = \' + i + \' / \' + dbg.time.check(\'total\'));\n    }\n    setTimeout(test, 0);\n  }\n}\n'
];
DebugJS.HTML_SNIPPET = [
'<div style="width:100%; height:100%; background:#fff; color:#000;">\n\n</div>\n',
'<img src="data:image/jpeg;base64,">',
'<button onclick=""></button>',
'<video src="" controls autoplay>',
'<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title></title>\n<link rel="stylesheet" href="style.css" />\n<script src="script.js"></script>\n<style>\n</style>\n<script>\n</script>\n</head>\n<body>\nhello\n</body>\n</html>\n'
];
DebugJS.FEATURES = [
  'togglableShowHide',
  'useClock',
  'useClearButton',
  'useSuspendLogButton',
  'usePinButton',
  'useWinCtrlButton',
  'useStopWatch',
  'useWindowSizeInfo',
  'useMouseStatusInfo',
  'useKeyStatusInfo',
  'useLed',
  'useMsgDisplay',
  'useScreenMeasure',
  'useSystemInfo',
  'useElementInfo',
  'useHtmlSrc',
  'useTools',
  'useJsEditor',
  'useLogFilter',
  'useCommandLine'
];
DebugJS.f_ = function() {};
DebugJS.prototype = {
  init: function(opt, restoreOpt) {
    if (!DebugJS.ENABLE) return false;
    var ctx = DebugJS.ctx;
    var keepStatus = ((restoreOpt && (restoreOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) ? true : false);
    ctx.bodyEl = document.body;
    ctx.finalizeFeatures(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.win != null) {
        for (var i = ctx.win.childNodes.length - 1; i >= 0; i--) {
          ctx.win.removeChild(ctx.win.childNodes[i]);
        }
        ctx.bodyEl.removeChild(ctx.win);
        ctx.timerBasePanel = null;
        ctx.win = null;
      }
    }
    if (!keepStatus) {
      var preserveStatus = DebugJS.ST_LOG_PRESERVED | DebugJS.ST_STOPWATCH_RUNNING | DebugJS.ST_WD | DebugJS.ST_BAT_RUNNING | DebugJS.ST_BAT_PAUSE | DebugJS.ST_BAT_PAUSE_CMD | DebugJS.ST_BAT_PAUSE_CMD_KEY;
      ctx.status &= preserveStatus;
      ctx.uiStatus = 0;
    }
    if ((ctx.opt == null) || ((opt != null) && (!keepStatus)) || (opt === undefined)) {
      ctx.setupDefaultOptions();
    }
    if (opt) {
      for (var key1 in opt) {
        for (var key2 in ctx.opt) {
          if (key1 == key2) {
            ctx.opt[key1] = opt[key1];
            if ((key1 == 'disableAllFeatures') && (opt[key1])) {
              ctx.disableAllFeatures(ctx);
            }
            break;
          }
        }
      }
    }
    if (ctx.msgBuf.getSize() != ctx.opt.bufsize) {
      if (!(ctx.status & DebugJS.ST_LOG_PRESERVED) ||
          ((ctx.status & DebugJS.ST_LOG_PRESERVED) &&
           (ctx.msgBuf.getSize() < ctx.opt.bufsize))) {
        ctx.initBuf(ctx, ctx.opt.bufsize);
      }
    }
    if (ctx.opt.mode == 'noui') {
      ctx.removeEventHandlers(ctx);
      ctx.init = DebugJS.f_;
      DebugJS.init = DebugJS.f_;
      ctx.status |= DebugJS.ST_INITIALIZED;
      return false;
    }
    if (!ctx.bodyEl) return false;
    ctx.initUi(ctx, restoreOpt);
    ctx.initCommandTable(ctx);
    ctx.status |= DebugJS.ST_INITIALIZED;
    ctx.initExtension(ctx);
    ctx.printLogs();
    ctx.showDbgWinOnError(ctx);
    return true;
  },

  initUi: function(ctx, restoreOpt) {
    ctx.initUiStatus(ctx, ctx.opt, restoreOpt);
    ctx.computedMinW = DebugJS.DBGWIN_MIN_W * ctx.opt.zoom;
    ctx.computedMinH = DebugJS.DBGWIN_MIN_H * ctx.opt.zoom;
    ctx.computedFontSize = Math.round(ctx.opt.fontSize * ctx.opt.zoom);
    ctx.computedWidth = Math.round(ctx.opt.width * ctx.opt.zoom);
    if (ctx.opt.target == null) {
      ctx.id = ctx.DFLT_ELM_ID;
      ctx.win = document.createElement('div');
      ctx.win.id = ctx.id;
      ctx.win.style.position = 'fixed';
      ctx.win.style.zIndex = 0x7fffffff;
      ctx.win.style.width = ctx.computedWidth + 'px';
      ctx.win.style.boxShadow = DebugJS.WIN_SHADOW + 'px ' + DebugJS.WIN_SHADOW + 'px 10px rgba(0,0,0,.3)';
      ctx.bodyEl.appendChild(ctx.win);
      if (ctx.opt.mode == 'kiosk') {
        ctx.setupKioskMode(ctx);
      }
    } else {
      ctx.id = ctx.opt.target;
      ctx.win = document.getElementById(ctx.id);
      ctx.win.style.position = 'relative';
    }
    ctx.win.style.display = 'block';
    ctx.win.style.padding = DebugJS.WIN_BORDER + 'px';
    ctx.win.style.lineHeight = '1em';
    ctx.win.style.boxSizing = 'content-box';
    ctx.win.style.border = ctx.opt.border;
    ctx.win.style.borderRadius = ctx.opt.borderRadius;
    ctx.win.style.background = ctx.opt.background;
    ctx.win.style.color = ctx.opt.fontColor;
    ctx.win.style.fontSize = ctx.computedFontSize + 'px',
    ctx.win.style.opacity = ctx.opt.opacity;
    ctx.createPanels(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) {
      ctx.initResize(ctx);
    }
    ctx.initStyles(ctx);
    ctx.initDbgWin(ctx);
    ctx.setupEventHandler(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.opt.mode == 'kiosk') {
        ctx.focusCmdLine();
      } else {
        ctx.setupMove(ctx);
        ctx.initWidth = ctx.win.offsetWidth;
        ctx.initHeight = ctx.win.offsetHeight;
        ctx.resetDbgWinSizePos();
        if ((restoreOpt != null) && (restoreOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) {
          ctx.focusCmdLine();
        }
        if (!(ctx.uiStatus & DebugJS.UI_ST_VISIBLE) || (ctx.uiStatus & DebugJS.UI_ST_PROTECTED)) {
          ctx.win.style.display = 'none';
        }
      }
    } else {
      ctx.initWidth = ctx.win.offsetWidth - DebugJS.WIN_ADJUST;
      ctx.initHeight = ctx.win.offsetHeight - DebugJS.WIN_ADJUST;
    }
    ctx.winExpandHeight = DebugJS.DBGWIN_EXPAND_C_H * ctx.opt.zoom;
    if ((restoreOpt != null) && (restoreOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) {
      ctx.resetStylesOnZoom(ctx);
      ctx.reopenFeatures(ctx);
      ctx.restoreDbgWinSize(ctx, restoreOpt.sizeStatus);
    }
  },

  initStyles: function(ctx) {
    var opt = ctx.opt;
    var fontSize = ctx.computedFontSize + 'px';
    var ltsp = '0';
    if (DebugJS.getBrowserType().name == 'Firefox') {
      ltsp = '-0.35px';
    }
    var styles = {};
    styles['#' + ctx.id] = {
      'text-align': 'left !important',
      'letter-spacing': ltsp + ' !important'
    };
    styles['#' + ctx.id + ' *'] = {
      'box-sizing': 'content-box !important',
      'color': opt.fontColor,
      'font-size': fontSize + ' !important',
      'font-family': opt.fontFamily + ' !important'
    };
    styles['#' + ctx.id + ' td'] = {
      'width': 'initial',
      'padding': '0 3px',
      'border': 'initial !important',
      'background': 'initial !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['#' + ctx.id + ' pre'] = {
      'width': 'auto !important',
      'height': 'auto !important',
      'margin': '0 !important',
      'line-height': '1em !important',
      'border': 'initial !important',
      'background': 'initial !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important',
      'white-space': 'pre-wrap !important',
      'word-break': 'break-all !important',
      'overflow': 'visible !important'
    };
    styles['.' + ctx.id + '-btn'] = {
      'color': opt.btnColor + ' !important',
    };
    styles['.' + ctx.id + '-btn:hover'] = {
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };
    styles['.' + ctx.id + '-btn-disabled'] = {
      'opacity': 0.5
    };
    styles['.' + ctx.id + '-btn-disabled:hover'] = {
      'text-shadow': 'none',
      'cursor': 'auto'
    };
    styles['.' + ctx.id + '-btn-red'] = {
      'color': '#a88 !important'
    };
    styles['.' + ctx.id + '-btn-wh'] = {
      'color': '#fff !important'
    };
    styles['.' + ctx.id + '-sys-info'] = {
      'display': 'inline-block',
      'margin-right': '10px',
      'color': opt.sysInfoColor + ' !important'
    };
    styles['.' + ctx.id + '-resize-corner'] = {
      'position': 'absolute',
      'width': '6px',
      'height': '6px',
      'background': 'rgba(0,0,0,0)'
    };
    styles['.' + ctx.id + '-resize-side'] = {
      'position': 'absolute',
      'background': 'rgba(0,0,0,0)'
    };
    styles['.' + ctx.id + '-overlay-base-panel'] = {
      'position': 'relative',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - 2px)',
      'height': DebugJS.OVERLAY_PANEL_HEIGHT + '%'
    };
    var overlayPanelBorder = 1;
    var overlayPanelPadding = 2;
    styles['.' + ctx.id + '-overlay-panel'] = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'height': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };
    styles['.' + ctx.id + '-overlay-panel pre'] = {
      'padding': '0 1px',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['.' + ctx.id + '-overlay-panel-full'] = {
      'position': 'absolute',
      'top': (ctx.computedFontSize + DebugJS.WIN_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WIN_SHADOW + DebugJS.WIN_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((ctx.computedFontSize + DebugJS.WIN_ADJUST) + DebugJS.WIN_SHADOW + ctx.computedFontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };
    styles['.' + ctx.id + '-sbpnl'] = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%'
    };
    styles['.' + ctx.id + '-sep'] = {
      'height': (ctx.computedFontSize * 0.5) + 'px'
    };
    styles['.' + ctx.id + '-na'] = {
      'color': '#ccc !important'
    };
    styles['.' + ctx.id + '-showhide-btn'] = {
      'color': '#0a0 !important',
      'font-size': fontSize + ' !important',
      'font-weight': 'bold'
    };
    styles['.' + ctx.id + '-showhide-btn:hover'] = {
      'cursor': 'pointer'
    };
    styles['.' + ctx.id + '-txt-text'] = {
      'border': 'none !important',
      'border-bottom': 'solid 1px #888 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'box-shadow': 'none !important',
      'background': 'transparent !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['.' + ctx.id + '-cmdtd'] = {
      'vertical-align': 'top !important',
      'white-space': 'nowrap !important'
    };
    styles['.' + ctx.id + '-txt-range'] = {
      'width': (256 * opt.zoom) + 'px',
      'height': (15 * opt.zoom) + 'px',
      'padding': '0 !important',
      'border': 'none !important',
      'outline': 'none !important',
      'box-shadow': 'none !important'
    };
    styles['.' + ctx.id + '-txt-tbl td'] = {
      'font-size': fontSize + ' !important',
      'line-height': '1em !important'
    };
    styles['.' + ctx.id + '-loading'] = {
      'opacity': '1.0 !important'
    };
    styles['#' + ctx.id + ' label'] = {
      'display': 'inline',
      'margin': '0',
      'line-height': '1em',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important',
      'font-weight': 'normal'
    };
    styles['#' + ctx.id + ' input[type="radio"]'] = {
      'margin': '0 3px',
      'width': 13 * opt.zoom + 'px',
      'height': 13 * opt.zoom + 'px'
    };
    styles['.' + ctx.id + '-editor'] = {
      'width': 'calc(100% - 6px) !important',
      'height': 'calc(100% - ' + (ctx.computedFontSize + 10) + 'px) !important',
      'margin': '2px 0 0 0 !important',
      'padding': '2px !important',
      'border': 'solid 1px #1883d7 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'background': 'transparent !important',
      'color': '#fff !important',
      'font-size': fontSize + ' !important',
      'overflow': 'auto !important',
      'resize': 'none !important'
    };
    styles['.' + ctx.id + '-txt-hl'] = {
      'background': 'rgba(192,192,192,0.5) !important'
    };
    styles['.' + ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX] = {
      'outline': 'solid 1px #f00 !important',
      'opacity': '0.7 !important'
    };
    styles['.' + ctx.id + '-timer-inp'] = {
      'width': '1.1em !important',
      'height': '1em !important',
      'border': 'none !important',
      'outline': 'none !important',
      'margin': '0 !important',
      'padding': '0 !important',
      'text-align': 'center !important',
      'vartical-align': 'middle !important',
      'background': 'transparent !important',
      'color': '#fff !important'
    };
    styles['.' + ctx.id + '-hint'] = {
      'position': 'fixed !important',
      'display': 'inline-block !important',
      'max-width': 'calc(100vw - 35px) !important',
      'max-height': 'calc(100vh - 35px) !important',
      'overflow': 'auto !important',
      'padding': '4px 8px !important',
      'box-sizing': 'content-box !important',
      'z-index': 0x7ffffffe + ' !important',
      'box-shadow': '8px 8px 10px rgba(0,0,0,.3) !important',
      'border-radius': '3px !important',
      'background': 'rgba(0,0,0,0.65) !important'
    };
    styles['.dbg-resbox.box'] = {
      'display': 'inline-block !important',
      'min-width': 'calc(100% - 18px) !important',
      'height': '1.5em',
      'margin-top': '4px !important',
    };
    styles['.dbg-resbox'] = {
      'padding': '5px !important',
      'color': '#fff !important',
      'font-size': fontSize + ' !important',
      'font-family': 'Consolas !important',
      'overflow': 'auto',
      'cursor': 'text !important',
      'resize': 'none !important'
    };
    styles['.dbg-resbox.ok'] = {
      'border': '1px solid #2c6cb8 !important',
      'background': 'linear-gradient(rgba(8,8,16,0.6),rgba(0,0,68,0.6)) !important',
    };
    styles['.dbg-resbox.err'] = {
      'border': '1px solid #c00 !important',
      'background': 'linear-gradient(rgba(16,8,8,0.6),rgba(68,0,0,0.6)) !important'
    };
    ctx.applyStyles(ctx, styles);
  },

  initBuf: function(ctx, newSize) {
    var buf = DebugJS.ctx.msgBuf.getAll();
    var oldSize = buf.length;
    if (oldSize == newSize) return;
    var i = ((oldSize > newSize) ? (oldSize - newSize) : 0);
    ctx.msgBuf = new DebugJS.RingBuffer(newSize);
    for (; i < oldSize; i++) {
      ctx.msgBuf.add(buf[i]);
    }
  },

  createResizeSideArea: function(cursor, state, width, height) {
    var ctx = DebugJS.ctx;
    var area = document.createElement('div');
    area.className = ctx.id + '-resize-side';
    area.style.width = width;
    area.style.height = height;
    area.style.cursor = cursor;
    area.onmousedown = function(e) {
      if (!(ctx.uiStatus & DebugJS.UI_ST_RESIZABLE)) return;
      ctx.startResize(ctx, e);
      ctx.uiStatus |= state;
      ctx.bodyCursor = ctx.bodyEl.style.cursor;
      ctx.bodyEl.style.cursor = cursor;
    };
    return area;
  },

  createResizeCornerArea: function(cursor, state) {
    var ctx = DebugJS.ctx;
    var area = document.createElement('div');
    area.className = ctx.id + '-resize-corner';
    area.style.cursor = cursor;
    area.onmousedown = function(e) {
      if (!(ctx.uiStatus & DebugJS.UI_ST_RESIZABLE)) return;
      ctx.startResize(ctx, e);
      ctx.uiStatus |= state;
      ctx.bodyCursor = ctx.bodyEl.style.cursor;
      ctx.bodyEl.style.cursor = cursor;
    };
    return area;
  },

  setupDefaultOptions: function() {
    this.opt = {};
    DebugJS.deepCopy(this.DEFAULT_OPTIONS, this.opt);
  },

  setupEventHandler: function(ctx) {
    if (!ctx.isAllFeaturesDisabled(ctx)) {
      window.addEventListener('keydown', ctx.keyHandler, true);
    }
    if ((ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ||
        (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) ||
        (ctx.opt.useMouseStatusInfo) ||
        (ctx.opt.useScreenMeasure)) {
      window.addEventListener('mousedown', ctx.onMouseDown, true);
      window.addEventListener('mousemove', ctx.onMouseMove, true);
      window.addEventListener('mouseup', ctx.onMouseUp, true);
      window.addEventListener('touchstart', ctx.onTouchStart, true);
      window.addEventListener('touchmove', ctx.onTouchMove, true);
      window.addEventListener('touchend', ctx.onTouchEnd, true);
    }
    if (ctx.opt.useWindowSizeInfo) {
      window.addEventListener('resize', ctx.onResize, true);
      ctx.onResize();
      window.addEventListener('scroll', ctx.onScroll, true);
      ctx.onScroll();
    }
    window.addEventListener('keydown', ctx.onKeyDown, true);
    window.addEventListener('keypress', ctx.onKeyPress, true);
    window.addEventListener('keyup', ctx.onKeyUp, true);
    if (ctx.opt.useKeyStatusInfo) {
      ctx.updateKeyDownLabel();
      ctx.updateKeyPressLabel();
      ctx.updateKeyUpLabel();
    }
  },

  removeEventHandlers: function(ctx) {
    window.removeEventListener('keydown', ctx.keyHandler, true);
    window.removeEventListener('mousedown', ctx.onMouseDown, true);
    window.removeEventListener('mousemove', ctx.onMouseMove, true);
    window.removeEventListener('mouseup', ctx.onMouseUp, true);
    window.removeEventListener('resize', ctx.onResize, true);
    window.removeEventListener('scroll', ctx.onScroll, true);
    window.removeEventListener('keydown', ctx.onKeyDown, true);
    window.removeEventListener('keypress', ctx.onKeyPress, true);
    window.removeEventListener('keyup', ctx.onKeyUp, true);
    window.removeEventListener('touchstart', ctx.onTouchStart, true);
    window.removeEventListener('touchmove', ctx.onTouchMove, true);
    window.removeEventListener('touchend', ctx.onTouchEnd, true);
  },

  initUiStatus: function(ctx, opt, restoreOpt) {
    if (ctx.opt.target == null) {
      ctx.uiStatus |= DebugJS.UI_ST_DYNAMIC;
      ctx.uiStatus |= DebugJS.UI_ST_DRAGGABLE;
      if ((ctx.opt.lockCode != null) && (!restoreOpt)) {
        ctx.uiStatus |= DebugJS.UI_ST_PROTECTED;
      }
    }
    if ((ctx.opt.visible) || (ctx.opt.target != null)) {
      ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    } else if (ctx.errStatus) {
      if (((ctx.opt.popupOnError.scriptError) && (ctx.errStatus & DebugJS.ERR_ST_SCRIPT)) ||
          ((ctx.opt.popupOnError.loadError) && (ctx.errStatus & DebugJS.ERR_ST_LOAD)) ||
          ((ctx.opt.popupOnError.errorLog) && (ctx.errStatus & DebugJS.ERR_ST_LOG))) {
        ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
        ctx.errStatus = DebugJS.ERR_ST_NONE;
      }
    }
    if (ctx.opt.resizable) ctx.uiStatus |= DebugJS.UI_ST_RESIZABLE;
    if (ctx.opt.useClock) ctx.uiStatus |= DebugJS.UI_ST_SHOW_CLOCK;
  },

  setupKioskMode: function(ctx) {
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    ctx.win.style.top = 0;
    ctx.win.style.left = 0;
    ctx.win.style.width = document.documentElement.clientWidth + 'px';
    ctx.win.style.height = document.documentElement.clientHeight + 'px';
    ctx.opt.togglableShowHide = false;
    ctx.opt.usePinButton = false;
    ctx.opt.useWinCtrlButton = false;
    ctx.opt.useScreenMeasure = false;
    ctx.opt.useHtmlSrc = false;
    ctx.opt.useElementInfo = false;
    ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZABLE;
  },

  disableAllFeatures: function(ctx) {
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      ctx.opt[DebugJS.FEATURES[i]] = false;
    }
  },

  isAllFeaturesDisabled: function(ctx) {
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      if (ctx.opt[DebugJS.FEATURES[i]]) return false;
    }
    return true;
  },

  createPanels: function(ctx) {
    var opt = ctx.opt;
    var fontSize = ctx.computedFontSize + 'px';

    ctx.winBody = document.createElement('div');
    ctx.win.appendChild(ctx.winBody);
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.winBody.style.cursor = 'default';
    }

    if (!ctx.isAllFeaturesDisabled(ctx)) {
      ctx.headPanel = document.createElement('div');
      ctx.headPanel.style.padding = '2px';
      ctx.winBody.appendChild(ctx.headPanel);

      ctx.infoPanel = document.createElement('div');
      ctx.infoPanel.style.padding = '0 2px 1px 2px';
      ctx.winBody.appendChild(ctx.infoPanel);
    }

    ctx.mainPanel = document.createElement('div');
    if (opt.useLogFilter) {
      ctx.mainPanel.style.height = (opt.lines + 1) + '.1em';
    } else {
      ctx.mainPanel.style.height = opt.lines + '.1em';
    }
    ctx.mainPanel.style.clear = 'both';
    ctx.winBody.appendChild(ctx.mainPanel);

    if (opt.useLogFilter) {
      ctx.logHeaderPanel = document.createElement('div');
      ctx.logHeaderPanel.style.position = 'relative';
      ctx.logHeaderPanel.style.height = fontSize;
      ctx.logHeaderPanel.style.marginBottom = '2px';
      ctx.mainPanel.appendChild(ctx.logHeaderPanel);
    }

    if (opt.useClearButton) {
      ctx.clearBtn = ctx.createBtn(ctx, '[CLR]', ctx.headPanel);
      ctx.clearBtn.onclick = ctx.onClr;
    }

    if (opt.useLogFilter) {
      ctx.createLogFilter(ctx);
    }

    if (opt.useLogFilter) {
      ctx.logPanelHeightAdjust = ' - 1em';
    } else {
      ctx.logPanelHeightAdjust = '';
    }
    ctx.logPanel = document.createElement('div');
    ctx.logPanel.style.width = '100%';
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
    ctx.logPanel.style.padding = '0';
    ctx.logPanel.style.overflow = 'auto';
    ctx.enableDnDFileLoad(ctx.logPanel, ctx.handleFileDropAuto);
    ctx.mainPanel.appendChild(ctx.logPanel);

    if (ctx.isAllFeaturesDisabled(ctx)) return;

    if (opt.useClock) {
      ctx.clockLabel = document.createElement('span');
      ctx.clockLabel.style.marginLeft = '2px';
      ctx.setStyle(ctx.clockLabel, 'color', opt.clockColor);
      ctx.setStyle(ctx.clockLabel, 'font-size', fontSize);
      ctx.headPanel.appendChild(ctx.clockLabel);
      ctx.setIntervalL(ctx);
    }

    if (opt.togglableShowHide) {
      ctx.closeBtn = ctx.createBtn(ctx, 'x', ctx.headPanel);
      ctx.closeBtn.style.float = 'right';
      ctx.closeBtn.style.position = 'relative';
      ctx.closeBtn.style.top = '-1px';
      ctx.closeBtn.style.marginRight = '2px';
      ctx.setStyle(ctx.closeBtn, 'color', '#888');
      ctx.setStyle(ctx.closeBtn, 'font-size', (18 * opt.zoom) + 'px');
      ctx.closeBtn.onmouseover = new Function('DebugJS.ctx.setStyle(this, \'color\', \'#d88\');');
      ctx.closeBtn.onmouseout = new Function('DebugJS.ctx.setStyle(this, \'color\', \'#888\');');
      ctx.closeBtn.onclick = DebugJS.hide;
    }

    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) &&
        (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) &&
        (opt.useWinCtrlButton)) {
      ctx.winCtrlBtnPanel = document.createElement('span');
      ctx.headPanel.appendChild(ctx.winCtrlBtnPanel);
    }

    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (opt.usePinButton)) {
      ctx.pinBtn = ctx.createHeaderBtn('pinBtn', 'P', 3, fontSize, ctx.toggleDraggable, 'uiStatus', 'UI_ST_DRAGGABLE', 'PIN_BTN_COLOR', true, 'Fix the window in its position');
    }

    if (opt.useSuspendLogButton) {
      ctx.suspendLogBtn = ctx.createHeaderBtn('suspendLogBtn', '/', 3, fontSize, ctx.toggleLogSuspend, 'status', 'ST_LOG_SUSPENDING', 'LOG_SUSPEND_BTN_COLOR', false, 'Suspend log');
    }

    if (DebugJS.LS_AVAILABLE) {
      ctx.preserveLogBtn = ctx.createHeaderBtn('preserveLogBtn', '*', 5, fontSize, ctx.toggleLogPreserve, 'status', 'ST_LOG_PRESERVED', 'LOG_PRESERVE_BTN_COLOR', false, 'Preserve log');
    }

    if (opt.useStopWatch) {
      ctx.swLabel = document.createElement('span');
      ctx.swLabel.style.float = 'right';
      ctx.swLabel.style.marginLeft = '3px';
      ctx.setStyle(ctx.swLabel, 'color', opt.fontColor);
      ctx.headPanel.appendChild(ctx.swLabel);

      ctx.swBtnPanel = document.createElement('span');
      ctx.swBtnPanel.style.float = 'right';
      ctx.swBtnPanel.style.marginLeft = '4px';
      ctx.headPanel.appendChild(ctx.swBtnPanel);
    }

    ctx.extBtn = ctx.createHeaderBtn('extBtn', ctx.extBtnLabel, 2, null, ctx.toggleExtPanel, 'status', 'ST_EXT_PANEL', 'EXT_BTN_COLOR', false);
    ctx.extBtn.style.display = 'none';

    if (opt.useTools) {
      ctx.toolsBtn = ctx.createHeaderBtn('toolsBtn', 'TOOL', 2, null, ctx.toggleTools, 'status', 'ST_TOOLS', 'TOOLS_BTN_COLOR', false);
    }
    if (opt.useJsEditor) {
      ctx.jsBtn = ctx.createHeaderBtn('jsBtn', 'JS', 2, null, ctx.toggleJs, 'status', 'ST_JS', 'JS_BTN_COLOR', false);
    }
    if (opt.useElementInfo) {
      ctx.elmInfoBtn = ctx.createHeaderBtn('elmInfoBtn', 'DOM', 3, null, ctx.toggleElmInfo, 'status', 'ST_ELM_INSPECTING', 'DOM_BTN_COLOR', false);
    }
    if (opt.useHtmlSrc) {
      ctx.htmlSrcBtn = ctx.createHeaderBtn('htmlSrcBtn', 'HTM', 3, null, ctx.toggleHtmlSrc, 'status', 'ST_HTML_SRC', 'HTML_BTN_COLOR', false);
    }
    if (opt.useSystemInfo) {
      ctx.sysInfoBtn = ctx.createHeaderBtn('sysInfoBtn', 'SYS', 3, null, ctx.toggleSystemInfo, 'status', 'ST_SYS_INFO', 'SYS_BTN_COLOR', false);
    }

    if (opt.useScreenMeasure) {
      var measBtn = document.createElement('span');
      measBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      measBtn.style.display = 'inline-block';
      measBtn.style.float = 'right';
      measBtn.style.marginTop = ((opt.zoom <= 1) ? 1 : (2 * opt.zoom)) + 'px';
      measBtn.style.marginLeft = '3px';
      measBtn.style.width = (10 * opt.zoom) + 'px';
      measBtn.style.height = (7 * opt.zoom) + 'px';
      measBtn.innerText = ' ';
      measBtn.onclick = ctx.toggleMeasure;
      measBtn.onmouseover = new Function('DebugJS.ctx.measBtn.style.borderColor=\'' + DebugJS.MEASURE_BTN_COLOR + '\';');
      measBtn.onmouseout = new Function('DebugJS.ctx.measBtn.style.borderColor=(DebugJS.ctx.status & DebugJS.ST_MEASURE) ? DebugJS.MEASURE_BTN_COLOR : DebugJS.COLOR_INACTIVE;');
      ctx.headPanel.appendChild(measBtn);
      ctx.measBtn = measBtn;
    }

    if (opt.useLed) {
      ctx.ledPanel = document.createElement('span');
      ctx.ledPanel.className = ctx.id + '-sys-info';
      ctx.ledPanel.style.float = 'right';
      ctx.ledPanel.style.marginRight = '4px';
      ctx.infoPanel.appendChild(ctx.ledPanel);
    }

    if (opt.useWindowSizeInfo) {
      ctx.winSizeLabel = ctx.createSysInfoLabel();
      ctx.clientSizeLabel = ctx.createSysInfoLabel();
      ctx.bodySizeLabel = ctx.createSysInfoLabel();
      ctx.pixelRatioLabel = ctx.createSysInfoLabel();
      ctx.scrollPosLabel = ctx.createSysInfoLabel();
    }

    if (opt.useMouseStatusInfo) {
      ctx.mousePosLabel = ctx.createSysInfoLabel();
      ctx.mouseClickLabel = ctx.createSysInfoLabel();
    }

    if ((opt.useWindowSizeInfo) || (opt.useMouseStatusInfo)) {
      ctx.infoPanel.appendChild(document.createElement('br'));
    }

    if (opt.useKeyStatusInfo) {
      ctx.keyDownLabel = ctx.createSysInfoLabel();
      ctx.keyPressLabel = ctx.createSysInfoLabel();
      ctx.keyUpLabel = ctx.createSysInfoLabel();
    }

    if (opt.useMsgDisplay) {
      var msgLabel = ctx.createSysInfoLabel();
      msgLabel.style.float = opt.msgDisplayPos;
      msgLabel.style.position = 'absolute';
      msgLabel.style.marginRight = '0';
      msgLabel.style.right = '5px';
      msgLabel.style.border = '0';
      msgLabel.style.padding = '0 1px';
      msgLabel.style.background = opt.msgDisplayBackground;
      ctx.setStyle(msgLabel, 'color', opt.fontColor);
      msgLabel.style.whiteSpace = 'pre-wrap';
      msgLabel.style.wordBreak = 'break-all';
      msgLabel.style.overflow = 'hidden';
      msgLabel.style.textOverflow = 'ellipsis';
      ctx.msgLabel = msgLabel;
    }

    if (opt.useCommandLine) {
      ctx.cmdPanel = document.createElement('div');
      ctx.cmdPanel.style.padding = DebugJS.CMD_LINE_PADDING + 'px';
      ctx.winBody.appendChild(ctx.cmdPanel);
      ctx.cmdPanel.innerHTML = '<span style="color:' + opt.promptColor + ' !important">$</span>';
      var cmdLine = document.createElement('input');
      ctx.setStyle(cmdLine, 'min-height', fontSize);
      ctx.setStyle(cmdLine, 'width', 'calc(100% - ' + fontSize + ')');
      ctx.setStyle(cmdLine, 'margin', '0 0 0 2px');
      ctx.setStyle(cmdLine, 'border', '0');
      ctx.setStyle(cmdLine, 'border-bottom', 'solid 1px #888');
      ctx.setStyle(cmdLine, 'border-radius', '0');
      ctx.setStyle(cmdLine, 'outline', 'none');
      ctx.setStyle(cmdLine, 'box-shadow', 'none');
      ctx.setStyle(cmdLine, 'padding', '1px');
      ctx.setStyle(cmdLine, 'background', 'transparent');
      ctx.setStyle(cmdLine, 'color', opt.fontColor);
      ctx.setStyle(cmdLine, 'font-size', fontSize);
      ctx.cmdPanel.appendChild(cmdLine);
      ctx.cmdLine = cmdLine;
      ctx.initHistory(ctx);
    }
  },

  initResize: function(ctx) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var resizeN = ctx.createResizeSideArea('ns-resize', DebugJS.UI_ST_RESIZING_N, '100%', '6px');
      resizeN.style.top = '-3px';
      resizeN.style.left = '0';
      ctx.win.appendChild(resizeN);
    }

    var resizeE = ctx.createResizeSideArea('ew-resize', DebugJS.UI_ST_RESIZING_E, '6px', '100%');
    resizeE.style.top = '0';
    resizeE.style.right = '-3px';
    ctx.win.appendChild(resizeE);

    var resizeS = ctx.createResizeSideArea('ns-resize', DebugJS.UI_ST_RESIZING_S, '100%', '6px');
    resizeS.style.bottom = '-3px';
    resizeS.style.left = '0';
    ctx.win.appendChild(resizeS);

    var resizeSE = ctx.createResizeCornerArea('nwse-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_E);
    resizeSE.style.bottom = '-3px';
    resizeSE.style.right = '-3px';
    ctx.win.appendChild(resizeSE);

    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var resizeW = ctx.createResizeSideArea('ew-resize', DebugJS.UI_ST_RESIZING_W, '6px', '100%');
      resizeW.style.top = '0';
      resizeW.style.left = '-3px';
      ctx.win.appendChild(resizeW);

      var resizeNW = ctx.createResizeCornerArea('nwse-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_W);
      resizeNW.style.top = '-3px';
      resizeNW.style.left = '-3px';
      ctx.win.appendChild(resizeNW);

      var resizeNE = ctx.createResizeCornerArea('nesw-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_E);
      resizeNE.style.top = '-3px';
      resizeNE.style.right = '-3px';
      ctx.win.appendChild(resizeNE);

      var resizeSW = ctx.createResizeCornerArea('nesw-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_W);
      resizeSW.style.bottom = '-3px';
      resizeSW.style.left = '-3px';
      ctx.win.appendChild(resizeSW);

      ctx.winBody.ondblclick = ctx.onDbgWinDblClick;
    }
  },

  initDbgWin: function(ctx) {
    var opt = ctx.opt;
    if (ctx.isAllFeaturesDisabled(ctx)) return;
    if (opt.useLogFilter) ctx.updateLogFilterBtns();
    if (ctx.uiStatus & DebugJS.UI_ST_SHOW_CLOCK) ctx.updateClockLabel();
    if (opt.useScreenMeasure) ctx.updateMeasBtn(ctx);
    if (opt.useSystemInfo) ctx.updateSysInfoBtn(ctx);
    if (opt.useElementInfo) ctx.updateElmInfoBtn(ctx);
    if (opt.useHtmlSrc) ctx.updateHtmlSrcBtn(ctx);
    if (opt.useJsEditor) ctx.updateJsBtn(ctx);
    if (opt.useTools) ctx.updateToolsBtn(ctx);
    if (ctx.extPanel) ctx.updateExtBtn(ctx);
    if (opt.useStopWatch) {
      ctx.updateSwBtnPanel(ctx);
      ctx.updateSwLabel();
    }
    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (opt.usePinButton)) {
      ctx.updatePinBtn(ctx);
    }
    if (ctx.preserveLogBtn) ctx.updatePreserveLogBtn(ctx);
    if (opt.useSuspendLogButton) ctx.updateSuspendLogBtn(ctx);
    if ((ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) && (opt.useWinCtrlButton)) {
      ctx.updateWinCtrlBtnPanel();
    }
    if (opt.useMouseStatusInfo) {
      ctx.updateMousePosLabel();
      ctx.updateMouseClickLabel();
    }
    if (opt.useWindowSizeInfo) {
      ctx.updateWindowSizeLabel();
      ctx.updateClientSizeLabel();
      ctx.updateBodySizeLabel();
      ctx.updateScrollPosLabel();
    }
    if (opt.useLed) ctx.updateLedPanel();
    if (opt.useMsgDisplay) ctx.updateMsgLabel();
  },

  createBtn: function(ctx, label, base) {
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.innerText = label;
    base.appendChild(btn);
    return btn;
  },

  createHeaderBtn: function(btnobj, label, marginLeft, fontSize, handler, status, state, activeColor, reverse, title) {
    var ctx = DebugJS.ctx;
    var btn = ctx.createBtn(ctx, label, ctx.headPanel);
    btn.style.float = 'right';
    btn.style.marginLeft = (marginLeft * ctx.opt.zoom) + 'px';
    if (fontSize) ctx.setStyle(btn, 'font-size', fontSize);
    btn.onclick = handler;
    ctx.setStyle(btn, 'color', DebugJS.COLOR_INACTIVE);
    btn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', DebugJS.' + activeColor + ');');
    if (reverse) {
      btn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', (DebugJS.ctx.' + status + ' & DebugJS.' + state + ') ? DebugJS.COLOR_INACTIVE : DebugJS.' + activeColor + ');');
    } else {
      btn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', (DebugJS.ctx.' + status + ' & DebugJS.' + state + ') ? DebugJS.' + activeColor + ' : DebugJS.COLOR_INACTIVE);');
    }
    if (title) btn.title = title;
    return btn;
  },

  createSysInfoLabel: function() {
    var el = document.createElement('span');
    el.className = DebugJS.ctx.id + '-sys-info';
    DebugJS.ctx.infoPanel.appendChild(el);
    return el;
  },

  createTextInput: function(width, textAlign, color, value, inputHandler) {
    var ctx = DebugJS.ctx;
    var txtInput = document.createElement('input');
    txtInput.className = ctx.id + '-txt-text';
    ctx.setStyle(txtInput, 'width', width);
    ctx.setStyle(txtInput, 'min-height', ctx.computedFontSize + 'px');
    ctx.setStyle(txtInput, 'margin', '0');
    ctx.setStyle(txtInput, 'padding', '0');
    ctx.setStyle(txtInput, 'color', color);
    if (textAlign) ctx.setStyle(txtInput, 'text-align', textAlign);
    txtInput.value = value;
    txtInput.oninput = inputHandler;
    return txtInput;
  },

  createLabel: function(text, base) {
    var label = document.createElement('span');
    label.innerText = text;
    base.appendChild(label);
    return label;
  },

  createLogFilter: function(ctx) {
    ctx.fltrBtnAll = ctx.createLogFilterBtn('ALL', 'fltrBtnAll', 'btnColor');
    ctx.fltrBtnStd = ctx.createLogFilterBtn('LOG', 'fltrBtnStd', 'fontColor');
    ctx.fltrBtnErr = ctx.createLogFilterBtn('ERR', 'fltrBtnErr', 'logColorE');
    ctx.fltrBtnWrn = ctx.createLogFilterBtn('WRN', 'fltrBtnWrn', 'logColorW');
    ctx.fltrBtnInf = ctx.createLogFilterBtn('INF', 'fltrBtnInf', 'logColorI');
    ctx.fltrBtnDbg = ctx.createLogFilterBtn('DBG', 'fltrBtnDbg', 'logColorD');
    ctx.fltrBtnVrb = ctx.createLogFilterBtn('VRB', 'fltrBtnVrb', 'logColorV');

    ctx.fltrInputLabel = document.createElement('span');
    ctx.fltrInputLabel.style.marginLeft = '4px';
    ctx.setStyle(ctx.fltrInputLabel, 'color', ctx.opt.sysInfoColor);
    ctx.fltrInputLabel.innerText = 'Filter:';
    ctx.logHeaderPanel.appendChild(ctx.fltrInputLabel);

    var filterW = 'calc(100% - 31em)';
    ctx.fltrInput = ctx.createTextInput(filterW, null, ctx.opt.sysInfoColor, ctx.fltrText, DebugJS.ctx.onchangeLogFilter);
    ctx.setStyle(ctx.fltrInput, 'position', 'relative');
    ctx.setStyle(ctx.fltrInput, 'top', '-2px');
    ctx.setStyle(ctx.fltrInput, 'margin-left', '2px');
    ctx.logHeaderPanel.appendChild(ctx.fltrInput);

    ctx.fltrCaseBtn = ctx.createBtn(ctx, 'Aa', ctx.logHeaderPanel);
    ctx.fltrCaseBtn.style.marginLeft = '2px';
    ctx.fltrCaseBtn.onclick = DebugJS.ctx.toggleFilterCase;
    ctx.setStyle(ctx.fltrCaseBtn, 'color', (DebugJS.ctx.fltrCase) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE);
    ctx.fltrCaseBtn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.fltrCaseBtn, \'color\', DebugJS.FLT_BTN_COLOR);');
    ctx.fltrCaseBtn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.fltrCaseBtn, \'color\', (DebugJS.ctx.fltrCase) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE);');

    ctx.fltrTxtHtmlBtn = ctx.createBtn(ctx, '</>', ctx.logHeaderPanel);
    ctx.fltrTxtHtmlBtn.style.marginLeft = '2px';
    ctx.fltrTxtHtmlBtn.onclick = DebugJS.ctx.toggleFilterTxtHtml;
    ctx.setStyle(ctx.fltrTxtHtmlBtn, 'color', (DebugJS.ctx.fltrTxtHtml) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE);
    ctx.fltrTxtHtmlBtn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.fltrTxtHtmlBtn, \'color\', DebugJS.FLT_BTN_COLOR);');
    ctx.fltrTxtHtmlBtn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.fltrTxtHtmlBtn, \'color\', (DebugJS.ctx.fltrTxtHtml) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE);');
  },

  setLogFilter: function(ctx, s, cs) {
    ctx.fltrInput.value = s;
    if (cs != undefined) {
      ctx.setFilterCase(ctx, cs);
    }
    ctx.onchangeLogFilter();
  },

  createLogFilterBtn: function(type, btnobj, color) {
    var ctx = DebugJS.ctx;
    var label = '[' + type + ']';
    var btn = ctx.createBtn(ctx, label, ctx.logHeaderPanel);
    btn.style.marginLeft = '2px';
    btn.onclick = new Function('DebugJS.ctx.toggleLogFilter(DebugJS.LOG_FILTER_' + type + ');');
    btn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', DebugJS.ctx.opt.' + color + ');');
    btn.onmouseout = ctx.updateLogFilterBtns;
    return btn;
  },

  initCommandTable: function(ctx) {
    ctx.CMD_TBL = [];
    for (var i = 0; i < ctx.INT_CMD_TBL.length; i++) {
      if (ctx.opt.disableAllCommands) {
        if (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_SYSTEM) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      } else {
        if (!(!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) &&
               (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_DYNAMIC)) &&
            (!((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) &&
             (ctx.opt.mode == 'kiosk') &&
             (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_NO_KIOSK)))) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      }
    }
  },

  resetStylesOnZoom: function(ctx) {
    var fontSize = ctx.computedFontSize + 'px';
    if (ctx.toolsPanel != null) {
      ctx.toolsHeaderPanel.style.height = fontSize;
      ctx.toolsBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    }
    if (ctx.fileVwrPanel != null) {
      ctx.setStyle(ctx.fileInput, 'width', 'calc(100% - ' + (ctx.computedFontSize * 12) + 'px)');
      ctx.setStyle(ctx.fileInput, 'min-height', (20 * ctx.opt.zoom) + 'px');
      ctx.setStyle(ctx.fileInput, 'font-size', fontSize);
      ctx.setStyle(ctx.filePreviewWrapper, 'height', 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)');
      ctx.setStyle(ctx.filePreviewWrapper, 'font-size', fontSize);
      ctx.setStyle(ctx.filePreview, 'font-size', fontSize);
      ctx.fileVwrFooter.style.height = (ctx.computedFontSize + 3) + 'px';
      ctx.fileLoadProgressBar.style.width = 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)';
      ctx.setStyle(ctx.fileLoadProgress, 'font-size', (ctx.computedFontSize * 0.8) + 'px');
    }
    if (ctx.extPanel != null) {
      ctx.extHeaderPanel.style.height = fontSize;
      ctx.extBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    }
  },

  reopenFeatures: function(ctx) {
    while (true) {
      var f = ctx.featStackBak.shift();
      if (f == undefined) {
        break;
      }
      ctx.openFeature(ctx, f, undefined, true);
    }
  },

  restoreDbgWinSize: function(ctx, sizeStatus) {
    if (sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.setWinSize('full');
    } else if (sizeStatus == DebugJS.SIZE_ST_EXPANDED_C) {
      ctx.setWinSize('center');
    } else if (sizeStatus == DebugJS.SIZE_ST_EXPANDED) {
      ctx._expandDbgWin(ctx);
    }
  },

  setWinPos: function(pos, dbgWinW, dbgWinH) {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var top, left;
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    if (clientW > window.outerWidth) {clientW = window.outerWidth;}
    if (clientH > window.outerHeight) {clientH = window.outerHeight;}
    switch (pos) {
      case 'se':
        top = (clientH - dbgWinH - opt.adjPosY) + 'px';
        left = (clientW - dbgWinW - opt.adjPosX) + 'px';
        break;
      case 'ne':
        top = opt.adjPosY + 'px';
        left = (clientW - dbgWinW - opt.adjPosX) + 'px';
        break;
      case 'c':
        top = ((clientH / 2) - (dbgWinH / 2)) + 'px';
        left = ((clientW / 2) - (dbgWinW / 2)) + 'px';
        break;
      case 'sw':
        top = (clientH - dbgWinH - opt.adjPosY) + 'px';
        left = opt.adjPosX + 'px';
        break;
      case 'n':
        top = opt.adjPosY + 'px';
        left = ((clientW / 2) - (dbgWinW / 2)) + 'px';
        break;
      case 'e':
        top = ((clientH / 2) - (dbgWinH / 2)) + 'px';
        left = (clientW - dbgWinW - opt.adjPosX) + 'px';
        break;
      case 's':
        top = (clientH - dbgWinH - opt.adjPosY) + 'px';
        left = ((clientW / 2) - (dbgWinW / 2)) + 'px';
        break;
      case 'w':
        top = ((clientH / 2) - (dbgWinH / 2)) + 'px';
        left = opt.adjPosX + 'px';
        break;
      default:
        top = opt.adjPosY + 'px';
        left = opt.adjPosX + 'px';
    }
    ctx.win.style.top = top;
    ctx.win.style.left = left;
  },

  updateClockLabel: function() {
    var ctx = DebugJS.ctx;
    var dt = DebugJS.getDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    ctx.clockLabel.innerText = t;
    if (ctx.uiStatus & DebugJS.UI_ST_SHOW_CLOCK) {
      setTimeout(ctx.updateClockLabel, ctx.clockUpdInt);
    }
  },

  updateWindowSizeLabel: function() {
    try {
      var ctx = DebugJS.ctx;
      var w = window.outerWidth;
      var h = window.outerHeight;
      ctx.winSizeLabel.innerText = 'WIN:w=' + w + ',h=' + h;
      if (ctx.status & DebugJS.ST_SYS_INFO) {
        document.getElementById(ctx.id + '-sys-win-w').innerText = w;
        document.getElementById(ctx.id + '-sys-win-h').innerText = h;
      }
    } catch (e) {}
  },

  updateClientSizeLabel: function() {
    var ctx = DebugJS.ctx;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    ctx.clientSizeLabel.innerText = 'CLI:w=' + w + ',h=' + h;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      document.getElementById(ctx.id + '-sys-cli-w').innerText = w;
      document.getElementById(ctx.id + '-sys-cli-h').innerText = h;
    }
  },

  updateBodySizeLabel: function() {
    var ctx = DebugJS.ctx;
    var w = this.bodyEl.clientWidth;
    var h = this.bodyEl.clientHeight;
    ctx.bodySizeLabel.innerText = 'BODY:w=' + w + ',h=' + h;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      document.getElementById(ctx.id + '-sys-body-w').innerText = w;
      document.getElementById(ctx.id + '-sys-body-h').innerText = h;
    }
    ctx.pixelRatioLabel.innerText = DebugJS.getWinZoomRatio();
  },

  updateScrollPosLabel: function() {
    this.scrollPosLabel.innerText = 'SCROLL:x=' + this.scrollPosX + ',y=' + this.scrollPosY;
  },

  updateMousePosLabel: function() {
    this.mousePosLabel.innerText = 'POS:x=' + this.mousePos.x + ',y=' + this.mousePos.y;
  },

  updateMouseClickLabel: function() {
    var s = '<span style="color:' + this.mouseClick0 + ' !important;margin-right:2px;">0</span>' +
            '<span style="color:' + this.mouseClick1 + ' !important;margin-right:2px;">1</span>' +
            '<span style="color:' + this.mouseClick2 + ' !important">2</span>';
    this.mouseClickLabel.innerHTML = 'CLICK:' + s;
  },

  updateKeyDownLabel: function() {
    this.keyDownLabel.innerHTML = 'Key Down:' + this.keyDownCode;
  },

  updateKeyPressLabel: function() {
    this.keyPressLabel.innerHTML = 'Press:' + this.keyPressCode;
  },

  updateKeyUpLabel: function() {
    this.keyUpLabel.innerHTML = 'Up:' + this.keyUpCode;
  },

  updateLedPanel: function() {
    if (DebugJS.ctx.ledPanel) {
      var SHADOW = 'text-shadow:0 0 5px;';
      var led = '';
      for (var i = 7; i >= 0; i--) {
        var color = (DebugJS.ctx.led & DebugJS.LED_BIT[i]) ? 'color:' + DebugJS.LED_COLOR[i] + ' !important;' + SHADOW : 'color:' + DebugJS.LED_COLOR_INACTIVE + ' !important;';
        var margin = (i == 0 ? '' : 'margin-right:2px');
        led += '<span style="' + color + margin + '">' + DebugJS.CHR_LED + '</span>';
      }
      DebugJS.ctx.ledPanel.innerHTML = led;
    }
  },

  updateMsgLabel: function() {
    var ctx = DebugJS.ctx;
    var s = ctx.msgString;
    if (ctx.msgLabel) {
      var html = '<pre>' + s + '</pre>';
      ctx.msgLabel.innerHTML = html;
      if (s == '') {
        ctx.msgLabel.style.opacity = 0;
      } else {
        ctx.msgLabel.style.opacity = 1;
      }
    }
  },

  updateMeasBtn: function(ctx) {
    ctx.measBtn.style.border = 'solid ' + ctx.opt.zoom + 'px ' + ((ctx.status & DebugJS.ST_MEASURE) ? DebugJS.MEASURE_BTN_COLOR : DebugJS.COLOR_INACTIVE);
  },

  updateSysInfoBtn: function(ctx) {
    ctx.updateBtnActive(ctx.sysInfoBtn, DebugJS.ST_SYS_INFO, DebugJS.SYS_BTN_COLOR);
  },

  updateElmInfoBtn: function(ctx) {
    ctx.updateBtnActive(ctx.elmInfoBtn, DebugJS.ST_ELM_INSPECTING, DebugJS.DOM_BTN_COLOR);
  },

  updateHtmlSrcBtn: function(ctx) {
    ctx.updateBtnActive(ctx.htmlSrcBtn, DebugJS.ST_HTML_SRC, DebugJS.HTML_BTN_COLOR);
  },

  updateJsBtn: function(ctx) {
    ctx.updateBtnActive(ctx.jsBtn, DebugJS.ST_JS, DebugJS.JS_BTN_COLOR);
  },

  updateToolsBtn: function(ctx) {
    ctx.updateBtnActive(ctx.toolsBtn, DebugJS.ST_TOOLS, DebugJS.TOOLS_BTN_COLOR);
  },

  updateExtBtn: function(ctx) {
    ctx.updateBtnActive(ctx.extBtn, DebugJS.ST_EXT_PANEL, DebugJS.EXT_BTN_COLOR);
  },

  updateSwBtnPanel: function(ctx) {
    if (!ctx.swBtnPanel) return;
    var btn = (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) ? '||' : '>>';
    var margin = (2 * ctx.opt.zoom) + 'px';
    var btns = ctx.createBtnHtml(ctx, '0', 'DebugJS.ctx.resetStopWatch();', 'margin-right:' + margin) +
               ctx.createBtnHtml(ctx, btn, 'DebugJS.ctx.startStopStopWatch();', 'margin-right:' + margin);
    ctx.swBtnPanel.innerHTML = btns;
  },

  updateSwLabel: function() {
    var ctx = DebugJS.ctx;
    ctx.updateStopWatch();
    ctx.swElapsedTimeDisp = DebugJS.getTimerStr(ctx.swElapsedTime);
    if (ctx.swLabel) {
      if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
        ctx.swLabel.innerHTML = '<span style="color:' + ctx.opt.timerColor + ' !important">' + ctx.swElapsedTimeDisp + '</span>';
      } else {
        ctx.swLabel.innerHTML = ctx.swElapsedTimeDisp;
      }
    }
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      setTimeout(ctx.updateSwLabel, DebugJS.UPDATE_INTERVAL_H);
    }
  },

  updatePreserveLogBtn: function(ctx) {
    ctx.updateBtnActive(ctx.preserveLogBtn, DebugJS.ST_LOG_PRESERVED, DebugJS.LOG_PRESERVE_BTN_COLOR);
  },

  updateSuspendLogBtn: function(ctx) {
    ctx.updateBtnActive(ctx.suspendLogBtn, DebugJS.ST_LOG_SUSPENDING, DebugJS.LOG_SUSPEND_BTN_COLOR);
  },

  updatePinBtn: function(ctx) {
    if (ctx.pinBtn) {
      ctx.setStyle(ctx.pinBtn, 'color', (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BTN_COLOR);
    }
  },

  updateBtnActive: function(btn, status, activeColor) {
    if (btn) {
      DebugJS.ctx.setStyle(btn, 'color', (DebugJS.ctx.status & status) ? activeColor : DebugJS.COLOR_INACTIVE);
    }
  },

  updateWinCtrlBtnPanel: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.winCtrlBtnPanel) return;
    var fn = 'DebugJS.ctx.expandDbgWin(\'full\');';
    var btn = DebugJS.CHR_WIN_FULL;
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      fn = 'DebugJS.ctx.restoreDbgWin();';
      btn = DebugJS.CHR_WIN_RST;
    }
    fn += 'DebugJS.ctx.updateWinCtrlBtnPanel();DebugJS.ctx.focusCmdLine();';
    var b = '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;position:relative;top:-1px;margin-right:' + (3 * ctx.opt.zoom) + 'px;font-size:' + (16 * ctx.opt.zoom) + 'px !important;color:#888 !important" onclick="' + fn + '" onmouseover="DebugJS.ctx.setStyle(this, \'color\', \'#ddd\');" onmouseout="DebugJS.ctx.setStyle(this, \'color\', \'#888\');">' + btn + '</span>' +
    '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;position:relative;top:-2px;margin-left:' + 2 * ctx.opt.zoom + 'px;margin-right:' + ctx.opt.zoom + 'px;font-size:' + (30 * ctx.opt.zoom) + 'px !important;color:#888 !important" onclick="DebugJS.ctx.resetDbgWinSizePos();DebugJS.ctx.focusCmdLine();" onmouseover="DebugJS.ctx.setStyle(this, \'color\', \'#ddd\');" onmouseout="DebugJS.ctx.setStyle(this, \'color\', \'#888\');">-</span>';
    ctx.winCtrlBtnPanel.innerHTML = b;
  },

  printLogs: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.win) return;
    var opt = ctx.opt;
    var buf = ctx.msgBuf.getAll();
    var cnt = ctx.msgBuf.count();
    var len = buf.length;
    var lineCnt = cnt - len;
    var filter = ctx.fltrText;
    var fltCase = ctx.fltrCase;
    if (!fltCase) {
      filter = filter.toLowerCase();
    }
    var logs = '';
    for (var i = 0; i < len; i++) {
      lineCnt++;
      var data = buf[i];
      var msg = (ctx.fltrTxtHtml ? data.msg : DebugJS.escTags(data.msg));
      var style = '';
      switch (data.type) {
        case DebugJS.LOG_TYPE_DBG:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_DBG)) continue;
          style = 'color:' + opt.logColorD;
          break;
        case DebugJS.LOG_TYPE_INF:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_INF)) continue;
          style = 'color:' + opt.logColorI;
          break;
        case DebugJS.LOG_TYPE_ERR:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_ERR)) continue;
          style = 'color:' + opt.logColorE;
          break;
        case DebugJS.LOG_TYPE_WRN:
          if (!(ctx.logFilter & DebugJS.LOG_TYPE_WRN)) continue;
          style = 'color:' + opt.logColorW;
          break;
        case DebugJS.LOG_TYPE_VRB:
          if (!(ctx.logFilter & DebugJS.LOG_TYPE_VRB)) continue;
          style = 'color:' + opt.logColorV;
          break;
        case DebugJS.LOG_TYPE_SYS:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_LOG)) continue;
          style = 'color:' + opt.logColorS + ';text-shadow:0 0 3px';
          break;
        case DebugJS.LOG_TYPE_MLT:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_LOG)) continue;
          style = 'display:inline-block;width:100%;margin:' + Math.round(ctx.computedFontSize * 0.5) + 'px 0';
          break;
        default:
          if (!(ctx.logFilter & DebugJS.LOG_FILTER_LOG)) continue;
      }
      if (filter != '') {
        try {
          var pos = (fltCase ? msg.indexOf(filter) : msg.toLowerCase().indexOf(filter));
          if (pos != -1) {
            var key = msg.substr(pos, filter.length);
            var hl = '<span class="' + ctx.id + '-txt-hl">' + key + '</span>';
            msg = msg.replace(key, hl, 'ig');
          } else {
            continue;
          }
        } catch (e) {}
      }
      var lineNum = '';
      if ((opt.showLineNums) && (data.type != DebugJS.LOG_TYPE_MLT)) {
        var diff = DebugJS.digits(cnt) - DebugJS.digits(lineCnt);
        var pdng = '';
        for (var j = 0; j < diff; j++) {
          pdng += '0';
        }
        lineNum = pdng + lineCnt + ': ';
      }
      var color = '';
      if ((data.type == DebugJS.LOG_TYPE_RES) || (data.type == DebugJS.LOG_TYPE_ERES)) {
        msg = DebugJS.quoteStrIfNeeded(DebugJS.setStyleIfObjNA(msg));
        if (data.type == DebugJS.LOG_TYPE_RES) {
          color = opt.promptColor;
        } else {
          color = opt.promptColorE;
        }
        msg = '<span style=color:' + color + '>&gt;</span> ' + msg;
      }
      var m = (((opt.showTimeStamp) && (data.type != DebugJS.LOG_TYPE_MLT)) ? (DebugJS.getTimeStr(data.time) + ' ' + msg) : msg);
      if (style) {
        logs += lineNum + '<span style="' + style + '">' + m + '</span>\n';
      } else {
        logs += lineNum + m + '\n';
      }
    }
    ctx.logPanel.innerHTML = '<pre style="padding:0 3px">' + logs + '</pre>';
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    if (!(ctx.uiStatus & DebugJS.UI_ST_VISIBLE)) {
      ctx.uiStatus |= DebugJS.UI_ST_NEED_TO_SCROLL;
    }
  },

  onClr: function() {
    DebugJS.ctx.clearLog();
    DebugJS.ctx.focusCmdLine();
  },

  clearLog: function() {
    DebugJS.ctx.msgBuf.clear();
    DebugJS.ctx.printLogs();
  },

  toggleLogFilter: function(filter) {
    var ctx = DebugJS.ctx;
    if (filter == DebugJS.LOG_FILTER_ALL) {
      if ((ctx.logFilter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) {
        ctx.logFilter = 0;
      } else {
        ctx.logFilter |= filter;
      }
    } else if (filter == DebugJS.LOG_FILTER_VRB) {
      if (ctx.logFilter & DebugJS.LOG_FILTER_VRB) {
        ctx.logFilter &= ~filter;
      } else {
        ctx.logFilter |= filter;
      }
    } else {
      if ((ctx.logFilter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) {
        ctx.logFilter = filter;
      } else {
        if (ctx.logFilter & filter) {
          ctx.logFilter &= ~filter;
        } else {
          ctx.logFilter |= filter;
        }
      }
    }
    ctx.updateLogFilterBtns();
    ctx.printLogs();
  },

  updateLogFilterBtns: function() {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var filter = ctx.logFilter;
    ctx.setStyle(ctx.fltrBtnAll, 'color', ((filter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) ? opt.btnColor : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnStd, 'color', (filter & DebugJS.LOG_FILTER_LOG) ? opt.fontColor : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnVrb, 'color', (filter & DebugJS.LOG_FILTER_VRB) ? opt.logColorV : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnDbg, 'color', (filter & DebugJS.LOG_FILTER_DBG) ? opt.logColorD : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnInf, 'color', (filter & DebugJS.LOG_FILTER_INF) ? opt.logColorI : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnWrn, 'color', (filter & DebugJS.LOG_FILTER_WRN) ? opt.logColorW : DebugJS.COLOR_INACTIVE);
    ctx.setStyle(ctx.fltrBtnErr, 'color', (filter & DebugJS.LOG_FILTER_ERR) ? opt.logColorE : DebugJS.COLOR_INACTIVE);
  },

  onchangeLogFilter: function() {
    DebugJS.ctx.fltrText = DebugJS.ctx.fltrInput.value;
    DebugJS.ctx.printLogs();
  },

  toggleFilterCase: function() {
    var ctx = DebugJS.ctx;
    ctx.setFilterCase(ctx, (ctx.fltrCase ? false : true));
  },
  setFilterCase: function(ctx, f) {
    ctx.fltrCase = f;
    ctx.setStyle(ctx.fltrCaseBtn, 'color', (DebugJS.ctx.fltrCase) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE);
    ctx.onchangeLogFilter();
  },

  toggleFilterTxtHtml: function() {
    var ctx = DebugJS.ctx;
    ctx.setFilterTxtHtml(ctx, (ctx.fltrTxtHtml ? false : true));
  },
  setFilterTxtHtml: function(ctx, f) {
    ctx.fltrTxtHtml = f;
    ctx.setStyle(ctx.fltrTxtHtmlBtn, 'color', (ctx.fltrTxtHtml ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACTIVE));
    ctx.onchangeLogFilter();
  },

  applyStyles: function(ctx, styles) {
    if (ctx.styleEl != null) document.head.removeChild(ctx.styleEl);
    ctx.styleEl = document.createElement('style');
    document.head.appendChild(ctx.styleEl);
    ctx.styleEl.appendChild(document.createTextNode(''));
    var s = ctx.styleEl.sheet;
    for (var selector in styles) {
      var props = styles[selector];
      var propStr = '';
      for (var propName in props) {
        var propVal = props[propName];
        var propImportant = '';
        if (propVal[1] === true) {
          propVal = propVal[0];
          propImportant = ' !important';
        }
        propStr += propName + ':' + propVal + propImportant + ';\n';
      }
      s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
    }
  },

  setStyle: function(el, n, v) {
    el.style.setProperty(n, v, 'important');
  },

  setIntervalL: function(ctx) {
    if (ctx.clockUpdIntHCnt > 0) {
      ctx.clockUpdIntHCnt--;
    }
    if (ctx.clockUpdIntHCnt == 0) {
      ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
    }
  },

  setIntervalH: function(ctx) {
    ctx.clockUpdIntHCnt++;
    ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_H;
  },

  setupMove: function(ctx) {
    ctx.winBody.onmousedown = ctx.startMoveM;
    ctx.winBody.ontouchstart = ctx.startMoveT;
  },

  startMoveM: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.clientX;
    var y = e.clientY;
    var target = e.target;
    if (e.button != 0) return;
    if ((!(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE)) || !ctx.isMovable(ctx, target, x, y)) {
      return;
    }
    ctx._startMove(ctx, target, x, y);
  },

  startMoveT: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    var target = e.target;
    if ((!(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE)) || !ctx.isMovable(ctx, target, x, y)) {
      return;
    }
    ctx._startMove(ctx, target, x, y);
    e.preventDefault();
  },

  _startMove: function(ctx, target, x, y) {
    ctx.uiStatus |= DebugJS.UI_ST_DRAGGING;
    ctx.winBody.style.cursor = 'move';
    ctx.disableTextSelect(ctx);
    ctx.prevOffsetTop = y - ctx.win.offsetTop;
    ctx.prevOffsetLeft = x - ctx.win.offsetLeft;
    if (!document.all) {
       window.getSelection().removeAllRanges();
    }
  },

  disableTextSelect: function(ctx) {
    ctx.savedFunc = document.onselectstart;
    document.onselectstart = function() {return false;};
  },

  enableTextSelect: function(ctx) {
    document.onselectstart = ctx.savedFunc;
  },

  isMovable: function(ctx, el, x, y) {
    if (el.nodeName == 'INPUT') return false;
    if (el.nodeName == 'TEXTAREA') return false;
    if (DebugJS.hasClass(el, ctx.id + '-nomove')) return false;
    var browser = DebugJS.getBrowserType();
    if ((browser.family == 'IE') || (browser.name == 'Firefox')) {
      if ((el == ctx.logPanel) ||
          (el == ctx.sysInfoPanel) ||
          (el == ctx.elmInfoBodyPanel) ||
          (el == ctx.htmlSrcBodyPanel) ||
          (el == ctx.filePreviewWrapper) ||
          (el == ctx.toolsPanel) ||
          (el == ctx.extPanel) ||
          (el == ctx.extBodyPanel)) {
        var scrollBarWH = 17;
        var rect = el.getBoundingClientRect();
        var scrollL = rect.left + rect.width - scrollBarWH;
        var scrollR = rect.left + rect.width;
        var scrollT = rect.top + rect.height - scrollBarWH;
        var scrollB = rect.top + rect.height;
        if (((x >= scrollL) && (x <= scrollR)) || ((y >= scrollT) && (y <= scrollB))) {
          return false;
        }
      }
    }
    return true;
  },

  moveDbgWin: function(ctx, x, y) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DRAGGING)) return;
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJUST;
    ctx.win.style.top = y - ctx.prevOffsetTop + 'px';
    ctx.win.style.left = x - ctx.prevOffsetLeft + 'px';
  },

  endMove: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
    ctx.enableTextSelect(ctx);
    ctx.winBody.style.cursor = 'default';
  },

  startResize: function(ctx, e) {
    if (e.button != 0) return;
    ctx.uiStatus |= DebugJS.UI_ST_RESIZING;
    ctx.clickedPosX = e.clientX;
    ctx.clickedPosY = e.clientY;
    ctx.saveSizeAndPos(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    ctx.updateWinCtrlBtnPanel();
    ctx.disableTextSelect(ctx);
  },

  resizeDbgWin: function(ctx, x, y) {
    var currentX = x;
    var currentY = y;
    var moveX, moveY, t, l, w, h;
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;

    if (currentX > clientW) {
      currentX = clientW;
    } else if (currentX < 0) {
      currentX = 0;
    }

    if (currentY > clientH) {
      currentY = clientH;
    } else if (currentY < 0) {
      currentY = 0;
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_N) {
      moveY = ctx.clickedPosY - currentY;
      h = ctx.orgSizePos.h + moveY;
      if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      } else {
        t = ctx.orgSizePos.t - moveY;
        ctx.win.style.top = t + 'px';
      }
      ctx.win.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      }
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_W) {
      moveX = ctx.clickedPosX - currentX;
      w = ctx.orgSizePos.w + moveX;
      if (w < ctx.computedMinW) {
        w = ctx.computedMinW;
      } else {
        l = ctx.orgSizePos.l - moveX;
        ctx.win.style.left = l + 'px';
      }
      ctx.win.style.width = w + 'px';
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_E) {
      moveX = currentX - ctx.clickedPosX;
      w = ctx.orgSizePos.w + moveX;
      if (w < ctx.computedMinW) w = ctx.computedMinW;
      ctx.win.style.width = w + 'px';
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_S) {
      moveY = currentY - ctx.clickedPosY;
      h = ctx.orgSizePos.h + moveY;
      if (ctx.initHeight < ctx.computedMinH) {
        if (h < ctx.initHeight) {
          h = ctx.initHeight;
        }
      } else if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      }
      ctx.win.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      }
    }

    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  endResize: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZING_ALL;
    ctx.bodyEl.style.cursor = ctx.bodyCursor;
    ctx.enableTextSelect(ctx);
  },

  resizeMainHeight: function() {
    var ctx = DebugJS.ctx;
    var headPanelH = (ctx.headPanel) ? ctx.headPanel.offsetHeight : 0;
    var infoPanelH = (ctx.infoPanel) ? ctx.infoPanel.offsetHeight : 0;
    var cmdPanelH = (ctx.cmdPanel) ? ctx.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = ctx.win.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WIN_ADJUST;
    if (infoPanelH != 1) {
      ctx.mainPanel.style.height = mainPanelHeight + 'px';
    }
  },

  toggleLogSuspend: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_LOG_SUSPENDING) {
      ctx.resumeLog();
    } else {
      ctx.suspendLog();
    }
  },

  suspendLog: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.ST_LOG_SUSPENDING;
    ctx.updateSuspendLogBtn(ctx);
  },

  resumeLog: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.ST_LOG_SUSPENDING;
    ctx.updateSuspendLogBtn(ctx);
  },

  toggleLogPreserve: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_LOG_PRESERVED) {
      ctx.setLogPreserve(ctx, false);
    } else {
      ctx.setLogPreserve(ctx, true);
    }
  },

  setLogPreserve: function(ctx, flg) {
    if (flg) {
      ctx.status |= DebugJS.ST_LOG_PRESERVED;
    } else {
      ctx.status &= ~DebugJS.ST_LOG_PRESERVED;
    }
    ctx.updatePreserveLogBtn(ctx);
  },

  toggleMeasure: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_MEASURE) {
      ctx.closeScreenMeasure(ctx);
    } else {
      ctx.openScreenMeasure(ctx);
    }
  },

  openScreenMeasure: function(ctx, q) {
    if (!q) DebugJS._log.s('Screen Measure ON');
    ctx.status |= DebugJS.ST_MEASURE;
    ctx.featStack.push(DebugJS.ST_MEASURE);
    ctx.bodyCursor = ctx.bodyEl.style.cursor;
    ctx.bodyEl.style.cursor = 'default';
    ctx.updateMeasBtn(ctx);
  },

  closeScreenMeasure: function(ctx, q) {
    ctx.stopMeasure(ctx);
    ctx.bodyEl.style.cursor = ctx.bodyCursor;
    ctx.status &= ~DebugJS.ST_MEASURE;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_MEASURE);
    if (!q) DebugJS._log.s('Screen Measure OFF');
    ctx.updateMeasBtn(ctx);
  },

  toggleDraggable: function() {
    var ctx = DebugJS.ctx;
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.disableDraggable(ctx);
    } else {
      ctx.enableDraggable(ctx);
    }
  },

  enableDraggable: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_DRAGGABLE;
    ctx.winBody.style.cursor = 'default';
    ctx.updatePinBtn(ctx);
  },

  disableDraggable: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGABLE;
    ctx.winBody.style.cursor = 'auto';
    ctx.updatePinBtn(ctx);
  },

  enableResize: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_RESIZABLE;
  },

  disableResize: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZABLE;
  },

  startStopStopWatch: function() {
    if (DebugJS.ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.ctx.stopStopWatch();
    } else {
      DebugJS.ctx.startStopWatch();
    }
  },

  startStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.ST_STOPWATCH_RUNNING;
    ctx.swStartTime = (new Date()).getTime() - ctx.swElapsedTime;
    ctx.updateSwLabel();
    ctx.updateSwBtnPanel(ctx);
  },

  stopStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.ST_STOPWATCH_RUNNING;
    if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
      ctx.status &= ~DebugJS.ST_STOPWATCH_LAPTIME;
      ctx.resetStopWatch();
    }
    ctx.updateSwBtnPanel(ctx);
  },

  resetStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.swStartTime = (new Date()).getTime();
    ctx.swElapsedTime = 0;
    ctx.updateSwLabel();
  },

  updateStopWatch: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_STOPWATCH_RUNNING)) return;
    var swCurrentTime = (new Date()).getTime();
    ctx.swElapsedTime = swCurrentTime - ctx.swStartTime;
  },

  collapseLogPanel: function(ctx) {
    ctx.logPanel.style.height = 'calc(' + (100 - DebugJS.OVERLAY_PANEL_HEIGHT) + '%' + ctx.logPanelHeightAdjust + ')';
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
  },

  expandLogPanel: function(ctx) {
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
  },

  openFeature: function(ctx, f, subfnc, opt) {
    ctx.closeFeature(ctx, f);
    switch (f) {
      case DebugJS.ST_MEASURE:
        ctx.openScreenMeasure(ctx, opt);
        return true;
      case DebugJS.ST_SYS_INFO:
        ctx.openSystemInfo(ctx);
        return true;
      case DebugJS.ST_HTML_SRC:
        ctx.openHtmlSrc(ctx);
        return true;
      case DebugJS.ST_ELM_INSPECTING:
        ctx.openElmInfo(ctx);
        return true;
      case DebugJS.ST_JS:
        ctx.openJsEditor(ctx);
        return true;
      case DebugJS.ST_TOOLS:
        var kind;
        var param;
        switch (subfnc) {
          case 'timer':
            kind = DebugJS.TOOLS_FNC_TIMER;
            if (opt == 'clock') {
              param = DebugJS.TOOL_TIMER_MODE_CLOCK;
            } else if (opt == 'cu') {
              param = DebugJS.TOOL_TIMER_MODE_SW_CU;
            } else if (opt == 'cd') {
              param = DebugJS.TOOL_TIMER_MODE_SW_CD;
            }
            break;
          case 'text':
            kind = DebugJS.TOOLS_FNC_TEXT;
            break;
          case 'html':
            kind = DebugJS.TOOLS_FNC_HTML;
            break;
          case 'file':
            kind = DebugJS.TOOLS_FNC_FILE;
            if (opt == 'b64') {
              param = DebugJS.FILE_LOAD_FMT_B64;
            } else {
              param = DebugJS.FILE_LOAD_FMT_BIN;
            }
            break;
          case 'bat':
            kind = DebugJS.TOOLS_FNC_BAT;
            break;
          case undefined:
            kind = ctx.toolsActiveFnc;
            break;
          default:
            return false;
        }
        ctx.openTools(ctx);
        ctx.switchToolsFunction(kind, param);
        return true;
      case DebugJS.ST_EXT_PANEL:
        if (ctx.extPanels.length == 0) {
          DebugJS._log('No extension panel');
          return false;
        }
        var idx = subfnc;
        if (idx == undefined) idx = ctx.extActPnlIdx;
        if (idx < 0) idx = 0;
        if (idx >= ctx.extPanels.length) {
          DebugJS._log.e('No such panel: ' + idx + ' (0-' + (ctx.extPanels.length - 1) + ')');
          return false;
        }
        if (!(ctx.status & DebugJS.ST_EXT_PANEL)) {
          ctx.openExtPanel(ctx);
        }
        ctx.switchExtPanel(idx);
        return true;
    }
    return false;
  },

  closeFeature: function(ctx, f) {
    switch (f) {
      case DebugJS.ST_MEASURE:
        ctx.closeScreenMeasure(ctx);
        break;
      case DebugJS.ST_SYS_INFO:
        ctx.closeSystemInfo(ctx);
        break;
      case DebugJS.ST_HTML_SRC:
        ctx.closeHtmlSrc(ctx);
        break;
      case DebugJS.ST_ELM_INSPECTING:
        ctx.closeElmInfo(ctx);
        break;
      case DebugJS.ST_JS:
        ctx.closeJsEditor();
        break;
      case DebugJS.ST_TOOLS:
        ctx.closeTools(ctx);
        break;
      case DebugJS.ST_EXT_PANEL:
        ctx.closeExtPanel(ctx);
        break;
      default:
        return false;
    }
    return true;
  },

  closeTopFeature: function(ctx) {
    var f = ctx.featStack.pop();
    return ctx.closeFeature(ctx, f);
  },

  finalizeFeatures: function(ctx) {
    if ((ctx.uiStatus & DebugJS.UI_ST_DRAGGING) || (ctx.uiStatus & DebugJS.UI_ST_RESIZING)) {
      ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
      ctx.endResize(ctx);
    }
    ctx.closeAllFeatures(ctx, true);
  },

  closeAllFeatures: function(ctx, q) {
    if (ctx.status & DebugJS.ST_MEASURE) ctx.closeScreenMeasure(ctx, q);
    if (ctx.status & DebugJS.ST_SYS_INFO) ctx.closeSystemInfo(ctx);
    if (ctx.status & DebugJS.ST_HTML_SRC) ctx.closeHtmlSrc(ctx);
    if (ctx.status & DebugJS.ST_ELM_INSPECTING) ctx.closeElmInfo(ctx);
    if (ctx.status & DebugJS.ST_JS) ctx.closeJsEditor();
    if (ctx.status & DebugJS.ST_TOOLS) ctx.closeTools(ctx);
    if (ctx.status & DebugJS.ST_EXT_PANEL) ctx.closeExtPanel(ctx);
  },

  launchFunc: function(ctx, fn, subfn, opt) {
    var f = 0;
    switch (fn) {
      case 'measure':
        f = DebugJS.ST_MEASURE;
        break;
      case 'sys':
        f = DebugJS.ST_SYS_INFO;
        break;
      case 'html':
        f = DebugJS.ST_HTML_SRC;
        break;
      case 'dom':
        f = DebugJS.ST_ELM_INSPECTING;
        break;
      case 'js':
        f = DebugJS.ST_JS;
        break;
      case 'tool':
        f = DebugJS.ST_TOOLS;
        break;
      case 'ext':
        f = DebugJS.ST_EXT_PANEL;
    }
    return (ctx.openFeature(ctx, f, subfn, opt));
  },

  keyHandler: function(e) {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var cmds;
    if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
      DebugJS.bat._resume('cmd');
    }
    switch (e.keyCode) {
      case 9: // Tab
        if ((ctx.status & DebugJS.ST_TOOLS) && (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_FILE)) {
          if (e.shiftKey) {
            if (ctx.fileVwrRadioB64.checked) ctx.toggleShowHideCC();
          } else {
            ctx.switchFileScreen();
          }
          e.preventDefault();
        }
        break;

      case 13: // Enter
        if (document.activeElement == ctx.cmdLine) {
          ctx.fromCmdLine = true;
          ctx.execCmd(ctx);
          ctx.fromCmdLine = false;
          e.preventDefault();
        }
        break;

      case 18: // Alt
        ctx.disableDraggable(ctx);
        break;

      case 27: // ESC
        if (ctx.props.esc == 'disable') {
          break;
        }
        if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) {
          ctx.endMove(ctx);
          break;
        }
        if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) {
          ctx.endResize(ctx);
          break;
        }
        if (ctx.closeTopFeature(ctx)) {
          break;
        }
        ctx.hideDbgWin(ctx);
        break;

      case 38: // Up
        if (document.activeElement == ctx.cmdLine) {
          cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (cmds.length < ctx.cmdHistoryIdx) {
            ctx.cmdHistoryIdx = cmds.length;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdTmp = ctx.cmdLine.value;
          }
          if (ctx.cmdHistoryIdx > 0) {
            ctx.cmdHistoryIdx--;
          }
          ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          e.preventDefault();
        }
        break;

      case 40: // Down
        if (document.activeElement == ctx.cmdLine) {
          cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (ctx.cmdHistoryIdx < cmds.length) {
            ctx.cmdHistoryIdx++;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdLine.value = ctx.cmdTmp;
          } else {
            ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          }
        }
        break;

      case 67: // C
        if ((e.ctrlKey) && (document.activeElement == ctx.cmdLine)) {
          if (((ctx.cmdLine.selectionEnd - ctx.cmdLine.selectionStart) == 0)) {
            if (ctx.status & DebugJS.ST_BAT_RUNNING) {
              DebugJS.bat.stop(DebugJS.EXIT_SIG + DebugJS.SIGINT);
            }
            ctx._cmdDelayCancel(ctx);
            DebugJS.point.move.stop();
            DebugJS.point.drag.stop();
            DebugJS.scrollWinTo.stop();
            DebugJS.inputText.stop();
            DebugJS._log.s(ctx.cmdLine.value + '^C');
            ctx.cmdLine.value = '';
            DebugJS.callEvtListener('ctrlc');
          }
        }
        break;

      case 112: // F1
        if ((e.ctrlKey) && (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC)) {
          ctx.win.style.top = 0;
          ctx.win.style.left = 0;
          ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
        }
        break;

      case opt.keyAssign.key:
        if (((opt.keyAssign.shift == undefined) || (e.shiftKey == opt.keyAssign.shift)) &&
            ((opt.keyAssign.ctrl == undefined) || (e.ctrlKey == opt.keyAssign.ctrl)) &&
            ((opt.keyAssign.alt == undefined) || (e.altKey == opt.keyAssign.alt)) &&
            ((opt.keyAssign.meta == undefined) || (e.metaKey == opt.keyAssign.meta))) {
          if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.isOutOfWin(ctx))) {
            ctx.resetToOriginalPosition(ctx);
          } else if (ctx.uiStatus & DebugJS.UI_ST_VISIBLE) {
            ctx.closeDbgWin();
          } else {
            ctx.showDbgWin();
          }
        }
    }
  },
  keyHandlerUp: function(ctx, e) {
    switch (e.keyCode) {
      case 18:
        ctx.enableDraggable(ctx);
    }
  },
  onKeyDown: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useKeyStatusInfo) {
      ctx.updateStatusInfoOnKeyDown(ctx, e);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) {
      ctx.procOnProtectedD(ctx, e);
    }
  },
  onKeyPress: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useKeyStatusInfo) {
      ctx.updateStatusInfoOnKeyPress(ctx, e);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) {
      ctx.procOnProtectedP(ctx, e);
    }
  },
  onKeyUp: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useKeyStatusInfo) {
      ctx.updateStatusInfoOnKeyUp(ctx, e);
    }
    ctx.keyHandlerUp(ctx, e);
  },

  procOnProtectedD: function(ctx, e) {
    switch (e.keyCode) {
      case 17:
        if (ctx.unlockCode == null) {
          ctx.unlockCode = '';
        } else if (ctx.unlockCode == ctx.opt.lockCode) {
          ctx.uiStatus &= ~DebugJS.UI_ST_PROTECTED;
          ctx.unlockCode = null;
        }
        break;
      case 27:
        ctx.unlockCode = null;
    }
  },
  procOnProtectedP: function(ctx, e) {
    if (ctx.unlockCode == null) return;
    var ch = DebugJS.key2ch(e.key);
    if ((DebugJS.isTypographic(ch))) {
      ctx.unlockCode += ch;
    }
  },

  updateStatusInfoOnKeyDown: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyDownCode = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyDownLabel();
    ctx.keyPressCode = DebugJS.KEY_ST_DFLT;
    ctx.updateKeyPressLabel();
    ctx.keyUpCode = DebugJS.KEY_ST_DFLT;
    ctx.updateKeyUpLabel();
    ctx.resizeMainHeight();
  },

  updateStatusInfoOnKeyPress: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyPressCode = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyPressLabel();
    ctx.resizeMainHeight();
  },

  updateStatusInfoOnKeyUp: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyUpCode = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyUpLabel();
    ctx.resizeMainHeight();
  },

  onResize: function() {
    var ctx = DebugJS.ctx;
    ctx.updateWindowSizeLabel();
    ctx.updateClientSizeLabel();
    ctx.updateBodySizeLabel();
    if (ctx.uiStatus & DebugJS.UI_ST_VISIBLE) {
      if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJUST) {
        ctx.adjustDbgWinPos(ctx);
      } else {
        ctx.adjustWinMax(ctx);
      }
      ctx.resizeMainHeight();
    }
  },

  onScroll: function() {
    var ctx = DebugJS.ctx;
    if (window.scrollX === undefined) {
      ctx.scrollPosX = document.documentElement.scrollLeft;
      ctx.scrollPosY = document.documentElement.scrollTop;
    } else {
      ctx.scrollPosX = window.scrollX;
      ctx.scrollPosY = window.scrollY;
    }
    ctx.updateScrollPosLabel();
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      ctx.updateSysInfoScrollPosLabel(ctx);
    }
    ctx.resizeMainHeight();
  },

  updateSysInfoScrollPosLabel: function(ctx) {
    document.getElementById(ctx.id + '-sys-scroll-x').innerHTML = DebugJS.setStyleIfObjNA(window.scrollX);
    document.getElementById(ctx.id + '-sys-scroll-y').innerHTML = DebugJS.setStyleIfObjNA(window.scrollY);
    document.getElementById(ctx.id + '-sys-pgoffset-x').innerText = window.pageXOffset;
    document.getElementById(ctx.id + '-sys-pgoffset-y').innerText = window.pageYOffset;
    document.getElementById(ctx.id + '-sys-cli-scroll-x').innerText = document.documentElement.scrollLeft;
    document.getElementById(ctx.id + '-sys-cli-scroll-y').innerText = document.documentElement.scrollTop;
  },

  onMouseDown: function(e) {
    var ctx = DebugJS.ctx;
    var posX = e.clientX;
    var posY = e.clientY;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.ST_MEASURE) {
          ctx.startMeasure(ctx, posX, posY);
        }
        if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
          DebugJS._log('<span style="color:' + ctx.opt.timerColor + '">' + ctx.swElapsedTimeDisp + '</span>');
          ctx.resetStopWatch();
        }
        if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
          DebugJS.bat._resume('cmd');
        }
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.ST_ELM_INSPECTING) {
          if (ctx.isOnDbgWin(posX, posY)) {
            if ((DebugJS.el) && (DebugJS.el != ctx.targetElm)) {
              ctx.showElementInfo(DebugJS.el);
              ctx.updateTargetElm(DebugJS.el);
            }
          } else {
            var pointedElm = document.elementFromPoint(posX, posY);
            ctx.captureElm(pointedElm);
          }
        }
    }
    if (ctx.opt.useMouseStatusInfo) {
      ctx.updateMouseClickLabel();
    }
  },

  onTouchStart: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    if (ctx.status & DebugJS.ST_MEASURE) {
      ctx.startMeasure(ctx, x, y);
      e.preventDefault();
    }
  },

  onMouseMove: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.clientX;
    var y = e.clientY;
    ctx._onPointerMove(ctx, x, y);
  },
  onTouchMove: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    ctx._onPointerMove(ctx, x, y);
  },
  _onPointerMove: function(ctx, x, y) {
    if (ctx.opt.useMouseStatusInfo) {
      ctx.mousePos.x = x;
      ctx.mousePos.y = y;
      ctx.updateMousePosLabel();
    }
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) ctx.moveDbgWin(ctx, x, y);
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) ctx.resizeDbgWin(ctx, x, y);
    if (ctx.status & DebugJS.ST_MEASURING) ctx.doMeasure(ctx, x, y);
    if (ctx.status & DebugJS.ST_ELM_INSPECTING) ctx.inspectElement(x, y);
    if (DebugJS.point.d) DebugJS.point.move(x, y, 0, 0);
    ctx.resizeMainHeight();
  },

  onMouseUp: function(e) {
    var ctx = DebugJS.ctx;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_INACTIVE;
        ctx._onPointerUp(ctx, e);
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_INACTIVE;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_INACTIVE;
    }
    if (ctx.opt.useMouseStatusInfo) {
      ctx.updateMouseClickLabel();
    }
  },
  onTouchEnd: function(e) {
    DebugJS.ctx._onPointerUp(DebugJS.ctx, e);
  },
  _onPointerUp: function(ctx, e) {
    var el = e.target;
    if (ctx.status & DebugJS.ST_MEASURING) {
      ctx.stopMeasure(ctx);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) {
      ctx.endMove(ctx);
      if ((el != ctx.extActivePanel) && (!DebugJS.isDescendant(el, ctx.extActivePanel))) {
        ctx.focusCmdLine();
      }
    }
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) {
      ctx.endResize(ctx);
      ctx.focusCmdLine();
    }
    if (DebugJS.point.d) DebugJS.point.endDragging();
  },

  onDbgWinDblClick: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.clientX;
    var y = e.clientY;
    if ((!ctx.isMovable(ctx, e.target, x, y)) ||
        (!(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE))) {
      return;
    }
    if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
      ctx.setWinSize('restore');
    } else {
      ctx.expandDbgWin('expand');
    }
    ctx.focusCmdLine();
  },

  expandDbgWin: function(mode) {
    var ctx = DebugJS.ctx;
    var sp = ctx.getSelfSizePos();
    var border = DebugJS.WIN_BORDER * 2;
    if ((mode == 'expand') &&
        (sp.w == DebugJS.DBGWIN_EXPAND_W + border) &&
        (sp.h == DebugJS.DBGWIN_EXPAND_H + border)) {
      return;
    }
    ctx.saveSizeAndPos(ctx);
    switch (mode) {
      case 'full':
        ctx.setDbgWinFull(ctx);
        break;
      case 'expand':
        if ((sp.w < DebugJS.DBGWIN_EXPAND_W) &&
            (sp.h < DebugJS.DBGWIN_EXPAND_H)) {
          ctx._expandDbgWin(ctx);
        } else {
          ctx._expandDbgWinAuto(ctx, sp);
        }
        break;
      case 'center':
        ctx._expandDbgWinCenter(ctx);
        break;
      default:
        ctx._expandDbgWinAuto(ctx, sp);
    }
    ctx.updateWinCtrlBtnPanel();
  },

  _expandDbgWin: function(ctx) {
    var sp = ctx.getSelfSizePos();
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var expandThresholdW = clientW * 0.6;
    var expandThresholdH = clientH * 0.6;
    if ((sp.w > expandThresholdW) || (sp.h > expandThresholdH)) {
      ctx.setDbgWinFull(ctx);
      return;
    }
    var l = sp.x1 + 3;
    var t = sp.y1 + 3;
    var w = DebugJS.DBGWIN_EXPAND_W;
    var h = DebugJS.DBGWIN_EXPAND_H;
    if (sp.x1 > (clientW - sp.x2)) {
      l = (sp.x1 - (DebugJS.DBGWIN_EXPAND_W - sp.w)) + 1;
    }
    if (sp.y1 > (clientH - sp.y2)) {
      t = (sp.y1 - (DebugJS.DBGWIN_EXPAND_H - sp.h)) + 1;
    }
    if (l < 0) l = 0;
    if (clientH < DebugJS.DBGWIN_EXPAND_H) {
      t = clientH - DebugJS.DBGWIN_EXPAND_H;
    }
    ctx.saveSizeAndPos(ctx);
    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.sizeStatus = DebugJS.SIZE_ST_EXPANDED;
    ctx.updateWinCtrlBtnPanel();
  },

  _expandDbgWinAuto: function(ctx, sp) {
    if ((sp.w >= DebugJS.DBGWIN_EXPAND_W) && (sp.h >= DebugJS.DBGWIN_EXPAND_H)) {
      ctx.setDbgWinFull(ctx);
      return;
    }
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var expandThresholdW = clientW * 0.6;
    var expandThresholdH = clientH * 0.6;
    var w = 0, h = 0, t = 0, l = 0;

    if ((DebugJS.DBGWIN_EXPAND_W > clientW) || (sp.w > expandThresholdW)) {
      w = clientW;
      ctx.sizeStatus |= DebugJS.SIZE_ST_FULL_W;
      if ((DebugJS.DBGWIN_EXPAND_H > clientH) || (sp.h > expandThresholdH)) {
        h = clientH;
      } else {
        t = DebugJS.DBGWIN_POS_NONE;
      }
    } else {
      if ((DebugJS.DBGWIN_EXPAND_H > clientH) || (sp.h > expandThresholdH)) {
        h = clientH;
        if ((DebugJS.DBGWIN_EXPAND_W < clientW) && (sp.w < expandThresholdW)) {
          l = DebugJS.DBGWIN_POS_NONE;
        }
      } else {
        ctx.setDbgWinFull(ctx);
        return;
      }
    }

    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJUST;
    if ((w == clientW) && (h == clientH)) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    } else if (w == clientW) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_W;
    } else if (h == clientH) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_H;
    }
  },

  _expandDbgWinCenter: function(ctx) {
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var w = DebugJS.DBGWIN_EXPAND_C_W;
    var h = DebugJS.DBGWIN_EXPAND_C_H;
    var l = clientW / 2 - w / 2;
    var t = clientH / 2 - h / 2;
    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJUST;
    ctx.sizeStatus = DebugJS.SIZE_ST_EXPANDED_C;
  },

  setDbgWinFull: function(ctx) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var t = 0, l = 0;
    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJUST;
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    ctx.disableDraggable(ctx);
    ctx.disableResize(ctx);
  },

  setDbgWinPos: function(t, l) {
    var ctx = DebugJS.ctx;
    if (t > DebugJS.DBGWIN_POS_NONE) ctx.win.style.top = t + 'px';
    if (l > DebugJS.DBGWIN_POS_NONE) ctx.win.style.left = l + 'px';
  },

  setDbgWinSize: function(w, h) {
    var ctx = DebugJS.ctx;
    if (w > 0) ctx.win.style.width = w + 'px';
    if (h > 0) ctx.win.style.height = h + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  adjustDbgWinPos: function(ctx) {
    var sp = ctx.getSelfSizePos();
    ctx.setWinPos(ctx.opt.position, sp.w, sp.h);
  },

  adjustWinMax: function(ctx) {
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_W) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.win.style.width = document.documentElement.clientWidth + 'px';
    }
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_H) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.win.style.height = document.documentElement.clientHeight + 'px';
    }
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  saveSizeAndPos: function(ctx) {
    ctx.saveSize(ctx);
    ctx.savePos(ctx);
  },

  saveSize: function(ctx) {
    var shadow = (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    ctx.orgSizePos.w = (ctx.win.offsetWidth + DebugJS.WIN_BORDER - shadow);
    ctx.orgSizePos.h = (ctx.win.offsetHeight + DebugJS.WIN_BORDER - shadow);
  },

  savePos: function(ctx) {
    ctx.orgSizePos.t = ctx.win.offsetTop;
    ctx.orgSizePos.l = ctx.win.offsetLeft;
  },

  savePosNone: function(ctx) {
    ctx.orgSizePos.t = DebugJS.DBGWIN_POS_NONE;
    ctx.orgSizePos.l = DebugJS.DBGWIN_POS_NONE;
  },

  restoreDbgWin: function() {
    var ctx = DebugJS.ctx;
    var w = ctx.orgSizePos.w;
    var h = ctx.orgSizePos.h;
    var t = ctx.orgSizePos.t;
    var l = ctx.orgSizePos.l;
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.enableDraggable(ctx);
      ctx.enableResize(ctx);
    } else {
      var thold = 10;
      var sp = ctx.getSelfSizePos();
      var orgY2 = t + h;
      var orgX2 = l + w;
      if (((Math.abs(sp.x1 - l) > thold) && (Math.abs(sp.x2 - orgX2) > thold)) ||
          ((Math.abs(sp.y1 - t) > thold) && (Math.abs(sp.y2 - orgY2) > thold))) {
        var clientW = document.documentElement.clientWidth;
        var clientH = document.documentElement.clientHeight;
        var mL = (sp.x1 < 0 ? 0 : sp.x1);
        var mT = (sp.y1 < 0 ? 0 : sp.y1);
        var mR = clientW - sp.x2;
        var mB = clientH - sp.y2;
        if (mR < 0) mR = 0;
        if (mB < 0) mB = 0;
        t = sp.y1 + 3;
        l = sp.x1 + 3;
        if (mT > mB) {
          t = sp.y2 - h;
          if ((t > clientH) || (t + h > clientH)) {
            t = clientH - h;
          }
          t -= 6;
        }
        if (mL > mR) {
          l = sp.x2 - w;
          if ((l > clientW) || (l + w > clientW)) {
            l = clientW - w;
          }
          l -= 6;
        }
        if (l < 0) l = 0;
        if (t < 0) t = 0;
      }
    }
    ctx.setDbgWinSize(w, h);
    ctx.setDbgWinPos(t, l);
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJUST) {
      ctx.adjustDbgWinPos(ctx);
    }
  },

  resetDbgWinSizePos: function() {
    DebugJS.ctx._resetDbgWinSizePos(DebugJS.ctx);
    DebugJS.ctx.updateWinCtrlBtnPanel();
  },
  _resetDbgWinSizePos: function(ctx) {
    var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.enableDraggable(ctx);
      ctx.enableResize(ctx);
    }
    ctx.setWinPos(ctx.opt.position, ctx.initWidth, ctx.initHeight);
    ctx.setDbgWinSize(w, h);
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    ctx.saveExpandModeOrgSizeAndPos(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJUST;
      ctx.adjustDbgWinPos(ctx);
    }
  },

  isOutOfWin: function(ctx) {
    var sp = ctx.getSelfSizePos();
    if ((sp.x1 > document.documentElement.clientWidth) ||
        (sp.y1 > document.documentElement.clientHeight) ||
        (sp.x2 < 0) || (sp.y2 < 0)) {
      return true;
    }
    return false;
  },

  resetToOriginalPosition: function(ctx) {
    var sp = ctx.getSelfSizePos();
    ctx.setWinPos(ctx.opt.position, sp.w, sp.h);
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJUST;
    }
  },

  showDbgWin: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.win == null) || (ctx.uiStatus & DebugJS.UI_ST_PROTECTED)) return;
    ctx.win.style.display = 'block';
    ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    if ((ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJUST) ||
       ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.isOutOfWin(ctx)))) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJUST;
      ctx.adjustDbgWinPos(ctx);
    } else {
      ctx.adjustWinMax(ctx);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_NEED_TO_SCROLL) {
      ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      ctx.uiStatus &= ~DebugJS.UI_ST_NEED_TO_SCROLL;
    }
    ctx.resizeMainHeight();
  },

  showDbgWinOnError: function(ctx) {
    if ((ctx.status & DebugJS.ST_INITIALIZED) && !(ctx.uiStatus & DebugJS.UI_ST_VISIBLE)) {
      if (((ctx.errStatus) &&
           (((ctx.opt.popupOnError.scriptError) && (ctx.errStatus & DebugJS.ERR_ST_SCRIPT)) ||
           ((ctx.opt.popupOnError.loadError) && (ctx.errStatus & DebugJS.ERR_ST_LOAD)) ||
           ((ctx.opt.popupOnError.errorLog) && (ctx.errStatus & DebugJS.ERR_ST_LOG)))) ||
          ((ctx.status & DebugJS.ST_BAT_RUNNING) && (DebugJS.bat.hasBatStopCond('error')) && (DebugJS.bat.ctrl.stopReq))) {
        ctx.showDbgWin();
        ctx.errStatus = DebugJS.ERR_ST_NONE;
      }
    }
  },

  hideDbgWin: function(ctx) {
    if ((!ctx.opt.togglableShowHide) || (!ctx.win)) return;
    ctx.errStatus = DebugJS.ERR_ST_NONE;
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
    ctx.uiStatus &= ~DebugJS.UI_ST_VISIBLE;
    ctx.win.style.display = 'none';
  },

  closeDbgWin: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_MEASURE) {
      ctx.closeScreenMeasure(ctx);
    }
    if (ctx.status & DebugJS.ST_ELM_INSPECTING) {
      ctx.closeElmInfo(ctx);
    }
    ctx.hideDbgWin(ctx);
  },

  lockDbgWin: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_PROTECTED;
    ctx.closeDbgWin();
  },

  focusCmdLine: function() {
    if (DebugJS.ctx.cmdLine) DebugJS.ctx.cmdLine.focus();
  },

  startMeasure: function(ctx, posX, posY) {
    if (ctx.isOnDbgWin(posX, posY)) return;
    ctx.status |= DebugJS.ST_MEASURING;
    ctx.clickedPosX = posX;
    ctx.clickedPosY = posY;
    if (ctx.measBox == null) {
      var box = document.createElement('div');
      box.style.position = 'fixed';
      box.style.zIndex = 0x7fffffff;
      box.style.top = posY + 'px';
      box.style.left = posX + 'px';
      box.style.width = '0px';
      box.style.height = '0px';
      box.style.border = 'dotted 1px #333';
      box.style.background = 'rgba(0,0,0,0.1)';
      ctx.measBox = box;
      ctx.bodyEl.appendChild(box);
    }
    ctx.disableTextSelect(ctx);
  },

  doMeasure: function(ctx, posX, posY) {
    var deltaX = posX - ctx.clickedPosX;
    var deltaY = posY - ctx.clickedPosY;
    var clientW = document.documentElement.clientWidth;
    if (deltaX < 0) {
      ctx.measBox.style.left = posX + 'px';
      deltaX *= -1;
    }
    if (deltaY < 0) {
      ctx.measBox.style.top = posY + 'px';
      deltaY *= -1;
    }
    ctx.measBox.style.width = deltaX + 'px';
    ctx.measBox.style.height = deltaY + 'px';
    var sizeLabelW = 210;
    var sizeLabelH = 40;
    var sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
    var sizeLabelX = (deltaX / 2) - (sizeLabelW / 2);
    var originY = 'top';
    var originX = 'left';
    if (deltaX < sizeLabelW) {
      sizeLabelX = 0;
      if ((deltaY < sizeLabelH) || (deltaY > ctx.clickedPosY)) {
        if (ctx.clickedPosY < sizeLabelH) {
          sizeLabelY = deltaY;
        } else {
          sizeLabelY = sizeLabelH * (-1);
        }
      } else {
        sizeLabelY = sizeLabelH * (-1);
      }
    }
    if (posY < sizeLabelH) {
      if (ctx.clickedPosY > sizeLabelH) {
        sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
      }
    }
    if (((ctx.clickedPosX + sizeLabelW) > clientW) && ((posX + sizeLabelW) > clientW)) {
      sizeLabelX = (sizeLabelW - (clientW - ctx.clickedPosX)) * (-1);
    }
    if (posX < ctx.clickedPosX) originX = 'right';
    if (posY < ctx.clickedPosY) originY = 'bottom';
    var size = '<span style="font-family:' + ctx.opt.fontFamily + ';font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeLabelY + 'px;left:' + sizeLabelX + 'px">W=' + (deltaX | 0) + ' H=' + (deltaY | 0) + '</span>';
    var origin = '<span style="font-family:' + ctx.opt.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px">x=' + ctx.clickedPosX + ',y=' + ctx.clickedPosY + '</span>';
    ctx.measBox.innerHTML = origin + size;
  },

  stopMeasure: function(ctx) {
    if (ctx.measBox != null) {
      ctx.bodyEl.removeChild(ctx.measBox);
      ctx.measBox = null;
    }
    ctx.enableTextSelect(ctx);
    ctx.status &= ~DebugJS.ST_MEASURING;
  },

  toggleSystemInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      ctx.closeSystemInfo(ctx);
    } else {
      ctx.openSystemInfo(ctx);
    }
  },

  openSystemInfo: function(ctx) {
    ctx.status |= DebugJS.ST_SYS_INFO;
    ctx.featStack.push(DebugJS.ST_SYS_INFO);
    if (ctx.sysInfoPanel == null) {
      ctx.createSysInfoPanel(ctx);
    }
    ctx.updateSysInfoBtn(ctx);
    ctx.showSystemInfo();
    ctx.setIntervalH(ctx);
  },

  createSysInfoPanel: function(ctx) {
    ctx.sysInfoPanel = document.createElement('div');
    var html = '<span style="color:' + DebugJS.SYS_BTN_COLOR + '">&lt;SYSTEM INFO&gt;</span>' +
    '<span style="float:right">v' + ctx.v + '</span>';
    ctx.sysInfoPanel.innerHTML = html;
    if (DebugJS.SYS_INFO_FULL_OVERLAY) {
      ctx.sysInfoPanel.className = ctx.id + '-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.sysInfoPanel);
    } else {
      ctx.sysInfoPanel.className = ctx.id + '-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.sysInfoPanel);
      ctx.expandHightIfNeeded(ctx);
    }
    ctx.sysTimePanel = document.createElement('div');
    ctx.sysTimePanel.style.marginRight = '4px';
    ctx.sysTimePanel.color = '#fff';
    ctx.sysInfoPanel.appendChild(ctx.sysTimePanel);
    ctx.sysInfoPanelBody = document.createElement('div');
    ctx.sysInfoPanelBody.style.top = ctx.computedFontSize;
    ctx.sysInfoPanel.appendChild(ctx.sysInfoPanelBody);
    ctx.updateSystemTime();
  },

  updateSystemTime: function() {
    if (!(DebugJS.ctx.status & DebugJS.ST_SYS_INFO)) return;
    var time = (new Date()).getTime();
    var timeBin = DebugJS.formatBin(time.toString(2), false, 1);
    var html = '<pre><span style="color:' + DebugJS.ITEM_NAME_COLOR + '">SYSTEM TIME</span> : ' + DebugJS.convDateTimeStr(DebugJS.getDateTime(time)) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">         RAW</span>  (new Date()).getTime() = ' + time + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">         BIN</span>  ' + timeBin + '\n</pre>';
    DebugJS.ctx.sysTimePanel.innerHTML = html;
    setTimeout(DebugJS.ctx.updateSystemTime, DebugJS.UPDATE_INTERVAL_H);
  },

  closeSystemInfo: function(ctx) {
    if (ctx.sysInfoPanel != null) {
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.sysInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.sysInfoPanel);
        ctx.resetExpandedHeightIfNeeded(ctx);
      }
      ctx.sysInfoPanel = null;
    }
    ctx.status &= ~DebugJS.ST_SYS_INFO;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_SYS_INFO);
    ctx.updateSysInfoBtn(ctx);
    ctx.setIntervalL(ctx);
  },

  showSystemInfo: function(e) {
    var ctx = DebugJS.ctx;
    var INDENT = '                  ';
    var offset = (new Date()).getTimezoneOffset();
    var screenSize = 'width = ' + screen.width + ' x height = ' + screen.height;
    var languages = DebugJS.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="' + ctx.id + '-na">not loaded</span>';
    if (typeof jQuery != 'undefined') jq = 'v' + jQuery.fn.jquery;

    var metaTags = document.getElementsByTagName('meta');
    var charset;
    for (var i = 0; i < metaTags.length; i++) {
      charset = metaTags[i].getAttribute('charset');
      if (charset) {
        break;
      } else {
        charset = metaTags[i].getAttribute('content');
        if (charset) {
          var content = charset.match(/charset=(.*)/);
          if (content != null) {
            charset = content[1];
            break;
          }
        }
      }
    }
    if (charset == null) charset = '';

    var INDENT = '          ';
    var links = document.getElementsByTagName('link');
    var loadedStyles = '<span class="' + ctx.id + '-na">not loaded</span>';
    for (i = 0; i < links.length; i++) {
      if (links[i].rel == 'stylesheet') {
        if (i == 0) {
          loadedStyles = ctx.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        } else {
          loadedStyles += '\n' + INDENT + ctx.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var scripts = document.getElementsByTagName('script');
    var loadedScripts = '<span class="' + ctx.id + '-na">not loaded</span>';
    for (i = 0; i < scripts.length; i++) {
      if (scripts[i].src) {
        if (i == 0) {
          loadedScripts = ctx.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        } else {
          loadedScripts += '\n' + INDENT + ctx.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var navUserAgent = ctx.createFoldingText(navigator.userAgent, 'navUserAgent', DebugJS.OMIT_LAST);
    var navAppVersion = ctx.createFoldingText(navigator.appVersion, 'navAppVersion', DebugJS.OMIT_LAST);
    var winOnload = ctx.createFoldingText(window.onload, 'winOnload', DebugJS.OMIT_LAST);
    var winOnunload = ctx.createFoldingText(window.onunload, 'winOnunload', DebugJS.OMIT_LAST);
    var winOnclick = ctx.createFoldingText(window.onclick, 'winOnclick', DebugJS.OMIT_LAST);
    var winOnmousedown = ctx.createFoldingText(window.onmousedown, 'winOnmousedown', DebugJS.OMIT_LAST);
    var winOnmousemove = ctx.createFoldingText(window.onmousemove, 'winOnmousemove', DebugJS.OMIT_LAST);
    var winOnmouseup = ctx.createFoldingText(window.onmousedown, 'winOnmouseup', DebugJS.OMIT_LAST);
    var winOnkeydown = ctx.createFoldingText(window.onkeydown, 'winOnkeydown', DebugJS.OMIT_LAST);
    var winOnkeypress = ctx.createFoldingText(window.onkeypress, 'winOnkeypress', DebugJS.OMIT_LAST);
    var winOnkeyup = ctx.createFoldingText(window.onkeyup, 'winOnkeyup', DebugJS.OMIT_LAST);
    var winOncontextmenu = ctx.createFoldingText(window.oncontextmenu, 'winOncontextmenu', DebugJS.OMIT_LAST);
    var winOnresize = ctx.createFoldingText(window.oncontextmenu, 'winOnresize', DebugJS.OMIT_LAST);
    var winOnscroll = ctx.createFoldingText(window.oncontextmenu, 'winOnscroll', DebugJS.OMIT_LAST);
    var winOnselect = ctx.createFoldingText(window.oncontextmenu, 'winOnselect', DebugJS.OMIT_LAST);
    var winOnselectstart = ctx.createFoldingText(window.oncontextmenu, 'winOnselectstart', DebugJS.OMIT_LAST);
    var winOnerror = ctx.createFoldingText(window.onerror, 'winOnerror', DebugJS.OMIT_LAST);
    var docOnclick = ctx.createFoldingText(document.onclick, 'documentOnclick', DebugJS.OMIT_LAST);
    var docOnmousedown = ctx.createFoldingText(document.onmousedown, 'documentOnmousedown', DebugJS.OMIT_LAST);
    var docOnmousemove = ctx.createFoldingText(document.onmousemove, 'documentOnmousemove', DebugJS.OMIT_LAST);
    var docOnmouseup = ctx.createFoldingText(document.onmousedown, 'documentOnmouseup', DebugJS.OMIT_LAST);
    var docOnkeydown = ctx.createFoldingText(document.onkeydown, 'documentOnkeydown', DebugJS.OMIT_LAST);
    var docOnkeypress = ctx.createFoldingText(document.onkeypress, 'documentOnkeypress', DebugJS.OMIT_LAST);
    var docOnkeyup = ctx.createFoldingText(document.onkeyup, 'documentOnkeyup', DebugJS.OMIT_LAST);
    var docOnselectstart = ctx.createFoldingText(document.onselectstart, 'documentOnselectstart', DebugJS.OMIT_LAST);
    var docOncontextmenu = ctx.createFoldingText(document.oncontextmenu, 'documentOncontextmenu', DebugJS.OMIT_LAST);

    var html = '<pre>';
    html += '              getTimezoneOffset() = ' + offset + ' (UTC' + DebugJS.getTimeOffsetStr(offset, true) + ')\n';
    html += '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">screen.</span>     : ' + screenSize + '\n';
    html += '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">Browser</span>     : ' + DebugJS.browserColoring(browser.name) + ' ' + browser.version + '\n';
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('navigator');
    html += DebugJS.addSysInfoProp('userAgent  ', navUserAgent);
    html += DebugJS.addSysInfoProp('language       ', DebugJS.setStyleIfObjNA(navigator.language));
    html += DebugJS.addSysInfoProp('browserLanguage', DebugJS.setStyleIfObjNA(navigator.browserLanguage));
    html += DebugJS.addSysInfoProp('userLanguage   ', DebugJS.setStyleIfObjNA(navigator.userLanguage));
    html += DebugJS.addSysInfoProp('languages      ', languages);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoProp('charset', charset);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoProp('jQuery ', jq);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoProp('css    ', loadedStyles);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoProp('script ', loadedScripts);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('navigator');
    html += DebugJS.addSysInfoProp('appCodeName  ', DebugJS.setStyleIfObjNA(navigator.appCodeName));
    html += DebugJS.addSysInfoProp('appName      ', DebugJS.setStyleIfObjNA(navigator.appName));
    html += DebugJS.addSysInfoProp('appVersion   ', navAppVersion);
    html += DebugJS.addSysInfoProp('buildID      ', DebugJS.setStyleIfObjNA(navigator.buildID));
    html += DebugJS.addSysInfoProp('product      ', DebugJS.setStyleIfObjNA(navigator.product));
    html += DebugJS.addSysInfoProp('productSub   ', DebugJS.setStyleIfObjNA(navigator.productSub));
    html += DebugJS.addSysInfoProp('vendor       ', DebugJS.setStyleIfObjNA(navigator.vendor));
    html += DebugJS.addSysInfoProp('platform     ', DebugJS.setStyleIfObjNA(navigator.platform));
    html += DebugJS.addSysInfoProp('oscpu        ', DebugJS.setStyleIfObjNA(navigator.oscpu));
    html += DebugJS.addSysInfoProp('cookieEnabled', navigator.cookieEnabled);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('window');
    html += DebugJS.addSysInfoProp('devicePixelRatio', window.devicePixelRatio, 'sys-win-h');
    html += DebugJS.addSysInfoProp('outerWidth   ', window.outerWidth, 'sys-win-w');
    html += DebugJS.addSysInfoProp('outerHeight  ', window.outerHeight, 'sys-win-h');
    html += DebugJS.addSysInfoProp('scrollX      ', DebugJS.setStyleIfObjNA(window.scrollX), 'sys-scroll-x');
    html += DebugJS.addSysInfoProp('pageXOffset  ', window.pageXOffset, 'sys-pgoffset-x');
    html += DebugJS.addSysInfoProp('scrollY      ', DebugJS.setStyleIfObjNA(window.scrollY), 'sys-scroll-y');
    html += DebugJS.addSysInfoProp('pageYOffset  ', window.pageYOffset, 'sys-pgoffset-y');
    html += DebugJS.addSysInfoProp('onload       ', winOnload);
    html += DebugJS.addSysInfoProp('onunload     ', winOnunload);
    html += DebugJS.addSysInfoProp('onclick      ', winOnclick);
    html += DebugJS.addSysInfoProp('onmousedown  ', winOnmousedown);
    html += DebugJS.addSysInfoProp('onmousemove  ', winOnmousemove);
    html += DebugJS.addSysInfoProp('onmouseup    ', winOnmouseup);
    html += DebugJS.addSysInfoProp('onkeydown    ', winOnkeydown);
    html += DebugJS.addSysInfoProp('onkeypress   ', winOnkeypress);
    html += DebugJS.addSysInfoProp('onkeyup      ', winOnkeyup);
    html += DebugJS.addSysInfoProp('onresize     ', winOnresize);
    html += DebugJS.addSysInfoProp('onscroll     ', winOnscroll);
    html += DebugJS.addSysInfoProp('onselect     ', winOnselect);
    html += DebugJS.addSysInfoProp('onselectstart', winOnselectstart);
    html += DebugJS.addSysInfoProp('oncontextmenu', winOncontextmenu);
    html += DebugJS.addSysInfoProp('onerror      ', winOnerror);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('document');
    html += DebugJS.addSysInfoPropH(' documentElement');
    html += DebugJS.addSysInfoProp(' clientWidth ', document.documentElement.clientWidth, 'sys-cli-w');
    html += DebugJS.addSysInfoProp(' clientHeight', document.documentElement.clientHeight, 'sys-cli-h');
    html += DebugJS.addSysInfoProp(' scrollLeft  ', document.documentElement.scrollLeft, 'sys-cli-scroll-x');
    html += DebugJS.addSysInfoProp(' scrollTop   ', document.documentElement.scrollTop, 'sys-cli-scroll-y');
    html += DebugJS.addSysInfoPropH(' body');
    html += DebugJS.addSysInfoProp(' clientWidth ', document.body.clientWidth, 'sys-body-w');
    html += DebugJS.addSysInfoProp(' clientHeight', document.body.clientHeight, 'sys-body-h');
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoProp('onclick      ', docOnclick);
    html += DebugJS.addSysInfoProp('onmousedown  ', docOnmousedown);
    html += DebugJS.addSysInfoProp('onmousemove  ', docOnmousemove);
    html += DebugJS.addSysInfoProp('onmouseup    ', docOnmouseup);
    html += DebugJS.addSysInfoProp('onkeydown    ', docOnkeydown);
    html += DebugJS.addSysInfoProp('onkeypress   ', docOnkeypress);
    html += DebugJS.addSysInfoProp('onkeyup      ', docOnkeyup);
    html += DebugJS.addSysInfoProp('onselectstart', docOnselectstart);
    html += DebugJS.addSysInfoProp('oncontextmenu', docOncontextmenu);
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH(' location');
    html += DebugJS.addSysInfoProp(' href    ', ctx.createFoldingText(document.location, 'docLocation', DebugJS.OMIT_MID));
    html += DebugJS.addSysInfoProp(' origin  ', ctx.createFoldingText(document.location.origin, 'origin', DebugJS.OMIT_MID));
    html += DebugJS.addSysInfoProp(' protocol', location.protocol);
    html += DebugJS.addSysInfoProp(' host    ', ctx.createFoldingText(document.location.host, 'host', DebugJS.OMIT_MID));
    html += DebugJS.addSysInfoProp(' port    ', location.port);
    html += DebugJS.addSysInfoProp(' pathname', ctx.createFoldingText(document.location.pathname, 'pathname', DebugJS.OMIT_MID));
    html += DebugJS.addSysInfoProp('baseURI  ', ctx.createFoldingText(document.baseURI, 'docBaseURL', DebugJS.OMIT_MID));
    html += DebugJS.addSysInfoProp('cookie', ctx.createFoldingText(document.cookie, 'cookie', DebugJS.OMIT_MID));
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('localStorage');
    if (DebugJS.LS_AVAILABLE) {
      html += ' <span class="' + ctx.id + '-btn" onclick="DebugJS.ctx.clearLocalStrage();">clear()</span>\n' +
              '<span id="' + ctx.id + '-sys-ls"></span>\n';
    } else {
      html += ' <span class="' + ctx.id + '-na">undefined</span>';
    }
    html += DebugJS.addPropSeparator(ctx);
    html += DebugJS.addSysInfoPropH('sessionStorage');
    if (DebugJS.SS_AVAILABLE) {
      html += ' <span class="' + ctx.id + '-btn" onclick="DebugJS.ctx.clearSessionStrage();">clear()</span>\n' +
              '<span id="' + ctx.id + '-sys-ss"></span>\n';
    } else {
      html += ' <span class="' + ctx.id + '-na">undefined</span>';
    }
    html += DebugJS.addPropSeparator(ctx);
    html += '\n</pre>';
    ctx.sysInfoPanelBody.innerHTML = html;
    if (DebugJS.LS_AVAILABLE) {
      ctx.updateStrageInfo(0);
    }
    if (DebugJS.SS_AVAILABLE) {
      ctx.updateStrageInfo(1);
    }
  },

  clearLocalStrage: function() {
    localStorage.clear();
    DebugJS.ctx.updateStrageInfo(0);
  },

  removeLocalStrage: function(key) {
    localStorage.removeItem(key);
    DebugJS.ctx.updateStrageInfo(0);
  },

  clearSessionStrage: function() {
    sessionStorage.clear();
    DebugJS.ctx.updateStrageInfo(1);
  },

  removeSessionStrage: function(key) {
    sessionStorage.removeItem(key);
    DebugJS.ctx.updateStrageInfo(1);
  },

  updateStrageInfo: function(type) {
    var ctx = DebugJS.ctx;
    var strg, nm, rmvFn, id;
    if (type == 0) {
      strg = localStorage;
      nm = 'localStorage';
      rmvFn = 'removeLocalStrage';
      id = 'ls';
    } else {
      strg = sessionStorage;
      nm = 'sessionStorage';
      rmvFn = 'removeSessionStrage';
      id = 'ss';
    }
    var html = ' <span style="color:' + DebugJS.ITEM_NAME_COLOR + '">length</span> = ' + strg.length + '\n' +
               ' <span style="color:' + DebugJS.ITEM_NAME_COLOR + '">key</span>';
    if (DebugJS.LS_AVAILABLE) {
      for (var i = 0; i < strg.length; i++) {
        var key = strg.key(i);
        if (i != 0) {
          html += '\n    ';
        }
        var getCode = nm + '.getItem(\'' + key + '\')';
        var rmvCode = nm + '.removeItem(\'' + key + '\')';
        html += '(' + i + ') = ' + '<span class="' + ctx.id + '-btn ' + ctx.id + '-btn-wh" onclick="DebugJS._log(DebugJS.escEncString(' + getCode + '));" title="' + getCode + '">' + key + '</span>' +
                ' <span class="' + ctx.id + '-btn ' + ctx.id + '-btn-red" onclick="DebugJS.ctx.' + rmvFn + '(\'' + key + '\');" title="' + rmvCode + '">x</span>';
      }
    }
    document.getElementById(ctx.id + '-sys-' + id).innerHTML = html;
  },

  showHideByName: function(name) {
    var ctx = DebugJS.ctx;
    var btn = document.getElementById(ctx.id + '-' + name + '__button');
    var partialBody = document.getElementById(ctx.id + '-' + name + '__partial-body');
    var body = document.getElementById(ctx.id + '-' + name + '__body');
    if ((body) && ((!body.style.display) || (body.style.display == 'none'))) {
      btn.innerHTML = DebugJS.CLOSEBTN;
      partialBody.style.display = 'none';
      body.style.display = 'block';
      if (ctx.elmInfoShowHideStatus[name] != undefined) {
        ctx.elmInfoShowHideStatus[name] = true;
      }
    } else {
      btn.innerHTML = DebugJS.EXPANDBTN;
      partialBody.style.display = 'inline';
      body.style.display = 'none';
      if (ctx.elmInfoShowHideStatus[name] != undefined) {
        ctx.elmInfoShowHideStatus[name] = false;
      }
    }
  },

  createFoldingText: function(obj, name, omitpart, lineMaxLen, style, show) {
    var ctx = DebugJS.ctx;
    var DFLT_MAX_LEN = 50;
    var foldingText;
    if ((lineMaxLen == undefined) || (lineMaxLen < 0)) lineMaxLen = DFLT_MAX_LEN;
    if (!style) style = 'color:#aaa';
    if (!obj) {
      foldingText = '<span class="' + ctx.id + '-na">' + obj + '</span>';
    } else {
      var btn = DebugJS.EXPANDBTN;
      var partDisplay = 'inline';
      var bodyDisplay = 'none';
      if (show) {
        btn = DebugJS.CLOSEBTN;
        partDisplay = 'none';
        bodyDisplay = 'block';
      }
      foldingText = obj + '';
      if ((foldingText.indexOf('\n') >= 1) || (foldingText.length > lineMaxLen)) {
        partial = DebugJS.trimDownText2(foldingText, lineMaxLen, omitpart, style);
        foldingText = '<span class="' + ctx.id + '-showhide-btn ' + ctx.id + '-nomove" id="' + ctx.id + '-' + name + '__button" onclick="DebugJS.ctx.showHideByName(\'' + name + '\')">' + btn + '</span> ' +
        '<span id="' + ctx.id + '-' + name + '__partial-body" style="display:' + partDisplay + '">' + partial + '</span>' +
        '<div style="display:' + bodyDisplay + '" id="' + ctx.id + '-' + name + '__body">' + obj + '</div>';
      } else {
        foldingText = obj;
      }
    }
    return foldingText;
  },

  toggleElmInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_ELM_INSPECTING) {
      ctx.closeElmInfo(ctx);
    } else {
      ctx.openElmInfo(ctx);
    }
  },

  openElmInfo: function(ctx) {
    ctx.status |= DebugJS.ST_ELM_INSPECTING;
    ctx.featStack.push(DebugJS.ST_ELM_INSPECTING);
    if (ctx.elmInfoPanel == null) {
      ctx.createElmInfoPanel(ctx);
    }
    ctx.updateElmInfoBtn(ctx);
    ctx.updateElmSelectBtn();
    ctx.updateElmHighlightBtn();
  },

  createElmInfoPanel: function(ctx) {
    ctx.elmInfoPanel = document.createElement('div');
    if (DebugJS.ELM_INFO_FULL_OVERLAY) {
      ctx.elmInfoPanel.className = ctx.id + '-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.elmInfoPanel);
    } else {
      ctx.elmInfoPanel.className = ctx.id + '-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.elmInfoPanel);
      ctx.expandHightIfNeeded(ctx);
    }

    ctx.elmInfoHeaderPanel = document.createElement('div');
    ctx.elmInfoPanel.appendChild(ctx.elmInfoHeaderPanel);

    ctx.elmPrevBtn = ctx.createElmInfoHeadBtn('<<', ctx.showPrevElem);
    ctx.setStyle(ctx.elmPrevBtn, 'color', DebugJS.COLOR_INACTIVE);

    ctx.elmTitle = document.createElement('span');
    ctx.elmTitle.style.marginLeft = '4px';
    ctx.elmTitle.style.marginRight = '4px';
    ctx.setStyle(ctx.elmTitle, 'color', DebugJS.DOM_BTN_COLOR);
    ctx.elmTitle.innerText = 'ELEMENT INFO';
    ctx.elmInfoHeaderPanel.appendChild(ctx.elmTitle);

    ctx.elmNextBtn = ctx.createElmInfoHeadBtn('>>', ctx.showNextElem);
    ctx.setStyle(ctx.elmNextBtn, 'color', DebugJS.COLOR_INACTIVE);

    ctx.elmSelectBtn = ctx.createElmInfoHeadBtn('SELECT', ctx.toggleElmSelectMode);
    ctx.elmSelectBtn.style.marginLeft = '8px';
    ctx.elmSelectBtn.style.marginRight = '4px';

    ctx.elmHighlightBtn = ctx.createElmInfoHeadBtn('HIGHLIGHT', ctx.toggleElmHighlightMode);
    ctx.elmHighlightBtn.style.marginLeft = '4px';
    ctx.elmHighlightBtn.style.marginRight = '4px';

    ctx.elmUpdateBtn = ctx.createElmInfoHeadBtn('UPDATE', ctx.updateElementInfo);
    ctx.elmUpdateBtn.style.marginLeft = '4px';
    ctx.setStyle(ctx.elmUpdateBtn, 'color', DebugJS.COLOR_INACTIVE);

    var UPDATE_COLOR = '#ccc';
    var label1 = ctx.createLabel(':', ctx.elmInfoHeaderPanel);
    label1.style.marginRight = '0px';
    ctx.setStyle(label1, 'color', UPDATE_COLOR);

    ctx.elmUpdateInput = ctx.createTextInput('30px', 'right', UPDATE_COLOR, ctx.elmUpdateInterval, ctx.onchangeElmUpdateInterval);
    ctx.elmInfoHeaderPanel.appendChild(ctx.elmUpdateInput);

    var label2 = ctx.createLabel('ms', ctx.elmInfoHeaderPanel);
    label2.style.marginLeft = '2px';
    ctx.setStyle(label2, 'color', UPDATE_COLOR);

    ctx.elmNumPanel = document.createElement('span');
    ctx.elmNumPanel.style.float = 'right';
    ctx.elmNumPanel.style.marginRight = '4px';
    ctx.elmInfoHeaderPanel.appendChild(ctx.elmNumPanel);
    ctx.updateElementInfoInterval();

    ctx.elmDelBtn = ctx.createElmInfoHeadBtn('DEL', ctx.delTargetElm);
    ctx.elmDelBtn.style.float = 'right';
    ctx.elmDelBtn.style.marginRight = '4px';
    ctx.setStyle(ctx.elmDelBtn, 'color', DebugJS.COLOR_INACTIVE);

    ctx.elmCapBtn = ctx.createElmInfoHeadBtn('CAPTURE', ctx.exportTargetElm);
    ctx.elmCapBtn.style.float = 'right';
    ctx.elmCapBtn.style.marginRight = '4px';
    ctx.setStyle(ctx.elmCapBtn, 'color', DebugJS.COLOR_INACTIVE);

    ctx.elmInfoBodyPanel = document.createElement('div');
    ctx.elmInfoBodyPanel.style.width = '100%';
    ctx.elmInfoBodyPanel.style.height = 'calc(100% - 1.3em)';
    ctx.elmInfoBodyPanel.style.overflow = 'auto';
    ctx.elmInfoPanel.appendChild(ctx.elmInfoBodyPanel);
  },

  createElmInfoHeadBtn: function(label, handler) {
    var ctx = DebugJS.ctx;
    var btn = ctx.createBtn(ctx, label, ctx.elmInfoHeaderPanel);
    btn.onclick = handler;
    return btn;
  },

  closeElmInfo: function(ctx) {
    if (ctx.targetElm) {
      if (typeof ctx.targetElm.className == 'string') {
        DebugJS.removeClass(ctx.targetElm, ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
      }
      ctx.targetElm = null;
    }
    if (ctx.elmInfoPanel != null) {
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.elmInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.elmInfoPanel);
        ctx.resetExpandedHeightIfNeeded(ctx);
      }
      ctx.elmInfoPanel = null;
      ctx.elmInfoBodyPanel = null;
      ctx.elmNumPanel = null;
    }
    ctx.updateTargetElm(null);
    ctx.status &= ~DebugJS.ST_ELM_INSPECTING;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_ELM_INSPECTING);
    ctx.updateElmInfoBtn(ctx);
  },

  inspectElement: function(x, y) {
    var ctx = DebugJS.ctx;
    if ((!(ctx.elmInfoStatus & DebugJS.ELMINFO_ST_SELECT)) || (ctx.isOnDbgWin(x, y))) return;
    var el = document.elementFromPoint(x, y);
    if (el != ctx.targetElm) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },

  showElementInfo: function(el) {
    if (!el) return;
    var ctx = DebugJS.ctx;
    var OMIT_STYLE = 'color:#888';
    var OMIT_STYLE2 = 'color:#666';
    var html = '<pre>';
    if (el.tagName) {
      DebugJS.dom = el;
      var computedStyle = window.getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      var rectT = Math.round(rect.top);
      var rectL = Math.round(rect.left);
      var rectR = Math.round(rect.right);
      var rectB = Math.round(rect.bottom);
      var MAX_LEN = 50;
      var text = '';
      if ((el.tagName != 'HTML') && (el.tagName != 'BODY')) {
        if (el.tagName == 'META') {
          text = DebugJS.escTags(el.outerHTML);
        } else {
          if (el.innerText != undefined) {
            text = DebugJS.escTags(el.innerText);
          }
        }
      }
      var txt = ctx.createFoldingText(text, 'text', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE, ctx.elmInfoShowHideStatus.text);
      var className = el.className + '';
      className = className.replace(ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX, '<span style="' + OMIT_STYLE2 + '">' + ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX + '</span>');
      var href = (el.href ? ctx.createFoldingText(el.href, 'elHref', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : DebugJS.setStyleIfObjNA(el.href));
      var src = (el.src ? ctx.createFoldingText(el.src, 'elSrc', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : DebugJS.setStyleIfObjNA(el.src));
      var backgroundColor = computedStyle.backgroundColor;
      var bgColor16 = DebugJS.getElmHexColor(backgroundColor);
      var color = computedStyle.color;
      var color16 = DebugJS.getElmHexColor(color);
      var borderColorT = computedStyle.borderTopColor;
      var borderColorT16 = DebugJS.getElmHexColor(borderColorT);
      var borderColorR = computedStyle.borderRightColor;
      var borderColorR16 = DebugJS.getElmHexColor(borderColorR);
      var borderColorB = computedStyle.borderBottomColor;
      var borderColorB16 = DebugJS.getElmHexColor(borderColorB);
      var borderColorL = computedStyle.borderLeftColor;
      var borderColorL16 = DebugJS.getElmHexColor(borderColorL);
      var borderT = 'top   : ' + computedStyle.borderTopWidth + ' ' + computedStyle.borderTopStyle + ' ' + borderColorT + ' ' + borderColorT16 + ' ' + DebugJS.getColorBlock(borderColorT);
      var borderRBL = '            right : ' + computedStyle.borderRightWidth + ' ' + computedStyle.borderRightStyle + ' ' + borderColorR + ' ' + borderColorR16 + ' ' + DebugJS.getColorBlock(borderColorR) + '\n' +
                      '            bottom: ' + computedStyle.borderBottomWidth + ' ' + computedStyle.borderBottomStyle + ' ' + borderColorR + ' ' + borderColorB16 + ' ' + DebugJS.getColorBlock(borderColorB) + '\n' +
                      '            left  : ' + computedStyle.borderLeftWidth + ' ' + computedStyle.borderLeftStyle + ' ' + borderColorL + ' ' + borderColorL16 + ' ' + DebugJS.getColorBlock(borderColorL);
      var allStyles = '';
      var MIN_KEY_LEN = 20;
      for (var key in computedStyle) {
        if (!(key.match(/^\d.*/))) {
          if (typeof computedStyle[key] != 'function') {
            var indent = '';
            if (key.length < MIN_KEY_LEN) {
              for (var i = 0; i < (MIN_KEY_LEN - key.length); i++) {
                indent += ' ';
              }
            }
            allStyles += ' ' + key + indent + ': ' + computedStyle[key] + '\n';
          }
        }
      }
      allStylesFolding = ctx.createFoldingText(allStyles, 'allStyles', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus.allStyles);
      var name = (el.name == undefined) ? DebugJS.setStyleIfObjNA(el.name) : DebugJS.escTags(el.name);
      var val = (el.value == undefined) ? DebugJS.setStyleIfObjNA(el.value) : DebugJS.escSpclChr(el.value);

      html += '<span style="color:#8f0;display:inline-block;height:14px">#text</span> ' + txt + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'id        : ' + el.id + '\n' +
      'className : ' + className + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'object    : ' + Object.prototype.toString.call(el) + '\n' +
      'tagName   : ' + el.tagName + '\n' +
      'type      : ' + DebugJS.setStyleIfObjNA(el.type) + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'display   : ' + computedStyle.display + '\n' +
      'position  : ' + computedStyle.position + '\n' +
      'z-index   : ' + computedStyle.zIndex + '\n' +
      'float     : ' + computedStyle.cssFloat + ' / clear: ' + computedStyle.clear + '\n' +
      'size      : W:' + ((rectR - rectL) + 1) + ' x H:' + ((rectB - rectT) + 1) + ' px\n' +
      'margin    : ' + computedStyle.marginTop + ' ' + computedStyle.marginRight + ' ' + computedStyle.marginBottom + ' ' + computedStyle.marginLeft + '\n' +
      'border    : ' + borderT + ' ' + ctx.createFoldingText(borderRBL, 'elBorder', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus.elBorder) + '\n' +
      'padding   : ' + computedStyle.paddingTop + ' ' + computedStyle.paddingRight + ' ' + computedStyle.paddingBottom + ' ' + computedStyle.paddingLeft + '\n' +
      'lineHeight: ' + computedStyle.lineHeight + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'location  : <span style="color:#aaa">winOffset + pageOffset = pos (computedStyle)</span>\n' +
      '            top   : ' + rectT + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.top + window.pageYOffset) + ' px (' + computedStyle.top + ')\n' +
      '            left  : ' + rectL + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.left + window.pageXOffset) + ' px (' + computedStyle.left + ')\n' +
      '            right : ' + rectR + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.right + window.pageXOffset) + ' px (' + computedStyle.right + ')\n' +
      '            bottom: ' + rectB + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.bottom + window.pageYOffset) + ' px (' + computedStyle.bottom + ')\n' +
      'scroll    : top = ' + el.scrollTop + ' / left = ' + el.scrollLeft + '\n' +
      'overflow  : ' + computedStyle.overflow + '\n' +
      'opacity   : ' + computedStyle.opacity + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'bg-color  : ' + backgroundColor + ' ' + bgColor16 + ' ' + DebugJS.getColorBlock(backgroundColor) + '\n' +
      'bg-image  : ' + ctx.createFoldingText(computedStyle.backgroundImage, 'bgimg', DebugJS.OMIT_LAST, -1, OMIT_STYLE) + '\n' +
      'color     : ' + color + ' ' + color16 + ' ' + DebugJS.getColorBlock(color) + '\n' +
      'font      : -size  : ' + computedStyle.fontSize + '\n' +
      '            -family: ' + computedStyle.fontFamily + '\n' +
      '            -weight: ' + computedStyle.fontWeight + '\n' +
      '            -style : ' + computedStyle.fontStyle + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'All Styles: window.getComputedStyle(element) ' + allStylesFolding + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'name      : ' + name + '\n' +
      'value     : ' + ctx.createFoldingText(val, 'elValue', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE) + '\n' +
      'disabled  : ' + DebugJS.setStyleIfObjNA(el.disabled, true) + '\n' +
      'hidden    : ' + el.hidden + '\n' +
      'tabIndex  : ' + el.tabIndex + '\n' +
      'accessKey : ' + el.accessKey + '\n' +
      'maxLength : ' + DebugJS.setStyleIfObjNA(el.maxLength) + '\n' +
      'checked   : ' + DebugJS.setStyleIfObjNA(el.checked, true) + '\n' +
      'htmlFor   : ' + DebugJS.setStyleIfObjNA(el.htmlFor) + '\n' +
      'selectedIndex: ' + DebugJS.setStyleIfObjNA(el.selectedIndex) + '\n' +
      'contentEditable: ' + el.contentEditable + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'href      : ' + href + '\n' +
      'src       : ' + src + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'onclick      : ' + ctx.getEvtHandlerStr(el.onclick, 'elOnclick') + '\n' +
      'ondblclick   : ' + ctx.getEvtHandlerStr(el.ondblclick, 'elOnDblClick') + '\n' +
      'onmousedown  : ' + ctx.getEvtHandlerStr(el.onmousedown, 'elOnMouseDown') + '\n' +
      'onmouseup    : ' + ctx.getEvtHandlerStr(el.onmouseup, 'elOnMouseUp') + '\n' +
      'onmouseover  : ' + ctx.getEvtHandlerStr(el.onmouseover, 'elOnMouseOver') + '\n' +
      'onmouseout   : ' + ctx.getEvtHandlerStr(el.onmouseout, 'elOnMouseOut') + '\n' +
      'onmousemove  : ' + ctx.getEvtHandlerStr(el.onmousemove, 'elOnMouseMove') + '\n' +
      'oncontextmenu: ' + ctx.getEvtHandlerStr(el.oncontextmenu, 'elOnContextmenu') + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'onkeydown    : ' + ctx.getEvtHandlerStr(el.onkeydown, 'elOnKeyDown') + '\n' +
      'onkeypress   : ' + ctx.getEvtHandlerStr(el.onkeypress, 'elOnKeyPress') + '\n' +
      'onkeyup      : ' + ctx.getEvtHandlerStr(el.onkeyup, 'elOnKeyUp') + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'onfocus      : ' + ctx.getEvtHandlerStr(el.onfocus, 'elOnFocus') + '\n' +
      'onblur       : ' + ctx.getEvtHandlerStr(el.onblur, 'elOnBlur') + '\n' +
      'onchange     : ' + ctx.getEvtHandlerStr(el.onchange, 'elOnChange') + '\n' +
      'oninput      : ' + ctx.getEvtHandlerStr(el.oninput, 'elOnInput') + '\n' +
      'onselect     : ' + ctx.getEvtHandlerStr(el.onselect, 'elOnSelect') + '\n' +
      'onselectstart: ' + ctx.getEvtHandlerStr(el.onselectstart, 'elOnSelectStart') + '\n' +
      'onsubmit     : ' + ctx.getEvtHandlerStr(el.onsubmit, 'elOnSubmit') + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'onscroll     : ' + ctx.getEvtHandlerStr(el.onscroll, 'elOnScroll') + '\n' +
      DebugJS.addPropSeparator(ctx) +
      'dataset (data-*):\n';
      if (el.dataset) {
        html += '{' + ((Object.keys(el.dataset).length > 0) ? '\n' : '');
        for (var data in el.dataset) {
          html += ' ' + data + ': ' + el.dataset[data] + '\n';
        }
        html += '}';
      } else {
        html += '<span style="color:#aaa">' + el.dataset + '</span>';
      }
      var htmlSrc = (el.outerHTML ? el.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;') : DebugJS.setStyleIfObjNA(el.outerHTML));
      htmlSrc = ctx.createFoldingText(htmlSrc, 'htmlSrc', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus.htmlSrc);
      html += DebugJS.addPropSeparator(ctx) +
      'outerHTML: ' + htmlSrc;
    }
    html += '</pre>';
    ctx.elmInfoBodyPanel.innerHTML = html;
    ctx.showAllElmNum();
  },

  showPrevElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.targetElm) return;
    var el = ctx.targetElm.previousElementSibling;
    if ((el != null) && (el.id == ctx.id)) {
      el = ctx.targetElm.previousElementSibling;
    }
    if (el == null) {
      el = ctx.targetElm.parentNode;
    } else {
      if (el.childElementCount > 0) {
        var lastChild = el.lastElementChild;
        while (lastChild.childElementCount > 0) {
          lastChild = lastChild.lastElementChild;
        }
        el = lastChild;
      }
    }
    if (el) {
      if (!(el instanceof HTMLDocument)) {
        ctx.showElementInfo(el);
        ctx.updateTargetElm(el);
      }
    }
  },

  showNextElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.targetElm) return;
    var el = ctx.targetElm.firstElementChild;
    if ((el == null) || ((el != null) && (el.id == ctx.id))) {
      el = ctx.targetElm.nextElementSibling;
      if (el == null) {
        var parentNode = ctx.targetElm.parentNode;
        if (parentNode) {
          do {
            el = parentNode.nextElementSibling;
            if ((el != null) && (el.id != ctx.id)) {
              break;
            }
            parentNode = parentNode.parentNode;
          } while ((parentNode != null) && (parentNode.tagName != 'HTML'));
        }
      }
    }
    if (el) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },

  updateTargetElm: function(el) {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_ST_HIGHLIGHT) {
      ctx.highlightElement(ctx.targetElm, el);
    }
    if (el) {
      ctx.targetElm = el;
      ctx.setStyle(ctx.elmPrevBtn, 'color', ctx.opt.btnColor);
      ctx.setStyle(ctx.elmNextBtn, 'color', ctx.opt.btnColor);
      ctx.setStyle(ctx.elmUpdateBtn, 'color', ctx.opt.btnColor);
      ctx.setStyle(ctx.elmCapBtn, 'color', ctx.opt.btnColor);
      ctx.setStyle(ctx.elmDelBtn, 'color', '#a88');
    }
  },

  highlightElement: function(removeTarget, setTarget) {
    var ctx = DebugJS.ctx;
    if ((removeTarget) && (typeof removeTarget.className == 'string')) {
      DebugJS.removeClass(removeTarget, ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
    }
    if ((setTarget) && (typeof setTarget.className == 'string')) {
      DebugJS.addClass(setTarget, ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
    }
  },

  updateElementInfo: function() {
    DebugJS.ctx.showAllElmNum();
    DebugJS.ctx.showElementInfo(DebugJS.ctx.targetElm);
  },

  showAllElmNum: function() {
    DebugJS.ctx.elmNumPanel.innerHTML = '(All: ' + document.getElementsByTagName('*').length + ')';
  },

  onchangeElmUpdateInterval: function() {
    var ctx = DebugJS.ctx;
    var interval = ctx.elmUpdateInput.value;
    if (interval == '') {
      interval = 0;
    }
    if (isFinite(interval)) {
      ctx.elmUpdateInterval = interval;
      clearTimeout(ctx.elmUpdateTimerId);
      ctx.elmUpdateTimerId = setTimeout(ctx.updateElementInfoInterval, ctx.elmUpdateInterval);
    }
  },

  updateElementInfoInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_ELM_INSPECTING)) return;
    ctx.updateElementInfo();
    if (ctx.elmUpdateInterval > 0) {
      ctx.elmUpdateTimerId = setTimeout(ctx.updateElementInfoInterval, ctx.elmUpdateInterval);
    }
  },

  toggleElmSelectMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_ST_SELECT) {
      ctx.elmInfoStatus &= ~DebugJS.ELMINFO_ST_SELECT;
    } else {
      ctx.elmInfoStatus |= DebugJS.ELMINFO_ST_SELECT;
    }
    ctx.updateElmSelectBtn();
  },

  updateElmSelectBtn: function() {
    DebugJS.ctx.setStyle(DebugJS.ctx.elmSelectBtn, 'color', (DebugJS.ctx.elmInfoStatus & DebugJS.ELMINFO_ST_SELECT) ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACTIVE);
  },

  toggleElmHighlightMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_ST_HIGHLIGHT) {
      ctx.elmInfoStatus &= ~DebugJS.ELMINFO_ST_HIGHLIGHT;
      ctx.highlightElement(ctx.targetElm, null);
    } else {
      ctx.elmInfoStatus |= DebugJS.ELMINFO_ST_HIGHLIGHT;
      ctx.highlightElement(null, ctx.targetElm);
    }
    ctx.updateElmHighlightBtn();
  },

  updateElmHighlightBtn: function() {
    DebugJS.ctx.setStyle(DebugJS.ctx.elmHighlightBtn, 'color', (DebugJS.ctx.elmInfoStatus & DebugJS.ELMINFO_ST_HIGHLIGHT) ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACTIVE);
  },

  exportTargetElm: function() {
    if (DebugJS.ctx.targetElm) DebugJS.ctx.captureElm(DebugJS.ctx.targetElm);
  },

  captureElm: function(elm) {
    var ctx = DebugJS.ctx;
    DebugJS.el = elm;
    if (DebugJS.G_EL_AVAILABLE) el = elm;
    if (ctx.status & DebugJS.ST_ELM_EDIT) {
      ctx.updateEditable(ctx, elm);
    }
    DebugJS._log.s('&lt;' + elm.tagName + '&gt; object has been exported to <span style="color:' + DebugJS.KEYWORD_COLOR + '">' + (DebugJS.G_EL_AVAILABLE ? 'el' : ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.el') + '</span>');
  },

  delTargetElm: function() {
    var e = DebugJS.ctx.targetElm;
    if (e) {
      var p = e.parentNode;
      if (p) {
        p.removeChild(e);
        DebugJS.ctx.showElementInfo(p);
        DebugJS.ctx.updateTargetElm(p);
      }
    }
  },

  updateEditable: function(ctx, el) {
    if ((ctx.txtChkTargetEl) && (ctx.txtChkTargetEl.contentEditableBak)) {
      ctx.txtChkTargetEl.contentEditable = ctx.txtChkTargetEl.contentEditableBak;
    }
    ctx.txtChkTargetEl = el;
    ctx.txtChkTargetEl.contentEditableBak = el.contentEditable;
    ctx.txtChkTargetEl.contentEditable = true;
  },

  getEvtHandlerStr: function(handler, name) {
    var MAX_LEN = 300;
    var s = '';
    if (handler) {
      s = handler.toString();
      s = s.replace(/\n/g, '');
      s = s.replace(/[^.]{1,}\{/, '');
      s = s.replace(/\}$/, '');
      s = s.replace(/^\s{1,}/, '');
    } else {
      s = '<span style="color:#aaa">null</span>';
    }
    s = DebugJS.ctx.createFoldingText(s, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return s;
  },

  toggleHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_HTML_SRC) {
      ctx.closeHtmlSrc(ctx);
    } else {
      ctx.openHtmlSrc(ctx);
    }
  },

  openHtmlSrc: function(ctx) {
    ctx.status |= DebugJS.ST_HTML_SRC;
    ctx.featStack.push(DebugJS.ST_HTML_SRC);
    if (ctx.htmlSrcPanel == null) ctx.createHtmlSrcPanel(ctx);
    ctx.updateHtmlSrcBtn(ctx);
    ctx.showHtmlSrc();
  },

  createHtmlSrcPanel: function(ctx) {
    ctx.htmlSrcPanel = document.createElement('div');
    if (DebugJS.HTML_SRC_FULL_OVERLAY) {
      ctx.htmlSrcPanel.className = ctx.id + '-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.htmlSrcPanel);
    } else {
      ctx.htmlSrcPanel.className = ctx.id + '-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.htmlSrcPanel);
    }
    if (DebugJS.HTML_SRC_EXPAND_H) ctx.expandHightIfNeeded(ctx);
    ctx.htmlSrcHeaderPanel = document.createElement('div');
    ctx.htmlSrcPanel.appendChild(ctx.htmlSrcHeaderPanel);

    ctx.htmlSrcTitle = document.createElement('span');
    ctx.setStyle(ctx.htmlSrcTitle, 'color', DebugJS.HTML_BTN_COLOR);
    ctx.htmlSrcTitle.innerText = 'HTML SOURCE';
    ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcTitle);

    var UPDATE_COLOR = '#fff';
    ctx.htmlSrcUpdInpLbl2 = document.createElement('span');
    ctx.htmlSrcUpdInpLbl2.style.float = 'right';
    ctx.htmlSrcUpdInpLbl2.style.marginLeft = '2px';
    ctx.setStyle(ctx.htmlSrcUpdInpLbl2, 'color', UPDATE_COLOR);
    ctx.htmlSrcUpdInpLbl2.innerText = 'ms';
    ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdInpLbl2);

    ctx.htmlSrcUpdateInput = ctx.createTextInput('50px', 'right', UPDATE_COLOR, ctx.htmlSrcUpdateInterval, ctx.onchangeHtmlSrcUpdateInterval);
    ctx.htmlSrcUpdateInput.style.float = 'right';
    ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdateInput);

    ctx.htmlSrcUpdInpLbl = document.createElement('span');
    ctx.htmlSrcUpdInpLbl.style.float = 'right';
    ctx.setStyle(ctx.htmlSrcUpdInpLbl, 'color', UPDATE_COLOR);
    ctx.htmlSrcUpdInpLbl.innerText = ':';
    ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdInpLbl);

    ctx.htmlSrcUpdBtn = ctx.createBtn(ctx, 'UPDATE', ctx.htmlSrcHeaderPanel);
    ctx.htmlSrcUpdBtn.style.float = 'right';
    ctx.htmlSrcUpdBtn.style.marginLeft = '4px';
    ctx.setStyle(ctx.htmlSrcUpdBtn, 'color', ctx.opt.btnColor);
    ctx.htmlSrcUpdBtn.onclick = ctx.showHtmlSrc;

    ctx.htmlSrcBodyPanel = document.createElement('div');
    ctx.htmlSrcBodyPanel.style.width = '100%';
    ctx.htmlSrcBodyPanel.style.height = 'calc(100% - 1.3em)';
    ctx.htmlSrcBodyPanel.style.overflow = 'auto';
    ctx.htmlSrcPanel.appendChild(ctx.htmlSrcBodyPanel);

    ctx.htmlSrcBody = document.createElement('pre');
    ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
  },

  closeHtmlSrc: function(ctx) {
    if (ctx.htmlSrcPanel != null) {
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.htmlSrcPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.htmlSrcPanel);
      }
      if (DebugJS.HTML_SRC_EXPAND_H) ctx.resetExpandedHeightIfNeeded(ctx);
      ctx.htmlSrcPanel = null;
    }
    ctx.status &= ~DebugJS.ST_HTML_SRC;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_HTML_SRC);
    ctx.updateHtmlSrcBtn(ctx);
  },

  showHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    ctx.htmlSrcBodyPanel.removeChild(ctx.htmlSrcBody);
    var html = document.getElementsByTagName('html')[0].outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
    ctx.htmlSrcBody.innerHTML = html;
  },

  onchangeHtmlSrcUpdateInterval: function() {
    var ctx = DebugJS.ctx;
    var interval = ctx.htmlSrcUpdateInput.value;
    if (interval == '') interval = 0;
    if (isFinite(interval)) {
      ctx.htmlSrcUpdateInterval = interval;
      clearTimeout(ctx.htmlSrcUpdateTimerId);
      ctx.htmlSrcUpdateTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdateInterval);
    }
  },

  updateHtmlSrcInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_HTML_SRC)) return;
    ctx.showHtmlSrc();
    if (ctx.htmlSrcUpdateInterval > 0) {
      ctx.elmUpdateTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdateInterval);
    }
  },

  toggleTools: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_TOOLS) {
      ctx.closeTools(ctx);
    } else {
      ctx.openTools(ctx);
    }
  },

  openTools: function(ctx) {
    ctx.status |= DebugJS.ST_TOOLS;
    ctx.featStack.push(DebugJS.ST_TOOLS);
    if (ctx.toolsPanel == null) ctx.createToolsPanel(ctx);
    ctx.addOverlayPanelFull(ctx.toolsPanel);
    ctx.resizeImgPreview();
    ctx.switchToolsFunction(ctx.toolsActiveFnc);
    ctx.updateToolsBtns();
    ctx.updateToolsBtn(ctx);
  },

  isAvailableTools: function(ctx) {
    if ((ctx.win == null) || !(ctx.opt.useTools)) return false;
    return true;
  },

  createToolsPanel: function(ctx) {
    var p = ctx.createSubBasePanel(ctx);
    ctx.toolsPanel = p.base;
    ctx.toolsHeaderPanel = p.head;
    ctx.toolsBodyPanel = p.body;
    ctx.timerBtn = ctx.createToolsHeaderBtn('TIMER', 'TOOLS_FNC_TIMER', 'timerBtn');
    ctx.txtChkBtn = ctx.createToolsHeaderBtn('TEXT', 'TOOLS_FNC_TEXT', 'txtChkBtn');
    ctx.htmlPrevBtn = ctx.createToolsHeaderBtn('HTML', 'TOOLS_FNC_HTML', 'htmlPrevBtn');
    ctx.fileVwrBtn = ctx.createToolsHeaderBtn('FILE', 'TOOLS_FNC_FILE', 'fileVwrBtn');
    ctx.batBtn = ctx.createToolsHeaderBtn('BAT', 'TOOLS_FNC_BAT', 'batBtn');
  },

  createToolsHeaderBtn: function(label, state, btnobj) {
    var ctx = DebugJS.ctx;
    var btn = ctx.createBtn(ctx, '<' + label + '>', ctx.toolsHeaderPanel);
    btn.style.marginRight = '4px';
    btn.onclick = new Function('DebugJS.ctx.switchToolsFunction(DebugJS.' + state + ');');
    btn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', DebugJS.SBPNL_COLOR_ACTIVE);');
    btn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.' + btnobj + ', \'color\', (DebugJS.ctx.toolsActiveFnc & DebugJS.' + state + ') ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);');
    return btn;
  },

  closeTools: function(ctx) {
    if (ctx.toolsPanel != null) {
      ctx.removeOverlayPanelFull(ctx.toolsPanel);
      ctx.switchToolsFunction(0);
    }
    ctx.status &= ~DebugJS.ST_TOOLS;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_TOOLS);
    ctx.updateToolsBtn(ctx);
  },

  updateToolsBtns: function() {
    var ctx = DebugJS.ctx;
    ctx.setStyle(ctx.timerBtn, 'color', (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_TIMER) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
    ctx.setStyle(ctx.txtChkBtn, 'color', (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_TEXT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
    ctx.setStyle(ctx.htmlPrevBtn, 'color', (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_HTML) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
    ctx.setStyle(ctx.fileVwrBtn, 'color', (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_FILE) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
    ctx.setStyle(ctx.batBtn, 'color', (ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_BAT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
  },

  switchToolsFunction: function(kind, param) {
    var ctx = DebugJS.ctx;
    if (kind & DebugJS.TOOLS_FNC_TIMER) {
      ctx.openTimer(param);
    } else {
      ctx.closeTimer();
    }
    if (kind & DebugJS.TOOLS_FNC_TEXT) {
      ctx.openTextChecker();
    } else {
      ctx.closeTextChecker();
    }
    if (kind & DebugJS.TOOLS_FNC_HTML) {
      ctx.openHtmlEditor();
    } else {
      ctx.closeHtmlEditor();
    }
    if (kind & DebugJS.TOOLS_FNC_FILE) {
      ctx.openFileLoader(param);
    } else {
      ctx.closeFileLoader();
    }
    if (kind & DebugJS.TOOLS_FNC_BAT) {
      ctx.openBatEditor();
    } else {
      ctx.closeBatEditor();
    }
    if (kind) ctx.toolsActiveFnc = kind;
    ctx.updateToolsBtns();
  },

  removeToolFuncPanel: function(ctx, panel) {
    if (panel.parentNode) {
      ctx.toolsBodyPanel.removeChild(panel);
    }
  },

  openTimer: function(mode) {
    var ctx = DebugJS.ctx;
    if (ctx.timerBasePanel == null) {
      var baseFontSize = ctx.computedFontSize;
      var fontSize = baseFontSize * 6.5;
      ctx.timerBasePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
      ctx.timerBasePanel.style.position = 'absolute';
      ctx.timerBasePanel.style.height = baseFontSize * 21 + 'px';
      ctx.timerBasePanel.style.top = '0';
      ctx.timerBasePanel.style.bottom = '0';
      ctx.timerBasePanel.style.margin = 'auto';
      ctx.setStyle(ctx.timerBasePanel, 'font-size', fontSize + 'px');
      ctx.timerBasePanel.style.lineHeight = '1em';
      ctx.timerBasePanel.style.textAlign = 'center';
      ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);
      ctx.createTimerClockSubPanel();
      ctx.createTimerStopWatchCuSubPanel();
      ctx.createTimerStopWatchCdSubPanel();
      ctx.createTimerStopWatchCdInpSubPanel();
      if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) &&
          !(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED)) {
        ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RST;
      }
      ctx.switchTimerMode(ctx.toolTimerMode);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);
    }
    ctx.setIntervalH(ctx);
    if ((mode != undefined) && (mode !== '')) {
      ctx.switchTimerMode(mode);
    } else {
      switch (ctx.toolTimerMode) {
        case DebugJS.TOOL_TIMER_MODE_CLOCK:
          ctx.updateTimerClock();
          break;
        case DebugJS.TOOL_TIMER_MODE_SW_CU:
          ctx.updateTimerStopWatchCu();
          break;
        case DebugJS.TOOL_TIMER_MODE_SW_CU:
          ctx.updateTimerStopWatchCu();
          break;
        case DebugJS.TOOL_TIMER_MODE_SW_CD:
          ctx.updateTimerStopWatchCd();
      }
    }
  },

  createTimerClockSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    var btnFontSize = fontSize * 3;
    ctx.timerClockSubPanel = document.createElement('div');

    var marginB = 20 * ctx.opt.zoom;
    ctx.timerClockLabel = document.createElement('div');
    ctx.timerClockLabel.style.marginBottom = marginB + 'px';
    ctx.timerClockSubPanel.appendChild(ctx.timerClockLabel);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    ctx.timerClockSubPanel.appendChild(btns);

    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', null, true, btnFontSize);
    ctx.createTimerBtn(btns, '>>', null, true, btnFontSize);
    ctx.createTimerBtn(btns, 'SPLIT', null, true, btnFontSize);
    ctx.clockSSSbtn = ctx.createTimerBtn(btns, 'sss', ctx.toggleSSS, false, (fontSize * 1.5));
    ctx.updateSSS(ctx);
  },

  toggleSSS: function() {
    var ctx = DebugJS.ctx;
    ctx.timerClockSSS = (ctx.timerClockSSS ? false : true);
    ctx.updateSSS(ctx);
  },

  updateSSS: function(ctx) {
    var color = (ctx.timerClockSSS ? DebugJS.TOOL_TIMER_BTN_COLOR : '#888');
    ctx.setStyle(ctx.clockSSSbtn, 'color', color);
  },

  createTimerStopWatchSubPanel: function(ctx, handlers) {
    var panel = {
      basePanel: null, stopWatchLabel: null, btns: null, startStopBtn: null, splitBtn: null
    };

    var fontSize = ctx.computedFontSize;
    var btnFontSize = fontSize * 3;
    panel.basePanel = document.createElement('div');

    var marginT = 40 * ctx.opt.zoom;
    var marginB = 39 * ctx.opt.zoom;
    panel.stopWatchLabel = document.createElement('div');
    panel.stopWatchLabel.style.margin = marginT + 'px 0 ' + marginB + 'px 0';
    panel.basePanel.appendChild(panel.stopWatchLabel);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    panel.basePanel.appendChild(btns);

    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', handlers.reset, false, btnFontSize);
    panel.startStopBtn = ctx.createTimerBtn(btns, '>>', handlers.startStop, false, btnFontSize);
    panel.splitBtn = ctx.createTimerBtn(btns, 'SPLIT', handlers.split, false, btnFontSize);

    panel.btns = btns;
    return panel;
  },

  createTimerStopWatchCuSubPanel: function() {
    var ctx = DebugJS.ctx;
    var handlers = {
      reset: ctx.resetTimerStopWatchCu,
      startStop: ctx.startStopTimerStopWatchCu,
      split: ctx.splitTimerStopWatchCu
    };
    var panel = ctx.createTimerStopWatchSubPanel(ctx, handlers);
    ctx.timerStopWatchCuSubPanel = panel.basePanel;
    ctx.timerStopWatchCuLabel = panel.stopWatchLabel;
    ctx.timerStartStopBtnCu = panel.startStopBtn;
    ctx.timerSplitBtnCu = panel.splitBtn;
  },

  createTimerStopWatchCdSubPanel: function() {
    var ctx = DebugJS.ctx;
    var handlers = {
      reset: ctx.resetTimerStopWatchCd,
      startStop: ctx.startStopTimerStopWatchCd,
      split: ctx.splitTimerStopWatchCd
    };
    var panel = ctx.createTimerStopWatchSubPanel(ctx, handlers);
    ctx.timerStopWatchCdSubPanel = panel.basePanel;
    ctx.timerStopWatchCdLabel = panel.stopWatchLabel;
    ctx.timerStartStopBtnCd = panel.startStopBtn;
    ctx.timerSplitBtnCd = panel.splitBtn;
    ctx.timer0CntBtnCd1 = ctx.createTimerBtn(panel.btns, '0=>', ctx.toggle0ContinueTimerStopWatchCd, false, (ctx.computedFontSize * 1.5));
    ctx.update0ContinueBtnTimerStopWatchCd();
  },

  createTimerStopWatchCdInpSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    var baseFontSize = fontSize * 6.5;
    var btnFontSize = fontSize * 3;
    var msFontSize = baseFontSize * 0.65;
    var basePanel = document.createElement('div');

    var timerUpBtns = document.createElement('div');
    timerUpBtns.style.margin = '0 0 -' + fontSize * 0.8 + 'px 0';
    timerUpBtns.style.lineHeight = btnFontSize + 'px';
    basePanel.appendChild(timerUpBtns);
    ctx.createTimerUpDwnBtn(true, 'hh', timerUpBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(true, 'mi', timerUpBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(true, 'ss', timerUpBtns, btnFontSize, 2.5);
    ctx.createTimerUpDwnBtn(true, 'sss', timerUpBtns, btnFontSize, 0);

    ctx.timerStopWatchCdInput = document.createElement('div');
    ctx.timerStopWatchCdInput.style.margin = '0';
    ctx.timerStopWatchCdInput.style.lineHeight = baseFontSize + 'px';
    basePanel.appendChild(ctx.timerStopWatchCdInput);
    ctx.timerTxtHH = ctx.createTimerInput(ctx.timerStopWatchCdInput, DebugJS.timestr2struct(ctx.props.timer).hh, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, ':', baseFontSize);
    ctx.timerTxtMI = ctx.createTimerInput(ctx.timerStopWatchCdInput, DebugJS.timestr2struct(ctx.props.timer).mi, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, ':', baseFontSize);
    ctx.timerTxtSS = ctx.createTimerInput(ctx.timerStopWatchCdInput, DebugJS.timestr2struct(ctx.props.timer).ss, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, '.', msFontSize);
    ctx.timerTxtSSS = ctx.createTimerInput(ctx.timerStopWatchCdInput, DebugJS.timestr2struct(ctx.props.timer).sss, msFontSize, '2em');

    var timerDwnBtns = document.createElement('div');
    var marginT = fontSize * 2;
    var marginB = fontSize * 1.2;
    timerDwnBtns.style.margin = '-' + marginT + 'px 0 ' + marginB + 'px 0';
    timerDwnBtns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerUpDwnBtn(false, 'hh', timerDwnBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(false, 'mi', timerDwnBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(false, 'ss', timerDwnBtns, btnFontSize, 2.5);
    ctx.createTimerUpDwnBtn(false, 'sss', timerDwnBtns, btnFontSize, 0);
    basePanel.appendChild(timerDwnBtns);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', ctx.resetTimerStopWatchCd, false, btnFontSize);
    ctx.timerStartStopBtnCdInp = ctx.createTimerBtn(btns, '>>', ctx.startStopTimerStopWatchCd, false, btnFontSize);
    ctx.createTimerBtn(btns, 'SPLIT', null, true, btnFontSize);
    ctx.timer0CntBtnCd2 = ctx.createTimerBtn(btns, '0=>', ctx.toggle0ContinueTimerStopWatchCd, false, (fontSize * 1.5));
    basePanel.appendChild(btns);

    ctx.timerStopWatchCdInpSubPanel = basePanel;
  },

  createTimerInput: function(base, val, fontSize, width) {
    var ctx = DebugJS.ctx;
    var txt = document.createElement('input');
    txt.className = ctx.id + '-timer-inp';
    ctx.setStyle(txt, 'margin-top', '-' + fontSize * 0.5 + 'px');
    ctx.setStyle(txt, 'font-size', fontSize + 'px');
    if (width) ctx.setStyle(txt, 'width', width);
    txt.value = val;
    txt.oninput = ctx.updatePropTimer;
    base.appendChild(txt);
    return txt;
  },

  createTimerInputLabel: function(base, label, fontSize) {
    var ctx = DebugJS.ctx;
    var span = document.createElement('span');
    span.innerText = label;
    ctx.setStyle(span, 'font-size', fontSize + 'px');
    base.appendChild(span);
  },

  createTimerBtn: function(base, label, handler, disabled, fontSize) {
    var ctx = DebugJS.ctx;
    var btn = ctx.createBtn(ctx, label, base);
    btn.style.marginRight = '0.5em';
    ctx.setStyle(btn, 'color', (disabled ? '#888' : DebugJS.TOOL_TIMER_BTN_COLOR));
    if (fontSize) ctx.setStyle(btn, 'font-size', fontSize + 'px');
    btn.onclick = handler;
    return btn;
  },

  createTimerUpDwnBtn: function(up, part, area, fontSize, margin) {
    var ctx = DebugJS.ctx;
    var label = (up ? '+' : '-');
    var btn = ctx.createBtn(ctx, label, area);
    btn.style.marginRight = margin + 'em';
    ctx.setStyle(btn, 'color', DebugJS.TOOL_TIMER_BTN_COLOR);
    ctx.setStyle(btn, 'font-size', fontSize + 'px');
    btn.onclick = new Function('DebugJS.ctx.timerUpDwn(\'' + part + '\', ' + up + ')');
    return btn;
  },

  timerUpDwn: function(part, up) {
    var ctx = DebugJS.ctx;
    var val = ctx.calcTimeupTimeInp();
    var v = 0;
    switch (part) {
      case 'hh':
        v = 3600000;
        break;
      case 'mi':
        v = 60000;
        break;
      case 'ss':
        v = 1000;
        break;
      case 'sss':
        v = 1;
    }
    if (up) {
      val += v;
    } else {
      if (val >= v) val -= v;
    }
    ctx.updateTimeupTimeInp(val);
    ctx.drawStopWatchCd();
  },

  updatePropTimer: function(v) {
    var ctx = DebugJS.ctx;
    ctx.props.timer = ctx.timerTxtHH.value + ':' + ctx.timerTxtMI.value + ':' + ctx.timerTxtSS.value + '.' + ctx.timerTxtSSS.value;
  },

  calcTimeupTimeInp: function() {
    var ctx = DebugJS.ctx;
    var timeupHH = (ctx.timerTxtHH.value | 0) * 3600000;
    var timeupMI = (ctx.timerTxtMI.value | 0) * 60000;
    var timeupSS = (ctx.timerTxtSS.value | 0) * 1000;
    var timeupSSS = (ctx.timerTxtSSS.value | 0);
    var timeup = timeupHH + timeupMI + timeupSS + timeupSSS;
    return timeup;
  },

  updateTimeupTimeInp: function(v) {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.ms2struct(v, true);
    ctx.timerTxtHH.value = tm.hh;
    ctx.timerTxtMI.value = tm.mi;
    ctx.timerTxtSS.value = tm.ss;
    ctx.timerTxtSSS.value = tm.sss;
    ctx.updatePropTimer();
  },

  toggleTimerMode: function() {
    var ctx = DebugJS.ctx;
    var nextMode;
    if (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_CLOCK) {
      nextMode = DebugJS.TOOL_TIMER_MODE_SW_CU;
    } else if (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_SW_CU) {
      nextMode = DebugJS.TOOL_TIMER_MODE_SW_CD;
    } else {
      nextMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
    }
    ctx.switchTimerMode(nextMode);
  },

  switchTimerMode: function(mode) {
    var ctx = DebugJS.ctx;
    if (mode == DebugJS.TOOL_TIMER_MODE_SW_CU) {
      ctx.switchTimerModeStopWatchCu();
    } else if (mode == DebugJS.TOOL_TIMER_MODE_SW_CD) {
      ctx.switchTimerModeStopWatchCd();
    } else {
      ctx.switchTimerModeClock();
    }
  },

  switchTimerModeClock: function() {
    var ctx = DebugJS.ctx;
    ctx.replaceTimerSubPanel(ctx.timerClockSubPanel);
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
    ctx.updateTimerClock();
  },

  switchTimerModeStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_SW_CU;
    ctx.replaceTimerSubPanel(ctx.timerStopWatchCuSubPanel);
    ctx.drawStopWatchCu();
    ctx.updateTimerStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  switchTimerModeStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_SW_CD;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RST) {
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdInpSubPanel);
    } else {
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdSubPanel);
      ctx.drawStopWatchCd();
      ctx.updateTimerStopWatchCd();
    }
    ctx.updateTimerSwBtnsCd();
  },

  replaceTimerSubPanel: function(panel) {
    var ctx = DebugJS.ctx;
    for (var i = ctx.timerBasePanel.childNodes.length - 1; i >= 0; i--) {
      ctx.timerBasePanel.removeChild(ctx.timerBasePanel.childNodes[i]);
    }
    ctx.timerBasePanel.appendChild(panel);
  },

  updateTimerClock: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) || (ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_CLOCK)) return;
    var tm = DebugJS.getDateTime();
    ctx.timerClockLabel.innerHTML = ctx.createClockStr(tm);
    setTimeout(ctx.updateTimerClock, ctx.clockUpdInt);
  },

  createClockStr: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 8;
    var dtFontSize = fontSize * 0.45;
    var ssFontSize = fontSize * 0.65;
    var msFontSize = fontSize * 0.45;
    var marginT = 20 * ctx.opt.zoom;
    var marginB = 10 * ctx.opt.zoom;
    var dot = '.';
    if (tm.sss > 500) dot = '&nbsp;';
    var date = tm.yyyy + '-' + tm.mm + '-' + tm.dd + ' <span style="color:#' + DebugJS.WDAYS_COLOR[tm.wday] + ' !important;font-size:' + dtFontSize + 'px !important">' + DebugJS.WDAYS[tm.wday] + '</span>';
    var time = tm.hh + ':' + tm.mi + '<span style="margin-left:' + (ssFontSize / 5) + 'px;color:' + ctx.opt.fontColor + ' !important;font-size:' + ssFontSize + 'px !important">' + tm.ss + dot + '</span>';
    if (ctx.timerClockSSS) {
      time += '<span style="font-size:' + msFontSize + 'px !important">' + tm.sss + '</span>';
      marginB -= 16 * ctx.opt.zoom;
    }
    var label = '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + dtFontSize + 'px !important">' + date + '</div>' +
                '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + fontSize + 'px !important;margin:-' + marginT + 'px 0 ' + marginB + 'px 0">' + time + '</div>';
    return label;
  },

  startStopTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      ctx.resetTimerStopWatchCu();
    }
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
      ctx.stopTimerStopWatchCu();
    } else {
      ctx.startTimerStopWatchCu();
    }
  },

  startStopTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      ctx.stopTimerStopWatchCd();
    } else {
      ctx.startTimerStopWatchCd();
    }
  },

  startTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      ctx.resetTimerStopWatchCu();
    }
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CU_RUNNING;
    DebugJS.timeRestart(DebugJS.TIMER_NAME_SW_CU);
    ctx.updateTimerStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  stopTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopWatchCu();
    DebugJS.timePause(DebugJS.TIMER_NAME_SW_CU);
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_RUNNING;
    ctx.drawStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  endTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopWatchCu();
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CU_END;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_RUNNING;
    ctx.updateTimerStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  splitTimerStopWatchCu: function() {
    DebugJS.timeSplit(DebugJS.TIMER_NAME_SW_CU);
  },

  resetTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_END;
    DebugJS.timeReset(DebugJS.TIMER_NAME_SW_CU);
    ctx.drawStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  updateTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_SW_CU) ||
        ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING)) &&
        (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END)))) return;
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END)) {
      ctx.timers[DebugJS.TIMER_NAME_SW_CU].count = (new Date()).getTime() - ctx.timers[DebugJS.TIMER_NAME_SW_CU].start;
    }
    ctx.drawStopWatchCu();
    setTimeout(ctx.updateTimerStopWatchCu, DebugJS.UPDATE_INTERVAL_H);
  },

  drawStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.ms2struct(DebugJS.timeGetCount(DebugJS.TIMER_NAME_SW_CU), true);
    ctx.timerStopWatchCuLabel.innerHTML = ctx.createTimeStrCu(tm);
  },

  updateTimerSwBtnsCu: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.timerStartStopBtnCu) return;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) ? '||' : '>>';
    ctx.timerStartStopBtnCu.innerText = btn;
    ctx.updateTimerLapBtnCu();
  },

  updateTimerLapBtnCu: function() {
    var ctx = DebugJS.ctx;
    var color = '#888';
    var handler = null;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
      color = DebugJS.TOOL_TIMER_BTN_COLOR;
      handler = ctx.splitTimerStopWatchCu;
    }
    ctx.setStyle(ctx.timerSplitBtnCu, 'color', color);
    ctx.timerSplitBtnCu.onclick = handler;
  },

  toggle0ContinueTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) return;
    if (ctx.timerSwTimeCdContinue) {
      ctx.timerSwTimeCdContinue = false;
    } else {
      ctx.timerSwTimeCdContinue = true;
    }
    ctx.update0ContinueBtnTimerStopWatchCd();
  },

  update0ContinueBtnTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    var color = DebugJS.TOOL_TIMER_BTN_COLOR;
    if (ctx.timerSwTimeCdContinue) {
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        color = ctx.opt.timerColorExpr;
      }
    } else {
      color = '#888';
    }
    ctx.setStyle(ctx.timer0CntBtnCd1, 'color', color);
    if (ctx.timer0CntBtnCd2) ctx.setStyle(ctx.timer0CntBtnCd2, 'color', color);
  },

  startTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    var now = (new Date()).getTime();
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END) {
      ctx.resetTimerStopWatchCd();
    }
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RST) {
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RST;
      var timeup = ctx.calcTimeupTimeInp();
      ctx.timerTimeUpTime = now + timeup;
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdSubPanel);
    } else {
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        ctx.timerTimeUpTime = now - ctx.timerSwTimeCd;
      } else {
        ctx.timerTimeUpTime = now + ctx.timerSwTimeCd;
      }
    }
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RUNNING;
    ctx.updateTimerStopWatchCd();
    ctx.updateTimerSwBtnsCd();
  },

  stopTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopWatchCd();
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RUNNING;
    ctx.drawStopWatchCd();
    ctx.updateTimerSwBtnsCd();
  },

  splitTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    var color = '#fff';
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
      color = ctx.opt.timerColorExpr;
    }
    var t = DebugJS.TIMER_NAME_SW_CD + ': ' + '<span style="color:' + color + '">' + DebugJS.getTimerStr(ctx.timerSwTimeCd) + '</span>';
    DebugJS._log(t);
  },

  resetTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_EXPIRED;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_END;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      var timeup = ctx.calcTimeupTimeInp();
      ctx.timerTimeUpTime = (new Date()).getTime() + timeup;
      ctx.updateTimerStopWatchCd();
    } else {
      ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RST;
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdInpSubPanel);
    }
    ctx.updateTimerSwBtnsCd();
  },

  updateTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_SW_CD) ||
        ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING)) &&
        (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END)))) return;
    var now = (new Date()).getTime();
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
      if (ctx.timerSwTimeCdContinue) {
        ctx.timerSwTimeCd = now - ctx.timerTimeUpTime;
      }
    } else {
      ctx.timerSwTimeCd = ctx.timerTimeUpTime - now;
    }
    if (ctx.timerSwTimeCd < 0) {
      ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_EXPIRED;
      ctx.update0ContinueBtnTimerStopWatchCd();
      if (ctx.timerSwTimeCdContinue) {
        ctx.timerSwTimeCd *= -1;
      } else {
        ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RUNNING;
        ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_END;
        ctx.updateTimerSwBtnsCd();
        ctx.timerSwTimeCd = 0;
      }
    }
    ctx.drawStopWatchCd();
    setTimeout(ctx.updateTimerStopWatchCd, DebugJS.UPDATE_INTERVAL_H);
  },

  drawStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.ms2struct(ctx.timerSwTimeCd, true);
    ctx.timerStopWatchCdLabel.innerHTML = ctx.createTimeStrCd(tm);
  },

  updateTimerSwBtnsCd: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.timerStartStopBtnCd) return;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) ? '||' : '>>';
    ctx.timerStartStopBtnCd.innerText = btn;
    ctx.timerStartStopBtnCdInp.innerText = btn;
    ctx.updateTimerLapBtnCd();
    ctx.update0ContinueBtnTimerStopWatchCd();
  },

  updateTimerLapBtnCd: function() {
    var ctx = DebugJS.ctx;
    var color = '#888';
    var handler = null;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      color = DebugJS.TOOL_TIMER_BTN_COLOR;
      handler = ctx.splitTimerStopWatchCd;
    }
    ctx.setStyle(ctx.timerSplitBtnCd, 'color', color);
    ctx.timerSplitBtnCd.onclick = handler;
  },

  createTimeStrCu: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var str;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      var now = DebugJS.getDateTime();
      if (now.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px !important">' + '&nbsp;</span>';
      } else {
        str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + ctx.opt.fontColor + ' !important;font-size:' + msFontSize + 'px !important">.' + tm.sss + '</span>';
      }
    } else {
      var dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) && (tm.sss > 500)) ? '&nbsp;' : '.');
      str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + ctx.opt.fontColor + ' !important;font-size:' + msFontSize + 'px !important">' + dot + tm.sss + '</span>';
    }
    var label = '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + fontSize + 'px !important">' + str + '</div>';
    return label;
  },

  createTimeStrCd: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var color = ctx.opt.fontColor;
    var str;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END) {
      var now = DebugJS.getDateTime();
      if (now.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px !important">' + '&nbsp;</span>';
      } else {
        str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">.' + tm.sss + '</span>';
      }
    } else {
      var dot;
      var styleS = '';
      var styleE = '';
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        color = ctx.opt.timerColorExpr;
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) && (tm.sss > 500)) ? '&nbsp;' : '.');
        styleS = '<span style="color:' + color + ' !important;font-size:' + fontSize + 'px !important">';
        styleE = '</span>';
      } else {
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) && (tm.sss < 500)) ? '&nbsp;' : '.');
      }
      str = styleS + tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">' + dot + tm.sss + '</span>' + styleE;
    }
    var label = '<div style="color:' + color + ' !important;font-size:' + fontSize + 'px !important">' + str + '</div>';
    return label;
  },

  closeTimer: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_TIMER) &&
        (ctx.timerBasePanel != null)) {
      ctx.removeToolFuncPanel(ctx, ctx.timerBasePanel);
      ctx.setIntervalL(ctx);
    }
  },

  enableBtn: function(btn, fn, color) {
    btn.onclick = fn;
    ctx.setStyle(btn, 'color', color);
  },

  disableBtn: function(btn) {
    btn.onclick = null;
    ctx.setStyle(btn, 'color', DebugJS.COLOR_INACTIVE);
  },

  openTextChecker: function() {
    var ctx = DebugJS.ctx;
    if (ctx.txtChkPanel == null) {
      ctx.createTxtChkPanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.txtChkPanel);
    }
  },

  createTxtChkPanel: function(ctx) {
    var dfltFontSize = ctx.computedFontSize;
    var dfltFontFamily = 'Consolas';
    var dfltFontWeight = 400;
    var dfltFgRGB16 = 'fff';
    var dfltBgRGB16 = '000';
    var panelPadding = 2;
    ctx.txtChkPanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);

    var txtPadding = 4;
    var txtChkTxt = document.createElement('input');
    ctx.setStyle(txtChkTxt, 'width', 'calc(100% - ' + ((txtPadding + panelPadding) * 2) + 'px)');
    ctx.setStyle(txtChkTxt, 'min-height', (20 * ctx.opt.zoom) + 'px');
    ctx.setStyle(txtChkTxt, 'margin-bottom', '8px');
    ctx.setStyle(txtChkTxt, 'padding', txtPadding + 'px');
    ctx.setStyle(txtChkTxt, 'border', '0');
    ctx.setStyle(txtChkTxt, 'border-radius', '0');
    ctx.setStyle(txtChkTxt, 'outline', 'none');
    ctx.setStyle(txtChkTxt, 'font-size', dfltFontSize + 'px');
    ctx.setStyle(txtChkTxt, 'font-family', dfltFontFamily);
    txtChkTxt.value = 'ABCDEFG.abcdefg 12345-67890_!?';
    ctx.txtChkPanel.appendChild(txtChkTxt);
    ctx.txtChkTxt = txtChkTxt;
    ctx.txtChkTargetEl = txtChkTxt;

    ctx.txtChkCtrl = document.createElement('div');
    ctx.txtChkPanel.appendChild(ctx.txtChkCtrl);
    var html = 'font-size: <input type="range" min="0" max="128" step="1" id="' + ctx.id + '-fontsize-range" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFontSize(true);" onchange="DebugJS.ctx.onChangeFontSize(true);">' +
    '<input value="' + dfltFontSize + '" id="' + ctx.id + '-font-size" class="' + ctx.id + '-txt-text" style="width:30px;text-align:right" oninput="DebugJS.ctx.onChangeFontSizeTxt()">' +
    '<input value="px" id="' + ctx.id + '-font-size-unit" class="' + ctx.id + '-txt-text" style="width:20px;" oninput="DebugJS.ctx.onChangeFontSizeTxt()">' +
    '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:5px;color:' + DebugJS.COLOR_INACTIVE + ' !important;font-style:italic;" onmouseover="DebugJS.ctx.setStyle(this, \'color\', \'' + ctx.opt.btnColor + '\');" onmouseout="DebugJS.ctx.updateTxtItalicBtn(this);" onclick="DebugJS.ctx.toggleTxtItalic(this);"> I </span>' +
    '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:5px;color:' + DebugJS.COLOR_INACTIVE + ' !important;" onmouseover="DebugJS.ctx.setStyle(this, \'color\', \'' + ctx.opt.btnColor + '\');" onmouseout="DebugJS.ctx.updateElBtn(this);" onclick="DebugJS.ctx.toggleElmEditable(this);">(el)</span>' +
    '<br>' +
    'font-family: <input value="' + dfltFontFamily + '" class="' + ctx.id + '-txt-text" style="width:110px" oninput="DebugJS.ctx.onChangeFontFamily(this)">&nbsp;&nbsp;' +
    'font-weight: <input type="range" min="100" max="900" step="100" value="' + dfltFontWeight + '" id="' + ctx.id + '-fontweight-range" class="' + ctx.id + '-txt-range" style="width:80px" oninput="DebugJS.ctx.onChangeFontWeight();" onchange="DebugJS.ctx.onChangeFontWeight();"><span id="' + ctx.id + '-font-weight"></span> ' +
    '<table class="' + ctx.id + '-txt-tbl">' +
    '<tr><td colspan="2">FG #<input id="' + ctx.id + '-fg-rgb" class="' + ctx.id + '-txt-text" value="' + dfltFgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeFgRGB()"></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-r" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-r"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-g" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-g"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-b" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-b"></span></td></tr>' +
    '<tr><td colspan="2">BG #<input id="' + ctx.id + '-bg-rgb" class="' + ctx.id + '-txt-text" value="' + dfltBgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeBgRGB()"></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-r" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-r"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-g" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-g"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-b" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-b"></span></td></tr>' +
    '</tbale>';
    ctx.txtChkCtrl.innerHTML = html;

    ctx.txtChkFontSizeRange = document.getElementById(ctx.id + '-fontsize-range');
    ctx.txtChkFontSizeInput = document.getElementById(ctx.id + '-font-size');
    ctx.txtChkFontSizeUnitInput = document.getElementById(ctx.id + '-font-size-unit');
    ctx.txtChkFontWeightRange = document.getElementById(ctx.id + '-fontweight-range');
    ctx.txtChkFontWeightLabel = document.getElementById(ctx.id + '-font-weight');
    ctx.txtChkInputFgRGB = document.getElementById(ctx.id + '-fg-rgb');
    ctx.txtChkRangeFgR = document.getElementById(ctx.id + '-fg-range-r');
    ctx.txtChkRangeFgG = document.getElementById(ctx.id + '-fg-range-g');
    ctx.txtChkRangeFgB = document.getElementById(ctx.id + '-fg-range-b');
    ctx.txtChkLabelFgR = document.getElementById(ctx.id + '-fg-r');
    ctx.txtChkLabelFgG = document.getElementById(ctx.id + '-fg-g');
    ctx.txtChkLabelFgB = document.getElementById(ctx.id + '-fg-b');
    ctx.txtChkInputBgRGB = document.getElementById(ctx.id + '-bg-rgb');
    ctx.txtChkRangeBgR = document.getElementById(ctx.id + '-bg-range-r');
    ctx.txtChkRangeBgG = document.getElementById(ctx.id + '-bg-range-g');
    ctx.txtChkRangeBgB = document.getElementById(ctx.id + '-bg-range-b');
    ctx.txtChkLabelBgR = document.getElementById(ctx.id + '-bg-r');
    ctx.txtChkLabelBgG = document.getElementById(ctx.id + '-bg-g');
    ctx.txtChkLabelBgB = document.getElementById(ctx.id + '-bg-b');

    ctx.onChangeFontSizeTxt();
    ctx.onChangeFontWeight();
    ctx.onChangeFgRGB();
    ctx.onChangeBgRGB();
  },

  toggleTxtItalic: function(btn) {
    var ctx = DebugJS.ctx;
    var style = '';
    if (ctx.txtChkItalic) {
      ctx.txtChkItalic = false;
    } else {
      ctx.txtChkItalic = true;
      style = 'italic';
    }
    ctx.setStyle(ctx.txtChkTargetEl, 'font-style', style);
    ctx.updateTxtItalicBtn(btn);
  },

  updateTxtItalicBtn: function(btn) {
    var ctx = DebugJS.ctx;
    if (ctx.txtChkItalic) {
      ctx.setStyle(btn, 'color', ctx.opt.btnColor);
    } else {
      ctx.setStyle(btn, 'color', DebugJS.COLOR_INACTIVE);
    }
  },

  toggleElmEditable: function(btn) {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_ELM_EDIT) {
      ctx.status &= ~DebugJS.ST_ELM_EDIT;
      ctx.updateEditable(ctx, ctx.txtChkTxt);
    } else {
      ctx.status |= DebugJS.ST_ELM_EDIT;
      if (DebugJS.el) {
        ctx.updateEditable(ctx, DebugJS.el);
      }
    }
    ctx.updateElBtn(btn);
  },

  updateElBtn: function(btn) {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_ELM_EDIT) {
      ctx.setStyle(btn, 'color', ctx.opt.btnColor);
    } else {
      ctx.setStyle(btn, 'color', DebugJS.COLOR_INACTIVE);
    }
  },

  onChangeFgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputFgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeFgR.value = rgb10.r;
    ctx.txtChkRangeFgG.value = rgb10.g;
    ctx.txtChkRangeFgB.value = rgb10.b;
    ctx.onChangeFgColor(null);
    ctx.setStyle(ctx.txtChkTargetEl, 'color', rgb16);
  },

  onChangeBgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputBgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeBgR.value = rgb10.r;
    ctx.txtChkRangeBgG.value = rgb10.g;
    ctx.txtChkRangeBgB.value = rgb10.b;
    ctx.onChangeBgColor(null);
    ctx.setStyle(ctx.txtChkTargetEl, 'background', rgb16);
  },

  onChangeFgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fgR = ctx.txtChkRangeFgR.value;
    var fgG = ctx.txtChkRangeFgG.value;
    var fgB = ctx.txtChkRangeFgB.value;
    var rgb16 = DebugJS.convRGB10to16(fgR + ' ' + fgG + ' ' + fgB);
    ctx.txtChkLabelFgR.innerText = fgR;
    ctx.txtChkLabelFgG.innerText = fgG;
    ctx.txtChkLabelFgB.innerText = fgB;
    if (callFromRange) {
      ctx.txtChkInputFgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      ctx.setStyle(ctx.txtChkTargetEl, 'color', 'rgb(' + fgR + ',' + fgG + ',' + fgB + ')');
    }
  },

  onChangeBgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var bgR = ctx.txtChkRangeBgR.value;
    var bgG = ctx.txtChkRangeBgG.value;
    var bgB = ctx.txtChkRangeBgB.value;
    var rgb16 = DebugJS.convRGB10to16(bgR + ' ' + bgG + ' ' + bgB);
    ctx.txtChkLabelBgR.innerText = bgR;
    ctx.txtChkLabelBgG.innerText = bgG;
    ctx.txtChkLabelBgB.innerText = bgB;
    if (callFromRange) {
      ctx.txtChkInputBgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      ctx.setStyle(ctx.txtChkTargetEl, 'background', 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')');
    }
  },

  onChangeFontSizeTxt: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.txtChkFontSizeInput.value;
    var unit = ctx.txtChkFontSizeUnitInput.value;
    ctx.txtChkFontSizeRange.value = fontSize;
    ctx.onChangeFontSize(null);
    ctx.setStyle(ctx.txtChkTargetEl, 'font-size', fontSize + unit);
  },

  onChangeFontSize: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.txtChkFontSizeRange.value;
    var unit = ctx.txtChkFontSizeUnitInput.value;
    if (callFromRange) {
      ctx.txtChkFontSizeInput.value = fontSize;
      ctx.setStyle(ctx.txtChkTargetEl, 'font-size', fontSize + unit);
    }
  },

  onChangeFontWeight: function() {
    var ctx = DebugJS.ctx;
    var fontWeight = ctx.txtChkFontWeightRange.value;
    ctx.setStyle(ctx.txtChkTargetEl, 'font-weight', fontWeight);
    if (fontWeight == 400) {
      fontWeight += '(normal)';
    } else if (fontWeight == 700) {
      fontWeight += '(bold)';
    }
    ctx.txtChkFontWeightLabel.innerText = fontWeight;
  },

  onChangeFontFamily: function(font) {
    DebugJS.ctx.setStyle(DebugJS.ctx.txtChkTargetEl, 'font-family', font.value);
  },

  closeTextChecker: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_TEXT) && (ctx.txtChkPanel != null)) {
      ctx.removeToolFuncPanel(ctx, ctx.txtChkPanel);
    }
  },

  openFileLoader: function(format) {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var fontSize = ctx.computedFontSize + 'px';
    if (ctx.fileVwrPanel == null) {
      ctx.fileVwrPanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);

      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      ctx.setStyle(fileInput, 'width', 'calc(100% - ' + (ctx.computedFontSize * 19) + 'px)');
      ctx.setStyle(fileInput, 'min-height', (20 * opt.zoom) + 'px');
      ctx.setStyle(fileInput, 'margin', '0 0 4px 0');
      ctx.setStyle(fileInput, 'padding', '1px');
      ctx.setStyle(fileInput, 'border', '0');
      ctx.setStyle(fileInput, 'border-radius', '0');
      ctx.setStyle(fileInput, 'outline', 'none');
      ctx.setStyle(fileInput, 'font-size', fontSize);
      fileInput.addEventListener('change', ctx.onFileSelected, false);
      ctx.fileVwrPanel.appendChild(fileInput);
      ctx.fileInput = fileInput;

      ctx.fileVwrRadioB64 = document.createElement('input');
      ctx.fileVwrRadioB64.type = 'radio';
      ctx.fileVwrRadioB64.id = ctx.id + '-load-type-b64';
      ctx.fileVwrRadioB64.name = ctx.id + '-load-type';
      ctx.fileVwrRadioB64.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';
      ctx.fileVwrRadioB64.value = 'base64';
      ctx.fileVwrRadioB64.checked = true;
      ctx.fileVwrRadioB64.onchange = ctx.openViewerB64;
      ctx.fileVwrPanel.appendChild(ctx.fileVwrRadioB64);
      ctx.fileVwrLabelB64 = document.createElement('label');
      ctx.fileVwrLabelB64.htmlFor = ctx.id + '-load-type-b64';
      ctx.fileVwrLabelB64.innerText = 'Base64';
      ctx.fileVwrPanel.appendChild(ctx.fileVwrLabelB64);

      ctx.fileVwrRadioBin = document.createElement('input');
      ctx.fileVwrRadioBin.type = 'radio';
      ctx.fileVwrRadioBin.id = ctx.id + '-load-type-bin';
      ctx.fileVwrRadioBin.name = ctx.id + '-load-type';
      ctx.fileVwrRadioBin.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';
      ctx.fileVwrRadioBin.value = 'binary';
      ctx.fileVwrRadioBin.onchange = ctx.openViewerBin;
      ctx.fileVwrPanel.appendChild(ctx.fileVwrRadioBin);
      ctx.fileVwrLabelBin = document.createElement('label');
      ctx.fileVwrLabelBin.htmlFor = ctx.id + '-load-type-bin';
      ctx.fileVwrLabelBin.innerText = 'Binary';
      ctx.fileVwrPanel.appendChild(ctx.fileVwrLabelBin);

      var reloadBtn = ctx.createBtn(ctx, 'Reload', ctx.fileVwrPanel);
      reloadBtn.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';
      reloadBtn.onclick = ctx.reloadFile;
      ctx.fileReloadBtn = reloadBtn;

      var clearBtn = ctx.createBtn(ctx, 'Clear', ctx.fileVwrPanel);
      clearBtn.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';
      clearBtn.onclick = ctx.clearFile;
      ctx.fileClrBtn = clearBtn;

      ctx.filePreviewWrapper = document.createElement('div');
      ctx.setStyle(ctx.filePreviewWrapper, 'width', 'calc(100% - ' + (DebugJS.WIN_ADJUST + 2) + 'px)');
      ctx.setStyle(ctx.filePreviewWrapper, 'height', 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)');
      ctx.setStyle(ctx.filePreviewWrapper, 'margin-bottom', '4px');
      ctx.setStyle(ctx.filePreviewWrapper, 'padding', '2px');
      ctx.setStyle(ctx.filePreviewWrapper, 'border', '1px dotted #ccc');
      ctx.setStyle(ctx.filePreviewWrapper, 'font-size', fontSize);
      ctx.setStyle(ctx.filePreviewWrapper, 'overflow', 'auto');
      ctx.enableDnDFileLoad(ctx.filePreviewWrapper, ctx.handleFileDropOnFileViewer);
      ctx.fileVwrPanel.appendChild(ctx.filePreviewWrapper);

      ctx.filePreview = document.createElement('pre');
      ctx.setStyle(ctx.filePreview, 'min-height', 'calc(50% + 10px)');
      ctx.setStyle(ctx.filePreview, 'background', 'transparent');
      ctx.setStyle(ctx.filePreview, 'color', opt.fontColor);
      ctx.setStyle(ctx.filePreview, 'font-size', fontSize);
      ctx.filePreviewWrapper.appendChild(ctx.filePreview);

      ctx.fileVwrFooter = document.createElement('div');
      ctx.fileVwrFooter.style.width = 'calc(100% - ' + (DebugJS.WIN_ADJUST + DebugJS.WIN_SHADOW) + 'px)';
      ctx.fileVwrFooter.style.height = (ctx.computedFontSize + 3) + 'px';
      ctx.fileVwrFooter.style.opacity = 0;
      ctx.fileVwrFooter.style.transition = 'opacity 0.5s linear';
      ctx.fileVwrPanel.appendChild(ctx.fileVwrFooter);

      ctx.fileLoadProgressBar = document.createElement('div');
      ctx.fileLoadProgressBar.style.display = 'inline-block';
      ctx.fileLoadProgressBar.style.width = 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)';
      ctx.fileLoadProgressBar.style.height = 'auto';
      ctx.fileLoadProgressBar.style.padding = 0;
      ctx.fileLoadProgressBar.style.border = '1px solid #ccc';
      ctx.fileVwrFooter.appendChild(ctx.fileLoadProgressBar);

      ctx.fileLoadProgress = document.createElement('div');
      ctx.fileLoadProgress.style.width = 'calc(100% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
      ctx.fileLoadProgress.style.height = 'auto';
      ctx.fileLoadProgress.style.padding = '1px';
      ctx.fileLoadProgress.style.border = 'none';
      ctx.fileLoadProgress.style.background = '#00f';
      ctx.setStyle(ctx.fileLoadProgress, 'font-size', (ctx.computedFontSize * 0.8) + 'px');
      ctx.fileLoadProgress.style.fontFamily = opt.fontFamily + 'px';
      ctx.fileLoadProgress.innerText = '0%';
      ctx.fileLoadProgressBar.appendChild(ctx.fileLoadProgress);

      ctx.fileLoadCancelBtn = ctx.createBtn(ctx, '[CANCEL]', ctx.fileVwrFooter);
      ctx.fileLoadCancelBtn.style.position = 'relative';
      ctx.fileLoadCancelBtn.style.top = '2px';
      ctx.fileLoadCancelBtn.style.float = 'right';
      ctx.fileLoadCancelBtn.onclick = ctx.cancelLoadFile;

      ctx.fileVwrDtUrlWrp = document.createElement('div');
      ctx.setStyle(ctx.fileVwrDtUrlWrp, 'height', 'calc(50% - ' + (ctx.computedFontSize + ctx.computedFontSize * 0.5) + 'px)');
      ctx.filePreviewWrapper.appendChild(ctx.fileVwrDtUrlWrp);

      ctx.fileVwrDtUrlScheme = ctx.createTextInput('calc(100% - 15.5em)', null, ctx.opt.fontColor, '', null);
      ctx.fileVwrDtUrlWrp.appendChild(ctx.fileVwrDtUrlScheme);

      var decodeBtn = ctx.createBtn(ctx, 'Decode', ctx.fileVwrDtUrlWrp);
      decodeBtn.style.float = 'right';
      decodeBtn.style.marginRight = '4px';
      decodeBtn.onclick = ctx.decodeFileViewData;

      var decModeBtn = ctx.createBtn(ctx, '[B64]', ctx.fileVwrDtUrlWrp);
      decModeBtn.style.float = 'right';
      decModeBtn.style.marginRight = (ctx.computedFontSize * 0.5) + 'px';
      decModeBtn.onclick = ctx.toggleDecMode;
      ctx.fileVwrDecModeBtn = decModeBtn;

      var imgBtn = ctx.createBtn(ctx, '<image>', ctx.fileVwrDtUrlWrp);
      imgBtn.style.float = 'right';
      imgBtn.style.marginRight = (ctx.computedFontSize * 0.5) + 'px';
      imgBtn.onclick = ctx.setDtSchmImg;

      var txtBtn = ctx.createBtn(ctx, '<text>', ctx.fileVwrDtUrlWrp);
      txtBtn.style.float = 'right';
      txtBtn.style.marginRight = (ctx.computedFontSize * 0.2) + 'px';
      txtBtn.onclick = ctx.setDtSchmTxt;

      ctx.fileVwrDtTxtArea = document.createElement('textarea');
      ctx.fileVwrDtTxtArea.className = ctx.id + '-editor';
      ctx.setStyle(ctx.fileVwrDtTxtArea, 'height', 'calc(100% - ' + (ctx.computedFontSize + ctx.computedFontSize * 0.5) + 'px)');
      ctx.fileVwrDtUrlWrp.appendChild(ctx.fileVwrDtTxtArea);

      ctx.clearFile();
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.fileVwrPanel);
    }

    if (format != undefined) {
      if (format == DebugJS.FILE_LOAD_FMT_B64) {
        ctx.fileVwrRadioBin.checked = false;
        ctx.fileVwrRadioB64.checked = true;
      } else {
        ctx.fileVwrRadioBin.checked = true;
        ctx.fileVwrRadioB64.checked = false;
      }
      if (ctx.fileLoadFormat != format) {
        ctx.loadFile(ctx.fileVwrFile, format);
      }
    }
  },

  closeFileLoader: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_FILE) &&
        (ctx.fileVwrPanel != null)) {
      ctx.removeToolFuncPanel(ctx, ctx.fileVwrPanel);
    }
  },

  enableDnDFileLoad: function(target, cb) {
    target.addEventListener('dragover', DebugJS.file.onDragOver, false);
    target.addEventListener('drop', cb, false);
  },

  onFileSelected: function(e) {
    var ctx = DebugJS.ctx;
    ctx.clearFile();
    if (e.target.files) {
      var format = (ctx.fileVwrRadioB64.checked ? DebugJS.FILE_LOAD_FMT_B64 : DebugJS.FILE_LOAD_FMT_BIN);
      ctx.loadFile(e.target.files[0], format);
    }
  },

  handleFileDrop: function(ctx, e, format, cb) {
    ctx.clearFile();
    e.stopPropagation();
    e.preventDefault();
    try {
      if (e.dataTransfer.files) {
        if (e.dataTransfer.files.length > 0) {
          ctx.fileVwrSysCb = cb;
          ctx.loadFile(e.dataTransfer.files[0], format);
        } else {
          DebugJS._log.w('handleFileDrop() e.dataTransfer.files.length == 0');
          if (cb) {
            cb(ctx, false, null, null);
          }
        }
      }
    } catch (e) {
      DebugJS._log.e('handleFileDrop() ' + e);
    }
  },

  handleFileDropOnFileViewer: function(e) {
    var ctx = DebugJS.ctx;
    var format = (ctx.fileVwrRadioB64.checked ? DebugJS.FILE_LOAD_FMT_B64 : DebugJS.FILE_LOAD_FMT_BIN);
    ctx.handleFileDrop(ctx, e, format, null);
  },

  handleFileDropAuto: function(e) {
    var ctx = DebugJS.ctx;
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
    ctx.handleFileDrop(ctx, e, DebugJS.FILE_LOAD_FMT_B64, ctx.onFileLoadedAuto);
  },

  onFileLoadedAuto: function(ctx, success, file, content) {
    if (!success) {
      ctx.closeFeature(ctx, DebugJS.ST_TOOLS);
      return;
    }
    if (DebugJS.isBat(content)) {
      ctx.onBatLoaded(ctx, success, file, content);
    } else if (file.name.match(/\.js$/)) {
      ctx.onJsLoaded(ctx, success, file, content);
    } else if (file.name.match(/\.json$/)) {
      DebugJS.execCmdJson(content, true);
      ctx.closeFeature(ctx, DebugJS.ST_TOOLS);
    }
  },

  handleFileDropOnBat: function(e) {
    var ctx = DebugJS.ctx;
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
    ctx.handleFileDrop(ctx, e, DebugJS.FILE_LOAD_FMT_B64, ctx.onBatLoaded);
  },

  onBatLoaded: function(ctx, success, file, content) {
    if (success) {
      DebugJS.bat.set(content);
      ctx.switchToolsFunction(DebugJS.TOOLS_FNC_BAT);
    }
  },

  handleFileDropOnJS: function(e) {
    var ctx = DebugJS.ctx;
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
    ctx.handleFileDrop(ctx, e, DebugJS.FILE_LOAD_FMT_B64, ctx.onJsLoaded);
  },

  onJsLoaded: function(ctx, success, file, content) {
    if (success) {
      ctx.closeFeature(ctx, DebugJS.ST_TOOLS);
      ctx.openFeature(ctx, DebugJS.ST_JS);
      ctx.jsEditor.value = ctx.jsBuf = content;
    }
  },

  loadFile: function(file, format) {
    var ctx = DebugJS.ctx;
    ctx.fileVwrDataSrcType = 'file';
    ctx.fileVwrFile = file;
    if (!file) return;
    if ((file.size == 0) && (file.type == '')) {
      var html = ctx.getFileInfo(file);
      ctx.updateFilePreview(html);
      return;
    }
    ctx.fileLoadProgress.style.width = '0%';
    ctx.fileLoadProgress.textContent = '0%';
    ctx.fileReader = new FileReader();
    ctx.fileReader.onerror = ctx.onFileLoadError;
    ctx.fileReader.onprogress = ctx.onFileLoadProgress;
    ctx.fileReader.onabort = ctx.onAbortLoadFile;
    ctx.fileReader.onloadstart = ctx.onFileLoadStart;
    ctx.fileReader.onload = ctx.onFileLoaded;
    ctx.fileReader.file = file;
    if (format == DebugJS.FILE_LOAD_FMT_B64) {
      ctx.fileLoadFormat = DebugJS.FILE_LOAD_FMT_B64;
      ctx.fileReader.readAsDataURL(file);
    } else {
      ctx.fileLoadFormat = DebugJS.FILE_LOAD_FMT_BIN;
      ctx.fileReader.readAsArrayBuffer(file);
    }
  },

  openViewerB64: function() {
    var ctx = DebugJS.ctx;
    ctx.filePreviewWrapper.appendChild(ctx.fileVwrDtUrlWrp);
    var dtSrc = ctx.dataSrcType();
    switch (dtSrc) {
      case 'file':
        if (ctx.fileVwrByteArray) {
          ctx.viewBinAsB64(ctx);
        } else {
          ctx.loadFile(ctx.fileVwrFile, DebugJS.FILE_LOAD_FMT_B64);
        }
        break;
      case 'b64':
        ctx.showB64Preview(ctx, null, ctx.fileVwrDataSrc.scheme, ctx.fileVwrDataSrc.data);
        break;
      case 'bin':
      case 'hex':
        ctx.viewBinAsB64(ctx);
        break;
    }
  },

  openViewerBin: function() {
    var ctx = DebugJS.ctx;
    if (DebugJS.isChild(ctx.filePreviewWrapper, ctx.fileVwrDtUrlWrp)) {
      ctx.filePreviewWrapper.removeChild(ctx.fileVwrDtUrlWrp);
    }
    var dtSrc = ctx.dataSrcType();
    switch (dtSrc) {
      case 'file':
        if (ctx.fileVwrDataSrc) {
          ctx.decodeB64dataAsB(ctx.fileVwrDataSrc.data);
        } else {
          ctx.loadFile(ctx.fileVwrFile, DebugJS.FILE_LOAD_FMT_BIN);
        }
        break;
      case 'b64':
      case 'bin':
      case 'hex':
        ctx.decodeB64dataAsB(ctx.fileVwrDataSrc.data);
        break;
      default:
        ctx.updateFilePreview('');
    }
  },

  decodeFileViewData: function() {
    var ctx = DebugJS.ctx;
    var mode = ctx.fileVwrDecMode;
    var scheme = ctx.fileVwrDtUrlScheme.value;
    var data = ctx.fileVwrDtTxtArea.value;
    ctx.clearFile();
    data = DebugJS.delAllSP(data);
    data = DebugJS.delAllNL(data);
    ctx.fileVwrDataSrc = {scheme: scheme, data: data};
    ctx.setDataUrl(ctx, scheme, data);
    switch (mode) {
      case 'bin':
        ctx.fileVwrDataSrcType = 'bin';
        ctx.decodeBin(ctx, data);
        break;
      case 'hex':
        ctx.fileVwrDataSrcType = 'hex';
        ctx.decodeHex(ctx, data);
        break;
      default:
        ctx.fileVwrDataSrcType = 'b64';
        ctx.showB64Preview(ctx, null, scheme, data);
    }
  },

  decodeBin: function(ctx, bin) {
    ctx.fileVwrByteArray = DebugJS.str2binArr(bin, 8, '0b');
    ctx.viewBinAsB64(ctx);
  },

  decodeHex: function(ctx, hex) {
    ctx.fileVwrByteArray = DebugJS.str2binArr(hex, 2, '0x');
    ctx.viewBinAsB64(ctx);
  },

  decodeB64dataAsB: function(b64) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.Base64.decode(b64);
    ctx.fileVwrByteArray = a;
    ctx.showBinDump(ctx, a);
  },

  viewBinAsB64: function(ctx) {
    var file = ctx.fileVwrFile;
    var scheme;
    if (file) {
      scheme = 'data:' + file.type + ';base64';
    } else {
      scheme = ctx.fileVwrDataSrc.scheme;
    }
    var limit = ctx.props.prevlimit;
    if (file && (file.size > limit)) {
      ctx.showFileSizeExceeds(ctx, file, limit);
      return;
    } else {
      var data = DebugJS.Base64.encode(ctx.fileVwrByteArray);
      ctx.fileVwrDataSrc = {scheme: scheme, data: data};
      ctx.setDataUrl(ctx, scheme, data);
      ctx.showB64Preview(ctx, file, scheme, data);
    }
  },

  cancelLoadFile: function() {
    if (DebugJS.ctx.fileReader) {
      DebugJS.ctx.fileReader.abort();
    }
  },

  onAbortLoadFile: function(e) {
    DebugJS.ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
    DebugJS.ctx.updateFilePreview('File read cancelled.');
    setTimeout(DebugJS.ctx.fileLoadFinalize, 1000);
  },

  onFileLoadError: function(e) {
    DebugJS.ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
    var te = e.target.error;
    var err;
    switch (te.code) {
      case te.NOT_FOUND_ERR:
        err = 'NOT_FOUND_ERR';
        break;
      case te.SECURITY_ERR:
        err = 'SECURITY_ERR';
        break;
      case te.NOT_READABLE_ERR:
        err = 'NOT_READABLE_ERR';
        break;
      case te.ABORT_ERR:
        err = 'ABORT_ERR';
        break;
      default:
        err = 'FILE_READ_ERROR (' + te.code + ')';
    }
    DebugJS.ctx.updateFilePreview(err);
  },

  onFileLoadProgress: function(e) {
    if (e.lengthComputable) {
      var ctx = DebugJS.ctx;
      var total = e.total;
      var loaded = e.loaded;
      var percent = (total == 0) ? 100 : Math.round((loaded / total) * 100);
      ctx.fileLoadProgress.style.width = 'calc(' + percent + '% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
      ctx.fileLoadProgress.textContent = percent + '%';
      ctx.updateFilePreview('LOADING...\n' + DebugJS.formatDec(loaded) + ' / ' + DebugJS.formatDec(total) + ' bytes');
    }
  },

  onFileLoadStart: function(e) {
    DebugJS.addClass(DebugJS.ctx.fileVwrFooter, DebugJS.ctx.id + '-loading');
    DebugJS.ctx.updateFilePreview('LOADING...');
  },

  onFileLoaded: function(e) {
    var ctx = DebugJS.ctx;
    var file = ctx.fileReader.file;
    var content = '';
    try {
      if (ctx.fileReader.result != null) content = ctx.fileReader.result;
    } catch (e) {
      DebugJS._log.e('onFileLoaded: ' + e);
    }
    if (ctx.fileLoadFormat == DebugJS.FILE_LOAD_FMT_B64) {
      ctx.onFileLoadedB64(ctx, file, content);
    } else {
      ctx.onFileLoadedBin(ctx, file, content);
    }
    setTimeout(ctx.fileLoadFinalize, 1000);
    var isB64 = (ctx.fileLoadFormat == DebugJS.FILE_LOAD_FMT_B64);
    DebugJS.callEvtListener('fileloaded', file, content, isB64);
    ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
  },

  onFileLoadedB64: function(ctx, file, dturl) {
    if (file) {
      var LIMIT = ctx.props.prevlimit;
      if (file.size > LIMIT) {
        ctx.showFileSizeExceeds(ctx, file, LIMIT);
        return;
      } else if (file.size == 0) {
        ctx.updateFilePreview(ctx.getFileInfo(file));
        return;
      }
    }
    var b64ctt = DebugJS.splitDataUrl(dturl);
    ctx.fileVwrDataSrc = b64ctt;
    var cType = DebugJS.getContentType(null, file, b64ctt.data);
    if (cType == 'text') {
      if (ctx.fileVwrSysCb) {
        var decoded = DebugJS.decodeBase64(b64ctt.data);
        ctx.fileVwrSysCb(ctx, true, file, decoded);
      }
    }
    DebugJS.file.onLoaded(file, b64ctt.data);
    ctx.setDataUrl(ctx, b64ctt.scheme, b64ctt.data);
    ctx.showB64Preview(ctx, file, b64ctt.scheme, b64ctt.data);
  },

  onFileLoadedBin: function(ctx, file, content) {
    var buf = new Uint8Array(content);
    ctx.fileVwrByteArray = buf;
    DebugJS.file.onLoaded(file, buf);
    ctx.showBinDump(ctx, buf);
  },

  switchFileScreen: function() {
    var ctx = DebugJS.ctx;
    if (ctx.fileVwrRadioB64.checked) {
      ctx.fileVwrRadioBin.checked = true;
      ctx.openViewerBin();
    } else {
      ctx.fileVwrRadioB64.checked = true;
      ctx.openViewerB64();
    }
  },

  toggleDecMode: function() {
    var ctx = DebugJS.ctx;
    var mode = ctx.fileVwrDecMode;
    switch (mode) {
      case 'b64':
        mode = 'hex';
        break;
      case 'hex':
        mode = 'bin';
        break;
      default:
        mode = 'b64';
    }
    ctx.fileVwrDecMode = mode;
    ctx.fileVwrDecModeBtn.innerText = '[' + mode.toUpperCase() + ']';
  },

  toggleBinMode: function() {
    var ctx = DebugJS.ctx;
    var opt = ctx.fileVwrBinViewOpt;
    switch (opt.mode) {
      case 'bin':
        opt.mode = 'dec';
        break;
      case 'dec':
        opt.mode = 'hex';
        break;
      default:
        opt.mode = 'bin';
    }
    ctx.showBinDump(ctx, ctx.fileVwrByteArray);
  },

  toggleShowAddr: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'addr');
  },

  toggleShowSpace: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'space');
  },

  toggleShowAscii: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'ascii');
  },

  toggleBinVwrOpt: function(ctx, key) {
    var ctx = DebugJS.ctx;
    var opt = ctx.fileVwrBinViewOpt;
    opt[key] = (opt[key] ? false : true);
    var file = ctx.fileVwrFile;
    var html = '';
    if (file) html += ctx.getFileInfo(file);
    html += ctx.getBinDumpHtml(ctx.fileVwrByteArray, opt.mode, opt.addr, opt.space, opt.ascii);
    ctx.updateFilePreview(html);
  },

  showBinDump: function(ctx, buf) {
    var file = ctx.fileVwrFile;
    var opt = ctx.fileVwrBinViewOpt;
    var html = '';
    if (file) html += ctx.getFileInfo(file);
    html += ctx.getBinDumpHtml(buf, opt.mode, opt.addr, opt.space, opt.ascii);
    ctx.updateFilePreview(html);
  },

  showB64Preview: function(ctx, file, scheme, data) {
    var html = '';
    if (file) {
      var LIMIT = ctx.props.prevlimit;
      if (file.size > LIMIT) {
        ctx.showFileSizeExceeds(ctx, file, LIMIT);
        return;
      } else if (file.size == 0) {
        ctx.updateFilePreview(html);
        return;
      }
      html += ctx.getFileInfo(file);
    }
    var cType = DebugJS.getContentType(scheme, file, data);
    if (cType == 'image') {
      html += ctx.getImgPreview(ctx, scheme, data);
    } else {
      var decoded = DebugJS.decodeBase64(data);
      html += ctx.getTextPreview(decoded);
    }
    ctx.updateFilePreview(html);
  },

  setDataUrl: function(ctx, scheme, data) {
    scheme = scheme.replace(/,$/, '');
    ctx.fileVwrDtUrlScheme.value = scheme + ',';
    ctx.fileVwrDtTxtArea.value = data;
  },

  getFileInfo: function(file) {
    var lastMod = (file.lastModified ? file.lastModified : file.lastModifiedDate);
    var dt = DebugJS.getDateTime(lastMod);
    var fileDate = DebugJS.convDateTimeStr(dt);
    var s = '<span style="color:#cff">' +
    'file    : ' + file.name + '\n' +
    'type    : ' + file.type + '\n' +
    'size    : ' + DebugJS.formatDec(file.size) + ' byte' + ((file.size >= 2) ? 's' : '') + '\n' +
    'modified: ' + fileDate + '</span>\n';
    return s;
  },

  showFileSizeExceeds: function(ctx, file, limit) {
    var html = ctx.getFileInfo(file) +
    '<span style="color:' + ctx.opt.logColorW + '">The file size exceeds the limit allowed. (limit=' + limit + ')</span>';
    ctx.updateFilePreview(html);
  },

  getTextPreview: function(decoded) {
    if (decoded.length == 0) return '';
    var txt = DebugJS.escTags(decoded);
    txt = txt.replace(/\r\n/g, DebugJS.CHR_CRLF_S + '\n');
    txt = txt.replace(/([^>])\n/g, '$1' + DebugJS.CHR_LF_S + '\n');
    txt = txt.replace(/\r/g, DebugJS.CHR_CR_S + '\n');
    return (txt + DebugJS.EOF + '\n');
  },

  toggleShowHideCC: function() {
    var el = document.getElementsByClassName('dbg-cc');
    for (var i = 0; i < el.length; i++) {
      DebugJS.toggleElShowHide(el[i]);
    }
  },

  getImgPreview: function(ctx, scheme, data) {
    var ctxSizePos = ctx.getSelfSizePos();
    return '<img src="' + DebugJS.buildDataUrl(scheme, data) + '" id="' + ctx.id + '-img-preview" style="max-width:' + (ctxSizePos.w - 32) + 'px;max-height:' + (ctxSizePos.h - (ctx.computedFontSize * 13) - 8) + 'px">\n';
  },

  resizeImgPreview: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (!(ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_FILE)) ||
        (!(ctx.fileLoadFormat == DebugJS.FILE_LOAD_FMT_B64))) {
      return;
    }
    var imgPreview = document.getElementById(ctx.id + '-img-preview');
    if (imgPreview == null) return;
    var ctxSizePos = ctx.getSelfSizePos();
    var maxW = (ctxSizePos.w - 32);
    if (maxW < 100) maxW = 100;
    var maxH = (ctxSizePos.h - (ctx.computedFontSize * 13) - 8);
    if (maxH < 100) maxH = 100;
    imgPreview.style.maxWidth = maxW + 'px';
    imgPreview.style.maxHeight = maxH + 'px';
  },

  getBinDumpHtml: function(buf, mode, showAddr, showSpace, showAscii) {
    if (buf == null) return '';
    var ctx = DebugJS.ctx;
    var limit = ctx.props.hexdumplimit | 0;
    var lastRows = ctx.props.hexdumplastrows | 0;
    var lastLen = 0x10 * lastRows;
    var bLen = buf.length;
    if (limit == 0) limit = bLen;
    var len = ((bLen > limit) ? limit : bLen);
    if (len % 0x10 != 0) {
      len = (((len / 0x10) + 1) | 0) * 0x10;
    }
    var html = '<pre style="white-space:pre !important">';
    html += ctx.createBtnHtml(ctx, '[' + mode.toUpperCase() + ']', 'DebugJS.ctx.toggleBinMode()') + ' ';
    html += ctx.createBtnHtml(ctx, '[ADDR]', 'DebugJS.ctx.toggleShowAddr()', (showAddr ? '' : 'color:' + DebugJS.COLOR_INACTIVE)) + ' ';
    html += ctx.createBtnHtml(ctx, '[SP]', 'DebugJS.ctx.toggleShowSpace()', (showSpace ? '' : 'color:' + DebugJS.COLOR_INACTIVE)) + ' ';
    html += ctx.createBtnHtml(ctx, '[ASCII]', 'DebugJS.ctx.toggleShowAscii()', (showAscii ? '' : 'color:' + DebugJS.COLOR_INACTIVE));
    html += '\n<span style="background:#0cf;color:#000">';
    if (showAddr) {
      html += 'Address    ';
    }
    if (mode == 'bin') {
      if (showSpace) {
        html += '+0       +1       +2       +3       +4       +5       +6       +7        +8       +9       +A       +B       +C       +D       +E       +F      ';
      } else {
        html += '+0      +1      +2      +3      +4      +5      +6      +7      +8      +9      +A      +B      +C      +D      +E      +F      ';
      }
    } else if (mode == 'dec') {
      if (showSpace) {
        html += ' +0  +1  +2  +3  +4  +5  +6  +7   +8  +9  +A  +B  +C  +D  +E  +F';
      } else {
        html += ' +0 +1 +2 +3 +4 +5 +6 +7 +8 +9 +A +B +C +D +E +F';
      }
    } else {
      if (showSpace) {
        html += '+0 +1 +2 +3 +4 +5 +6 +7  +8 +9 +A +B +C +D +E +F';
      } else {
        html += '+0+1+2+3+4+5+6+7+8+9+A+B+C+D+E+F';
      }
    }
    if (showAscii) {
      html += '  ASCII           ';
    }
    html += '</span>\n';
    if (showAddr) {
      html += DebugJS.dumpAddr(0);
    }
    for (var i = 0; i < len; i++) {
      html += ctx.getDump(mode, i, buf, len, showSpace, showAddr, showAscii);
    }
    if (bLen > limit) {
      if (bLen - limit > (0x10 * lastRows)) {
        html += '\n<span style="color:#ccc">...</span>';
      }
      if (lastRows > 0) {
        var rem = (bLen % 0x10);
        var start = (rem == 0 ? (bLen - lastLen) : ((bLen - rem) - (0x10 * (lastRows - 1))));
        if (start < len) {
          rem = ((len - start) % 0x10);
          start = len + rem;
        }
        var end = bLen + (rem == 0 ? 0 : (0x10 - rem));
        html += '\n';
        if (showAddr) {
          html += DebugJS.dumpAddr(start);
        }
        for (i = start; i < end; i++) {
          html += ctx.getDump(mode, i, buf, end, showSpace, showAddr, showAscii);
        }
      }
    }
    html += '</pre>';
    return html;
  },

  getDump: function(mode, i, buf, len, showSpace, showAddr, showAscii) {
    var b;
    if (mode == 'bin') {
      b = DebugJS.dumpBin(i, buf);
    } else if (mode == 'dec') {
      b = DebugJS.dumpDec(i, buf);
    } else {
      b = DebugJS.dumpHex(i, buf);
    }
    if ((i + 1) % 0x10 == 0) {
      if (showAscii) {
        b += '  ' + DebugJS.dumpAscii(((i + 1) - 0x10), buf, len);
      }
      if ((i + 1) < len) {
        b += '\n';
        if (showAddr) {
          b += DebugJS.dumpAddr(i + 1);
        }
      }
    } else if (showSpace) {
      if ((i + 1) % 8 == 0) {
        b += '  ';
      } else {
        b += ' ';
      }
    }
    return b;
  },

  updateFilePreview: function(html) {
    DebugJS.ctx.filePreview.innerHTML = html + '\n';
    DebugJS.ctx.filePreviewWrapper.scrollTop = 0;
  },

  fileLoadFinalize: function() {
    DebugJS.removeClass(DebugJS.ctx.fileVwrFooter, DebugJS.ctx.id + '-loading');
  },

  reloadFile: function() {
    var ctx = DebugJS.ctx;
    var fmt;
    if (ctx.fileVwrRadioB64.checked) {
      fmt = DebugJS.FILE_LOAD_FMT_B64;
    } else {
      fmt = DebugJS.FILE_LOAD_FMT_BIN;
    }
    ctx.loadFile(ctx.fileVwrFile, fmt);
  },

  clearFile: function() {
    var ctx = DebugJS.ctx;
    ctx.fileVwrDataSrcType = null;
    ctx.fileVwrFile = null;
    ctx.fileVwrDataSrc = null;
    ctx.fileVwrByteArray = null;
    ctx.fileReader = null;
    ctx.filePreview.innerText = 'Drop a file here';
    ctx.setDtSchmTxt();
    ctx.fileVwrDtTxtArea.value = '';
  },

  dataSrcType: function() {
    return DebugJS.ctx.fileVwrDataSrcType;
  },

  setDtSchm: function(type) {
    DebugJS.ctx.fileVwrDtUrlScheme.value = 'data:' + type + ';base64,';
  },

  setDtSchmTxt: function() {
    DebugJS.ctx.setDtSchm('text/plain');
  },

  setDtSchmImg: function() {
    DebugJS.ctx.setDtSchm('image/jpeg');
  },

  openHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.htmlPrevBasePanel == null) {
      ctx.htmlPrevBasePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);

      ctx.htmlPrevPrevPanel = document.createElement('div');
      ctx.htmlPrevPrevPanel.style.height = '50%';
      ctx.htmlPrevPrevPanel.innerHTML = 'HTML PREVIEWER';
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevPrevPanel);

      ctx.htmlPrevEditorPanel = document.createElement('div');
      var html = '<span style="color:#ccc">HTML Editor</span>' +
      ctx.createBtnHtml(ctx, '[DRAW]', 'DebugJS.ctx.drawHtml();DebugJS.ctx.htmlPrevEditor.focus();', 'float:right;margin-right:4px') +
      ctx.createBtnHtml(ctx, '[CLR]', 'DebugJS.ctx.insertHtmlSnippet();', 'margin-left:4px;margin-right:4px');
      for (var i = 0; i < 5; i++) {
        html += ctx.createHtmlSnippetBtn(ctx, i);
      }
      ctx.htmlPrevEditorPanel.innerHTML = html;
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevEditorPanel);

      ctx.htmlPrevEditor = document.createElement('textarea');
      ctx.htmlPrevEditor.className = ctx.id + '-editor';
      ctx.setStyle(ctx.htmlPrevEditor, 'height', 'calc(50% - ' + (ctx.computedFontSize + 10) + 'px)');
      ctx.htmlPrevEditor.onblur = ctx.saveHtmlBuf;
      ctx.htmlPrevEditor.value = ctx.htmlPrevBuf;
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevEditor);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.htmlPrevBasePanel);
    }
    ctx.htmlPrevEditor.focus();
  },

  createHtmlSnippetBtn: function(ctx, i) {
    return ctx.createBtnHtml(ctx, '&lt;CODE' + (i + 1) + '&gt;', 'DebugJS.ctx.insertHtmlSnippet(' + i + ');', 'margin-left:4px');
  },

  insertHtmlSnippet: function(n) {
    var editor = DebugJS.ctx.htmlPrevEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.HTML_SNIPPET[n];
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      DebugJS.ctx.htmlPrevEditor.focus();
      DebugJS.ctx.htmlPrevEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveHtmlBuf: function() {
    DebugJS.ctx.htmlPrevBuf = DebugJS.ctx.htmlPrevEditor.value;
  },

  drawHtml: function() {
    DebugJS.ctx.htmlPrevPrevPanel.innerHTML = DebugJS.ctx.htmlPrevBuf;
  },

  closeHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_HTML) &&
        (ctx.htmlPrevBasePanel != null)) {
      ctx.removeToolFuncPanel(ctx, ctx.htmlPrevBasePanel);
    }
  },

  openBatEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.batBasePanel == null) {
      var basePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
      ctx.batResumeBtn = ctx.createBtn(ctx, '[RESUME]', basePanel);
      ctx.batResumeBtn.style.float = 'right';
      ctx.batRunBtn = ctx.createBtn(ctx, '[ RUN ]', basePanel);
      ctx.batRunBtn.onclick = ctx.startPauseBat;
      ctx.batStopBtn = ctx.createBtn(ctx, '[STOP]', basePanel);
      ctx.batStopBtn.onclick = DebugJS.bat.terminate;
      ctx.createLabel(' FROM:', basePanel);
      ctx.batStartTxt = ctx.createTextInput('45px', 'left', ctx.opt.fontColor, '', null);
      basePanel.appendChild(ctx.batStartTxt);
      ctx.createLabel(' TO:', basePanel);
      ctx.batEndTxt = ctx.createTextInput('45px', 'left', ctx.opt.fontColor, '', null);
      basePanel.appendChild(ctx.batEndTxt);
      ctx.createLabel(' Arg:', basePanel);
      ctx.batArgTxt = ctx.createTextInput('80px', 'left', ctx.opt.fontColor, '', null);
      basePanel.appendChild(ctx.batArgTxt);
      ctx.createLabel(' L:', basePanel);
      ctx.batCurPc = ctx.createLabel('0', basePanel);
      ctx.createLabel('/', basePanel).style.color = '#ccc';
      ctx.batTotalLine = ctx.createLabel(DebugJS.bat.cmds.length, basePanel);
      ctx.createLabel(' N:', basePanel);
      ctx.batNestLv = ctx.createLabel('0', basePanel);
      ctx.batTextEditor = document.createElement('textarea');
      ctx.batTextEditor.className = ctx.id + '-editor';
      ctx.setStyle(ctx.batTextEditor, 'height', 'calc(100% - ' + (ctx.computedFontSize * 2) + 'px)');
      ctx.enableDnDFileLoad(ctx.batTextEditor, ctx.handleFileDropOnBat);
      basePanel.appendChild(ctx.batTextEditor);
      ctx.batBasePanel = basePanel;
      ctx.setBatTxt(ctx);
      ctx.setBatArgTxt(ctx);
      ctx.updateCurPc();
      ctx.updateBatNestLv();
      ctx.updateBatRunBtn();
      ctx.updateBatResumeBtn();
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.batBasePanel);
    }
    ctx.batTextEditor.focus();
  },

  startPauseBat: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_BAT_RUNNING) {
      if (ctx.status & DebugJS.ST_BAT_PAUSE) {
        DebugJS.bat._resume();
      } else {
        DebugJS.bat.pause();
      }
    } else {
      ctx.runBat(ctx);
    }
  },

  runBat: function(ctx) {
    var bat = DebugJS.bat;
    bat.store(ctx.batTextEditor.value);
    var a = ctx.batArgTxt.value;
    try {
      bat.setExecArg(eval(a));
    } catch (e) {
      DebugJS._log.e('BAT ARG ERROR (' + e + ')');
      return;
    }
    var s = ctx.batStartTxt.value;
    var e = ctx.batEndTxt.value;
    if (s == '') s = undefined;
    if (e == '') e = undefined;
    bat.run(s, e);
  },

  updateBatRunBtn: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.batRunBtn) return;
    var label = ' RUN ';
    var color = '#0f0';
    if (ctx.status & DebugJS.ST_BAT_RUNNING) {
      if (!(ctx.status & DebugJS.ST_BAT_PAUSE)) {
        label = 'PAUSE';
        color = '#ff0';
      }
      ctx.setStyle(ctx.batStopBtn, 'color', '#f66');
    } else {
      ctx.setStyle(ctx.batStopBtn, 'color', '#a99');
    }
    ctx.batRunBtn.innerText = '[' + label + ']';
    ctx.setStyle(ctx.batRunBtn, 'color', color);
  },

  updateBatResumeBtn: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.batResumeBtn) return;
    var color = DebugJS.COLOR_INACTIVE;
    var handler = null;
    if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
      color = ctx.opt.btnColor;
      handler = ctx.batResume;
    } else if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
      color = ctx.opt.btnColor;
    }
    ctx.setStyle(ctx.batResumeBtn, 'color', color);
    ctx.batResumeBtn.onclick = handler;
  },

  batResume: function() {
    DebugJS.bat._resume('cmd-key');
  },

  setBatTxt: function(ctx) {
    var b = '';
    var cmds = DebugJS.bat.cmds;
    for (var i = 0; i < cmds.length; i++) {
      b += cmds[i] + '\n';
    }
    if (ctx.batTextEditor) {
      ctx.batTextEditor.value = b;
    }
  },

  setBatArgTxt: function(ctx) {
    if (ctx.batArgTxt) {
      var a = DebugJS.bat.ctrl.execArg;
      if ((typeof a == 'string') && (a != '')) {a = '"' + a + '"';}
      ctx.batArgTxt.value = a + '';
    }
  },

  updateCurPc: function(b) {
    var pc = DebugJS.bat.ctrl.pc;
    var df = DebugJS.digits(DebugJS.bat.cmds.length) - DebugJS.digits(pc);
    var pdng = '';
    for (var i = 0; i < df; i++) {
      pdng += '0';
    }
    if (DebugJS.ctx.batCurPc) {
      DebugJS.ctx.batCurPc.innerText = pdng + pc;
      DebugJS.ctx.batCurPc.style.color = (b ? '#f66' : '');
    }
  },

  updateTotalLine: function() {
    if (DebugJS.ctx.batTotalLine) {
      DebugJS.ctx.batTotalLine.innerText = DebugJS.bat.cmds.length;
    }
  },

  updateBatNestLv: function() {
    if (DebugJS.ctx.batNestLv) {
      DebugJS.ctx.batNestLv.innerText = DebugJS.bat.nestLv();
    }
  },

  closeBatEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFnc & DebugJS.TOOLS_FNC_BAT) &&
        (ctx.batBasePanel != null)) {
      ctx.removeToolFuncPanel(ctx, ctx.batBasePanel);
    }
  },

  toggleJs: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_JS) {
      ctx.closeJsEditor();
    } else {
      ctx.openJsEditor(ctx);
    }
  },

  openJsEditor: function(ctx) {
    ctx.status |= DebugJS.ST_JS;
    ctx.featStack.push(DebugJS.ST_JS);
    if (ctx.jsPanel == null) {
      ctx.createJsPanel(ctx);
    }
    ctx.updateJsBtn(ctx);
    ctx.jsEditor.focus();
  },

  createJsPanel: function(ctx) {
    ctx.jsPanel = document.createElement('div');
    ctx.jsPanel.className = ctx.id + '-overlay-panel';
    var html = '<div class="' + ctx.id + '-btn ' + ctx.id + '-nomove" ' +
    'style="position:relative;top:-1px;float:right;' +
    'font-size:' + (18 * ctx.opt.zoom) + 'px;color:#888 !important" ' +
    'onclick="DebugJS.ctx.closeJsEditor();" ' +
    'onmouseover="DebugJS.ctx.setStyle(this, \'color\', \'#d88\');" ' +
    'onmouseout="DebugJS.ctx.setStyle(this, \'color\', \'#888\');">x</div>' +
    '<span style="color:#ccc">JS Editor</span>' +
    ctx.createBtnHtml(ctx, '[EXEC]', 'DebugJS.ctx.execJavaScript();', 'float:right;margin-right:4px') +
    ctx.createBtnHtml(ctx, '[CLR]', 'DebugJS.ctx.insertJsSnippet();', 'margin-left:4px;margin-right:4px');
    for (var i = 0; i < 5; i++) {
      html += ctx.createJsSnippetBtn(ctx, i);
    }
    ctx.jsPanel.innerHTML = html;
    ctx.addOverlayPanel(ctx, ctx.jsPanel);
    ctx.jsEditor = document.createElement('textarea');
    ctx.jsEditor.className = ctx.id + '-editor';
    ctx.jsEditor.onblur = ctx.saveJsBuf;
    ctx.jsEditor.value = ctx.jsBuf;
    ctx.enableDnDFileLoad(ctx.jsEditor, ctx.handleFileDropOnJS);
    ctx.jsPanel.appendChild(ctx.jsEditor);
  },

  createJsSnippetBtn: function(ctx, i) {
    return ctx.createBtnHtml(ctx, '{CODE' + (i + 1) + '}', 'DebugJS.ctx.insertJsSnippet(' + i + ');', 'margin-left:4px');
  },

  createBtnHtml: function(ctx, label, onclick, style) {
    return '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" ' + (style == undefined ? '' : 'style="' + style + '" ') + 'onclick="' + onclick + '">' + label + '</span>';
  },

  addOverlayPanel: function(ctx, panel) {
    if (ctx.overlayBasePanel == null) {
      ctx.collapseLogPanel(ctx);
      ctx.overlayBasePanel = document.createElement('div');
      ctx.overlayBasePanel.className = ctx.id + '-overlay-base-panel';
      ctx.mainPanel.appendChild(ctx.overlayBasePanel);
      //ctx.mainPanel.insertBefore(ctx.overlayBasePanel, ctx.logPanel); // to bottom
    }
    ctx.overlayBasePanel.appendChild(panel);
    ctx.overlayPanels.push(panel);
  },

  removeOverlayPanel: function(ctx, panel) {
    if (ctx.overlayBasePanel != null) {
      for (var i = 0; i < ctx.overlayPanels.length; i++) {
        if (ctx.overlayPanels[i] == panel) {
          ctx.overlayPanels.splice(i, 1);
          ctx.overlayBasePanel.removeChild(panel);
          break;
        }
      }
      if (ctx.overlayPanels.length == 0) {
        ctx.mainPanel.removeChild(ctx.overlayBasePanel);
        ctx.overlayBasePanel = null;
        ctx.expandLogPanel(ctx);
      }
    }
  },

  addOverlayPanelFull: function(panel) {
    DebugJS.ctx.mainPanel.appendChild(panel);
  },

  removeOverlayPanelFull: function(panel) {
    if (panel.parentNode) {
      DebugJS.ctx.mainPanel.removeChild(panel);
    }
  },

  insertJsSnippet: function(n) {
    var ctx = DebugJS.ctx;
    var editor = ctx.jsEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.JS_SNIPPET[n];
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      ctx.jsEditor.focus();
      ctx.jsEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveJsBuf: function() {
    DebugJS.ctx.jsBuf = DebugJS.ctx.jsEditor.value;
  },

  execJavaScript: function() {
    DebugJS.ctx.execCode(DebugJS.ctx.jsBuf, true);
  },

  execCode: function(code, echo) {
    if (code == '') return;
    try {
      var ret = eval(code);
      var res = ret;
      if (typeof ret == 'string') {
        res = DebugJS.quoteStr(ret);
      }
      if (echo) DebugJS._log.res(res);
      return ret;
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  closeJsEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.jsPanel != null) {
      ctx.removeOverlayPanel(ctx, ctx.jsPanel);
      ctx.jsPanel = null;
    }
    ctx.status &= ~DebugJS.ST_JS;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_JS);
    ctx.updateJsBtn(ctx);
  },

  toggleExtPanel: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_EXT_PANEL) {
      ctx.closeExtPanel(ctx);
    } else {
      ctx.openExtPanel(ctx);
    }
  },

  openExtPanel: function(ctx) {
    ctx.status |= DebugJS.ST_EXT_PANEL;
    ctx.featStack.push(DebugJS.ST_EXT_PANEL);
    ctx.addOverlayPanelFull(ctx.extPanel);
    var activePanel = ctx.extActPnlIdx;
    if (activePanel == -1) {
      var activePanel = ctx.nextValidExtPanelIdx(ctx, activePanel);
      ctx.switchExtPanel(activePanel);
    } else {
      var p = ctx.extPanels[activePanel];
      if ((p) && (p.onActive)) ctx.onExtPanelActive(ctx, p);
    }
    ctx.updateExtBtns(ctx);
    ctx.updateExtBtn(ctx);
  },

  createExtHeaderBtn: function(ctx, label, idx) {
    var MAX_LEN = 20;
    label = DebugJS.trimDownText(label, MAX_LEN);
    var btn = ctx.createBtn(ctx, '<' + label + '>', ctx.extHeaderPanel);
    btn.style.marginRight = '4px';
    ctx.setStyle(btn, 'color', DebugJS.SBPNL_COLOR_INACTIVE);
    btn.onclick = new Function('DebugJS.ctx.switchExtPanel(' + idx + ');');
    btn.onmouseover = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.extPanels[' + idx + '].btn, \'color\', DebugJS.SBPNL_COLOR_ACTIVE);');
    btn.onmouseout = new Function('DebugJS.ctx.setStyle(DebugJS.ctx.extPanels[' + idx + '].btn, \'color\', (DebugJS.ctx.extActPnlIdx == ' + idx + ') ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);');
    return btn;
  },

  closeExtPanel: function(ctx) {
    if ((ctx.extPanel != null) && (ctx.extPanel.parentNode)) {
      var p = ctx.extPanels[ctx.extActPnlIdx];
      if ((p) && (p.onInActive)) ctx.onExtPanelInActive(ctx, p);
      ctx.removeOverlayPanelFull(ctx.extPanel);
    }
    ctx.status &= ~DebugJS.ST_EXT_PANEL;
    DebugJS.delArrayVal(ctx.featStack, DebugJS.ST_EXT_PANEL);
    ctx.updateExtBtn(ctx);
  },

  switchExtPanel: function(idx) {
    var ctx = DebugJS.ctx;
    var pnls = ctx.extPanels;
    if (ctx.extActPnlIdx == idx) return;

    if (ctx.extActPnlIdx != -1) {
      var p2 = pnls[ctx.extActPnlIdx];
      if (p2) {
        if ((ctx.status & DebugJS.ST_EXT_PANEL) && (p2.onInActive)) {
          ctx.onExtPanelInActive(ctx, p2);
        }
        ctx.extBodyPanel.removeChild(p2.base);
      }
    }

    var p1 = pnls[idx];
    ctx.extBodyPanel.appendChild(p1.base);
    if (p1) {
      if ((ctx.status & DebugJS.ST_EXT_PANEL) && (p1.onActive)) {
        ctx.onExtPanelActive(ctx, p1);
      }
    }

    ctx.extActPnlIdx = idx;
    ctx.updateExtBtns(ctx);
  },

  onExtPanelActive: function(ctx, p) {
    ctx.extActivePanel = p.panel;
    p.onActive(p.panel);
  },

  onExtPanelInActive: function(ctx, p) {
    ctx.extActivePanel = null;
    p.onInActive(p.panel);
  },

  prevValidExtPanelIdx: function(ctx, idx) {
    if (idx > 0) {
      for (var i = idx - 1; i >= 0; i--) {
        if (ctx.extPanels[i] != null) {
          return i;
        }
      }
    }
    return -1;
  },

  nextValidExtPanelIdx: function(ctx, idx) {
    for (var i = idx + 1; i < ctx.extPanels.length; i++) {
      if (ctx.extPanels[i] != null) return i;
    }
    return -1;
  },

  existsValidExtPanel: function(ctx) {
    for (var i = 0; i < ctx.extPanels.length; i++) {
      if (ctx.extPanels[i] != null) return true;
    }
    return false;
  },

  updateExtBtns: function(ctx) {
    var pnls = ctx.extPanels;
    for (var i = 0; i < pnls.length; i++) {
      var p = pnls[i];
      if (p != null) {
        ctx.setStyle(p.btn, 'color', (ctx.extActPnlIdx == i) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACTIVE);
      }
    }
  },

  createSubBasePanel: function(ctx) {
    var base = document.createElement('div');
    base.className = ctx.id + '-overlay-panel-full';

    var head = document.createElement('div');
    head.style.position = 'relative';
    head.style.height = ctx.computedFontSize + 'px';
    base.appendChild(head);

    var body = document.createElement('div');
    body.style.position = 'relative';
    body.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    base.appendChild(body);

    return {base: base, head: head, body: body};
  },

  isOnDbgWin: function(x, y) {
    var sp = DebugJS.ctx.getSelfSizePos();
    if (((x >= sp.x1) && (x <= sp.x2)) && ((y >= sp.y1) && (y <= sp.y2))) {
      return true;
    }
    return false;
  },

  getSelfSizePos: function() {
    var ctx = DebugJS.ctx;
    var rect = ctx.win.getBoundingClientRect();
    var resizeBoxSize = 6;
    var sp = {};
    sp.w = ctx.win.clientWidth;
    sp.h = ctx.win.clientHeight;
    sp.x1 = rect.left - resizeBoxSize / 2;
    sp.y1 = rect.top - resizeBoxSize / 2;
    sp.x2 = sp.x1 + ctx.win.clientWidth + resizeBoxSize + DebugJS.WIN_BORDER;
    sp.y2 = sp.y1 + ctx.win.clientHeight + resizeBoxSize + DebugJS.WIN_BORDER;
    return sp;
  },

  setSelfSizeW: function(ctx, w) {
    ctx.win.style.width = w + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  setSelfSizeH: function(ctx, h) {
    ctx.win.style.height = h + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  expandHight: function(ctx, height) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      ctx.saveExpandModeOrgSizeAndPos(ctx);
      var clientH = document.documentElement.clientHeight;
      var sp = ctx.getSelfSizePos();
      if (sp.h >= height) {
        return;
      } else if (clientH <= height) {
        height = clientH;
      }
      ctx.setSelfSizeH(ctx, height);
      sp = ctx.getSelfSizePos();
      if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJUST) {
        ctx.adjustDbgWinPos(ctx);
      } else {
        if (sp.y2 > clientH) {
          if (clientH < (height + ctx.opt.adjPosY)) {
            ctx.win.style.top = 0;
          } else {
            var top = clientH - height - ctx.opt.adjPosY;
            ctx.win.style.top = top + 'px';
          }
        }
      }
    }
  },

  expandHightIfNeeded: function(ctx) {
    if (ctx.winExpandCnt == 0) {
      ctx.expandHight(ctx, ctx.winExpandHeight);
    }
    ctx.winExpandCnt++;
  },

  resetExpandedHeight: function(ctx) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      ctx.win.style.width = ctx.expandModeOrg.w + 'px';
      ctx.win.style.height = ctx.expandModeOrg.h + 'px';
      ctx.resizeMainHeight();
      ctx.resizeImgPreview();
      ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJUST) {
        ctx.adjustDbgWinPos(ctx);
      }
    }
  },

  resetExpandedHeightIfNeeded: function(ctx) {
    ctx.winExpandCnt--;
    if (ctx.winExpandCnt == 0) {
      ctx.resetExpandedHeight(ctx);
    }
  },

  saveExpandModeOrgSizeAndPos: function(ctx) {
    var shadow = (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    ctx.expandModeOrg.w = (ctx.win.offsetWidth + DebugJS.WIN_BORDER - shadow);
    ctx.expandModeOrg.h = (ctx.win.offsetHeight + DebugJS.WIN_BORDER - shadow);
    ctx.expandModeOrg.t = ctx.win.offsetTop;
    ctx.expandModeOrg.l = ctx.win.offsetLeft;
  },

  turnLed: function(pos, active) {
    var ctx = DebugJS.ctx;
    var bit = DebugJS.LED_BIT[pos];
    if (active) {
      ctx.led |= bit;
    } else {
      ctx.led &= ~bit;
    }
    ctx.updateLedPanel();
  },

  setLed: function(val) {
    try {
      DebugJS.ctx.led = eval(val);
      DebugJS.ctx.updateLedPanel();
    } catch (e) {
      DebugJS._log.e('Invalid value');
    }
  },

  setMsg: function(m) {
    DebugJS.ctx.msgString = m;
    DebugJS.ctx.updateMsgLabel();
  },

  execCmd: function(ctx) {
    var cl = ctx.cmdLine.value;
    ctx.cmdLine.value = '';
    if (cl == '') {
      DebugJS._log('');
      return;
    }
    if (cl.substr(0, 2) == '!!') {
      var event = ctx.getLastHistory();
      if (event == '') {
        DebugJS._log.w('!!: event not found');
        return;
      }
      cl = event + cl.substr(2);
    } else if (cl.substr(0, 1) == '!') {
      var s = cl.substr(1).match(/(\d*)(.*)/);
      var num = s[1];
      var arg = s[2];
      if (num != '') {
        var event = ctx.getHistory((num | 0) - 1);
        if (event == '') {
          DebugJS._log.w('!' + num + ': event not found');
          return;
        }
        cl = event + arg;
      } else if (arg != '') {
        cl = '!' + arg;
      }
    }
    ctx.saveHistory(ctx, cl);
    ctx._execCmd(cl, ctx.cmdEchoFlg);
  },
  _execCmd: function(str, echo, recho) {
    var ctx = DebugJS.ctx;
    var setValName = null;
    var cmdline = str;
    if (str.match(/^\s*@/)) {
      echo = false;
      cmdline = str.substr(str.indexOf('@') + 1);
    }
    if (echo) {
      var echoStr = str;
      echoStr = DebugJS.escTags(echoStr);
      echoStr = DebugJS.trimDownText(echoStr, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa');
      DebugJS._log.s(echoStr);
    }
    var cmds = DebugJS.splitCmdLineInTwo(cmdline);
    var cmd = cmds[0];
    var valName = DebugJS.getCmdValName(cmd, '\\$', true);
    if (valName != null) {
      var vStartPos = cmdline.indexOf(valName);
      var restCmd = cmdline.substr(vStartPos + valName.length + 1);
      if (restCmd.match(/^\s*=/)) {
        setValName = valName;
        cmdline = restCmd.substr(restCmd.indexOf('=') + 1);
      }
    }
    var ret;
    echo = echo || recho;
    cmds = DebugJS.splitCmdLineInTwo(cmdline);
    if (cmds[0] == 'code') {
      ret = ctx.execCode(cmds[1], echo);
    } else {
      cmdline = DebugJS.replaceCmdVals(cmdline);
      ret = ctx.__execCmd(ctx, cmdline, echo);
    }
    if (setValName != null) {
      DebugJS.setCmdVal(setValName, ret);
    }
    return ret;
  },
  __execCmd: function(ctx, cmdline, echo, aliased) {
    cmdline = DebugJS.replaceCtrlChr(cmdline);
    var cmds = DebugJS.splitCmdLineInTwo(cmdline);
    var cmd = cmds[0];
    var arg = cmds[1];

    if (!aliased) {
      for (var key in ctx.CMD_ALIAS) {
        if (cmd == key) {
          var cl = cmdline.replace(new RegExp(cmd), ctx.CMD_ALIAS[key]);
          return ctx.__execCmd(ctx, cl, echo, true);
        }
      }
    }

    for (var i = 0; i < ctx.CMD_TBL.length; i++) {
      if (cmd == ctx.CMD_TBL[i].cmd) {
        return ctx.CMD_TBL[i].fn(arg, ctx.CMD_TBL[i], echo);
      }
    }

    if (ctx.opt.disableAllCommands) return;

    for (i = 0; i < ctx.EXT_CMD_TBL.length; i++) {
      if (cmd == ctx.EXT_CMD_TBL[i].cmd) {
        return ctx.EXT_CMD_TBL[i].fn(arg, ctx.EXT_CMD_TBL[i], echo);
      }
    }

    if (cmdline.match(/^\s*http/)) {
      DebugJS.ctx.doHttpRequest('GET', cmdline);
      return;
    }

    var ret = ctx.cmdRadixConv(cmdline, echo);
    if (ret) return cmd | 0;

    ret = ctx.cmdTimeCalc(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdDateCalc(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdDateDiff(cmdline, echo);
    if (!isNaN(ret)) return ret;

    ret = ctx.cmdDateConv(cmdline, echo);
    if (ret != null) return ret;

    if (cmdline.match(/^\s*U\+/i)) {
      return ctx.cmdUnicode('-d ' + cmdline, null, echo);
    }

    return ctx.execCode(cmdline, echo);
  },

  cmdAlias: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    if (DebugJS.countArgs(arg) == 0) {
      var lst = DebugJS.getKeys(ctx.CMD_ALIAS);
      return ctx._cmdAliasList(ctx, lst);
    }
    var p = arg.indexOf('=');
    if (p == -1) {
      return ctx._cmdAliasList(ctx, DebugJS.splitArgsEx(arg));
    }
    var al = DebugJS.delLeadingAndTrailingSP(arg.substr(0, p));
    var v = DebugJS.delLeadingAndTrailingSP(arg.substring(p + 1, arg.length));
    var c = DebugJS.getQuotedStr(v);
    if (c == null) {
      c = DebugJS.splitArgs(v)[0];
    }
    ctx.CMD_ALIAS[al] = c;
  },
  _cmdAliasList: function(ctx, lst) {
    var s = '';
    for (var i = 0; i < lst.length; i++) {
      if (i > 0) s += '\n';
      s += ctx._cmdAliasDisp(ctx, lst[i]);
    }
    DebugJS._log.mlt(s);
  },
  _cmdAliasDisp: function(ctx, al) {
    var s = 'alias ' + al;
    var c = ctx.CMD_ALIAS[al];
    if (c == undefined) {
      s += ': not found';
    } else {
      s += "='" + c + "'";
    }
    return s;
  },

  cmdBase64: function(arg, tbl, echo) {
    var iIdx = 0;
    if ((DebugJS.hasOpt(arg, 'd')) || (DebugJS.hasOpt(arg, 'e'))) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, DebugJS.encodeBase64, DebugJS.decodeBase64, iIdx);
  },

  cmdBat: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var bat = DebugJS.bat;
    var ret;
    switch (a[0]) {
      case 'run':
        if ((ctx.status & DebugJS.ST_BAT_RUNNING) &&
            (ctx.status & DebugJS.ST_BAT_PAUSE)) {
          bat._resume();
        } else {
          if (ctx.batTextEditor) bat.store(ctx.batTextEditor.value);
          var s = DebugJS.getOptVal(arg, 's');
          var e = DebugJS.getOptVal(arg, 'e');
          var ag = DebugJS.getOptVal(arg, 'arg');
          if ((s == null) && (e == null) && (a[1] != '-arg')) {
            s = a[1];
            if ((s != undefined) && (!isNaN(s))) {
              return bat.exec1(s);
            }
          }
          if (ag == null) ag = undefined;
          bat.run(s, e, ag);
        }
        break;
      case 'symbols':
        var t = a[1];
        if ((t != 'label') && (t != 'function')) {
          DebugJS.printUsage('bat synbols label|function "pattern"');
          return;
        }
        var p = DebugJS.getArgsFrom(arg, 2);
        try {
          p = eval(p);
        } catch (e) {
          DebugJS._log.e('bat symbols: ' + e);
          return;
        }
        ret = bat.getSymbols(t, p);
        if (echo) DebugJS._log.p(ret);
        return ret;
      case 'list':
        if (bat.cmds.length == 0) {
          DebugJS._log('No batch script');
          break;
        }
        var s = bat.list(a[1], a[2]);
        DebugJS._log.mlt(s);
        break;
      case 'status':
        var key = a[1];
        if (key == undefined) {
          var st = '\n';
          if (bat.cmds.length == 0) {
            st += 'No batch script';
          } else {
            st += ((ctx.status & DebugJS.ST_BAT_RUNNING) ? '<span style="color:#0f0">RUNNING</span>' : '<span style="color:#f44">STOPPED</span>');
            st += '\nNest Lv: ' + bat.nestLv();
          }
          DebugJS._log.p(bat.ctrl, 0, st, false);
        } else {
          ret = bat.ctrl[key];
          DebugJS._log(ret);
        }
        return ret;
      case 'pc':
        DebugJS._log.res(bat.ctrl.pc);
        return bat.ctrl.pc;
        break;
      case 'pause':
      case 'clear':
        bat[a[0]]();
        break;
      case 'set':
        ctx._cmdBatSet(DebugJS.getArgsFrom(arg, 1), echo);
        break;
      case 'stop':
        bat.terminate();
        break;
      case 'exec':
        if (a[1] != undefined) {
          var b = DebugJS.decodeBase64(a[1], true);
          if (b != '') {
            var ag = DebugJS.getArgsFrom(arg, 2);
            try {
              ag = eval(ag);
              if (ctx.status & DebugJS.ST_BAT_RUNNING) bat.stCtx();
              bat(b, ag);
            } catch (e) {
              DebugJS._log.e('BAT ERROR: Illegal argument (' + e + ')');
            }
          } else {
            DebugJS._log.e('BAT ERROR: script must be encoded in Base64.');
          }
          break;
        }
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },
  _cmdBatSet: function(arg, echo) {
    var a = DebugJS.splitArgsEx(arg);
    var key = a[0];
    var v = a[1];
    if (!v) {DebugJS.printUsage('bat set break|delay val'); return;}
    try {
      v = eval(v);
    } catch (e) {
      DebugJS._log.e(e);
      return;
    }
    switch (key) {
      case 'b':
      case 'break':
        DebugJS.bat.ctrl.break = v;
        break;
      case 'delay':
        break;
      case 'pc':
        DebugJS.bat.setPc(v);
        break;
      default:
        DebugJS.printUsage('bat set b|break|delay|pc val');
        return;
    }
    DebugJS.bat.ctrl[key] = v;
    if (echo) DebugJS._log.res(v);
  },

  cmdBin: function(arg, tbl) {
    var data = DebugJS.ctx.radixCmd(arg, tbl);
    if (data == null) return;
    var ret = DebugJS.convertBin(data);
    if (ret != undefined) {
      DebugJS._log(ret);
    }
  },

  cmdBSB64: function(arg, tbl, echo) {
    var iIdx = 0;
    if ((DebugJS.hasOpt(arg, 'd')) || (DebugJS.hasOpt(arg, 'e'))) iIdx++;
    var toR = false;
    var n = DebugJS.getOptVal(arg, 'n');
    if (n == null) {
       n = 1;
    } else {
      iIdx += 2;
      if (n.length > 1) {
        var d = n.charAt(n.length - 1);
        if (isNaN(d)) {
          if (d == 'R') toR = true;
          n = n.substr(0, n.length - 1);
        }
      }
    }
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, DebugJS.encodeBSB64, DebugJS.decodeBSB64, iIdx, n | 0, toR);
  },

  cmdCall: function(arg, tbl) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, true, 'func');
    }
  },

  cmdClose: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var fn = DebugJS.splitArgs(arg)[0];
    var f = 0;
    switch (fn) {
      case 'measure':
        f = DebugJS.ST_MEASURE;
        break;
      case 'sys':
        f = DebugJS.ST_SYS_INFO;
        break;
      case 'html':
        f = DebugJS.ST_HTML_SRC;
        break;
      case 'dom':
        f = DebugJS.ST_ELM_INSPECTING;
        break;
      case 'js':
        f = DebugJS.ST_JS;
        break;
      case 'tool':
        f = DebugJS.ST_TOOLS;
        break;
      case 'ext':
        f = DebugJS.ST_EXT_PANEL;
        break;
      case 'all':
        ctx.closeAllFeatures(ctx);
        return;
    }
    if (f == 0) {
      DebugJS.printUsage(tbl.usage);
    } else {
      ctx.closeFeature(ctx, f);
    }
  },

  cmdClock: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    ctx.launchFunc(ctx, 'tool', 'timer', 'clock');
    ctx.timerClockSSS = DebugJS.hasOpt(arg, 'sss');
    ctx.updateSSS(ctx);
  },

  cmdCls: function(arg, tbl) {
    DebugJS.ctx.clearLog();
  },

  cmdCondWait: function(arg, tbl) {
    var bat = DebugJS.bat;
    var op = DebugJS.splitArgsEx(arg)[0];
    switch (op) {
      case 'init':
        bat._initCond();
        break;
      case 'set':
        var key = DebugJS.getOptVal(arg, 'key');
        bat.ctrl.condKey = (key ? DebugJS.delAllSP(key) : key);
        break;
      case 'pause':
        if (bat.ctrl.condKey) {
          var to = DebugJS.getOptVal(arg, 'timeout');
          DebugJS.ctx._cmdPause('key', bat.ctrl.condKey, to);
        }
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdDbgWin: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    switch (a[0]) {
      case 'hide':
        ctx.closeDbgWin();
        break;
      case 'show':
        ctx.showDbgWin();
        break;
      case 'opacity':
        var v = a[1];
        if ((v <= 1) && (v >= 0.1)) {
          DebugJS.opacity(v);
        } else {
          DebugJS.printUsage('dbgwin opacity 0.1-1');
        }
        break;
      case 'pos':
        ctx._cmdDbgWinPos(ctx, a);
        break;
      case 'size':
        ctx._cmdDbgWinSize(ctx, a);
        break;
      case 'status':
        ctx._cmdDbgWinStatus(ctx);
        break;
      case 'lock':
        ctx._cmdDbgWinLock(ctx, a);
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },
  _cmdDbgWinPos: function(ctx, args) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) || (ctx.opt.mode == 'kiosk')) {
      return;
    }
    var pos = args[1];
    switch (pos) {
      case 'n':
      case 'ne':
      case 'e':
      case 'se':
      case 's':
      case 'sw':
      case 'w':
      case 'nw':
      case 'c':
        var sp = ctx.getSelfSizePos();
        ctx.setWinPos(pos, sp.w, sp.h);
        break;
      default:
        var x = args[1];
        var y = args[2];
        if (isNaN(x) || isNaN(y)) {
          DebugJS.printUsage('dbgwin pos n|ne|e|se|s|sw|w|nw|c|x y');
          return;
        }
        x |= 0; y |= 0;
        DebugJS.ctx.setDbgWinPos(y, x);
    }
  },
  _cmdDbgWinSize: function(ctx, args) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) || (ctx.opt.mode == 'kiosk')) {
      return;
    }
    var w = args[1];
    var h = args[2];
    if (isNaN(w) || isNaN(h)) {
      DebugJS.printUsage('dbgwin size width height');
      return;
    }
    w |= 0; h |= 0;
    if (w < ctx.computedMinW) w = ctx.computedMinW;
    if (h < ctx.computedMinH) h = ctx.computedMinH;
    ctx.setDbgWinSize(w, h);
  },
  _cmdDbgWinStatus: function(ctx) {
    var sp = ctx.getSelfSizePos();
    var s = 'width : ' + sp.w + '\n' +
    'height: ' + sp.h + '\n' +
    'posX1 : ' + sp.x1 + '\n' +
    'posY1 : ' + sp.y1 + '\n' +
    'posX2 : ' + sp.x2 + '\n' +
    'posY2 : ' + sp.y2 + '\n';
    DebugJS._log.mlt(s);
  },
  _cmdDbgWinLock: function(ctx, a) {
    var c = a[1];
    if (ctx.opt.lockCode == null) {
      if (c == undefined) {
        DebugJS.printUsage('dbgwin lock [code]');
        return;
      }
      ctx.opt.lockCode = c;
    }
    ctx.lockDbgWin(ctx);
  },

  cmdDate: function(arg, tbl) {
    var val = arg;
    var iso = false;
    var idx = DebugJS.indexOfOptVal(arg, '-iso');
    if (idx >= 0) {
      iso = true;
      val = arg.substr(idx);
    }
    var d = DebugJS.date(val, iso);
    if (d == null) {
      DebugJS.printUsage(tbl.usage);
    } else {
      if (!DebugJS.hasOpt(arg, 'q')) DebugJS._log.res(d);
    }
    return d;
  },

  cmdDateConv: function(arg, echo) {
    var ret = null;
    var d = DebugJS.delLeadingAndTrailingSP(arg);
    if (!(DebugJS.isDateFormat(d) || DebugJS.isDateTimeFormat(d) || DebugJS.isDateTimeFormatIso(d) || (d == 'today'))) {
      return ret;
    }
    if (d == 'today') d = DebugJS.today('/');
    ret = DebugJS.date(d);
    if (ret != null) {
      if (echo) DebugJS._log.res(ret);
    }
    return ret;
  },

  cmdDateCalc: function(arg, echo) {
    var ret = null;
    arg = DebugJS.delLeadingAndTrailingSP(arg);
    if ((!DebugJS.isBasicDateFormat(arg, true)) && (!DebugJS.isDateFormat(arg, true)) && (!DebugJS.startsWith(arg, 'today'))) {
      return ret;
    }
    arg = DebugJS.delAllSP(arg);
    var sp = arg.charAt(4);
    if ((sp != '-') && (sp != '/')) sp = '-';
    arg = arg.replace(/(\d{4})-(\d{1,})-(\d{1,})/g, '$1/$2/$3');
    var op;
    if (arg.indexOf('+') >= 0) {
      op = '+';
    } else if (arg.indexOf('-') >= 0) {
      op = '-';
    }
    var v = arg.split(op);
    if (v.length < 2) return ret;
    var d1 = DebugJS.ctx._cmdFmtDate(v[0]);
    if (!DebugJS.isDateFormat(d1)) return ret;
    var d2 = v[1];
    var t1 = DebugJS.getDateTime(d1).time;
    var t2 = (d2 | 0) * 86400000;
    var t;
    if (op == '-') {
      t = t1 - t2;
    } else {
      t = t1 + t2;
    }
    var d = DebugJS.getDateTime(t);
    if (isNaN(d.time)) return ret;
    ret = DebugJS.convDateStr(d, sp);
    if (echo) DebugJS._log.res(ret);
    return ret;
  },

  cmdDateDiff: function(arg, echo) {
    var ret = NaN;
    var a = DebugJS.splitArgs(arg);
    if (a.length < 2) return ret;
    var d1 = DebugJS.ctx._cmdFmtDate(a[0]);
    var d2 = DebugJS.ctx._cmdFmtDate(a[1]);
    if ((!DebugJS.isDateFormat(d1)) || (!DebugJS.isDateFormat(d2))) return ret;
    d1 = d1.replace(/-/g, '/');
    d2 = d2.replace(/-/g, '/');
    ret = DebugJS.diffDate(d1, d2);
    if (echo && !isNaN(ret)) DebugJS._log.res(ret);
    return ret;
  },
  _cmdFmtDate: function(d) {
    if ((d.length == 8) && (!isNaN(d))) {
      d = DebugJS.num2date(d);
    } else if (d == 'today') {
      d = DebugJS.today('/');
    }
    return d;
  },

  cmdDelay: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var d = DebugJS.splitArgs(arg)[0];
    if (d == '-c') {
      ctx._cmdDelayCancel(ctx);
      return;
    } else if (d.match(/\|/)) {
      d = DebugJS.calcNextTime(d).t;
      d = DebugJS.calcTargetTime(d);
    } else if (DebugJS.isTimeFormat(d)) {
      d = DebugJS.calcTargetTime(d);
    } else if ((d == '') || (isNaN(d))) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var c = DebugJS.getArgsFrom(arg, 1);
    ctx.cmdDelayData.cmd = c;
    ctx._cmdDelayCancel(ctx);
    ctx.cmdDelayData.tmid = setTimeout(ctx._cmdDelayExec, d | 0);
  },
  _cmdDelayExec: function() {
    var ctx = DebugJS.ctx;
    ctx.cmdDelayData.tmid = 0;
    var c = ctx.cmdDelayData.cmd;
    if (c == '') {
      DebugJS._log(c);
    } else {
      ctx._execCmd(c, false, ctx.cmdEchoFlg);
    }
    ctx.cmdDelayData.cmd = null;
  },
  _cmdDelayCancel: function(ctx) {
    if (ctx.cmdDelayData.tmid > 0) {
      clearTimeout(ctx.cmdDelayData.tmid);
      ctx.cmdDelayData.tmid = 0;
      DebugJS._log('command delay execution has been canceled.');
    }
  },

  cmdEcho: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg)[0];
    if (a == '') {
      DebugJS._log(ctx.cmdEchoFlg ? 'on' : 'off');return;
    } else if (a == 'off') {
      ctx.cmdEchoFlg = false;return;
    } else if (a == 'on') {
      ctx.cmdEchoFlg = true;return;
    }
    arg = DebugJS.decodeEsc(arg);
    try {
      var s = eval(arg) + '';
      DebugJS._log(s);
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  cmdElements: function(arg, tbl) {
    arg = DebugJS.delLeadingAndTrailingSP(arg);
    if ((arg == '-h') || (arg == '--help')) {
      DebugJS.printUsage(tbl.usage);
    } else {
      return DebugJS.countElements(arg, true);
    }
  },

  cmdEvent: function(arg, tbl) {
    var a = DebugJS.splitArgsEx(arg);
    var op = a[0];
    switch (op) {
      case 'create':
        if (a[1]) {
          DebugJS.event.create(a[1]);
          return;
        }
        break;
      case 'set':
        if (a[1]) {
          try {
            DebugJS.event.set(a[1], eval(a[2]));
          } catch (e) {
            DebugJS._log.e(e);
          }
          return;
        }
        break;
      case 'dispatch':
        var target = a[1];
        if (target) {
          if (target.charAt(0) == '(') {
            target = target.substr(1, target.length - 2);
          }
          DebugJS.event.dispatch(target, a[2]);
          return;
        }
        break;
      case 'clear':
        DebugJS.event.clear();
        return;
    }
    DebugJS.printUsage(tbl.usage);
  },

  cmdExit: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    DebugJS.bat.exit();
    ctx._cmdDelayCancel(ctx);
    ctx.CMDVALS = {};
    ctx.finalizeFeatures(ctx);
    ctx.toolsActiveFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
    if (ctx.opt.useSuspendLogButton) {
      ctx.status &= ~DebugJS.ST_LOG_SUSPENDING;
      ctx.updateSuspendLogBtn(ctx);
    }
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      ctx.stopStopWatch();
    }
    ctx.resetStopWatch();
    if (ctx.timerBasePanel != null) {
      ctx.stopTimerStopWatchCu();
      ctx.resetTimerStopWatchCu();
      ctx.stopTimerStopWatchCd();
      ctx.resetTimerStopWatchCd();
      ctx.switchTimerModeClock();
    }
    ctx.setLed(0);
    ctx.setMsg('');
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.opt.usePinButton) {
        ctx.enableDraggable(ctx);
      }
      if (ctx.opt.mode != 'kiosk') {
        ctx.resetDbgWinSizePos();
      }
    }
    ctx.jsBuf = '';
    ctx.fltrText = '';
    if (ctx.fltrInput) ctx.fltrInput.value = '';
    ctx.closeDbgWin();
    ctx.clearLog();
    ctx.logFilter = DebugJS.LOG_FILTER_ALL;
    ctx.updateLogFilterBtns();
  },

  cmdGoto: function(arg, tbl) {
    var ctrl = DebugJS.bat.ctrl;
    if (DebugJS.bat.isCmdExecutable()) {
      var lbl = DebugJS.splitArgs(arg)[0];
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, false, 'label');
    }
  },

  cmdHelp: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var s = 'Available Commands:\n<table>' + ctx._cmdHelpTbl(ctx, ctx.CMD_TBL);
    if (!ctx.opt.disableAllCommands) {
      if (ctx.EXT_CMD_TBL.length > 0) {
        s += '<tr><td colspan="2">' + '---- ---- ---- ---- ---- ---- ---- ----</td></tr>';
      }
      s += ctx._cmdHelpTbl(ctx, ctx.EXT_CMD_TBL);
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },
  _cmdHelpTbl: function(ctx, tbl) {
    var s = '';
    for (var i = 0; i < tbl.length; i++) {
      if (!(tbl[i].attr & DebugJS.CMD_ATTR_HIDDEN)) {
        var style1 = '';
        var style2 = '';
        if (tbl[i].attr & DebugJS.CMD_ATTR_DISABLED) {
          style1 = '<span style="color:#aaa">';
          style2 = '</span>';
        }
        s += '<tr><td class="' + ctx.id + '-cmdtd">' + style1 + tbl[i].cmd + style2 + '</td><td>' + style1 + tbl[i].desc + style2 + '</td></tr>';
      }
    }
    return s;
  },

  cmdHex: function(arg, tbl) {
    var data = DebugJS.ctx.radixCmd(arg, tbl);
    if (data == null) return;
    try {
      var v2 = '';
      var v16 = '';
      var val = eval(data.exp);
      if (val < 0) {
        for (var i = (DebugJS.DFLT_UNIT - 1); i >= 0; i--) {
          v2 += (val & 1 << i) ? '1' : '0';
        }
        v16 = parseInt(v2, 2).toString(16);
      } else {
        v16 = parseInt(val).toString(16);
      }
      var hex = DebugJS.formatHex(v16, true, false);
      var ret = hex;
      if (data.digit > 0) {
        if (hex.length > data.digit) {
          ret = hex.slice(data.digit * -1);
          var omit = hex.substr(0, hex.length - data.digit);
          ret = '<span style="color:#888">' + omit + '</span>' + ret;
        } else if (hex.length < data.digit) {
          var padding = data.digit - hex.length;
          var zero = '';
          for (i = 0; i < padding; i++) {
            zero += ((val < 0) ? 'F' : '0');
          }
          ret = zero + hex;
        }
      }
      ret = '0x' + ret;
      DebugJS._log(ret);
    } catch (e) {
      DebugJS._log.e('Invalid value');
    }
  },

  radixCmd: function(arg, tbl) {
    var args = DebugJS.splitArgs(arg);
    if (args[0] == '') {
      DebugJS.printUsage(tbl.usage);
      return null;
    }
    var argLen = args.length;
    var digit = 0;
    var exp = args[0];
    var expLen;
    if (argLen == 2) {
      digit = args[1];
    } else if (argLen >= 3) {
      if (args[0].match(/^\(/)) {
        if (args[argLen - 2].match(/\)$/)) {
          digit = args[argLen - 1];
          expLen = argLen - 1;
        } else if (args[argLen - 1].match(/\)$/)) {
          expLen = argLen;
        } else {
          DebugJS._log.e('Invalid value');
          return null;
        }
        exp = '';
        for (var i = 0; i < expLen; i++) {
          exp += ((i >= 1) ? ' ' : '') + args[i];
        }
      } else {
        DebugJS._log.e('Invalid value');
        return null;
      }
    }
    var data = {exp: exp, digit: (digit | 0)};
    return data;
  },

  cmdHistory: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    try {
      if (DebugJS.countArgs(arg) == 0) {
        ctx.showHistory();
      } else if (DebugJS.hasOpt(arg, 'c')) {
        ctx.clearHistory();
      } else {
        var d = DebugJS.getOptVal(arg, 'd');
        if (d != null) {
          ctx.delHistory(ctx, d | 0);
        } else {
          DebugJS.printUsage(tbl.usage);
        }
      }
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  initHistory: function(ctx) {
    if (ctx.cmdHistoryBuf == null) {
      ctx.CMD_HISTORY_MAX = ctx.opt.cmdHistoryMax;
      ctx.cmdHistoryBuf = new DebugJS.RingBuffer(ctx.CMD_HISTORY_MAX);
    }
    if (DebugJS.LS_AVAILABLE) {
      ctx.loadHistory(ctx);
    }
  },

  showHistory: function() {
    var bf = DebugJS.ctx.cmdHistoryBuf.getAll();
    var s = '<table>';
    for (var i = 0; i < bf.length; i++) {
      var cmd = bf[i];
      cmd = DebugJS.escTags(cmd);
      cmd = DebugJS.trimDownText(cmd, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa');
      s += '<tr><td class="' + DebugJS.ctx.id + '-cmdtd" style="text-align:right">' + (i + 1) + '</td><td>' + cmd + '</td></tr>';
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },

  saveHistory: function(ctx, cmd) {
    ctx.cmdHistoryBuf.add(cmd);
    ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
    if (DebugJS.LS_AVAILABLE) {
      var bf = ctx.cmdHistoryBuf.getAll();
      var cmds = '';
      for (var i = 0; i < bf.length; i++) {
        cmds += bf[i] + '\n';
      }
      localStorage.setItem('DebugJS-history', cmds);
    }
  },

  loadHistory: function(ctx) {
    if (DebugJS.LS_AVAILABLE) {
      var bf = localStorage.getItem('DebugJS-history');
      if (bf != null) {
        var cmds = bf.split('\n');
        for (var i = 0; i < (cmds.length - 1); i++) {
          ctx.cmdHistoryBuf.add(cmds[i]);
          ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
        }
      }
    }
  },

  getHistory: function(idx) {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var c = cmds[idx];
    return ((c == undefined) ? '' : c);
  },

  getLastHistory: function() {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var c = cmds[cmds.length - 1];
    return ((c == undefined) ? '' : c);
  },

  delHistory: function(ctx, idx) {
    var cmds = ctx.cmdHistoryBuf.getAll();
    ctx.clearHistory();
    for (var i = 0; i < cmds.length; i++) {
      if (cmds.length < ctx.opt.cmdHistoryMax) {
        if (i != (idx - 1)) {
          ctx.saveHistory(ctx, cmds[i]);
        }
      } else if (cmds.length >= ctx.opt.cmdHistoryMax) {
        if (i != (idx - 2)) {
          ctx.saveHistory(ctx, cmds[i]);
        }
      }
    }
  },

  clearHistory: function() {
    DebugJS.ctx.cmdHistoryBuf.clear();
    if (DebugJS.LS_AVAILABLE) {
      localStorage.removeItem('DebugJS-history');
    }
  },

  cmdHttp: function(arg, tbl) {
    var a = DebugJS.splitCmdLineInTwo(arg);
    var method = a[0];
    var data = a[1];
    if (method == '') {
      DebugJS.printUsage(tbl.usage);
      return;
    } else if (method.match(/^\s*http/)) {
      method = 'GET';
      data = arg;
    }
    DebugJS.ctx.doHttpRequest(method, data);
  },

  cmdInput: function(arg, tbl) {
    var a = DebugJS.splitArgsEx(arg);
    var type = a[0];
    if (type == 'text') {
      var id = a[1];
      var txt = a[2];
      var speed = DebugJS.getOptVal(arg, 'speed');
      var step = DebugJS.getOptVal(arg, 'step');
      var start = DebugJS.getOptVal(arg, 'start');
      var end = DebugJS.getOptVal(arg, 'end');
      DebugJS.inputText(id, txt, speed, step, start, end);
    } else {
      DebugJS.printUsage(tbl.usage);
    }
  },

  cmdJs: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    switch (a[0]) {
      case 'exec':
        DebugJS.ctx.execJavaScript();
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdJson: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var json = DebugJS.delLeadingSP(arg);
      var lv = 0;
      var jsnFlg = true;
      if (json.charAt(0) == '-') {
        var opt = json.match(/-p\s/);
        if (opt != null) jsnFlg = false;
        opt = json.match(/-l(\d+)/);
        if (opt) lv = opt[1];
        json = json.match(/({.*)/);
        if (json) {
          json = json[1];
        }
      }
      if (json) {
        return DebugJS.execCmdJson(json, jsnFlg, lv);
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    }
  },

  cmdJump: function(arg, tbl) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, true, 'label');
    }
  },
  _cmdJump: function(ctx, arg, lnk, type) {
    var ctrl = DebugJS.bat.ctrl;
    var fnArg;
    var a = DebugJS.splitCmdLineInTwo(arg);
    var lbl = a[0];
    if (lbl.match(/^".+?"$/)) {
      try {
        lbl = eval(lbl);
      } catch (e) {
        DebugJS._log.e('L' + ctrl.pc + ': Illegal argument (' + lbl + ')');
        return;
      }
    }
    var tbl = (type == 'func' ? DebugJS.bat.fncs : DebugJS.bat.labels);
    var idx = tbl[lbl];
    if (idx == undefined) {
      DebugJS._log.e('L' + ctrl.pc + ': No such ' + type + ' (' + lbl + ')');
      return;
    }
    if (lnk) {
      try {
        fnArg = eval(a[1]);
      } catch (e) {
        DebugJS._log.e('L' + ctrl.pc + ': Illegal argument (' + e + ')');
        return;
      }
      delete ctx.CMDVALS['%RET%'];
      var fnCtx = {
        lr: ctrl.pc,
        fnArg: ctrl.fnArg,
        block: ctrl.block,
        label: ctrl.label,
        fnnm: ctrl.fnnm
      };
      ctrl.stack.push(fnCtx);
      ctrl.fnArg = fnArg;
      ctx.CMDVALS['%ARG%'] = fnArg;
      ctrl.lr = ctrl.pc;
    }
    ctrl.startPc = 0;
    ctrl.block = [];
    ctrl.pc = idx;
    ctx.updateCurPc();
  },

  cmdKeyPress: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var keyCode = a[0];
    if ((keyCode == '') || isNaN(keyCode)) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var s = (DebugJS.getOptVal(arg, 'shift') == null ? false : true);
    var c = (DebugJS.getOptVal(arg, 'ctrl') == null ? false : true);
    var a = (DebugJS.getOptVal(arg, 'alt') == null ? false : true);
    var m = (DebugJS.getOptVal(arg, 'meta') == null ? false : true);
    var opt = {keyCode: keyCode | 0, shift: s, ctrl: c, alt: a, meta: m};
    DebugJS.keyPress(opt);
  },

  cmdKeys: function(arg, tbl) {
    arg = DebugJS.unifySP(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var ags = arg.split(' ');
      for (var i = 0; i < ags.length; i++) {
        if (ags[i] == '') continue;
        var cmd = 'DebugJS.tmp="' + ags[i] + ' = ";DebugJS.tmp+=DebugJS.getKeysStr(' + ags[i] + ');DebugJS._log.mlt(DebugJS.tmp);';
        try {
          eval(cmd);
        } catch (e) {
          DebugJS._log.e(e);
        }
      }
    }
  },

  cmdLaptime: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
      ctx.stopStopWatch();
    } else {
      if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
        ctx.stopStopWatch();
        ctx.resetStopWatch();
      }
      ctx.status |= DebugJS.ST_STOPWATCH_LAPTIME;
      ctx.startStopWatch();
    }
  },

  cmdLed: function(arg, tbl) {
    if (arg == '') {
      var v = DebugJS.ctx.led;
      var h = DebugJS.formatHex(DebugJS.toHex(v), true, true);
      DebugJS._log.res(v + '(' + h + ')');
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.ctx.setLed(arg);
    }
    return DebugJS.ctx.led;
  },

  cmdLog: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var fn = null;
    switch (a[0]) {
      case 'bufsize':
        fn = ctx._cmdLogBufsize;
        break;
      case 'dump':
        fn = ctx._cmdLogDump;
        break;
      case 'filter':
        fn = ctx._cmdLogFilter;
        break;
      case 'html':
        fn = ctx._cmdLogHtml;
        break;
      case 'load':
        fn = ctx._cmdLogLoad;
        break;
      case 'preserve':
        fn = ctx._cmdLogPreserve;
        break;
      case 'suspend':
        fn = ctx._cmdLogSuspend;
        break;
      case 'lv':
        fn = ctx._cmdLogLv;
    }
    if (fn) {return fn(ctx, arg, echo);}
    DebugJS.printUsage(tbl.usage);
  },
  _cmdLogBufsize: function(ctx, arg) {
    var s = DebugJS.splitArgs(arg)[1] | 0;
    if (s > 0) {
      ctx.initBuf(ctx, s);
    } else {
      s = ctx.msgBuf.getSize();
      DebugJS._log.res(s);
      DebugJS.printUsage('log bufsize [size]');
    }
    return s;
  },
  _cmdLogDump: function(ctx, arg) {
    arg = DebugJS.splitCmdLineInTwo(arg)[1];
    var l;
    if (DebugJS.delLeadingAndTrailingSP(arg) == '-b64') {
      l = DebugJS.dumpLog('json', true);
    } else {
      l = DebugJS.dumpLog('json', false);
    }
    DebugJS._log.res(l);
  },
  _cmdLogFilter: function(ctx, arg) {
    var a = DebugJS.splitArgsEx(arg);
    var f = a[1];
    if (f == undefined) {
      DebugJS.printUsage('log filter [-case] string');
      return;
    }
    var cs = false;
    if (f == '-case') {
      cs = true;
      f = a[2];
    }
    try {
      f = eval(f);
    } catch (e) {
      DebugJS._log.e(e);
      return;
    }
    ctx.setLogFilter(ctx, f, cs);
  },
  _cmdLogHtml: function(ctx, arg) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setFilterTxtHtml(ctx, true);
    } else if (op == 'off') {
      ctx.setFilterTxtHtml(ctx, false);
    } else {
      var st = ctx.fltrTxtHtml;
      DebugJS.printUsage('log html on|off');
      return st;
    }
  },
  _cmdLogLoad: function(ctx, arg) {
    var arg = DebugJS.splitCmdLineInTwo(arg)[1];
    var data = DebugJS.getOptVal(arg, 'b64');
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage('log load [-b64] log-buffer-json');
    } else {
      try {
        if (data != null) {
          DebugJS.loadLog(data, true);
        } else {
          DebugJS.loadLog(arg);
        }
        ctx.printLogs();
      } catch (e) {
        DebugJS._log.e(e);
      }
    }
  },
  _cmdLogPreserve: function(ctx, arg, echo) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setLogPreserve(ctx, true);
    } else if (op == 'off') {
      ctx.setLogPreserve(ctx, false);
    } else {
      var st = ((ctx.status & DebugJS.ST_LOG_PRESERVED) ? true : false);
      if (echo) {
        DebugJS._log.res(st);
        DebugJS.printUsage('log preserve on|off');
      }
      return st;
    }
  },
  _cmdLogSuspend: function(ctx, arg) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      DebugJS.ctx.suspendLog();
    } else if (op == 'off') {
      DebugJS.ctx.resumeLog();
    } else {
      var st = ((ctx.status & DebugJS.ST_LOG_SUSPENDING) ? true : false);
      DebugJS.printUsage('log suspend on|off');
      return st;
    }
  },
  _cmdLogLv: function(ctx, arg) {
    var a = DebugJS.getArgsFrom(arg, 1);
    a = DebugJS.delAllSP(a);
    var lv = a.split('|');
    if (lv[0] == '') {
      DebugJS.printUsage('log lv LOG|VRB|DBG|INF|WRN|ERR|ALL|NONE');
      return;
    }
    ctx.logFilter = 0;
    for (var i = 0; i < lv.length; i++) {
      switch (lv[i]) {
        case 'LOG':
          ctx.logFilter |= DebugJS.LOG_FILTER_LOG;
          break;
        case 'VRB':
          ctx.logFilter |= DebugJS.LOG_FILTER_VRB;
          break;
        case 'DBG':
          ctx.logFilter |= DebugJS.LOG_FILTER_DBG;
          break;
        case 'INF':
          ctx.logFilter |= DebugJS.LOG_FILTER_INF;
          break;
        case 'WRN':
          ctx.logFilter |= DebugJS.LOG_FILTER_WRN;
          break;
        case 'ERR':
          ctx.logFilter |= DebugJS.LOG_FILTER_ERR;
          break;
        case 'ALL':
          ctx.logFilter |= DebugJS.LOG_FILTER_ALL;
      }
    }
    ctx.updateLogFilterBtns();
    ctx.printLogs();
  },

  cmdMsg: function(arg, tbl) {
    var m = ((DebugJS.hasOpt(arg, 'c') || (DebugJS.delLeadingAndTrailingSP(arg) == '')) ? '""' : arg);
    try {
      DebugJS.ctx.setMsg(eval(m));
    } catch (e) {
      DebugJS._log.e(e);
      DebugJS.printUsage(tbl.usage);
    }
  },

  cmdNextTime: function(arg, tbl) {
    var t, ms;
    var v = arg;
    var p = true;
    var idx = DebugJS.indexOfOptVal(arg, '-q');
    if (idx >= 0) {
      p = false;
      v = arg.substr(idx);
    }
    v = DebugJS.delLeadingAndTrailingSP(v);
    if ((v.match(/^T\d{4,6}/))) {
      t = DebugJS.calcNextTime(v);
    } else if (ms = DebugJS.parseToMillis(v)) {
      var dt = DebugJS.getDateTime((new Date()).getTime() + ms);
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else if (DebugJS.isNum(v)) {
      var dt = DebugJS.getDateTime((new Date()).getTime() + (v | 0));
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else {
      DebugJS.printUsage(tbl.usage);
      return '';
    }
    if (p) {
      DebugJS.log.res(DebugJS.convDateTimeStr(DebugJS.getDateTime(t.time)));
    }
    return t.t;
  },

  cmdNow: function(arg, tbl, echo) {
    var t = (new Date()).getTime();
    if (echo) DebugJS._log.res(t);
    return t;
  },

  cmdOpen: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var fn = a[0];
    var subfn = a[1];
    var opt = a[2];
    if ((fn == '') || (!ctx.launchFunc(ctx, fn, subfn, opt))) {
      DebugJS.printUsage(tbl.usage);
    }
  },

  cmdP: function(arg, tbl) {
    arg = DebugJS.unifySP(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdP(arg);
    }
  },

  cmdPause: function(arg, tbl) {
    var op = '';
    var opts = ['s', 'key'];
    for (var i = 0; i < opts.length; i++) {
      if (DebugJS.getOptVal(arg, opts[i]) != null) {
        op = opts[i];
        break;
      }
    }
    var key = DebugJS.getOptVal(arg, 'key');
    var to = DebugJS.getOptVal(arg, 'timeout');
    if (!(DebugJS.ctx._cmdPause(op, key, to))) {
      DebugJS.printUsage(tbl.usage);
    }
  },
  _cmdPause: function(op, key, timeout) {
    var ctx = DebugJS.ctx;
    timeout |= 0;
    ctx.CMDVALS['%RESUMED_KEY%'] = null;
    if (op == 's') {
      ctx.status |= DebugJS.ST_BAT_PAUSE_CMD;
      DebugJS._log('Click or press any key to continue...');
    } else {
      if (op == '') {
        DebugJS._log('Type "resume" to continue...' + ((timeout > 0) ? ' (timeout=' + timeout + ')' : ''));
      } else if (op == 'key') {
        if (key == undefined) key = '';
        DebugJS.bat.ctrl.pauseKey = key;
        DebugJS._log('Type "resume" or "resume -key' + ((key == '') ? '' : ' ' + key) + '" to continue...' + ((timeout > 0) ? ' (timeout=' + timeout + ')' : ''));
      } else {
        return false;
      }
      if (timeout > 0) {
        DebugJS.bat.ctrl.pauseTimeout = (new Date()).getTime() + timeout;
      }
      ctx.status |= DebugJS.ST_BAT_PAUSE_CMD_KEY;
    }
    ctx.updateBatResumeBtn();
    return true;
  },

  cmdPin: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var op = DebugJS.splitArgs(arg)[0];
    if (op == 'on') {
      ctx.disableDraggable(ctx);
    } else if (op == 'off') {
      ctx.enableDraggable(ctx);
    } else {
      var st = ((ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ? false : true);
      DebugJS.printUsage(tbl.usage);
      return st;
    }
  },

  cmdPoint: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.splitArgsEx(arg);
    var point = DebugJS.point;
    var op = args[0];
    var x, y, idx, speed, step, ret, p, el, start, end;
    var label, target, msg, src, w, h, txt, method, type, val, exp;
    var alignX = DebugJS.getOptVal(arg, 'alignX');
    var alignY = DebugJS.getOptVal(arg, 'alignY');
    if (op == 'init') {
      point.init();
    } else if (op.charAt(0) == '#') {
      DebugJS.pointBySelector(op, 0, alignX, alignY);
    } else if (op == 'label') {
      label = args[1];
      try {
        label = eval(label);
      } catch (e) {
        DebugJS._log.e(e);
        return;
      }
      idx = args[2] | 0;
      DebugJS.pointByLabel(label, idx, alignX, alignY);
    } else if (op == 'hide') {
      point.hide();
    } else if (op == 'show') {
      point.show();
    } else if (op == 'move') {
      target = args[1];
      speed = DebugJS.getOptVal(arg, 'speed');
      step = DebugJS.getOptVal(arg, 'step');
      if (target == undefined) {
        DebugJS.printUsage(tbl.usage);
      } else if (target.charAt(0) == '#') {
        point.moveToSelector(target, 0, speed, step, alignX, alignY);
      } else if (target == 'label') {
        label = args[2];
        idx = args[3] | 0;
        try {
          label = eval(label);
        } catch (e) {
          DebugJS._log.e(e);
          return;
        }
        point.moveToLabel(label, idx, speed, step, alignX, alignY);
      } else if (target == 'center') {
        p = DebugJS.getScreenCenter();
        point.move(p.x, p.y, speed, step);
      } else if (target == 'mouse') {
        point.move(ctx.mousePos.x, ctx.mousePos.y, speed, step);
      } else {
        if (args[1] == '') {
          DebugJS.printUsage(tbl.usage);
        } else if (isNaN(target)) {
          idx = args[2];
          if (target.charAt(0) == '(') {
            target = target.substr(1, target.length - 2);
          }
          point.moveToSelector(target, idx, speed, step, alignX, alignY);
        } else {
          x = args[1];
          y = args[2];
          point.move(x, y, speed, step, alignX, alignY);
        }
      }
    } else if (op == 'drag') {
      idx = arg.indexOf(op);
      point.drag(arg.substring(idx + 4));
    } else if (op == 'event') {
      idx = arg.indexOf(op);
      ret = point.event(arg.substring(idx + 6));
    } else if (op == 'hint') {
      op = args[1];
      if (op == 'msg') {
        msg = DebugJS.getArgsFrom(arg, 2);
        point.hint(msg);
      } else if (op == 'hide') {
        point.hint.hide();
      } else if (op == 'show') {
        point.hint.show();
      } else if (op == 'clear') {
        point.hint.clear();
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    } else if (op == 'center') {
      p = DebugJS.getScreenCenter();
      point(p.x, p.y);
    } else if (op == 'cursor') {
      src = args[1];
      w = args[2];
      h = args[3];
      if (src == undefined) {
        DebugJS.printUsage(tbl.usage);
        return;
      }
      if (src == 'default') src = '';
      point.cursor(src, w, h);
    } else if ((op == 'blur') || (op == 'change') || (op == 'contextmenu') || (op == 'focus') || (op == 'mousedown') || (op == 'mouseup')) {
      point.simpleEvent(op, args[1]);
    } else if ((op == 'click') || (op == 'cclick') || (op == 'rclick') || (op == 'dblclick')) {
      speed = DebugJS.getOptVal(arg, 'speed');
      point.simpleEvent(op, speed);
    } else if ((op == 'keydown') || (op == 'keypress') || (op == 'keyup')) {
      if (args[1] != undefined) {
        point.keyevt(args);
      } else {
        DebugJS.printUsage('point keydown|keypress|keyup -keyCode n -code c -key k [-s] [-c] [-a] [-m]');
      }
    } else if (op == 'getprop') {
      ret = point.getProp(args[1]);
    } else if (op == 'setprop') {
      point.setProp(args[1], DebugJS.getArgsFrom(arg, 2), echo);
    } else if (op == 'verify') {
      ret = ctx._cmdPointVerify(arg);
    } else if (op == 'mouse') {
      point(ctx.mousePos.x, ctx.mousePos.y);
    } else if (op == 'text') {
      el = point.getElementFromCurrentPos();
      if ((!el) || ((el.nodeName != 'INPUT') && (el.nodeName != 'TEXTAREA'))) {
        DebugJS._log.e('Pointed area is not an input element (' + (el ? el.nodeName : 'null') + ')');
        return;
      }
      txt = DebugJS.getArgVal(arg, 1);
      speed = DebugJS.getOptVal(arg, 'speed');
      step = DebugJS.getOptVal(arg, 'step');
      start = DebugJS.getOptVal(arg, 'start');
      end = DebugJS.getOptVal(arg, 'end');
      try {
        DebugJS.inputText(el, txt, speed, step, start, end);
      } catch (e) {
        DebugJS._log.e(e);
      }
    } else if (op == 'selectoption') {
      el = point.getElementFromCurrentPos();
      if ((el) && (el.nodeName == 'SELECT')) {
        method = args[1];
        type = args[2];
        if (((method == 'get') || (method == 'set')) &&
            ((type == 'text') || (type == 'value'))) {
          val = args[3];
          ret = ctx._cmdSelect(el, method, type, val);
        } else {
          DebugJS._log.e('Usage: point selectoption get|set text|value val');
        }
      } else {
        DebugJS._log.e('Pointed area is not a select element (' + (el ? el.nodeName : 'null') + ')');
      }
    } else if (op == 'scroll') {
      x = args[1];
      y = args[2];
      el = point.getElementFromCurrentPos();
      if (el) {
        DebugJS.scrollElTo(el, x, y);
      } else {
        DebugJS._log.e('Failed to get element');
      }
    } else {
      if (op == '') {
        DebugJS._log('x=' + point.x + ', y=' + point.y);
        DebugJS.printUsage(tbl.usage);
      } else if (isNaN(args[0])) {
        target = args[0];
        idx = args[1];
        if (target.charAt(0) == '(') {
          target = target.substr(1, target.length - 2);
        }
        DebugJS.pointBySelector(target, idx, alignX, alignY);
      } else {
        x = args[0];
        y = args[1];
        point(x, y);
      }
    }
    return ret;
  },
  _cmdPointVerify: function(arg) {
    var a = DebugJS.splitArgsEx(arg);
    var prop = a[1];
    var method = a[2];
    var exp = DebugJS.getArgsFrom(arg, 3);
    var label = DebugJS.getOptVal(a, 'label');
    if (label != null) {
      prop = a[3];
      method = a[4];
      exp = DebugJS.getArgsFrom(arg, 5);
    }
    var ret = DebugJS.point.verify(prop, method, exp, label);
    return ret;
  },

  cmdProp: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    arg = DebugJS.delLeadingSP(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var v = ctx.props[arg];
      if (v != undefined) {
        DebugJS._log.res(v);
        return v;
      } else {
        DebugJS._log.e(arg + ' is invalid property name.');
      }
    }
  },

  cmdProps: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    if (a[0] == '-reset') {
      DebugJS.deepCopy(ctx.PROPS_DFLT_VALS, ctx.props);
      DebugJS._log('debug properties have been reset.');
      return;
    } else if (a[0] != '') {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var s = 'Available properties:\n<table>';
    for (var key in ctx.props) {
      s += '<tr><td>' + key + '</td><td>' + ctx.props[key] + '</td></tr>';
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },

  cmdRandom: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var type = a[0] || DebugJS.RND_TYPE_NUM;
    var min, max;
    if (a[0] == '') {
      type = DebugJS.RND_TYPE_NUM;
    } else {
      if ((a[0] == DebugJS.RND_TYPE_NUM) || (a[0] == DebugJS.RND_TYPE_STR)) {
        type = a[0];
        min = a[1];
        max = a[2];
      } else if (a[0].match(/[0-9]{1,}/)) {
        type = DebugJS.RND_TYPE_NUM;
        min = a[0];
        max = a[1];
      } else {
        DebugJS.printUsage(tbl.usage);
        return;
      }
    }
    var rnd = DebugJS.getRandom(type, min, max);
    DebugJS._log(rnd);
    return rnd;
  },

  cmdRadixConv: function(v, echo) {
    var ctx = DebugJS.ctx;
    v = DebugJS.delLeadingAndTrailingSP(v);
    var rdx = DebugJS.checkRadix(v);
    if ((rdx == 10) || (rdx == 16) || (rdx == 2)) {
      ctx._cmdRadixConv(v, echo);
      return true;
    } else {
      return false;
    }
  },
  _cmdRadixConv: function(v, echo) {
    if (!echo) return;
    var rdx = DebugJS.checkRadix(v);
    if (rdx == 10) {
      v = v.replace(/,/g, '');
      DebugJS.convRadixFromDEC(v);
    } else if (rdx == 16) {
      DebugJS.convRadixFromHEX(v.substr(2));
    } else if (rdx == 2) {
      DebugJS.convRadixFromBIN(v.substr(2));
    }
  },

  cmdResume: function(arg, tbl) {
    var key = DebugJS.getOptVal(arg, 'key');
    if (arg == '') {
      DebugJS.bat._resume('cmd-key');
    } else if (key != null) {
      DebugJS.bat.resume(key);
    } else {
      DebugJS.printUsage(tbl.usage);
    }
  },

  cmdReturn: function(arg, tbl) {
    DebugJS.bat.ret(arg);
  },

  cmdRGB: function(arg, tbl) {
    arg = DebugJS.unifySP(DebugJS.delLeadingAndTrailingSP(arg));
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      return DebugJS.convRGB(arg);
    }
  },

  cmdROT: function(arg, tbl, echo) {
    var x = DebugJS.splitArgs(arg)[0];
    var a = DebugJS.getArgsFrom(arg, 1);
    var fnE, fnD;
    switch (x) {
      case '5':
        fnE = DebugJS.encodeROT5;
        fnD = DebugJS.decodeROT5;
        break;
      case '13':
        fnE = DebugJS.encodeROT13;
        fnD = DebugJS.decodeROT13;
        break;
      case '47':
        fnE = DebugJS.encodeROT47;
        fnD = DebugJS.decodeROT47;
        break;
      default:
        DebugJS.printUsage(tbl.usage);
        return;
    }
    var iIdx = 0;
    if ((DebugJS.hasOpt(a, 'd')) || (DebugJS.hasOpt(a, 'e'))) {
      iIdx++;
    }
    var n = DebugJS.getOptVal(a, 'n');
    if (n == null) {
      n = x | 0;
    } else {
      n = n.replace(/\(|\)/g, '') | 0;
      iIdx += 2;
    }
    return DebugJS.ctx.execEncAndDec(a, tbl, echo, fnE, fnD, iIdx, n);
  },

  cmdScrollTo: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var target = a[0];
    if (target == '') {
      DebugJS.printUsage(tbl.usage);
    } else if (target == 'log') {
      var pos = a[1];
      ctx._cmdScrollToLog(ctx, tbl, pos);
    } else if (target == 'window') {
      var posX = a[1];
      var posY = a[2];
      var speed = DebugJS.getOptVal(arg, 'speed');
      var step = DebugJS.getOptVal(arg, 'step');
      ctx._cmdScrollToWin(ctx, tbl, posX, posY, speed, step);
    } else {
      var x = a[1];
      var y = a[2];
      DebugJS.scrollElTo(target, x, y);
    }
  },
  _cmdScrollToLog: function(ctx, tbl, pos) {
    if (pos == 'top') {
      pos = 0;
    } else if (pos == 'bottom') {
      pos = ctx.logPanel.scrollHeight;
    }
    if ((pos === '') || isNaN(pos)) {
      DebugJS.printUsage(tbl.usage);
    } else {
      ctx.logPanel.scrollTop = pos;
    }
  },
  _cmdScrollToWin: function(ctx, tbl, posX, posY, speed, step) {
    if ((posX == undefined) || (posY == undefined)) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var x = ctx._cmdScrollWinGetX(posX);
    if (x == undefined) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var y = ctx._cmdScrollWinGetY(posY);
    if (y == undefined) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    if ((speed == '0') || (step == '0')) {
      window.scroll(x, y);
    } else {
      DebugJS.scrollWinTo(x, y, speed, step);
    }
  },
  _cmdScrollWinGetX: function(posX) {
    var x;
    var scrollX = (window.scrollX != undefined ? window.scrollX : window.pageXOffset);
    if (posX == 'left') {
      x = 0;
    } else if (posX == 'center') {
      x = document.body.clientWidth / 2;
    } else if (posX == 'right') {
      x = document.body.clientWidth;
    } else if (posX == 'current') {
      x = scrollX;
    } else if (posX.charAt(0) == '+') {
      x = scrollX + (posX.substr(1) | 0);
    } else if (posX.charAt(0) == '-') {
      x = scrollX - (posX.substr(1) | 0);
    } else if ((posX == '') || isNaN(posX)) {
      x = undefined;
    } else {
      x = posX;
    }
    return x;
  },
  _cmdScrollWinGetY: function(posY) {
    var y;
    var scrollY = (window.scrollY != undefined ? window.scrollY : window.pageYOffset);
    if (posY == 'top') {
      y = 0;
    } else if (posY == 'middle') {
      y = (document.body.clientHeight - document.documentElement.clientHeight) / 2;
    } else if (posY == 'bottom') {
      y = document.body.clientHeight;
    } else if (posY == 'current') {
      y = scrollY;
    } else if (posY.charAt(0) == '+') {
      y = scrollY + (posY.substr(1) | 0);
    } else if (posY.charAt(0) == '-') {
      y = scrollY - (posY.substr(1) | 0);
    } else if ((posY == '') || isNaN(posY)) {
      y = undefined;
    } else {
      y = posY;
    }
    return y;
  },

  cmdSelect: function(arg, tbl) {
    var a = DebugJS.splitArgsEx(arg);
    var sel = a[0];
    var method = a[1];
    var type = a[2];
    var val = a[3];
    if ((sel != '') &&
        (((method == 'set') && (a.length >= 4)) || ((method == 'get') && (a.length >= 3))) &&
        ((type == 'text') || (type == 'value'))) {
      return DebugJS.ctx._cmdSelect(sel, method, type, val);
    }
    DebugJS.printUsage(tbl.usage);
  },
  _cmdSelect: function(sel, method, type, val) {
    try {
      var val = eval(val) + '';
      var ret = DebugJS.selectOption(sel, method, type, val);
      if (method == 'get') {
        DebugJS._log.res(ret);
      }
      return ret;
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  cmdSet: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var name = a[0];
    var val = ((a[1] == undefined) ? '' : a[1]);
    if ((name == '') || (val == '')) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    ctx._cmdSet(ctx, name, val, echo);
  },
  _cmdSet: function(ctx, name, val, echo) {
    var props = ctx.props;
    if (props[name] != undefined) {
      var restriction = ctx.PROPS_RESTRICTION[name];
      if (restriction != undefined) {
        if (!(val + '').match(restriction)) {
          DebugJS._log.e(val + ' is invalid. (' + restriction + ')');
          return;
        }
      }
      props[name] = val;
      if (ctx.PROPS_CB[name]) {
        var ret = ctx.PROPS_CB[name](ctx, val);
        if (ret != undefined) {
          props[name] = ret;
        }
      }
      if (echo) DebugJS._log.res(val);
    } else {
      DebugJS._log.e(name + ' is invalid property name.');
    }
  },
  setPropBatContCb: function(ctx, v) {
    if (DebugJS.bat.isRunning()) {
      if (v == 'on') {
        ctx.status |= DebugJS.ST_BAT_CONT;
      } else {
        ctx.status &= ~DebugJS.ST_BAT_CONT;
      }
    }
  },
  setPropTimerCb: function(ctx, v) {
    var tm = DebugJS.timestr2struct(v);
    if (ctx.timerStopWatchCdInput) {
      ctx.timerTxtHH.value = tm.hh;
      ctx.timerTxtMI.value = tm.mi;
      ctx.timerTxtSS.value = tm.ss;
      ctx.timerTxtSSS.value = tm.sss;
    }
    return DebugJS.convTimeStr(tm);
  },
  setPropConsoleLogCb: function(ctx, v) {
    DebugJS.setConsoleLogOut((v == 'me'));
  },

  cmdSetAttr: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var sel = a[0];
    var idx = 0;
    var nm = a[1];
    var vl = a[2];
    if (a[3] != undefined) {
      idx = a[1];
      nm = a[2];
      vl = a[3];
    }
    if ((sel == '') || (nm == undefined) || (vl == undefined)) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var el = DebugJS.getElement(sel, idx);
    if (!el) {
      DebugJS._log.e('Element not found: ' + sel);
      return;
    }
    el.setAttribute(nm, vl);
  },

  cmdSleep: function(arg, tbl) {
    var ms = DebugJS.splitArgs(arg)[0];
    if ((ms == '') || isNaN(ms)) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    DebugJS.sleep(ms);
  },

  cmdTimeCalc: function(arg, echo) {
    var ret = null;
    arg = DebugJS.unifySP(DebugJS.delLeadingAndTrailingSP(arg));
    if (!arg.match(/^\d{1,}:{1}\d{2}/)) {
      return ret;
    }
    arg = DebugJS.delAllSP(arg);
    var op;
    if (arg.indexOf('-') >= 0) {
      op = '-';
    } else if (arg.indexOf('+') >= 0) {
      op = '+';
    }
    var vals = arg.split(op);
    if (vals.length < 2) {
      return ret;
    }
    var timeL = DebugJS.str2ms(vals[0]);
    var timeR = DebugJS.str2ms(vals[1]);
    if ((timeL == null) || (timeR == null)) {
      ret = 'Invalid time format';
      DebugJS._log.e(ret);
      return ret;
    }
    var byTheDay = (vals[2] == undefined);
    if (op == '-') {
      ret = DebugJS.subTime(timeL, timeR, byTheDay);
    } else {
      ret = DebugJS.addTime(timeL, timeR, byTheDay);
    }
    if (echo) DebugJS._log.res(ret);
    return ret;
  },

  cmdTest: function(arg, tbl) {
    var args = DebugJS.splitArgsEx(arg, 4);
    var op = args[0];
    var test = DebugJS.test;
    switch (op) {
      case 'init':
        var nm = DebugJS.getOptVal(arg, 'name');
        try {
          nm = eval(nm);
          test.init(nm);
          DebugJS._log('Test has been initialized.' + (nm == undefined ? '' : ' (' + nm + ')'));
        } catch (e) {
          DebugJS._log.e(e);
        }
        break;
      case 'set':
        DebugJS.ctx._cmdTestSet(arg);
        break;
      case 'count':
        var c = test.data.cnt;
        if (args[1] != '-d') c = test.getSumCount();
        DebugJS._log(test.getCountStr(c));
        break;
      case 'last':
        var st = test.getLastResult();
        DebugJS._log(test.getStyledStStr(st));
        return st;
      case 'result':
        DebugJS._log(test.result());
        break;
      case 'status':
        var st = test.getStatus();
        DebugJS._log(test.getStyledStStr(st));
        return st;
      case 'verify':
        return DebugJS.ctx._CmdTestVerify(arg);
      case 'fin':
        test.fin();
        DebugJS._log('Test completed.');
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },
  _cmdTestSet: function(arg) {
    var test = DebugJS.test;
    var args = DebugJS.splitArgsEx(arg, 3);
    var target = args[1];
    var fn;
    switch (target) {
      case 'name':
        fn = test.setName;
        break;
      case 'desc':
        fn = test.setDesc;
        break;
      case 'id':
        fn = test.setId;
        break;
      case 'comment':
        fn = test.setCmnt;
        break;
      case 'result':
        DebugJS.ctx._cmdTestSetRslt(DebugJS.getArgsFrom(arg, 2));
        return;
      default:
        DebugJS.printUsage('test set name|desc|id|comment|result val');
        return;
    }
    try {
      var v = eval(args[2]);
      if (v == undefined) v = '';
      fn(v + '');
    } catch (e) {
      DebugJS._log.e(e);
    }
  },
  _CmdTestVerify: function(arg) {
    var a = DebugJS.splitArgsEx(arg);
    var got = a[1];
    var method = a[2];
    var exp = DebugJS.getArgsFrom(arg, 3);
    var label = DebugJS.getOptVal(a, 'label');
    if (label != null) {
      got = a[3];
      method = a[4];
      exp = DebugJS.getArgsFrom(arg, 5);
    }
    return DebugJS.test.verify(got, method, exp, true, label);
  },
  _cmdTestSetRslt: function(a) {
    var st = DebugJS.getArgVal(a, 0);
    var label = DebugJS.getOptVal(a, 'label');
    var info = DebugJS.getOptVal(a, 'info');
    try {
      var inf = eval(info);
    } catch (e) {
      DebugJS._log.e('Illegal info opt: ' + info);
      return;
    }
    DebugJS.test.setResult(st, label, inf);
  },

  cmdTime: function(arg, tbl, echo) {
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var t1 = DebugJS.getOptVal(arg, 't1');
    var t2 = DebugJS.getOptVal(arg, 't2');
    if (((t1 == null) || (t1 == '')) && (t2 == null)) {
      t1 = arg;
    }
    try {
      t1 = eval(t1);
      t2 = eval(t2);
      var s = DebugJS.getTimeDurationStr(t1, t2);
      if (echo) DebugJS._log.res(s);
      return s;
    } catch (e) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
  },

  cmdTimer: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var op = a[0];
    var timerName = a[1];
    if (timerName == undefined) timerName = DebugJS.DFLT_TIMER_NAME;
    switch (op) {
      case 'start':
        DebugJS.timeStart(timerName);
        break;
      case 'split':
        DebugJS.timeSplit(timerName, false);
        break;
      case 'stop':
        DebugJS.timeEnd(timerName);
        break;
      case 'list':
        DebugJS.timeList();
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdStopwatch: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var sw = 0;
    var op = a[0];
    if (a[0].substr(0, 2) == 'sw') {
      sw = a[0].charAt(2) | 0;
      op = a[1];
    }
    var ret = false;
    if (sw == 0) {
      ret = ctx.cmdStopwatch0(ctx, op);
    } else if (sw == 1) {
      ret = ctx.cmdStopwatch1(ctx, op);
    } else if (sw == 2) {
      ret = ctx.cmdStopwatch2(ctx, op);
    }
    if (ret == -1) {
      DebugJS.printUsage(tbl.usage);
    }
    return ret;
  },
  cmdStopwatch0: function(ctx, op) {
    switch (op) {
      case 'start':
        ctx.startStopWatch();
        break;
      case 'stop':
        ctx.stopStopWatch();
        break;
      case 'reset':
        ctx.resetStopWatch();
        break;
      case 'val':
        DebugJS._log('sw0: ' + ctx.swElapsedTimeDisp);
        break;
      default:
        return -1;
    }
    return ctx.swElapsedTime;
  },
  cmdStopwatch1: function(ctx, op) {
    if (!ctx.isAvailableTools(ctx)) return false;
    switch (op) {
      case 'start':
        ctx.startTimerStopWatchCu();
        break;
      case 'stop':
        ctx.stopTimerStopWatchCu();
        break;
      case 'reset':
        ctx.resetTimerStopWatchCu();
        break;
      case 'split':
        ctx.splitTimerStopWatchCu();
        break;
      case 'end':
        ctx.endTimerStopWatchCu();
        break;
      case 'val':
        var v = DebugJS.time.check(DebugJS.TIMER_NAME_SW_CU);
        DebugJS._log(DebugJS.TIMER_NAME_SW_CU + ': ' + (v == null ? DebugJS.TIME_RST_STR : v));
        break;
      default:
        return -1;
    }
    return 0;
  },
  cmdStopwatch2: function(ctx, op) {
    if (!ctx.isAvailableTools(ctx)) return false;
    switch (op) {
      case 'start':
        ctx.startTimerStopWatchCd();
        break;
      case 'stop':
        ctx.stopTimerStopWatchCd();
        break;
      case 'reset':
        ctx.resetTimerStopWatchCd();
        break;
      case 'split':
        ctx.splitTimerStopWatchCd();
        break;
      case 'val':
        DebugJS._log(DebugJS.TIMER_NAME_SW_CD + ': ' + DebugJS.getTimerStr(ctx.timerSwTimeCd));
        break;
      default:
        return -1;
    }
    return 0;
  },

  cmdUnAlias: function(arg, tbl, echo) {
    var nm = DebugJS.splitArgs(arg);
    if (nm[0] == '') {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    if (nm[0] == '-a') {
      DebugJS.ctx.CMD_ALIAS = {};
      return;
    }
    var tbl = DebugJS.ctx.CMD_ALIAS;
    for (var i = 0; i < nm.length; i++) {
      if (tbl[nm[i]] == undefined) {
        DebugJS._log(nm[i] + ': not found');
      } else {
        delete tbl[nm[i]];
      }
    }
  },

  cmdUnicode: function(arg, tbl, echo) {
    var iIdx = 0;
    if ((DebugJS.hasOpt(arg, 'd')) || (DebugJS.hasOpt(arg, 'e'))) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, DebugJS.getUnicodePoints, DebugJS.decodeUnicode, iIdx);
  },

  cmdUri: function(arg, tbl, echo) {
    var iIdx = 0;
    if ((DebugJS.hasOpt(arg, 'd')) || (DebugJS.hasOpt(arg, 'e'))) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, DebugJS.encodeUri, DebugJS.decodeUri, iIdx);
  },

  cmdUtf8: function(arg, tbl, echo) {
    try {
      var s = eval(arg);
      if (typeof s == 'string') {
        var bf = DebugJS.UTF8.toByte(s);
        if (echo) DebugJS.ctx._dumpByteSeq(s, bf.length);
        return bf;
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    } catch (e) {
      DebugJS._log.e(e);
      DebugJS.printUsage(tbl.usage);
    }
  },
  _dumpByteSeq: function(str, len) {
    var s = '';
    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      var a = DebugJS.UTF8.toByte(ch);
      for (var j = 0; j < a.length; j++) {
        var v = a[j];
        s += '[' + DebugJS.strPadding(cnt, ' ', DebugJS.digits(len), 'L') + '] ';
        s += DebugJS.strPadding(v, ' ', 3, 'L') + '  ';
        s += DebugJS.toHex(v, true, true, 2) + '  ';
        s += DebugJS.toBin(v);
        if (j == 0) {
          s += '  ' + DebugJS.getUnicodePoints(ch);
          s += ' ' + DebugJS.hlCtrlChr(ch, true);
        }
        s += '\n';
        cnt++;
      }
    }
    DebugJS._log.mlt(s);
  },

  cmdV: function(arg, tbl) {
    DebugJS._log(DebugJS.ctx.v);
    return DebugJS.ctx.v;
  },

  cmdVals: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var o = DebugJS.getOptVal(arg, 'c');
    if (o == null) {
      ctx._cmdVals(ctx);
    } else {
      ctx._cmdValsC(ctx);
    }
  },
  _cmdVals: function(ctx) {
    var v = '';
    for (var key in ctx.CMDVALS) {
      v += '<tr><td class="' + ctx.id + '-cmdtd">' + key + '</td><td>' + DebugJS.objDump(ctx.CMDVALS[key], false, -1) + '</td></tr>';
    }
    if (v == '') {
      DebugJS._log('no variables');
    } else {
      v = '<table>' + v + '</table>';
      DebugJS._log.mlt(v);
    }
  },
  _cmdValsC: function(ctx) {
    for (var n in ctx.CMDVALS) {
      if (!DebugJS.isSysVal(n)) {
        delete ctx.CMDVALS[n];
      }
    }
  },

  cmdWatchdog: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var op = a[0];
    var time = a[1];
    switch (op) {
      case 'start':
        DebugJS.wd.start(time);
        break;
      case 'stop':
        DebugJS.wd.stop();
        break;
      default:
        if (DebugJS.ctx.status & DebugJS.ST_WD) {
          DebugJS._log('Running ' + DebugJS.ctx.props.wdt + 'ms: ' + DebugJS.wd.cnt);
        } else {
          DebugJS._log('Not Running');
        }
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdWin: function(arg, tbl) {
    var size = DebugJS.delLeadingAndTrailingSP(arg);
    switch (size) {
      case 'min':
      case 'normal':
      case 'full':
      case 'expand':
      case 'center':
      case 'restore':
      case 'reset':
        DebugJS.ctx.setWinSize(size);
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  setWinSize: function(opt) {
    var ctx = DebugJS.ctx;
    switch (opt) {
      case 'min':
        ctx.saveSize(ctx);
        ctx.savePosNone(ctx);
        ctx.setDbgWinSize(ctx.computedMinW, ctx.computedMinH);
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
        ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJUST;
        ctx.sizeStatus = DebugJS.SIZE_ST_MIN;
        ctx.updateWinCtrlBtnPanel();
        break;
      case 'normal':
        var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        ctx.setDbgWinSize(w, h);
        ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
        ctx.updateWinCtrlBtnPanel();
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
        break;
      case 'restore':
        if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
          ctx.restoreDbgWin();
          ctx.updateWinCtrlBtnPanel();
        }
        break;
      case 'reset':
        ctx.resetDbgWinSizePos();
        break;
      case 'center':
      case 'full':
      case 'expand':
        ctx.expandDbgWin(opt);
        ctx.updateWinCtrlBtnPanel();
    }
  },

  cmdZoom: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var zoom = DebugJS.delLeadingAndTrailingSP(arg);
    if (zoom == '') {
      DebugJS.printUsage(tbl.usage);
    } else if (zoom != ctx.opt.zoom) {
      var restoreOpt = {
        cause: DebugJS.INIT_CAUSE_ZOOM,
        status: ctx.status,
        sizeStatus: ctx.sizeStatus
      };
      ctx.featStackBak = ctx.featStack.concat();
      ctx.finalizeFeatures(ctx);
      ctx.setWinSize('normal');
      ctx.init({zoom: zoom}, restoreOpt);
    }
  },

  cmdNop: function(arg, tbl) {},

  execEncAndDec: function(arg, tbl, echo, encFnc, decFnc, iIdx, a1, a2) {
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    var fn = encFnc;
    if (DebugJS.hasOpt(arg, 'd')) {
      fn = decFnc;
    } else if (DebugJS.hasOpt(arg, 'e')) {
      fn = encFnc;
    }
    var i = DebugJS.getOptVal(arg, 'i');
    try {
      if (i == null) {
        i = DebugJS.getArgsFrom(arg, iIdx);
      } else {
        i = eval(i);
      }
      var ret = fn(i, a1, a2);
      if (echo) DebugJS._log.res(DebugJS.quoteStrIfNeeded(ret));
      return ret;
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  doHttpRequest: function(method, arg) {
    var a = DebugJS.splitCmdLineInTwo(arg);
    var url = a[0];
    var data = a[1];
    var user = '';
    var pass = '';
    if (url == '--user') {
      var parts = DebugJS.splitCmdLineInTwo(data);
      var auth = parts[0];
      var auths = auth.split(':');
      if (auths.length > 1) {
        user = auths[0];
        pass = auths[1];
        parts = DebugJS.splitCmdLineInTwo(parts[1]);
        url = parts[0];
        data = parts[1];
      }
    }
    data = DebugJS.encodeURIString(data);
    method = method.toUpperCase();
    var req = 'Sending a request.\n' + method + ' ' + url + '\n' +
    'Body: ' + ((data == '') ? '<span style="color:#ccc">null</span>' : data);
    if (user || pass) {
      req += '\nuser: ' + user + ':' + (pass ? '*' : '');
    }
    DebugJS._log(req);
    var request = {
      url: url,
      method: method,
      data: data,
      async: true,
      cache: false,
      user: user,
      pass: pass
      //userAgent: 'Mozilla/5.0 (' + DebugJS.getBrowserType().name + ') DebugJS/1.0'
    };
    try {
      DebugJS.http(request, DebugJS.onHttpRequestDone);
    } catch (e) {
      DebugJS._log.e(e);
      var baseURI = document.baseURI;
      var reg = new RegExp('^' + baseURI + '(.*?)');
      if (!url.match(reg)) {
        DebugJS._log.w('Cross-Origin Request\nsource : ' + baseURI + '\nrequest: ' + url);
      }
    }
  },

  initExtension: function(ctx) {
    ctx.initExtPanel(ctx);
  },

  initExtPanel: function(ctx) {
    if (ctx.extPanel == null) {
      var bp = ctx.createSubBasePanel(ctx);
      ctx.extPanel = bp.base;
      ctx.extHeaderPanel = bp.head;
      ctx.extBodyPanel = bp.body;
      ctx.extBodyPanel.style.overflow = 'auto';
    }
    var pnls = ctx.extPanels;
    if (pnls.length > 0) {
      if (ctx.extBtn) ctx.extBtn.style.display = '';
      for (var i = 0; i < pnls.length; i++) {
        var p = pnls[i];
        if ((p != null) && (p.base == null)) {
          ctx.createExtPanel(ctx, p, i);
        }
      }
    }
  },

  redrawExtPanelBtn: function(ctx) {
    for (var i = ctx.extHeaderPanel.childNodes.length - 1; i >= 0; i--) {
      ctx.extHeaderPanel.removeChild(ctx.extHeaderPanel.childNodes[i]);
    }
    var pnls = ctx.extPanels;
    if (pnls.length > 0) {
      for (i = 0; i < pnls.length; i++) {
        var p = pnls[i];
        if (p != null) {
          ctx.extHeaderPanel.appendChild(p.btn);
        }
      }
    } else {
      ctx.extBtn.style.display = 'none';
    }
  },

  createExtPanel: function(ctx, p, idx) {
    p.base = document.createElement('div');
    p.base.className = ctx.id + '-sbpnl';
    p.btn = ctx.createExtHeaderBtn(ctx, p.name, idx);
    if (p.panel) {
      p.base.appendChild(p.panel);
    } else {
      p.panel = p.base;
    }
    if (p.onCreate) p.onCreate(p.panel);
  },

  existCmd: function(cmd, tbl) {
    for (var i = 0; i < tbl.length; i++) {
      if (tbl[i].cmd == cmd) return true;
    }
    return false;
  }
};

DebugJS.addSubPanel = function(base) {
  var el = document.createElement('div');
  el.className = DebugJS.ctx.id + '-sbpnl';
  base.appendChild(el);
  return el;
};

DebugJS.addPropSeparator = function(ctx) {
  return '<div class="' + ctx.id + '-sep"></div>';
};

DebugJS.getColorBlock = function(color) {
  var w = DebugJS.ctx.computedFontSize / 2;
  var h = DebugJS.ctx.computedFontSize;
  return '<span style="background:' + color + ';width:' + w + 'px;height:' + h + 'px;display:inline-block"> </span>';
};

DebugJS.addSysInfoPropH = function(n) {
  return '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">' + n + '.</span>\n';
};

DebugJS.addSysInfoProp = function(n, v, id) {
  var s = '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> ' + n + '</span>: ';
  if (id == undefined) {
    s += v;
  } else {
    s += '<span' + (id == undefined ? '' : ' id="' + DebugJS.ctx.id + '-' + id + '"') + '>' + v + '</span>';
  }
  s += '\n';
  return s;
};

DebugJS.getElmHexColor = function(color) {
  var hex = '';
  if ((color) && (color != 'transparent')) {
    var color10 = color.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
    var color16 = DebugJS.convRGB10to16(color10);
    hex = '#' + color16.r + color16.g + color16.b;
  }
  return hex;
};

DebugJS.RingBuffer = function(len) {
  this.buffer = new Array(len);
  this.len = len;
  this.cnt = 0;
};
DebugJS.RingBuffer.prototype = {
  add: function(data) {
    var idx = this.cnt % this.len;
    this.buffer[idx] = data;
    this.cnt++;
  },
  set: function(idx, data) {
    this.buffer[idx] = data;
  },
  get: function(idx) {
    if (this.len < this.cnt) {
      idx += this.cnt;
    }
    idx %= this.len;
    return this.buffer[idx];
  },
  getAll: function() {
    var buf = [];
    var len = this.len;
    var pos = 0;
    if (this.cnt > len) {
      pos = (this.cnt % len);
    }
    for (var i = 0; i < len; i++) {
      if (pos >= len) {
        pos = 0;
      }
      if (this.buffer[pos] == undefined) {
        break;
      } else {
        buf[i] = this.buffer[pos];
        pos++;
      }
    }
    return buf;
  },
  clear: function() {
    this.buffer = new Array(this.len);
    this.cnt = 0;
  },
  count: function() {
    return this.cnt;
  },
  lastIndex: function() {
    return ((this.cnt - 1) % this.len);
  },
  getSize: function() {
    return this.len;
  }
};

DebugJS.getCmdValName = function(v, pfix, head) {
  var m = pfix + '\\{(.+?)\\}';
  if (head) m = '^' + m;
  var re = new RegExp(m);
  var r = re.exec(v);
  if (r == null) return null;
  var idx = r.index;
  if ((idx > 0) && ((v.charAt(idx - 1) == '\\'))) {
    return null;
  }
  return r[1];
};
DebugJS.replaceCmdVals = function(s) {
  s = DebugJS._replaceCmdVals(s, true);
  s = DebugJS._replaceCmdVals(s);
  return s;
};
DebugJS._replaceCmdVals = function(s, il) {
  var prevN;
  var pfix = (il ? '%' : '\\$');
  while (true) {
    var name = DebugJS.getCmdValName(s, pfix);
    if (name == null) return s;
    if (name == prevN) {
      DebugJS._log.e('(bug) replaceCmdVals(): ' + name);
      return s;
    }
    prevN = name;
    var reNm = name;
    if (name == '?') {reNm = '\\?';}
    var re = new RegExp(pfix + '\\{' + reNm + '\\}', 'g');
    var r;
    if (il) {
      r = DebugJS.ctx.CMDVALS[name] + '';
    } else {
      r = 'DebugJS.ctx.CMDVALS[\'' + name + '\']';
    }
    s = s.replace(re, r);
  }
};

// " 1  2 3  4 " -> [0]="1" [1]="2" [2]="3" [3]="4"
DebugJS.splitArgs = function(arg) {
  return DebugJS.unifySP(DebugJS.delLeadingAndTrailingSP(arg)).split(' ');
};

// ' 1 "abc" "d ef"  "g\"hi" 2 ("jkl" + 3) 4 '
// -> [0]=1 [1]="abc" [2]="d ef" [3]="g\"hi" [4]=2 [5]=("jkl" + 3) [6]=4
DebugJS.splitArgsEx = function(arg, limit) {
  var args = [];
  var start = 0;
  var len = 0;
  var searching = true;
  var quoted = null;
  var bracket = 0;
  var ch = '';
  var str = '';
  limit = (limit == undefined ? 0 : limit);
  for (var i = 0; i < arg.length; i++) {
    len++;
    ch = arg.charAt(i);
    switch (ch) {
      case ' ':
        if (searching || quoted || (bracket > 0)) {
          continue;
        } else {
          searching = true;
          str = arg.substr(start, len);
          args.push(str);
          if (args.length + 1 == limit) {
            if (i < arg.length - 1) {
              start = i + 1;
              len = arg.length - start;
              str = arg.substr(start, len);
              args.push(str);
              i = arg.length;
            }
          }
        }
        break;
      case '(':
        if (searching) {
          start = i;
          len = 0;
          searching = false;
        }
        if (!quoted) {
          bracket++;
        }
        break;
      case ')':
        if (searching) {
          start = i;
          len = 0;
          searching = false;
        } else if (bracket > 0) {
          if ((i > 0) && (arg.charAt(i - 1) == '\\')) {
            continue;
          }
          bracket--;
        }
        break;
      case '"':
      case "'":
        if (bracket > 0) {
          continue;
        } else if (searching) {
          start = i;
          len = 0;
          searching = false;
          quoted = ch;
        } else if (ch == quoted) {
          if ((i > 0) && (arg.charAt(i - 1) == '\\')) {
            continue;
          }
          quoted = null;
        }
        break;
      default:
        if (searching) {
          start = i;
          len = 0;
          searching = false;
        }
    }
  }
  len++;
  if (!searching) {
    str = arg.substr(start, len);
    args.push(str);
  }
  if (args.length == 0) {
    args = [''];
  }
  return args;
};

DebugJS.countArgs = function(a) {
  var b = DebugJS.splitArgsEx(a);
  var c = b.length;
  if (b[0] == '') c = 0;
  return c;
};

// " 1  2 3  4 " -> [0]="1" [1]=" 2 3  4 "
DebugJS.splitCmdLineInTwo = function(s) {
  var res = [];
  s = DebugJS.delLeadingSP(s);
  var two = DebugJS.splitArgsEx(s);
  if (two.length == 1) {
    res[0] = two[0];
    res[1] = '';
  } else {
    res[0] = two[0];
    res[1] = s.substr(two[0].length + 1);
  }
  return res;
};

// " 1  2  3  4 " (2)-> " 3  4 "
DebugJS.getArgsFrom = function(s, n) {
  var res = s;
  for (var i = 0; i < n; i++) {
    res = DebugJS.splitCmdLineInTwo(res)[1];
  }
  return res;
};

DebugJS.getArgVal = function(a, idx) {
  return DebugJS.splitArgsEx(a)[idx];
};

DebugJS.getOptVal = function(args, opt) {
  var v = DebugJS.getOptVals(args);
  return (v[opt] == undefined ? null : v[opt]);
};
DebugJS.getOptVals = function(args) {
  var i, k, v;
  var o = {'': []};
  if (typeof args == 'string') {
    args = DebugJS.splitArgsEx(args);
  }
  for (i = 0; i < args.length; i++) {
    if ((args[i].charAt(0) == '-') && ((k = args[i].substring(1)) != '')) {
      if ((args[i + 1] != undefined) && (args[i + 1].charAt(0) != '-')) {
        i++;
        v = args[i];
      } else {
        v = '';
      }
      o[k] = v;
    } else {
      o[''].push(args[i]);
    }
  }
  return o;
};
DebugJS.hasOpt = function(arg, opt) {
  var b = false;
  var v = DebugJS.getOptVal(arg, opt);
  if (opt == '') {
    if (v.length > 0) b = true;
  } else {
    if (v != null) b = true;
  }
  return b;
};

DebugJS.getQuotedStr = function(str) {
  var ret = null;
  var start = 0;
  var len = 0;
  var searching = true;
  var quoted = null;
  var ch = '';
  for (var i = 0; i < str.length; i++) {
    len++;
    ch = str.charAt(i);
    if ((ch == '"') || (ch == "'")) {
      if (searching) {
        start = i;
        len = 0;
        searching = false;
        quoted = ch;
      } else if (ch == quoted) {
        if ((i > 0) && (str.charAt(i - 1) == '\\')) {
          continue;
        }
        ret = str.substr(start + 1, len - 1);
        break;
      }
    }
  }
  return ret;
};

DebugJS.indexOfOptVal = function(a, o) {
  var r = -1;
  var i = a.indexOf(o);
  if (i >= 0) {
    r = i + o.length + 1;
  }
  return r;
};

DebugJS.encodeEsc = function(s) {
  return s.replace(/\\/g, '\\\\');
};
DebugJS.decodeEsc = function(s) {
  return s.replace(/\\\\/g, '\\');
};

DebugJS.isCtrlChar = function(ch) {
  var c = ch.charCodeAt();
  if (((c >= 0x00) && (c <= 0x1F)) || (c == 0x7F)) {
    return true;
  }
  return false;
};
DebugJS.isNumeric = function(ch) {
  var c = ch.charCodeAt();
  if ((c >= 0x30) && (c <= 0x39)) {
    return true;
  }
  return false;
};
DebugJS.isAlphabetic = function(ch) {
  var c = ch.charCodeAt();
  if (((c >= 0x41) && (c <= 0x5A)) ||
      ((c >= 0x61) && (c <= 0x7A))) {
    return true;
  }
  return false;
};
DebugJS.isUpperCase = function(ch) {
  var c = ch.charCodeAt();
  if ((c >= 0x41) && (c <= 0x5A)) {
    return true;
  }
  return false;
};
DebugJS.isLowerCase = function(ch) {
  var c = ch.charCodeAt();
  if ((c >= 0x61) && (c <= 0x7A)) {
    return true;
  }
  return false;
};
DebugJS.isPunctuation = function(ch) {
  var c = ch.charCodeAt();
  if (((c >= 0x20) && (c <= 0x2F)) ||
      ((c >= 0x3A) && (c <= 0x40)) ||
      ((c >= 0x5B) && (c <= 0x60)) ||
      ((c >= 0x7B) && (c <= 0x7E))) {
    return true;
  }
  return false;
};
DebugJS.isNumAlpha = function(ch) {
  var c = ch.charCodeAt();
  if (DebugJS.isNumeric(ch) || DebugJS.isAlphabetic(ch)) {
    return true;
  }
  return false;
};
DebugJS.isTypographic = function(ch) {
  var c = ch.charCodeAt();
  if (DebugJS.isNumAlpha(ch) || DebugJS.isPunctuation(ch)) {
    return true;
  }
  return false;
};

DebugJS.isNum = function(s) {
  return (s.match(/^\d+$/) ? true : false);
};

DebugJS.getContentType = function(mime, file, dturlData) {
  var t = '';
  var ext = ['bat', 'csv', 'ini', 'java', 'js', 'json', 'log', 'md'];
  var re = '';
  for (var i = 0; i < ext.length; i++) {
    if (i > 0) {re += '|';} re += '\.' + ext[i] + '$';
  }
  var xmlHead = 'PD94bWw';
  if (mime) {
    if (mime.match(/image\//)) {
      t = 'image';
    } else if (mime.match(/text\//)) {
      t = 'text';
    }
  } else if (file) {
    if (file.type.match(/image\//)) {
      t = 'image';
    } else if ((file.type.match(/text\//)) || ((new RegExp(re)).test(file.name)) || DebugJS.startsWith(dturlData, xmlHead)) {
      t = 'text';
    }
  }
  return t;
};

DebugJS.KEYCH = {
  Spacebar: ' ',
  Enter: '\n',
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Del: '.'
};
DebugJS.key2ch = function(key) {
  return (DebugJS.KEYCH[key] == undefined ? key : DebugJS.KEYCH[key]);
};
DebugJS.unifySP = function(s) {
  return s.replace(/\s{2,}/g, ' ');
};
DebugJS.delAllSP = function(s) {
  return s.replace(/\s/g, '');
};
DebugJS.delLeadingSP = function(s) {
  return s.replace(/^\s{1,}/, '');
};
DebugJS.delTrailingSP = function(s) {
  return s.replace(/\s+$/, '');
};
DebugJS.delLeadingAndTrailingSP = function(s) {
  s = s.replace(/^\s{1,}/, '');
  s = s.replace(/\s+$/, '');
  return s;
};
DebugJS.delAllNL = function(s) {
  s = s.replace(/\r/g, '');
  s = s.replace(/\n/g, '');
  return s;
};
DebugJS.quoteStr = function(s) {
  return '<span style="color:#0ff">"</span>' + s + '<span style="color:#0ff">"</span>';
};
DebugJS.quoteStrIfNeeded = function(s) {
  s += '';
  if ((s.match(/^\s|^&#x3000/)) || (s.match(/\s$|&#x3000$/))) {
    s = DebugJS.quoteStr(s);
  }
  return s;
};
DebugJS.escEncString = function(s) {
  s = DebugJS.escTags(s);
  s = DebugJS.quoteStr(s);
  return s;
};

DebugJS.styleValue = function(v) {
  var s = v;
  if (typeof s == 'string') {
    s = DebugJS.escTags(s);
    s = DebugJS.quoteStr(s);
  } else {
    s = DebugJS.setStyleIfObjNA(s);
  }
  return s;
};

DebugJS.getDateTime = function(dt) {
  if ((dt == undefined) || (dt === '')) {
    dt = new Date();
  } else if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  var time = dt.getTime();
  var offset = dt.getTimezoneOffset();
  var yyyy = dt.getFullYear();
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var hh = dt.getHours();
  var mi = dt.getMinutes();
  var ss = dt.getSeconds();
  var ms = dt.getMilliseconds();
  var wd = dt.getDay();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  if (hh < 10) hh = '0' + hh;
  if (mi < 10) mi = '0' + mi;
  if (ss < 10) ss = '0' + ss;
  if (ms < 10) {ms = '00' + ms;}
  else if (ms < 100) {ms = '0' + ms;}
  var dateTime = {time: time, offset: offset, yyyy: yyyy, mm: mm, dd: dd, hh: hh, mi: mi, ss: ss, sss: ms, wday: wd};
  return dateTime;
};
DebugJS.getDateTimeIso = function(s) {
  var p = s.split('T');
  var d = p[0];
  var t = p[1];
  var yyyy = d.substr(0, 4);
  var mm = d.substr(4, 2);
  var dd = d.substr(6, 2);
  var hh = (t.substr(0, 2) + '00').substr(0, 2);
  var mi = (t.substr(2, 2) + '00').substr(0, 2);
  var ss = (t.substr(4, 2) + '00').substr(0, 2);
  var sss = (t.substr(7, 3) + '000').substr(0, 3);
  var dt = new Date(yyyy, (mm | 0) - 1, dd, hh, mi, ss, sss);
  return DebugJS.getDateTime(dt);
};
DebugJS.getDateTimeEx = function(s) {
  if (DebugJS.isDateTimeFormatIso(s)) {
    return DebugJS.getDateTimeIso(s);
  }
  if (typeof s == 'string') {
    s = s.replace(/-/g, '/');
    var dec = s.split('.');
    if (dec.length > 0) s = dec[0];
    s = (new Date(s)).getTime();
    if (dec.length > 0) s += (dec[1] | 0);
  }
  return DebugJS.getDateTime(s);
};
DebugJS.date = function(val, iso) {
  val += '';
  val = DebugJS.delLeadingAndTrailingSP(val);
  var s = null;
  var dt;
  if ((val == '') || isNaN(val)) {
    if (DebugJS.isDateTimeFormatIso(val)) {
      dt = DebugJS.getDateTimeIso(val);
    } else {
      val = val.replace(/(\d{4})-(\d{1,})-(\d{1,})/g, '$1/$2/$3');
      dt = DebugJS.getDateTime(val);
    }
    var tm = dt.time;
    if (!isNaN(tm)) {
      if (iso) {
        s = DebugJS.date(tm, iso);
      } else {
        s = DebugJS.date(tm) + ' (' + tm + ')';
      }
    }
  } else {
    val = DebugJS.parseInt(val);
    dt = DebugJS.getDateTime(val);
    if (iso) {
      s = DebugJS.getDateTimeStrIso(dt);
    } else {
      s = DebugJS.convDateTimeStr(dt) + ' ' + DebugJS.getTimeOffsetStr(dt.offset);
    }
  }
  return s;
};
DebugJS.diffDate = function(d1, d2) {
  var dt1 = DebugJS.getDateTime(d1);
  var dt2 = DebugJS.getDateTime(d2);
  return (dt2.time - dt1.time) / 86400000;
};
DebugJS.isDateFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}';
  if (!p) {r += '$';}
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.isBasicDateFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[0-1][0-9][0-3][0-9]';
  if (!p) {r += '$';}
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.isDateTimeFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2} {1,}\\d{1,2}:\\d{2}:?\\d{0,2}\.?\\d{0,3}';
  if (!p) {r += '$';}
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.isDateTimeFormatIso = function(s, p) {
  if (typeof s != 'string') return false;
  var r = '^\\d{8}T\\d{0,6}\.?\\d{0,3}';
  if (!p) {r += '$';}
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.isTimeFormat = function(s) {
  return ((s.match(/^\d{8}T\d{4,6}$/)) || (s.match(/^T\d{4,6}$/)));
};
DebugJS.num2date = function(s) {
  var d = null;
  if (DebugJS.isBasicDateFormat(s)) {
    d = s.substr(0, 4) + '/' + s.substr(4, 2) + '/' + s.substr(6, 2);
  }
  return d;
};
DebugJS.today = function(s) {
  return DebugJS.convDateStr(DebugJS.getDateTime(), (s === undefined ? '-' : s));
};
DebugJS.convDateTimeStr = function(d) {
  return (d.yyyy + '-' + d.mm + '-' + d.dd + ' ' + DebugJS.WDAYS[d.wday] + ' ' + d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss);
};
DebugJS.getDateTimeStrIso = function(d) {
  return (d.yyyy + d.mm + d.dd + 'T' + d.hh + d.mi + d.ss + '.' + d.sss);
};
DebugJS.convDateStr = function(d, s) {
  return d.yyyy + s + d.mm + s + d.dd;
};
DebugJS.convTimeStr = function(d) {
  return d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
};
DebugJS.getTimeStr = function(t) {
  var d = DebugJS.getDateTime(t);
  return d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
};
DebugJS.getDateTimeStr = function(t) {
  var d = DebugJS.getDateTime(t);
  return d.yyyy + '-' + d.mm + '-' + d.dd + ' ' + d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
};
DebugJS.getTimerStr = function(ms) {
  var tm = DebugJS.ms2struct(ms, true);
  return tm.hh + ':' + tm.mi + ':' + tm.ss + '.' + tm.sss;
};
DebugJS.ms2struct = function(ms, fmt) {
  var wk = ms;
  var sign = false;
  if (ms < 0) {
    sign = true;
    wk *= (-1);
  }
  var d = (wk / 86400000) | 0;
  var hh = 0;
  if (wk >= 3600000) {
    hh = (wk / 3600000) | 0;
    wk -= (hh * 3600000);
  }
  var mi = 0;
  if (wk >= 60000) {
    mi = (wk / 60000) | 0;
    wk -= (mi * 60000);
  }
  var ss = (wk / 1000) | 0;
  var sss = wk - (ss * 1000);
  var tm = {
    sign: sign,
    d: d,
    hr: hh - d * 24,
    hh: hh,
    mi: mi,
    ss: ss,
    sss: sss
  };
  if (fmt) {
    if (tm.hh < 10) tm.hh = '0' + tm.hh;
    if (tm.mi < 10) tm.mi = '0' + tm.mi;
    if (tm.ss < 10) tm.ss = '0' + tm.ss;
    if (tm.sss < 10) {
      tm.sss = '00' + tm.sss;
    } else if (tm.sss < 100) {
      tm.sss = '0' + tm.sss;
    }
  }
  return tm;
};
DebugJS.timestr2struct = function(str) {
  var wk = str.split(':');
  var h = wk[0];
  var mi = (wk[1] == undefined ? '' : wk[1]);
  var s = (wk[2] == undefined ? '' : wk[2]);
  var ss = s.split('.')[0];
  var sss = s.split('.')[1];
  if (sss == undefined) sss = '';
  mi = DebugJS.nan2zero(mi);
  ss = DebugJS.nan2zero(ss);
  sss = DebugJS.nan2zero(sss);
  var st = {
    hh: DebugJS.nan2zero(h),
    mi: ('00' + mi).slice(-2),
    ss: ('00' + ss).slice(-2),
    sss: ('000' + sss).slice(-3)
  };
  return st;
};
DebugJS.getTimeOffsetStr = function(v, e) {
  var s = '-';
  if (v <= 0) {
    v *= (-1);
    s = '+';
  }
  var h = (v / 60) | 0;
  var m = v - h * 60;
  var str = s + ('0' + h).slice(-2) + (e ? ':' : '') + ('0' + m).slice(-2);
  return str;
};
DebugJS.getTimeDurationStr = function(t1, t2) {
  var dec;
  if (isNaN(t1)) t1 = DebugJS.getDateTimeEx(t1).time;
  var ms = t1;
  if (t2 != undefined) {
    if (isNaN(t2)) t2 = DebugJS.getDateTimeEx(t2).time;
    ms = t2 - t1;
  }
  var s = '';
  var t = DebugJS.ms2struct(ms);
  if (t.d) s += t.d + 'd ';
  if (t.d || t.hr) s += t.hr + 'h ';
  if (t.d || t.hr || t.mi) s += t.mi + 'm ';
  if (t.d || t.hr || t.mi || t.ss) {
    s += t.ss + 's';
    if (t.sss) s += ' ' + t.sss + 'ms';
  } else {
    if (!t.sss) {
      s = '0';
    } else {
      s = '0.' + ('00' + t.sss).slice(-3).replace(/0+$/, '');
    }
    s += 's';
  }
  return s;
};
DebugJS.calcTargetTime = function(tgt) {
  var yyyy, mm, dd, t1;
  var now = DebugJS.getDateTime();
  var dt = tgt.split('T');
  var date = dt[0];
  var t = dt[1];
  var hh = t.substr(0, 2);
  var mi = t.substr(2, 2);
  var ss = t.substr(4, 2);
  if (ss == '') ss = '00';
  if (date == '') {
    yyyy = now.yyyy;
    mm = now.mm;
    dd = now.dd;
    var tgt = DebugJS.getDateTime(now.yyyy + '/' + now.mm + '/' + now.dd + ' ' + hh + ':' + mi + ':' + ss);
    if (now.time > tgt.time) {
      t1 = tgt.time + 86400000;
    } else {
      t1 = tgt.time;
    }
  } else {
    yyyy = date.substr(0, 4);
    mm = date.substr(4, 2);
    dd = date.substr(6, 2);
    var sd = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + ss;
    t1 = (new Date(sd)).getTime();
  }
  return (t1 - now.time);
};
DebugJS.calcNextTime = function(times) {
  var now = DebugJS.getDateTime();
  ts = times.split('|');
  ts.sort();
  var ret = {t: ts[0]};
  var yyyy = now.yyyy;
  var mm = now.mm;
  var dd = now.dd;
  for (var i = 0; i < ts.length; i++) {
    var t = ts[i];
    t = t.replace(/T/, '');
    var hh = t.substr(0, 2);
    var mi = t.substr(2, 2);
    var ss = t.substr(4, 2);
    if (ss == '') ss = '00';
    var tgt = DebugJS.getDateTime(now.yyyy + '/' + now.mm + '/' + now.dd + ' ' + hh + ':' + mi + ':' + ss);
    if (i == 0) ret.time = tgt.time;
    if (now.time <= tgt.time) {
      ret.t = ts[i];
      ret.time = tgt.time;
      return ret;
    }
  }
  ret.t = ts[0];
  ret.time += 86400000;
  return ret;
};
DebugJS.parseToMillis = function(v) {
  var d = 0, h = 0, m = 0, s = 0;
  var a = v.split('d');
  if (a.length > 1) {
    d = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  var a = v.split('h');
  if (a.length > 1) {
    h = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  var a = v.split('m');
  if (a.length > 1) {
    m = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  var a = v.split('s');
  if (a.length > 1) {
    s = a[0];
  }
  return (d * 86400000 + h * 3600000 + m * 60000 + s * 1000) | 0;
};

DebugJS.nan2zero = function(v) {
  return (isNaN(v) ? 0 : v);
};

DebugJS.checkModKey = function(e) {
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var meta = e.metaKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var metaKey = '<span style="color:' + shift + '">S</span><span style="color:' + ctrl + '">C</span><span style="color:' + alt + '">A</span><span style="color:' + meta + '">M</span>';
  return metaKey;
};

DebugJS.execCmdP = function(arg) {
  var args = arg.split(' ');
  var opt = args[0].match(/-l(\d+)/);
  var start = 0;
  var levelLimit = 0;
  var noMaxLimit = false;
  var valLenLimit = DebugJS.ctx.props.dumpvallen;
  if (opt != null) {
    start = 1;
    levelLimit = opt[1];
  } else {
    if (args[0] == '-a') {
      start = 1;
      noMaxLimit = true;
    }
  }
  var obj = DebugJS.getArgsFrom(arg, start);
  var cmd = 'DebugJS.buf=DebugJS.objDump(' + obj + ', false, ' + levelLimit + ', ' + noMaxLimit + ', ' + valLenLimit + ');' +
            'DebugJS._log.mlt(DebugJS.buf);';
  try {
    eval(cmd);
  } catch (e) {
    DebugJS._log.e(e);
  }
};

DebugJS.INDENT_SP = ' ';
DebugJS.objDump = function(obj, toJson, levelLimit, noMaxLimit, valLenLimit) {
  if (levelLimit == undefined) {
    levelLimit = 0;
  }
  var arg = {lv: 0, cnt: 0, dump: ''};
  if (typeof obj === 'function') {
    arg.dump += (toJson ? 'function' : '<span style="color:#4c4">function</span>') + '()\n';
  }
  var ret = DebugJS._objDump(obj, arg, toJson, levelLimit, noMaxLimit, valLenLimit);
  if ((!noMaxLimit) && (ret.cnt >= DebugJS.ctx.props.dumplimit)) {
    DebugJS._log.w('The object is too large. (>=' + ret.cnt + ')');
  }
  ret.dump = ret.dump.replace(/: {2,}\{/g, ': {');
  ret.dump = ret.dump.replace(/\[\n {2,}\]/g, '\[\]');
  return ret.dump;
};
DebugJS._objDump = function(obj, arg, toJson, levelLimit, noMaxLimit, valLenLimit) {
  var SNIP = '<span style="color:#aaa">...</span>';
  var sibling = 0;
  try {
    if ((levelLimit >= 1) && (arg.lv > levelLimit)) {
      return arg;
    }
    if ((!noMaxLimit) && (arg.cnt >= DebugJS.ctx.props.dumplimit)) {
      if ((typeof obj !== 'function') || (Object.keys(obj).length > 0)) {
        arg.dump += SNIP; arg.cnt++;
      }
      return arg;
    }
    var indent = '';
    for (var i = 0; i < arg.lv; i++) {
      indent += DebugJS.INDENT_SP;
    }
    if ((obj instanceof Array) || (obj instanceof Set)) {
      arg.cnt++;
      var len = ((obj instanceof Set) ? obj.size : obj.length);
      if (toJson) {
        arg.dump += '[';
        if (len > 0) {
          arg.dump += '\n';
        }
      } else {
        if (obj instanceof Set) {
          arg.dump += '<span style="color:#6cf">[Set][' + len + ']</span>';
        } else {
          arg.dump += '<span style="color:#e4b">[Array][' + len + ']</span>';
        }
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        var avil = true;
        for (i = 0; i < len; i++) {
          arg.lv++; indent += DebugJS.INDENT_SP;
          v = obj[i];
          if (obj instanceof Set) {
            try {
              var it = obj.entries();
              for (var j = 0; j <= i; j++) {
                v = it.next().value[0];
              }
            } catch (e) {avil = false;}
          }
          if (toJson) {
            if (sibling > 0) {
              arg.dump += ',\n';
            }
            if ((typeof v == 'number') || (typeof v == 'string') || (typeof v == 'boolean') || (v instanceof Array)) {
              arg.dump += indent;
            }
          } else {
            arg.dump += '\n' + indent + '[' + i + '] ';
          }
          if (avil) {
            arg = DebugJS._objDump(v, arg, toJson, levelLimit, noMaxLimit, valLenLimit);
          } else {
            arg.dump += 'N/A';
          }
          arg.lv--; indent = indent.replace(DebugJS.INDENT_SP, '');
          sibling++;
        }
      }
      if (toJson) {
        if (sibling > 0) {
          arg.dump += '\n';
        }
        if (len > 0) {
          if ((levelLimit >= 1) && (arg.lv >= levelLimit)) {
            arg.dump += indent + DebugJS.INDENT_SP + SNIP + '\n';
          }
          arg.dump += indent;
        }
        arg.dump += ']';
      }
    } else if (obj instanceof Object) {
      arg.cnt++;
      if ((typeof obj !== 'function') &&
          (Object.prototype.toString.call(obj) !== '[object Date]') &&
          ((window.ArrayBuffer) && !(obj instanceof ArrayBuffer))) {
        if (toJson) {
          arg.dump += indent;
        } else {
          arg.dump += '<span style="color:#49f">[Object]</span> ';
        }
        if ((toJson) || (levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
          arg.dump += '{\n';
        }
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        indent += DebugJS.INDENT_SP;
        for (var key in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',';
            }
            arg.dump += '\n';
          }
          if (typeof obj[key] === 'function') {
            arg.dump += indent + (toJson ? 'function' : '<span style="color:#4c4">function</span>');
            if (obj[key].toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
            arg.dump += ' ' + DebugJS.escTags(key) + '()';
            arg.cnt++;
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += ' {\n';
              }
            }
          } else if (Object.prototype.toString.call(obj[key]) === '[object Date]') {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += (toJson ? key : DebugJS.escTags(key));
            if (toJson) {arg.dump += '"';}
            var dt = DebugJS.getDateTime(obj[key]);
            var date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj[key].getTime() + ')';
            arg.dump += ': ';
            if (toJson) {
              arg.dump += '"' + obj[key].toISOString() + '"';
            } else {
              arg.dump += '<span style="color:#f80">[Date]</span> ' + date;
            }
            sibling++;
            continue;
          } else if ((window.ArrayBuffer) && (obj[key] instanceof ArrayBuffer)) {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += (toJson ? key : DebugJS.escTags(key));
            if (toJson) {arg.dump += '"';}
            arg.dump += ': ';
            if (toJson) {
              arg.dump += '{}';
            } else {
              arg.dump += '<span style="color:#d4c">[ArrayBuffer]</span> (byteLength = ' + obj[key].byteLength + ')';
            }
            sibling++;
            continue;
          } else {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += (toJson ? key : DebugJS.escTags(key));
            if (toJson) {arg.dump += '"';}
            arg.dump += ': ';
          }
          var hasChildren = false;
          for (var cKey in obj[key]) {
            hasChildren = true;
            break;
          }
          if ((typeof obj[key] !== 'function') || (hasChildren)) {
            arg.lv++;
            arg = DebugJS._objDump(obj[key], arg, toJson, levelLimit, noMaxLimit, valLenLimit);
            arg.lv--;
          }
          if (typeof obj[key] === 'function') {
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += '\n' + indent + '}';
              }
            }
          }
          sibling++;
        }
        var empty = false;
        if (sibling == 0) {
          if (typeof obj === 'function') {
            arg.dump += '<span style="color:#4c4">function</span>()';
            if (obj.toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
          } else if (Object.prototype.toString.call(obj) === '[object Date]') {
            var dt = DebugJS.getDateTime(obj);
            var date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj.getTime() + ')';
            if (toJson) {
              arg.dump += '"' + obj.toISOString() + '"';
            } else {
              arg.dump += '<span style="color:#f80">[Date]</span> ' + date;
            }
          } else if ((window.ArrayBuffer) && (obj instanceof ArrayBuffer)) {
            if (toJson) {
              arg.dump += '{}';
            } else {
              arg.dump += '<span style="color:#d4c">[ArrayBuffer]</span> (byteLength = ' + obj.byteLength + ')';
            }
          } else {
            empty = true;
            arg.dump = arg.dump.replace(/\n$/, '');
            arg.dump += '}';
          }
          arg.cnt++;
        }
        indent = indent.replace(DebugJS.INDENT_SP, '');
        if ((typeof obj !== 'function') &&
            (Object.prototype.toString.call(obj) !== '[object Date]') &&
            ((window.ArrayBuffer) && !(obj instanceof ArrayBuffer) && (!empty))) {
          arg.dump += '\n' + indent + '}';
        }
      }
      if ((toJson) && (levelLimit >= 1) && (arg.lv >= levelLimit)) {
        arg.dump += indent + DebugJS.INDENT_SP + SNIP + '\n' + indent + '}';
      }
    } else if (obj === null) {
      if (toJson) {
        arg.dump += 'null';
      } else {
        arg.dump += '<span style="color:#ccc">null</span>';
      }
      arg.cnt++;
    } else if (obj === undefined) {
      if (toJson) {
        arg.dump += 'undefined';
      } else {
        arg.dump += '<span style="color:#ccc">undefined</span>';
      }
      arg.cnt++;
    } else if (typeof obj == 'string') {
      var str;
      if ((valLenLimit > 0) && (obj.length > valLenLimit)) {
        str = obj.substr(0, valLenLimit);
        if (toJson) {
          str += '...';
        } else {
          str = DebugJS.escTags(str) + SNIP;
        }
      } else {
        str = (toJson ? obj : DebugJS.escTags(obj));
      }
      str = str.replace(/\\/g, '\\\\');
      if (toJson) {
        str = str.replace(/\n/g, '\\n');
        str = str.replace(/\r/g, '\\r');
      } else {
        str = DebugJS.hlCtrlChr(str);
      }
      arg.dump += (toJson ? '"' + str.replace(/\"/g, '\\"') + '"' : DebugJS.quoteStr(str));
      arg.cnt++;
    } else {
      arg.dump += obj; arg.cnt++;
    }
  } catch (e) {
    arg.dump += '<span style="color:#f66">parse error: ' + e + '</span>'; arg.cnt++;
  }
  return arg;
};

DebugJS.getKeys = function(o) {
  var keys = [];
  for (var k in o) {
    keys.push(k);
  }
  return keys;
};
DebugJS.getKeysStr = function(o) {
  var keys = '';
  for (var k in o) {
    keys += k + '\n';
  }
  return keys;
};

DebugJS.countElements = function(selector, showDetail) {
  if (!selector) selector = '*';
  var cnt = {};
  var el = null;
  var els = [];
  var total = 0;
  if (selector.charAt(0) == '#') {
    el = document.getElementById(selector.substr(1));
  } else {
    if (selector.charAt(0) == '(') {
      selector = selector.substr(1, selector.length - 2);
    }
    els = document.querySelectorAll(selector);
  }
  if (el) {
    DebugJS.getChildElements(el, els);
  }
  if (els) {
    for (var i = 0; i < els.length; i++) {
      if (!cnt[els[i].tagName]) {
        cnt[els[i].tagName] = 1;
      } else {
        cnt[els[i].tagName]++;
      }
      total++;
    }
  }
  if (showDetail) {
    var l = '<table>';
    for (var key in cnt) {
      l += '<tr><td>' + key + '</td><td style="text-align:right">' + cnt[key] + '</td></tr>';
    }
    l += '<tr><td>Total</td><td style="text-align:right">' + total + '</td></tr></table>';
    DebugJS._log.mlt(l);
  }
  return total;
};
DebugJS.getChildElements = function(el, list) {
  if (!el.tagName) return;
  list.push(el);
  var children = el.childNodes;
  if (children) {
    for (var i = 0; i < children.length; i++) {
      DebugJS.getChildElements(children[i], list);
    }
  }
};
DebugJS.isDescendant = function(el, t) {
  if (el) {
    var p = el.parentNode;
    while (p) {
      if (p == t) {
        return true;
      }
      p = p.parentNode;
    }
  }
  return false;
};
DebugJS.isChild = function(p, el) {
  if (el) {
    var c = p.childNodes;
    for (var i = 0; i < c.length; i++) {
      if (c[i] == el) return true;
    }
  }
  return false;
};

DebugJS.getHTML = function(b64) {
  var ctx = DebugJS.ctx;
  var el = document.getElementsByTagName('html').item(0);
  var cmdActive = false;
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    cmdActive = (document.activeElement == ctx.cmdLine);
    ctx.bodyEl.removeChild(ctx.win);
  }
  var html = el.outerHTML;
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    ctx.bodyEl.appendChild(ctx.win);
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    if (cmdActive) ctx.cmdLine.focus();
  }
  if (b64) {
    html = DebugJS.encodeBase64(html);
  }
  return html;
};

DebugJS.execCmdJson = function(json, flg, lv) {
  try {
    var j = JSON.parse(json);
    var valLen = DebugJS.ctx.props.dumpvallen;
    var jsn = DebugJS.objDump(j, flg, lv, false, valLen);
    if (flg) jsn = DebugJS.escTags(jsn);
    DebugJS._log.mlt(jsn);
    return jsn;
  } catch (e) {
    DebugJS._log.e('JSON format error.');
    var detail = DebugJS.checkJson(json);
    DebugJS._log.e(detail);
  }
};
DebugJS.checkJson = function(json) {
  var ctx = DebugJS.ctx;
  json = DebugJS.delLeadingAndTrailingSP(json);
  var wkJson = json.split('\\');
  var cnt = 0;
  var res = '';
  for (var i = 0; i < wkJson.length; i++) {
    if (wkJson[i] == '') {
      cnt++;
    } else {
      if (i == 0) {
        res += wkJson[i];
        continue;
      }
      if (cnt >= 1) {
        res += '\\';
        for (var j = 0; j < (cnt - 1); j++) {
          res += '\\';
        }
        if (cnt % 2 == 0) {
          res += '<span class="' + ctx.id + '-txt-hl">\\</span>';
        } else {
          res += '\\';
        }
        res += wkJson[i];
        cnt = 0;
      } else {
        if (wkJson[i].match(/^n|^r|^t|^b|^"/)) {
          res += '\\' + wkJson[i];
        } else {
          res += '<span class="' + ctx.id + '-txt-hl">\\</span>' + wkJson[i];
        }
      }
    }
  }
  res = res.replace(/\t/g, '<span class="' + ctx.id + '-txt-hl">\\t</span>');
  res = res.replace(/\r\n/g, '<span class="' + ctx.id + '-txt-hl">\\r\\n</span>');
  res = res.replace(/([^\\])\r/g, '$1<span class="' + ctx.id + '-txt-hl">\\r</span>');
  res = res.replace(/([^\\])\n/g, '$1<span class="' + ctx.id + '-txt-hl">\\n</span>');
  if (!res.match(/^{/)) {
    res = '<span class="' + ctx.id + '-txt-hl"> </span>' + res;
  }
  res = res.replace(/}([^}]+)$/, '}<span class="' + ctx.id + '-txt-hl">$1</span>');
  if (!res.match(/}$/)) {
    res = res + '<span class="' + ctx.id + '-txt-hl"> </span>';
  }
  return res;
};
DebugJS.fromJSON = function(j, r) {
  return JSON.parse(j, r);
};
DebugJS.toJSON = function(o, r, s) {
  return JSON.stringify(o, r, s);
};
DebugJS.obj2json = function(o) {
  return DebugJS.objDump(o, true, 0, true, 0);
};

DebugJS.digits = function(x) {
  var d = 0;
  if (x == 0) {
    d = 1;
  } else {
    while (x != 0) {
      x = (x / 10) | 0; d++;
    }
  }
  return d;
};

DebugJS.parseInt = function(v) {
  var rdx = DebugJS.checkRadix(v);
  if (rdx == 10) {
    return parseInt(v, 10);
  } else if (rdx == 16) {
    return parseInt(v, 16);
  } else if (rdx == 2) {
    v = v.substr(2);
    return parseInt(v, 2);
  }
  return 0;
};

DebugJS.checkRadix = function(v) {
  if (v.match(/^\-{0,1}[0-9,]+$/)) {
    return 10;
  } else if (v.match(/^\-{0,1}0x[0-9A-Fa-f]+$/)) {
    return 16;
  } else if (v.match(/^\-{0,1}0b[01\s]+$/)) {
    return 2;
  } else {
    return 0;
  }
};

DebugJS.arr2set = function(a, f) {
  var s = [];
  for (var i = 0; i < a.length; i++) {
    var v = a[i];
    if (DebugJS.findArrVal(s, v, f) < 0) {
      s.push(v);
    }
  }
  return s;
};
DebugJS.findArrVal = function(a, v, f) {
  var r = -1;
  for (var i = 0; i < a.length; i++) {
    if ((!f && (a[i] == v)) || (f && (a[i] === v))) {
      r = i;
      break;
    }
  }
  return r;
};
DebugJS.countArrVal = function(a, v, f) {
  var c = 0;
  for (var i = 0; i < a.length; i++) {
    if ((!f && (a[i] == v)) || (f && (a[i] === v))) {
      c++;
    }
  }
  return c;
};

DebugJS.printUsage = function(m) {
  DebugJS._log('Usage: ' + m);
};

DebugJS.convRGB = function(v) {
  var ret, rgb;
  if (v.indexOf('#') == 0) {
    rgb = DebugJS.convRGB16to10(v);
    ret = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
  } else {
    v = v.replace(/rgb\(/, '');
    v = v.replace(/\)/, '');
    v = v.replace(/,/g, ' ');
    v = DebugJS.delLeadingAndTrailingSP(v);
    v = DebugJS.unifySP(v);
    rgb = DebugJS.convRGB10to16(v);
    ret = '#' + rgb.r + rgb.g + rgb.b;
  }
  DebugJS._log(rgb.rgb);
  return ret;
};
DebugJS.convRGB16to10 = function(rgb16) {
  var boxSize = '0.7em';
  var r16, g16, b16, r10, g10, b10;
  rgb16 = rgb16.replace(/\s/g, '');
  if (rgb16.length == 7) {
    r16 = rgb16.substr(1, 2);
    g16 = rgb16.substr(3, 2);
    b16 = rgb16.substr(5, 2);
  } else if (rgb16.length == 4) {
    r16 = rgb16.substr(1, 1);
    g16 = rgb16.substr(2, 1);
    b16 = rgb16.substr(3, 1);
    r16 += r16;
    g16 += g16;
    b16 += b16;
  } else {
    return {rgb: '<span style="color:' + DebugJS.ctx.opt.logColorE + '">invalid value</span>'};
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  var rgb = {r: r10, g: g10, b: b10, rgb: rgb10};
  return rgb;
};
DebugJS.convRGB10to16 = function(rgb10) {
  var boxSize = '0.7em';
  rgb10 = DebugJS.unifySP(rgb10);
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return {rgb: '<span style="color:' + DebugJS.ctx.opt.logColorE + '">invalid value</span>'};
  }
  var r16 = ('0' + parseInt(rgb10s[0]).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(rgb10s[1]).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(rgb10s[2]).toString(16)).slice(-2);
  if ((r16.charAt(0) == r16.charAt(1)) && (g16.charAt(0) == g16.charAt(1)) && (b16.charAt(0) == b16.charAt(1))) {
    r16 = r16.substring(0, 1);
    g16 = g16.substring(0, 1);
    b16 = b16.substring(0, 1);
  }
  var rgb16 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:#' + r16 + g16 + b16 + ';width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  var rgb = {r: r16, g: g16, b: b16, rgb: rgb16};
  return rgb;
};

DebugJS.convRadixFromHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  if (v10 > 0xffffffff) {
    var v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.convRadixFromDEC = function(v10) {
  var unit = DebugJS.DFLT_UNIT;
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  var v16 = parseInt(v10).toString(16);
  if (v10 < 0) {
    var v2 = '';
    for (var i = (unit - 1); i >= 0; i--) {
      v2 += (v10 & 1 << i) ? '1' : '0';
    }
    v16 = parseInt(v2, 2).toString(16);
  } else if (v10 > 0xffffffff) {
    var v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.convRadixFromBIN = function(v2) {
  v2 = v2.replace(/\s/g, '');
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  if (v10 > 0xffffffff) {
    v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.printRadixConv = function(v10, hex, bin) {
  var rdx = DebugJS.ctx.props.radix;
  var s = '';
  if (DebugJS.hasKeyWd(rdx, 'dec', '|')) s += 'DEC ' + DebugJS.formatDec(v10) + '\n';
  if (DebugJS.hasKeyWd(rdx, 'hex', '|')) s += 'HEX ' + hex + '\n';
  if (DebugJS.hasKeyWd(rdx, 'bin', '|')) s += 'BIN ' + bin + '\n';
  DebugJS._log.mlt(s);
};
DebugJS.toBin = function(v) {
  return ('0000000' + v.toString(2)).slice(-8);
};
DebugJS.toHex = function(v, uc, pFix, d) {
  var hex = parseInt(v).toString(16);
  return DebugJS.formatHex(hex, uc, pFix, d);
};
DebugJS.convertBin = function(data) {
  var digit = data.digit;
  if (digit == 0) {
    digit = DebugJS.DFLT_UNIT;
  }
  var val;
  try {
    val = eval(data.exp);
  } catch (e) {
    DebugJS._log.e('Invalid value: ' + e);
    return;
  }
  var v2 = parseInt(val).toString(2);
  var v2len = v2.length;
  var loop = ((digit > v2len) ? digit : v2len);
  v2 = '';
  for (var i = (loop - 1); i >= 0; i--) {
    v2 += (val & 1 << i) ? '1' : '0';
  }
  var ret = v2;
  var hldigit = v2len;
  var overflow = false;
  if (val < 0) {
    hldigit = digit;
  } else if ((data.digit > 0) && (v2len > data.digit)) {
    overflow = true;
    hldigit = data.digit;
  }
  ret = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD, hldigit, overflow);
  return ret;
};
DebugJS.formatBin = function(v2, grouping, n, highlight, overflow) {
  var len = v2.length;
  var bin = '';
  if (grouping) {
    if ((highlight > 0) && (len > highlight)) {
      bin += '<span style="color:#888">';
    }
    for (var i = 0; i < len; i++) {
      if ((i != 0) && ((len - i) % 4 == 0)) {
        bin += ' ';
      }
      bin += v2.charAt(i);
      if ((highlight > 0) && ((len - i) == (highlight + 1))) {
        bin += '</span>';
      }
    }
  } else {
    bin = v2;
  }
  if (n) {
    if (len >= n) {
      var digits = len;
      if (overflow == false) {
        digits = highlight;
      }
      bin += ' (' + digits + ' bits)';
    }
  }
  return bin;
};
DebugJS.formatDec = function(v10) {
  v10 += '';
  var len = v10.length;
  var dec = '';
  for (var i = 0; i < len; i++) {
    if ((i != 0) && ((len - i) % 3 == 0)) {
      if (!((i == 1) && (v10.charAt(0) == '-'))) {
        dec += ',';
      }
    }
    dec += v10.charAt(i);
  }
  return dec;
};
DebugJS.formatHex = function(hex, uc, pFix, d) {
  if (uc) hex = hex.toUpperCase();
  if ((d) && (hex.length < d)) {
    hex = (DebugJS.repeatCh('0', d) + hex).slice(d * (-1));
  }
  if (pFix) hex = '0x' + hex;
  return hex;
};

DebugJS.bit8 = {};
DebugJS.bit8.rotateL = function(v, n) {
  n = n % 8;
  return ((v << n) | (v >> (8 - n))) & 255;
};
DebugJS.bit8.rotateR = function(v, n) {
  n = n % 8;
  return ((v >> n) | (v << (8 - n))) & 255;
};
DebugJS.bit8.invert = function(v) {
  return (~v) & 255;
};

DebugJS.UTF8 = {};
DebugJS.UTF8.toByte = function(s) {
  var a = [];
  if (!s) return a;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    if (c <= 0x7F) {
      a.push(c);
    } else if (c <= 0x07FF) {
      a.push(((c >> 6) & 0x1F) | 0xC0);
      a.push((c & 0x3F) | 0x80);
    } else {
      a.push(((c >> 12) & 0x0F) | 0xE0);
      a.push(((c >> 6) & 0x3F) | 0x80);
      a.push((c & 0x3F) | 0x80);
    }
  }
  return a;
};
DebugJS.UTF8.fmByte = function(a) {
  if (!a) return null;
  var s = '';
  var i, c;
  while (i = a.shift()) {
    if (i <= 0x7F) {
      s += String.fromCharCode(i);
    } else if (i <= 0xDF) {
      c = ((i & 0x1F) << 6);
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    } else if (i <= 0xE0) {
      c = ((a.shift() & 0x1F) << 6) | 0x800;
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    } else {
      c = ((i & 0x0F) << 12);
      c += (a.shift() & 0x3F) << 6;
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    }
  }
  return s;
};

DebugJS.encodeBase64 = function(s) {
  if (!window.btoa) return '';
  var ret = '';
  try {
    ret = btoa(s);
  } catch (e) {
    ret = btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  return ret;
};
DebugJS.decodeBase64 = function(s, q) {
  if (!window.atob) return '';
  var ret = '';
  try {
    ret = decodeURIComponent(Array.prototype.map.call(atob(s), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    try {
      ret = atob(s);
    } catch (e) {
      if (!q) DebugJS._log.e('decodeBase64(): ' + e);
    }
  }
  return ret;
};
DebugJS.Base64 = {};
DebugJS.Base64.encode = function(arr) {
  var len = arr.length;
  if (len == 0) return '';
  var tbl = {64: 61, 63: 47, 62: 43};
  for (var i = 0; i < 62; i++) {
    tbl[i] = (i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4));
  }
  var str = '';
  for (i = 0; i < len; i += 3) {
    str += String.fromCharCode(
      tbl[arr[i] >>> 2],
      tbl[(arr[i] & 3) << 4 | arr[i + 1] >>> 4],
      tbl[(i + 1) < len ? (arr[i + 1] & 15) << 2 | arr[i + 2] >>> 6 : 64],
      tbl[(i + 2) < len ? (arr[i + 2] & 63) : 64]
    );
  }
  return str;
};
DebugJS.Base64.decode = function(str) {
  var arr = [];
  if (str.length == 0) return arr;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (!(((c >= 0x30) && (c <= 0x39)) || ((c >= 0x41) && (c <= 0x5A)) || ((c >= 0x61) && (c <= 0x7A)) || (c == 0x2B) || (c == 0x2F) || (c == 0x3D))) {
      DebugJS._log.e('invalid b64 char: 0x' + c.toString(16).toUpperCase() + ' at ' + i);
      return arr;
    }
  }
  var tbl = {61: 64, 47: 63, 43: 62};
  for (i = 0; i < 62; i++) {
    tbl[i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4)] = i;
  }
  var buf = [];
  for (i = 0; i < str.length; i += 4) {
    for (var j = 0; j < 4; j++) {
      buf[j] = tbl[str.charCodeAt(i + j) || 0];
    }
    arr.push(
      buf[0] << 2 | (buf[1] & 63) >>> 4,
      (buf[1] & 15) << 4 | (buf[2] & 63) >>> 2,
      (buf[2] & 3) << 6 | buf[3] & 63
    );
  }
  if (buf[3] == 64) {
    arr.pop();
    if (buf[2] == 64) {
      arr.pop();
    }
  }
  return arr;
};

DebugJS.encodeBSB64 = function(s, n, toR) {
  var a = DebugJS.UTF8.toByte(s);
  return DebugJS.BSB64.encode(a, n, toR);
};
DebugJS.decodeBSB64 = function(s, n, toR) {
  var a = DebugJS.BSB64.decode(s, n, (toR ? false : true));
  return DebugJS.UTF8.fmByte(a);
};
DebugJS.BSB64 = {};
DebugJS.BSB64.encode = function(a, n, toR) {
  var fn = (toR ? DebugJS.bit8.rotateR : DebugJS.bit8.rotateL);
  if (n % 8 == 0) fn = DebugJS.bit8.invert;
  var b = [];
  for (var i = 0; i < a.length; i++) {
    b.push(fn(a[i], n));
  }
  return DebugJS.Base64.encode(b);
};
DebugJS.BSB64.decode = function(s, n, toR) {
  var fn = (toR ? DebugJS.bit8.rotateR : DebugJS.bit8.rotateL);
  if (n % 8 == 0) fn = DebugJS.bit8.invert;
  var b = DebugJS.Base64.decode(s);
  var a = [];
  for (var i = 0; i < b.length; i++) {
    a.push(fn(b[i], n));
  }
  return a;
};

DebugJS.encodeROT5 = function(s, n) {
  if ((n < -9) || (n > 9)) n = n % 10;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if (DebugJS.isNumeric(c)) {
      cc += n;
      if (cc > 0x39) {
        cc = 0x2F + (cc - 0x39);
      } else if (cc < 0x30) {
        cc = 0x3A - (0x30 - cc);
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT5 = function(s, n) {
  return DebugJS.encodeROT5(s, ((n | 0) * (-1)));
};
DebugJS.encodeROT13 = function(s, n) {
  if ((n < -25) || (n > 25)) n = n % 26;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if (DebugJS.isAlphabetic(c)) {
      cc += n;
      if (DebugJS.isUpperCase(c)) {
        if (cc > 0x5A) {
          cc = 0x40 + (cc - 0x5A);
        } else if (cc < 0x41) {
          cc = 0x5B - (0x41 - cc);
        }
      } else if (DebugJS.isLowerCase(c)) {
        if (cc > 0x7A) {
          cc = 0x60 + (cc - 0x7A);
        } else if (cc < 0x61) {
          cc = 0x7B - (0x61 - cc);
        }
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT13 = function(s, n) {
  return DebugJS.encodeROT13(s, ((n | 0) * (-1)));
};
DebugJS.encodeROT47 = function(s, n) {
  if ((n < -93) || (n > 93)) n = n % 94;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if ((cc >= 0x21) && (cc <= 0x7E)) {
      if (n < 0) {
        cc += n;
        if (cc < 0x21) cc = 0x7F - (0x21 - cc);
      } else {
        cc = ((cc - 0x21 + n) % 94) + 0x21;
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT47 = function(s, n) {
  return DebugJS.encodeROT47(s, ((n | 0) * (-1)));
};

DebugJS.buildDataUrl = function(scheme, data) {
  scheme = scheme.replace(/,$/, '');
  return scheme + ',' + data;
};
DebugJS.splitDataUrl = function(dturl) {
  var a = dturl.split(',');
  var b64ctt = {
    scheme: a[0],
    data: (a[1] == undefined ? '' : a[1])
  };
  return b64ctt;
};
DebugJS.str2binArr = function(str, blkSize, pFix) {
  var arr = [];
  for (var i = 0; i < str.length; i += blkSize) {
    var v = str.substr(i, blkSize);
    if (v.length == blkSize) {
      arr.push(DebugJS.parseInt(pFix + v));
    }
  }
  return arr;
};

DebugJS.decodeUnicode = function(arg) {
  var str = '';
  var a = arg.split(' ');
  for (var i = 0; i < a.length; i++) {
    if (a[i] == '') continue;
    var codePoint = a[i].replace(/^U\+/i, '');
    if (codePoint == '20') {
      str += ' ';
    } else {
      str += '&#x' + codePoint;
    }
  }
  return str;
};
DebugJS.getUnicodePoints = function(str) {
  var code = '';
  for (var i = 0; i < str.length; i++) {
    var point = str.charCodeAt(i);
    if (i > 0) {
      code += ' ';
    }
    code += 'U+' + DebugJS.toHex(point, true, '', 4);
  }
  return code;
};

DebugJS.decodeUri = function(s) {
  return decodeURIComponent(s);
};
DebugJS.encodeUri = function(s) {
  return encodeURIComponent(s);
};

DebugJS.str2ms = function(t) {
  var hour = min = sec = msec = 0;
  var s = '0';
  var times = t.split(':');
  if (times.length == 3) {
    hour = times[0] | 0;
    min = times[1] | 0;
    s = times[2];
  } else if (times.length == 2) {
    hour = times[0] | 0;
    min = times[1] | 0;
  } else {
    return null;
  }
  var ss = s.split('.');
  sec = ss[0] | 0;
  if (ss.length >= 2) {
    msec = ss[1] | 0;
  }
  var time = (hour * 3600000) + (min * 60000) + (sec * 1000) + msec;
  return time;
};

DebugJS.subTime = function(tL, tR, byTheDay) {
  var A_DAY = 86400000;
  var res = tL - tR;
  var days = 0;
  if ((res < 0) && (byTheDay)) {
    res *= (-1);
    days = ((res / A_DAY) | 0);
    if (tL == 0) {
      days = days + ((res % A_DAY != 0) ? 1 : 0);
    } else {
      days = days + ((res < A_DAY) ? 1 : 1);
      if ((res % A_DAY == 0) && (res != A_DAY)) {
        days += 1;
      }
    }
    res = A_DAY - (res - days * A_DAY);
  }
  return DebugJS.calcTime(res, days, byTheDay, true);
};

DebugJS.addTime = function(tL, tR, byTheDay) {
  var res = tL + tR;
  var days = 0;
  if (byTheDay) {
    days = (res / 86400000) | 0;
    res -= days * 86400000;
  }
  return DebugJS.calcTime(res, days, byTheDay, false);
};

DebugJS.calcTime = function(res, days, byTheDay, isSub) {
  var t = DebugJS.ms2struct(res);
  var ex = '';
  if (days > 0) {
    ex = ' (' + (isSub ? '-' : '+') + days +
         ' Day' + ((days >= 2) ? 's' : '') + ')';
  }
  var hh = (byTheDay ? t.hr : t.hh);
  if (hh < 10) hh = '0' + hh;
  var ret = (t.sign ? '-' : '') + hh + ':' +
            ('0' + t.mi).slice(-2) + ':' +
            ('0' + t.ss).slice(-2) + '.' + ('00' + t.sss).slice(-3) + ex;
  return ret;
};

DebugJS.timeStart = function(timerName, msg) {
  var ctx = DebugJS.ctx;
  var _timerName = timerName;
  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DFLT_TIMER_NAME;
  }
  ctx.timers[_timerName] = {};
  ctx.timers[_timerName].start = (new Date()).getTime();
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return;
  }
  var s;
  if (msg === undefined) {
    s = _timerName + ': timer started';
  } else {
    s = msg.replace(/%n/g, _timerName).replace(/%t/g, '<span style="color:' + ctx.opt.timerColor + '">' + DebugJS.TIME_RST_STR + '</span>');
  }
  DebugJS._log(s);
};
DebugJS.timeGetCount = function(timerName) {
  var ctx = DebugJS.ctx;
  if (!ctx.timers[timerName]) {
    return 0;
  } else {
    return ctx.timers[timerName].count;
  }
};
DebugJS.timePause = function(timerName) {
  var now = (new Date()).getTime();
  var ctx = DebugJS.ctx;
  if (!ctx.timers[timerName]) return;
  ctx.timers[timerName].pause = now;
  ctx.timers[timerName].count = now - ctx.timers[timerName].start;
};
DebugJS.timeRestart = function(timerName, val) {
  var now = (new Date()).getTime();
  var ctx = DebugJS.ctx;
  if (ctx.timers[timerName]) {
    var paused = now - ctx.timers[timerName].pause;
    ctx.timers[timerName].start = now - ctx.timers[timerName].count;
    ctx.timers[timerName].pause = 0;
    ctx.timers[timerName].split += paused;
  } else {
    ctx.timers[timerName] = {
      start: now,
      pause: 0,
      split: 0,
      count: 0
    };
  }
};
DebugJS.timeSplit = function(timerName, isEnd, msg) {
  var now = (new Date()).getTime();
  var ctx = DebugJS.ctx;
  var _timerName = timerName;

  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DFLT_TIMER_NAME;
  }

  if (!ctx.timers[_timerName]) {
    DebugJS._log.w(_timerName + ': timer undefined');
    return null;
  }

  var prevSplit = ctx.timers[_timerName].split;
  var t = DebugJS.getElapsedTimeStr(ctx.timers[_timerName].start, now);
  var dt = '<span style="color:' + ctx.opt.timerColor + '">' + t + '</span>';

  if (isEnd) {
    delete ctx.timers[_timerName];
  } else {
    ctx.timers[_timerName].split = now;
  }

  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }

  var dtLap = '';
  if (prevSplit) {
    var tLap = DebugJS.getElapsedTimeStr(prevSplit, now);
    dtLap = '<span style="color:' + ctx.opt.timerColor + '">' + tLap + '</span>';
  } else {
    if (!isEnd) {
      dtLap = dt;
    }
  }

  var s;
  if (msg === undefined) {
    s = _timerName + ': ' + dt;
    if (dtLap != '') {
      s += '(' + DebugJS.CHR_DELTA + dtLap + ')';
    }
  } else {
    s = msg.replace(/%n/g, _timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  }

  DebugJS._log(s);
  return t;
};
DebugJS.timeReset = function(timerName) {
  var now = (new Date()).getTime();
  var ctx = DebugJS.ctx;
  ctx.timers[timerName] = ctx.timers[timerName] || {};
  ctx.timers[timerName].start = now;
  ctx.timers[timerName].split = now;
  ctx.timers[timerName].pause = now;
  ctx.timers[timerName].count = 0;
};
DebugJS.timeEnd = function(timerName, msg) {
  return DebugJS.timeSplit(timerName, true, msg);
};
DebugJS.timeLog = function(msg, timerName) {
  var now = (new Date()).getTime();
  var ctx = DebugJS.ctx;
  if (!timerName) {
    timerName = DebugJS.DFLT_TIMER_NAME;
  }
  var t;
  var tLap;
  if (ctx.timers[timerName]) {
    t = DebugJS.getElapsedTimeStr(ctx.timers[timerName].start, now);
    tLap = DebugJS.getElapsedTimeStr(ctx.timers[timerName].split, now);
    ctx.timers[timerName].split = now;
  } else {
    ctx.timers[timerName] = {};
    ctx.timers[timerName].start = now;
    ctx.timers[timerName].split = now;
    t = DebugJS.TIME_RST_STR;
    tLap = t;
  }
  var dt = '<span style="color:' + ctx.opt.timerColor + '">' + t + '</span>';
  var dtLap = '<span style="color:' + ctx.opt.timerColor + '">' + tLap + '</span>';
  var s = dt + ' ' + msg.replace(/%n/g, timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  DebugJS._log(s);
};
DebugJS.timeCheck = function(timerName, now) {
  var ctx = DebugJS.ctx;
  if (timerName === undefined) timerName = DebugJS.DFLT_TIMER_NAME;
  if (!ctx.timers[timerName]) return null;
  var t = DebugJS.getElapsedTimeStr(ctx.timers[timerName].start, now);
  return t;
};
DebugJS.timeList = function() {
  var ctx = DebugJS.ctx;
  var now = new Date();
  var l;
  if (Object.keys(ctx.timers).length == 0) {
    l = '<span style="color:#ccc">no timers</span>';
  } else {
    l = '<table>';
    for (var key in ctx.timers) {
      l += '<tr><td>' + key + '</td><td><span style="color:' + ctx.opt.timerColor + '">' + DebugJS.timeCheck(key, now) + '</font></td></tr>';
    }
    l += '</table>';
  }
  DebugJS._log.mlt(l);
};

DebugJS.getElapsedTimeStr = function(t1, t2) {
  var delta = t2 - t1;
  var elapsed = DebugJS.getTimerStr(delta);
  return elapsed;
};

DebugJS.getRandom = function(type, min, max) {
  if (min !== undefined) {
    min |= 0;
    if (max) {
      max |= 0;
    } else {
      if (type == DebugJS.RND_TYPE_NUM) {
        max = min;
        min = 0;
      } else if (type == DebugJS.RND_TYPE_STR) {
        max = min;
      }
    }
    if (min > max) {
      var wk = min; min = max; max = wk;
    }
  } else {
    if (type == DebugJS.RND_TYPE_NUM) {
      min = 0;
      max = 0x7fffffff;
    } else if (type == DebugJS.RND_TYPE_STR) {
      min = 1;
      max = DebugJS.RND_STR_DFLT_MAX_LEN;
    }
  }
  var rnd;
  switch (type) {
    case DebugJS.RND_TYPE_NUM:
      rnd = DebugJS.getRndNum(min, max);
      break;
    case DebugJS.RND_TYPE_STR:
      rnd = DebugJS.getRndStr(min, max);
  }
  return rnd;
};

DebugJS.getRndNum = function(min, max) {
  min |= 0;
  max |= 0;
  var minDigit = (min + '').length;
  var maxDigit = (max + '').length;
  var digit = ((Math.random() * (maxDigit - minDigit + 1)) | 0) + minDigit;
  var rndMin = (digit == 1) ? 0 : Math.pow(10, (digit - 1));
  var rndMax = Math.pow(10, digit) - 1;
  if (min < rndMin) min = rndMin;
  if (max > rndMax) max = rndMax;
  var rnd = ((Math.random() * (max - min + 1)) | 0) + min;
  return rnd;
};

DebugJS.getRandomChr = function() {
  return String.fromCharCode(DebugJS.getRndNum(0x20, 0x7e));
};

DebugJS.RND_STR_DFLT_MAX_LEN = 10;
DebugJS.RND_STR_MAX_LEN = 1024;
DebugJS.getRndStr = function(min, max) {
  if (min > DebugJS.RND_STR_MAX_LEN) min = DebugJS.RND_STR_MAX_LEN;
  if (max > DebugJS.RND_STR_MAX_LEN) max = DebugJS.RND_STR_MAX_LEN;
  var len = DebugJS.getRndNum(min, max);
  var ch;
  var s = '';
  for (var i = 0; i < len; i++) {
    var retry = true;
    while (retry) {
      ch = DebugJS.getRandomChr();
      if ((!(ch.match(/[!-/:-@[-`{-~]/))) && (!(((i == 0) || (i == (len - 1))) && (ch == ' ')))) {
        retry = false;
      }
    }
    s += ch;
  }
  return s;
};

DebugJS.http = function(rq, cb) {
  if (!rq.method) rq.method = 'GET';
  if ((rq.data == undefined) || (rq.data == '')) data = null;
  if (rq.async == undefined) rq.async = true;
  if (!rq.user) rq.user = '';
  if (!rq.pass) rq.pass = '';
  rq.method = rq.method.toUpperCase();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (cb) cb(xhr);
    }
  };
  xhr.open(rq.method, rq.url, rq.async, rq.user, rq.pass);
  if (rq.contentType) {
    xhr.setRequestHeader('Content-Type', rq.contentType);
  } else {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  if (!rq.cache) {
    xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  }
  if (rq.userAgent) {
    xhr.setRequestHeader('User-Agent', rq.userAgent);
  }
  xhr.send(rq.data);
};
DebugJS.http.buildParam = function(p) {
  var s = '';
  var cnt = 0;
  for (key in p) {
    if (cnt > 0) {
      s += '&';
    }
    s += key + '=' + encodeURIComponent(p[key]);
    cnt++;
  }
  return s;
};
DebugJS.onHttpRequestDone = function(xhr) {
  var stmsg = xhr.status + ' ' + xhr.statusText;
  if (xhr.status == 0) {
    DebugJS._log.e('Cannot load: ' + stmsg);
  } else {
    DebugJS._log(stmsg);
  }
  var head = xhr.getAllResponseHeaders();
  var txt = xhr.responseText.replace(/</g, '&lt;');
  txt = txt.replace(/>/g, '&gt;');
  if (head || txt) {
    var res = '<span style="color:#5ff">' + head + '</span>' + txt;
    DebugJS._log.mlt(res);
  }
};

DebugJS.encodeURIString = function(data) {
  var s = encodeURIComponent(data);
  s = s.replace(/%20/g, '+');
  s = s.replace(/%3D/gi, '=');
  s = s.replace(/%26/g, '&');
  return s;
};

DebugJS.getWinZoomRatio = function() {
  return Math.round(window.devicePixelRatio * 100) + '%';
};

DebugJS.getLanguages = function(indent) {
  var langs;
  var navLangs = navigator.languages;
  if (navLangs) {
    for (var i = 0; i < navLangs.length; i++) {
      if (i == 0) {
        langs = '[' + i + '] ' + navLangs[i];
      } else {
        langs += '\n' + indent + '[' + i + '] ' + navLangs[i];
      }
    }
  } else {
    langs = DebugJS.setStyleIfObjNA(navLangs);
  }
  return langs;
};

DebugJS.getBrowserType = function() {
  var ua = navigator.userAgent;
  var ver;
  var brws = {name: '', version: ''};
  if (ua.indexOf('Edge') >= 1) {
    brws.name = 'Edge';
    ver = ua.match(/Edge\/(.*)/);
    if (ver) {
      brws.version = ver[1];
    }
    return brws;
  }
  if (ua.indexOf('OPR/') >= 1) {
    brws.name = 'Opera';
    ver = ua.match(/OPR\/(.*)/);
    if (ver) {
      brws.version = ver[1];
    }
    return brws;
  }
  if (ua.indexOf('Chrome') >= 1) {
    brws.name = 'Chrome';
    ver = ua.match(/Chrome\/(.*)\s/);
    if (ver) {
      brws.version = ver[1];
    }
    return brws;
  }
  if (ua.indexOf('Firefox') >= 1) {
    brws.name = 'Firefox';
    ver = ua.match(/Firefox\/(.*)/);
    if (ver) {
      brws.version = ver[1];
    }
    return brws;
  }
  if (ua.indexOf('Trident/7.') >= 1) {
    brws.name = 'IE11';
    brws.family = 'IE';
    return brws;
  }
  if (ua.indexOf('Trident/6.') >= 1) {
    brws.name = 'IE10';
    brws.family = 'IE';
    return brws;
  }
  if (ua.indexOf('Trident/5.') >= 1) {
    brws.name = 'IE9';
    brws.family = 'IE';
    return brws;
  }
  if ((ua.indexOf('Safari/') >= 1) && (ua.indexOf('Version/') >= 1)) {
    brws.name = 'Safari';
    ver = ua.match(/Version\/(.*)\sSafari/);
    if (ver) {
      brws.version = ver[1];
    }
    return brws;
  }
  return brws;
};

DebugJS.browserColoring = function(nm) {
  var s = nm;
  switch (nm) {
    case 'Chrome':
      s = '<span style="color:#f44">Ch</span>' +
          '<span style="color:#ff0">ro</span>' +
          '<span style="color:#4f4">m</span>' +
          '<span style="color:#6cf">e</span>';
      break;
    case 'Edge':
      s = '<span style="color:#0af">' + nm + '</span>';
      break;
    case 'Firefox':
      s = '<span style="color:#e57f25">' + nm + '</span>';
      break;
    case 'Opera':
      s = '<span style="color:#f44">' + nm + '</span>';
      break;
    case 'IE11':
    case 'IE10':
    case 'IE9':
      s = '<span style="color:#61d5f8">' + nm + '</span>';
      break;
    case 'Safari':
      s = '<span style="color:#86c8e8">Safa</span>' +
          '<span style="color:#dd5651">r</span>' +
          '<span style="color:#ececec">i</span>';
  }
  return s;
};

DebugJS.substr = function(txt, len) {
  var txtLen = txt.length;
  var cnt = 0;
  var str = '';
  var i, x;
  if (len >= 0) {
    for (i = 0; i < txtLen; i++) {
      x = encodeURIComponent(txt.charAt(i));
      if (x.length <= 3) {
        cnt++;
      } else {
        cnt += 2;
      }
      if (cnt > len) break;
      str += txt.charAt(i);
    }
  } else {
    len *= (-1);
    for (i = (txtLen - 1); i >= 0; i--) {
      x = encodeURIComponent(txt.charAt(i));
      if (x.length <= 3) {
        cnt++;
      } else {
        cnt += 2;
      }
      if (cnt >= len) break;
    }
    str = txt.substr(i);
  }
  return str;
};
DebugJS.startsWith = function(s, p, o) {
  if (o) s = s.substr(o);
  if (s.substr(0, p.length) == p) {
    return true;
  }
  return false;
};
DebugJS.endsWith = function(s, t) {
  return (s.charAt(s.length - 1) == t);
};
DebugJS.strcount = function(s, p) {
  var cnt = 0;
  var pos = s.indexOf(p);
  while ((p != '') && (pos != -1)) {
    cnt++;
    pos = s.indexOf(p, pos + p.length);
  }
  return cnt;
};
DebugJS.strcmpWOsp = function(s1, s2) {
  s1 = DebugJS.delLeadingAndTrailingSP(s1);
  s2 = DebugJS.delLeadingAndTrailingSP(s2);
  return (s1 == s2);
};
DebugJS.strcatWnl = function(s1, s2) {
  s1 += s2;
  if (!DebugJS.endsWith(s2, '\n')) s1 += '\n';
  return s1;
};
DebugJS.strPadding = function(s, c, l, p) {
  var txt = s + '';
  var d = l - txt.length;
  if (d <= 0) return txt;
  var pd = DebugJS.repeatCh(c, d);
  if (p == 'L') {
    txt = pd + txt;
  } else {
    txt += pd;
  }
  return txt;
};
DebugJS.repeatCh = function(c, n) {
  var s = '';
  for (var i = 0; i < n; i++) s += c;
  return s;
};
DebugJS.crlf2lf = function(s) {
  return s.replace(/\r\n/g, '\n');
};
DebugJS.isStr = function(s) {
  return (s + '').match(/\s*\"|'/);
};

DebugJS.trimDownText = function(txt, maxLen, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var s = txt;
  if (txt.length > maxLen) {
    s = DebugJS.substr(s, maxLen) + snip;
  }
  return s;
};
DebugJS.trimDownText2 = function(txt, maxLen, omitpart, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var str = DebugJS.unifySP(txt.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' '));
  if (txt.length > maxLen) {
    switch (omitpart) {
      case DebugJS.OMIT_FIRST:
        str = DebugJS.substr(str, (maxLen * (-1)));
        str = snip + DebugJS.escTags(str);
        break;
      case DebugJS.OMIT_MID:
        var firstLen = maxLen / 2;
        var latterLen = firstLen;
        if ((maxLen % 2) != 0) {
          firstLen = (firstLen | 0);
          latterLen = firstLen + 1;
        }
        var firstText = DebugJS.substr(str, firstLen);
        var latterText = DebugJS.substr(str, (latterLen * (-1)));
        str = DebugJS.escTags(firstText) + snip + DebugJS.escTags(latterText);
        break;
      default:
        str = DebugJS.substr(str, maxLen);
        str = DebugJS.escTags(str) + snip;
    }
  }
  return str;
};

DebugJS.hasKeyWd = function(s, k, d) {
  if (!s) return false;
  var a = s.split(d);
  for (var i = 0; i < a.length; i++) {
    if (a[i] == k) {
      return true;
    }
  }
  return false;
};

DebugJS.isEmptyVal = function(o) {
  return ((o === undefined) || (o === null) || (o === false) || (o === ''));
};

DebugJS.setStyleIfObjNA = function(obj, exceptFalse) {
  var txt = obj;
  if ((exceptFalse && ((obj == undefined) || (obj == null))) ||
      ((!exceptFalse) && (obj !== 0) && (obj !== '') && (!obj))) {
    txt = '<span class="' + DebugJS.ctx.id + '-na">' + obj + '</span>';
  }
  return txt;
};

DebugJS.dumpAddr = function(i) {
  return ('0000000' + i.toString(16)).slice(-8).toUpperCase() + ' : ';
};
DebugJS.dumpBin = function(i, buf) {
  return ((buf[i] == undefined) ? '        ' : DebugJS.toBin(buf[i]));
};
DebugJS.dumpDec = function(i, buf) {
  return ((buf[i] == undefined) ? '   ' : ('  ' + buf[i].toString()).slice(-3));
};
DebugJS.dumpHex = function(i, buf) {
  return ((buf[i] == undefined) ? '  ' : ('0' + buf[i].toString(16)).slice(-2).toUpperCase());
};
DebugJS.dumpAscii = function(pos, buf, len) {
  var b = '';
  var end = pos + 0x10;
  for (var i = pos; i < end; i++) {
    var code = buf[i];
    if (code == undefined) break;
    switch (code) {
      case 0x0A:
        b += DebugJS.CHR_LF_S;
        break;
      case 0x0D:
        b += DebugJS.CHR_CR_S;
        break;
      case 0x22:
        b += '&quot;';
        break;
      case 0x26:
        b += '&amp;';
        break;
      case 0x3C:
        b += '&lt;';
        break;
      case 0x3E:
        b += '&gt;';
        break;
      default:
        if ((code >= 0x20) && (code <= 0x7E)) {
          b += String.fromCharCode(code);
        } else {
          b += ' ';
        }
    }
  }
  return b;
};

DebugJS.escape = function(s, c) {
  if (c instanceof Array) {
    for (var i = 0; i < c.length; i++) {
      s = DebugJS._escape(s, c[i]);
    }
  } else {
    s = DebugJS._escape(s, c);
  }
  return s;
};
DebugJS._escape = function(s, c) {
  return s.replace(new RegExp(c, 'g'), '\\' + c);
};

DebugJS.escTags = function(s) {
  s = s.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/"/g, '&quot;');
  s = s.replace(/'/g, '&#39;');
  return s;
};
DebugJS.escSpclChr = function(s) {
  s += '';
  s = s.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  return s;
};
DebugJS.replaceCtrlChr = function(s, d) {
  if (d) {
    s = s.replace(/\\t/g, '\t');
    s = s.replace(/\\v/g, '\v');
    s = s.replace(/\\r/g, '\r');
    s = s.replace(/\\n/g, '\n');
    s = s.replace(/\\f/g, '\f');
  } else {
    s = s.replace(/\t/g, '\\t');
    s = s.replace(/\v/g, '\\v');
    s = s.replace(/\r/g, '\\r');
    s = s.replace(/\n/g, '\\n');
    s = s.replace(/\f/g, '\\f');
  }
  return s;
};
DebugJS.hlCtrlChr = function(s, sp) {
  var st = '<span class="' + DebugJS.ctx.id + '-txt-hl">';
  var et = '</span>';
  if (sp) s = s.replace(/ /g, st + ' ' + et);
  s = s.replace(/\0/g, st + '\\0' + et);
  s = s.replace(/\t/g, st + '\\t' + et);
  s = s.replace(/\v/g, st + '\\v' + et);
  s = s.replace(/\r/g, st + '\\r' + et);
  s = s.replace(/\n/g, st + '\\n' + et);
  s = s.replace(/\f/g, st + '\\f' + et);
  return s;
};

DebugJS.html2text = function(html) {
  var p = document.createElement('pre');
  p.innerHTML = html;
  return p.innerText;
};

DebugJS.addClass = function(el, n) {
  if (DebugJS.hasClass(el, n)) return;
  if (el.className == '') {
    el.className = n;
  } else {
    el.className += ' ' + n;
  }
};

DebugJS.removeClass = function(el, n) {
  var names = el.className.split(' ');
  var removed = '';
  for (var i = 0; i < names.length; i++) {
    if (names[i] != n) {
      if (i > 0) removed += ' ';
      removed += names[i];
    }
  }
  el.className = removed;
};

DebugJS.hasClass = function(el, n) {
  var className = el.className;
  var names = className.split(' ');
  for (var i = 0; i < names.length; i++) {
    if (names[i] == n) return true;
  }
  return false;
};

DebugJS.deepCopy = function(src, dest) {
  for (var key in src) {
    dest[key] = src[key];
  }
};

DebugJS.delArrayVal = function(arr, v) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == v) {
      arr.splice(i--, 1);
    }
  }
};

DebugJS.sleep = function(ms) {
  ms |= 0;
  var t1 = (new Date()).getTime();
  while (true) {
    var t2 = (new Date()).getTime();
    if (t2 - t1 > ms) break;
  }
};

DebugJS.dumpLog = function(fmt, b64, fmtTime) {
  var buf = DebugJS.ctx.msgBuf.getAll();
  var b = [];
  var l = '';
  for (var i = 0; i < buf.length; i++) {
    var data = buf[i];
    var type = data.type;
    var time = (fmtTime ? DebugJS.getDateTimeStr(data.time) : data.time);
    var msg = data.msg;
    if (fmt == 'json') {
      l = {type: type, time: time, msg: DebugJS.encodeBase64(msg)};
      b.push(l);
    } else {
      var lv = 'LOG';
      switch (type) {
        case DebugJS.LOG_TYPE_ERR:
          lv = 'ERR';
          break;
        case DebugJS.LOG_TYPE_WRN:
          lv = 'WRN';
          break;
        case DebugJS.LOG_TYPE_INF:
          lv = 'INF';
          break;
        case DebugJS.LOG_TYPE_DBG:
          lv = 'DBG';
          break;
        case DebugJS.LOG_TYPE_VRB:
          lv = 'VRB';
          break;
        case DebugJS.LOG_TYPE_SYS:
          lv = 'SYS';
          break;
        case DebugJS.LOG_TYPE_RES:
        case DebugJS.LOG_TYPE_ERES:
          msg = '> ' + msg;
      }
      l += time + '\t' + lv + '\t' + msg + '\n';
    }
  }
  if (fmt == 'json') l = JSON.stringify(b);
  if (b64) l = DebugJS.encodeBase64(l);
  return l;
};

DebugJS.sendLog = function(url, pName, param, extInfo, wBf, cb) {
  var b = DebugJS.createLogData(extInfo, wBf);
  var data = DebugJS.http.buildParam(param);
  if (data != '') data += '&';
  if (DebugJS.isEmptyVal(pName)) pName = 'data';
  data += pName + '=' + encodeURIComponent(b);
  var r = {
    url: url,
    method: 'POST',
    data: data
  };
  DebugJS.http(r, (cb ? cb : DebugJS.sendLogCb));
};
DebugJS.sendLogCb = function(xhr) {
  var st = xhr.status;
  if (st == 200) {
    DebugJS._log('Send Log OK');
  } else {
    DebugJS._log.e('Send Log ERR (' + st + ')');
  }
};
DebugJS.createLogData = function(extInfo, wBf) {
  var LINE = '------------------------------------------------------------------------\n';
  var info = ['', '', '', ''];
  if (extInfo) {
    if (extInfo.info0) info[0] = extInfo.info0;
    if (extInfo.info1) info[1] = extInfo.info1;
    if (extInfo.info2) info[2] = extInfo.info2;
    if (extInfo.info3) info[3] = extInfo.info3;
  }
  var hd = DebugJS.createLogHeader();
  var logTxt = DebugJS.dumpLog('text', false, true);
  logTxt = DebugJS.html2text(logTxt);
  logTxt = DebugJS.crlf2lf(logTxt);
  var b = '';
  if (info[0]) {
    b = DebugJS.strcatWnl(b, info[0]);
  }
  b += LINE + hd + LINE;
  if (info[1]) {
    info[1] = DebugJS.crlf2lf(info[1]);
    b = DebugJS.strcatWnl(b, info[1]);
    b += LINE;
  }
  b += '\n' + DebugJS.LOG_HEAD + '\n' + logTxt;
  if (!DebugJS.endsWith(logTxt, '\n')) b += '\n';
  if (info[2]) {
    b += '\n';
    b = DebugJS.strcatWnl(b, info[2]);
  }
  if (wBf) {
    var logBuf = DebugJS.dumpLog('json', true, false);
    b += '\n' + DebugJS.LOG_BOUNDARY_BUF + '\n' + logBuf + '\n';
  }
  if (info[3]) {
    b += '\n';
    b = DebugJS.strcatWnl(b, info[3]);
  }
  return b;
};
DebugJS.createLogHeader = function() {
  var dt = DebugJS.getDateTime();
  var brw = DebugJS.getBrowserType();
  var s = 'Sending Time : ' + DebugJS.getDateTimeStr(dt.time) + ' ' + DebugJS.getTimeOffsetStr(dt.offset, true) + ' (' + dt.time + ')\n';
  s += 'Browser      : ' + brw.name + ' ' + brw.version + '\n';
  s += 'User Agent   : ' + navigator.userAgent + '\n';
  s += 'Screen Size  : w=' + screen.width + ' h=' + screen.height + '\n';
  s += 'Window Size  : w=' + document.documentElement.clientWidth + ' h=' + document.documentElement.clientHeight + '\n';
  s += 'Body Size    : w=' + document.body.clientWidth + ' h=' + document.body.clientHeight + '\n';
  s += 'Zoom Ratio   : ' + DebugJS.getWinZoomRatio() + '\n';
  s += 'Language     : ' + navigator.language;
  var navLangs = navigator.languages;
  if (navLangs) {
    s += ' (';
    for (var i = 0; i < navLangs.length; i++) {
      if (i > 0) s += ', ';
      s += navLangs[i];
    }
    s += ')';
  }
  s += '\n';
  return s;
};

DebugJS.loadLog = function(json, b64) {
  var ctx = DebugJS.ctx;
  if (b64) json = DebugJS.decodeBase64(json);
  var buf = JSON.parse(json);
  if (ctx.msgBuf.getSize() < buf.length) {
    ctx.msgBuf = new DebugJS.RingBuffer(buf.length);
  }
  for (var i = 0; i < buf.length; i++) {
    var bf = buf[i];
    bf.msg = DebugJS.decodeBase64(bf.msg);
    ctx.msgBuf.add(bf);
  }
};

DebugJS.saveStatus = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var ctx = DebugJS.ctx;
  var data = {
    status: ctx.status,
    swElapsedTime: ctx.swElapsedTime,
    props: ctx.props,
    alias: ctx.CMD_ALIAS
  };
  var st = JSON.stringify(data);
  localStorage.setItem('DebugJS-st', st);
};
DebugJS.loadStatus = function() {
  if (!DebugJS.LS_AVAILABLE) return 0;
  var st = localStorage.getItem('DebugJS-st');
  if (st == null) return null;
  localStorage.removeItem('DebugJS-st');
  var data = JSON.parse(st);
  return data;
};

DebugJS.preserveLog = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var json = DebugJS.dumpLog('json');
  localStorage.setItem('DebugJS-log', json);
};
DebugJS.restoreLog = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var json = localStorage.getItem('DebugJS-log');
  if (!json) return;
  localStorage.removeItem('DebugJS-log');
  DebugJS.loadLog(json);
};

DebugJS.file = {};
DebugJS.file.loaders = [];
DebugJS.file.ongoingLoader = null;
DebugJS.file.onDragOver = function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};
DebugJS.file.onDrop = function(e) {
  var ctx = DebugJS.ctx;
  var loader = null;
  for (var i = 0; i < DebugJS.file.loaders.length; i++) {
    loader = DebugJS.file.loaders[i];
    if (DebugJS.isTargetEl(e.target, loader.el)) {
      DebugJS.file.ongoingLoader = loader;
      break;
    }
  }
  if (i == DebugJS.file.loaders.length) {
    DebugJS._log.e('onDrop(): loader not found');
    return;
  }
  var format = DebugJS.FILE_LOAD_FMT_BIN;
  if (loader.mode == 'b64') {
    format = DebugJS.FILE_LOAD_FMT_B64;
  }
  if (!((ctx.status & DebugJS.ST_TOOLS) && (ctx.toolsActiveFnc == DebugJS.TOOLS_FNC_FILE))) {
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', loader.mode);
  }
  ctx.handleFileDrop(ctx, e, format, null);
};
DebugJS.isTargetEl = function(target, el) {
  do {
    if (target == el) return true;
    target = target.parentNode;
  } while (target != null);
  return false;
};
DebugJS.file.onLoaded = function(file, content) {
  var loader = DebugJS.file.ongoingLoader;
  if ((!loader) || (!loader.cb)) return;
  if ((loader.mode == 'b64') && (loader.decode)) {
    content = DebugJS.decodeBase64(content);
  }
  loader.cb(file, content);
};
DebugJS.file.finalize = function() {
  DebugJS.file.ongoingLoader = null;
};
DebugJS.addFileLoader = function(el, cb, mode, decode) {
  el = DebugJS.getElement(el);
  if (!el) {
    DebugJS._log.e('addFileLoader(): target element is ' + el);
    return;
  }
  el.addEventListener('dragover', DebugJS.file.onDragOver, false);
  el.addEventListener('drop', DebugJS.file.onDrop, false);
  var loader = {
    el: el,
    mode: mode,
    decode: decode,
    cb: cb
  };
  DebugJS.file.loaders.push(loader);
};

DebugJS.getFeatureStack = function() {
  return DebugJS.ctx.featStack.concat();
};

DebugJS.show = function() {
  DebugJS.ctx.showDbgWin();
};
DebugJS.hide = function() {
  DebugJS.ctx.closeDbgWin();
};
DebugJS.opacity = function(v) {
  if (v > 1) {
    v = 1;
  } else if (v < 0.1) {
    v = 0.1;
  }
  DebugJS.ctx.win.style.opacity = v;
};
DebugJS.isVisible = function() {
  if (DebugJS.ctx.uiStatus & DebugJS.UI_ST_VISIBLE) return true;
  return false;
};

DebugJS._log = function(m) {
  if (m instanceof Object) {
    DebugJS._log.p(m, 0, null, false);
  } else {
    DebugJS._log.out(m, DebugJS.LOG_TYPE_LOG);
  }
};
DebugJS._log.e = function(m) {
  if (DebugJS.bat.hasBatStopCond('error')) {
    DebugJS.bat.ctrl.stopReq = true;
  }
  DebugJS._log.out(m, DebugJS.LOG_TYPE_ERR);
  DebugJS.ctx.showDbgWinOnError(DebugJS.ctx);
  if (!DebugJS.ctx.fromCmdLine) {
    DebugJS.callEvtListener('error');
  }
};
DebugJS._log.w = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_WRN);
};
DebugJS._log.i = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_INF);
};
DebugJS._log.d = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_DBG);
};
DebugJS._log.v = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_VRB);
};
DebugJS._log.s = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_SYS);
};
DebugJS._log.p = function(o, l, m, j) {
  var valLen = DebugJS.ctx.props.dumpvallen;
  var s = (m ? m : '') + '\n' + DebugJS.objDump(o, j, l, false, valLen);
  if (j) s = DebugJS.escTags(s);
  DebugJS._log.out(s, DebugJS.LOG_TYPE_LOG);
};
DebugJS._log.res = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_RES);
};
DebugJS._log.res.err = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_ERES);
};
DebugJS._log.mlt = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_MLT);
};
DebugJS._log.out = function(m, type) {
  m = DebugJS.setStyleIfObjNA(m);
  if (typeof m != 'string') {m = m.toString();}
  var data = {type: type, time: (new Date()).getTime(), msg: m};
  DebugJS.ctx.msgBuf.add(data);
  if (!(DebugJS.ctx.status & DebugJS.ST_INITIALIZED)) {
    if (!DebugJS._init()) return;
  }
  DebugJS.ctx.printLogs();
};

DebugJS.stack = function(ldx, q) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  var stk;
  try {
    DebugJS.a.b;
  } catch (e) {
    stk = e.stack.split('\n');
  }
  ldx |= 0;
  var cnt = 0, skp = 0;
  var rslt = '';
  for (var i = 0; i < stk.length; i++) {
    var s = stk[i];
    if (s.match(/^TypeError.*/) || s.match(/^DebugJS\.stack@.*/) || s.match(/^\s+at\s.*DebugJS\.stack\s/)) continue;
    if (skp < ldx) {skp++;continue;}
    if (cnt > 0) {rslt += '\n';}
    rslt += DebugJS.delLeadingSP(s).replace(/^at /, '');cnt++;
  }
  if (!q) DebugJS._log('Stack:\n' + DebugJS.escTags(rslt));
  return rslt;
};

DebugJS.stktop = function(idx) {
  return DebugJS.stack((idx | 0) + 1, true).split('\n')[0];
};

DebugJS.line = function(idx) {
  return DebugJS._line(DebugJS.stktop((idx | 0) + 1), idx);
};
DebugJS._line = function(s, idx) {
  var a = s.split(':');
  var l = a[a.length - 2] | 0;
  return l;
};

DebugJS.funcname = function(idx) {
  return DebugJS._funcname(DebugJS.stktop((idx | 0) + 1), idx);
};
DebugJS._funcname = function(s, idx) {
  return s.replace(/@/, ' ').replace(/^(.*?)\s.*/, '$1');
};

DebugJS.filename = function(idx, abs) {
  return DebugJS._filename(DebugJS.stktop((idx | 0) + 1), idx, abs);
};
DebugJS._filename = function(s, idx, abs) {
  if (s == '') return s;
  var n = s.replace(/@/, ' ');
  n = n.replace(/^.*?\s/, '');
  n = n.replace(/^\(/, '');
  n = n.replace(/\)$/, '');
  n = n.replace(/:\d+$/, '');
  n = n.replace(/:\d+$/, '');
  if (!abs) {
    var p = n.split('/');
    n = p[p.length - 1];
    if (n == '') {
      if ((p.length >= 2) && (p.length != 4)) {
        n = p[p.length - 2];
      }
      n += '/';
    }
  }
  if ((n == '<anonymous>') || (n == 'Unknown script code')) {
    n = '&lt;anonymous&gt;';
  } else if ((n == 'code (eval code') || (n.match(/> eval$/)) || (n.match(/<anonymous>$/))) {
    n = '*eval*';
  }
  return n;
};

DebugJS.fileline = function(idx, abs) {
  var s = DebugJS.stktop((idx | 0) + 1);
  if (s == '') return s;
  var f = DebugJS._filename(s, idx, abs);
  var l = DebugJS._line(s, idx);
  return f + ':' + l;
};

DebugJS.time = {};
DebugJS.time.start = function(timerName, msg) {
  DebugJS.timeStart(timerName, msg);
};
DebugJS.time.split = function(timerName, msg) {
  var t = DebugJS.timeSplit(timerName, false, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};
DebugJS.time.end = function(timerName, msg) {
  var t = DebugJS.timeEnd(timerName, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};
DebugJS.time.check = function(timerName) {
  return DebugJS.timeCheck(timerName, new Date());
};

DebugJS.stopwatch = function() {
  var ctx = DebugJS.ctx;
  if (!ctx.isAvailableTools(ctx)) return false;
  ctx.showDbgWin();
  ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'timer', 'cu');
  return true;
};
DebugJS.stopwatch.start = function(m) {
  if (DebugJS.stopwatch()) {
    DebugJS.ctx.startTimerStopWatchCu();
    DebugJS.stopwatch.log(m);
  }
};
DebugJS.stopwatch.stop = function() {
  if (DebugJS.stopwatch()) {
    DebugJS.ctx.stopTimerStopWatchCu();
  }
};
DebugJS.stopwatch.end = function(m) {
  if (DebugJS.stopwatch()) {
    DebugJS.ctx.endTimerStopWatchCu();
    DebugJS.stopwatch.log(m);
  }
  return DebugJS.timeGetCount(DebugJS.TIMER_NAME_SW_CU);
};
DebugJS.stopwatch.split = function(m) {
  if (DebugJS.ctx.isAvailableTools(DebugJS.ctx)) {
    m = DebugJS.TIMER_NAME_SW_CU + ': %t(' + DebugJS.CHR_DELTA + '%lt)' + (m == undefined ? '' : ' ' + m);
    DebugJS.timeSplit(DebugJS.TIMER_NAME_SW_CU, false, m);
  }
};
DebugJS.stopwatch.reset = function() {
  if (DebugJS.stopwatch()) {
    DebugJS.ctx.resetTimerStopWatchCu();
  }
};
DebugJS.stopwatch.log = function(msg) {
  var t = DebugJS.getTimerStr(DebugJS.timeGetCount(DebugJS.TIMER_NAME_SW_CU));
  var m = DebugJS.TIMER_NAME_SW_CU + ': <span style="color:' + DebugJS.ctx.opt.timerColor + '">' + t + '</span>';
  if (msg != undefined) m += ' ' + msg;
  DebugJS._log(m);
};

DebugJS.addEvtListener = function(type, listener) {
  if (DebugJS.ctx.evtListener[type] == undefined) {
    DebugJS._log.e('No such event: ' + type);
  } else {
    DebugJS.ctx.evtListener[type].push(listener);
  }
};

DebugJS.callEvtListener = function(type, a1, a2, a3) {
  for (var i = 0; i < DebugJS.ctx.evtListener[type].length; i++) {
    var cb = DebugJS.ctx.evtListener[type][i];
    if (cb) cb(a1, a2, a3);
  }
};

DebugJS.isSysVal = function(n) {
  return (((n == '?') || (n.match(/^%.*%$/))) ? true : false);
};

DebugJS.cmd = function(c, echo) {
  return DebugJS.ctx._execCmd(c, echo);
};

DebugJS.getCmdVal = function(n) {
  return DebugJS.ctx.CMDVALS[n];
};
DebugJS.setCmdVal = function(n, v) {
  if (DebugJS.isSysVal(n)) {
    DebugJS._log.e('Error: ${' + n + '} is read-only');
  } else {
    DebugJS.ctx.CMDVALS[n] = v;
  }
};

DebugJS.bat = function(b, a, sl, el) {
  if (!b) return;
  var bat = DebugJS.bat;
  bat.set(b);
  bat.setExecArg(a);
  bat.run.arg.s = sl;
  bat.run.arg.e = el;
  bat.setRunningSt(true);
  setTimeout(bat._run, 0);
};
DebugJS.bat.cmds = [];
DebugJS.bat.ctrl = {
  pc: 0,
  lr: 0,
  startPc: 0,
  endPc: 0,
  break: 0,
  delay: 0,
  echo: true,
  tmpEchoOff: false,
  js: 0,
  tmid: 0,
  lock: 0,
  block: [],
  fnArg: undefined,
  condKey: null,
  pauseKey: null,
  pauseTimeout: 0,
  cont: false,
  stopReq: false,
  execArg: '',
  label: '',
  fnnm: '',
  stack: []
};
DebugJS.bat.labels = {};
DebugJS.bat.fncs = {};
DebugJS.bat.ctx = [];
DebugJS.bat.set = function(b) {
  var bat = DebugJS.bat;
  if (DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) {
    if (bat.nestLv() == 0) {
      bat.stop(DebugJS.EXIT_CLEARED);
    } else {
      bat.stopNext();
    }
  }
  if (DebugJS.ctx.batTextEditor) {
    DebugJS.ctx.batTextEditor.value = b;
  }
  bat.store(b);
  if (bat.nestLv() > 0) {
    bat.inheritSt();
  }
};
DebugJS.bat.inheritSt = function() {
  var bat = DebugJS.bat;
  var callerCtrl = bat.ctx[bat.nestLv() - 1].ctrl;
  bat.ctrl.echo = callerCtrl.echo;
};
DebugJS.bat.store = function(b) {
  var bat = DebugJS.bat;
  b = b.replace(/(\r?\n|\r)/g, '\n');
  bat.cmds = b.split('\n');
  var last = bat.cmds.pop();
  if (last != '') {
    bat.cmds.push(last);
  }
  bat.parseLabelFncs();
  bat.initCtrl(true);
  DebugJS.ctx.updateTotalLine();
  DebugJS.ctx.updateBatNestLv();
};
DebugJS.bat.parseLabelFncs = function() {
  var bat = DebugJS.bat;
  var cmnt = 0;
  bat.labels = {};
  bat.fncs = {};
  for (var i = 0; i < bat.cmds.length; i++) {
    var c = bat.cmds[i];
    if (DebugJS.delLeadingSP(c).substr(0, 2) == '/*') {
      cmnt++;
      continue;
    }
    if (DebugJS.delTrailingSP(c).slice(-2) == '*/') {
      cmnt--;
      continue;
    }
    if (cmnt > 0) continue;
    if ((c.charAt(0) == DebugJS.BAT_TKN_LABEL) && c.length >= 2) {
      var label = c.substr(1);
      bat.labels[label] = i;
    } else if (DebugJS.startsWith(c, DebugJS.BAT_TKN_FNC)) {
      var fn = DebugJS.splitArgs(c)[1];
      bat.fncs[fn] = i;
    }
  }
};
DebugJS.bat.run = function(s, e, a) {
  var bat = DebugJS.bat;
  bat.run.arg.s = s;
  bat.run.arg.e = e;
  if (a != undefined) {
    bat.setExecArg(a);
  }
  bat._run();
};
DebugJS.bat._run = function() {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  bat.setRunningSt(false);
  bat.setExitStatus(DebugJS.EXIT_SUCCESS);
  if (bat.cmds.length == 0) {
    DebugJS._log('No batch script');
    return;
  }
  var s = bat.run.arg.s;
  var e = bat.run.arg.e;
  var sl, el;
  if ((s == undefined) || (s == '*')) {
    sl = 0;
  } else if (isNaN(s)) {
    if (s.charAt(0) == DebugJS.BAT_TKN_LABEL) s = s.substr(1);
    sl = bat.labels[s];
    if (sl == undefined) {
      DebugJS._log.e('No such label: ' + s);
      return;
    }
  } else {
    sl = (s | 0) - 1; if (sl < 0) sl = 0;
  }
  if (sl >= bat.cmds.length) {
    DebugJS._log.e('Out of range (1-' + bat.cmds.length + ')');
    return;
  }
  if ((e == undefined) || (e == '*')) {
    el = bat.cmds.length - 1;
  } else if (isNaN(e)) {
    if (e.charAt(0) == DebugJS.BAT_TKN_LABEL) e = e.substr(1);
    el = bat.labels[e];
    if (el == undefined) {
      DebugJS._log.e('No such label: ' + e);
      return;
    }
  } else {
    el = (e | 0) - 1; if (el < 0) el = 0;
  }
  if (el < sl) {
    el = sl;
  } else if (el >= bat.cmds.length) {
    el = bat.cmds.length - 1;
  }
  bat.setRunningSt(true);
  ctx.updateBatRunBtn();
  bat.initCtrl(false);
  var ctrl = bat.ctrl;
  if (bat.nestLv() == 0) {
    ctrl.echo = ctx.cmdEchoFlg;
  }
  ctx.updateCurPc();
  ctrl.startPc = sl;
  ctrl.endPc = el;
  bat.setExecArg(ctrl.execArg);
  bat.stopNext();
  if (bat.nestLv() == 0) DebugJS.callEvtListener('batstart');
  bat.exec();
};
DebugJS.bat.run.arg = {s: 0, e: 0};
DebugJS.bat.clearTimer = function() {
  var ctrl = DebugJS.bat.ctrl;
  clearTimeout(ctrl.tmid);
  ctrl.tmid = 0;
};
DebugJS.bat.exec = function() {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  ctrl.tmid = 0;
  if ((ctx.status & DebugJS.ST_BAT_PAUSE) || (ctx.status & DebugJS.ST_BAT_PAUSE_CMD)) {
    return;
  }
  if (ctrl.stopReq) {
    DebugJS._log.e('BAT ERROR STOPPED (L:' + ctrl.pc + ')');
    DebugJS._log.e('--------------------------------');
    for (var i = -3; i <= 0; i++) {
      var pc = ctrl.pc + i;
      var len = bat.cmds.length;
      if ((pc >= 0) && (pc < len)) {
        var n = pc + 1;
        var df = DebugJS.digits(len) - DebugJS.digits(n);
        var pdng = '';
        for (var j = 0; j < df; j++) {
          pdng += '0';
        }
        var pre = ((pc == (ctrl.pc - 1)) ? '&gt; ' : '  ');
        DebugJS._log.e(pre + pdng + n + ': ' + DebugJS.trimDownText(bat.cmds[pc], 98));
      }
    }
    DebugJS._log.e('--------------------------------');
    ctrl.stopReq = false;
    bat._exit(DebugJS.EXIT_FAILURE);
    return;
  }
  if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
    if (ctrl.pauseTimeout > 0) {
      if ((new Date).getTime() >= ctrl.pauseTimeout) {
        bat._resume('cmd-key', undefined, true);
      } else {
        ctrl.tmid = setTimeout(bat.exec, 50);
      }
    }
    return;
  }
  if (!(ctx.status & DebugJS.ST_BAT_RUNNING)) {
    bat.initCtrl(false);
    return;
  }
  if (ctrl.pc > ctrl.endPc) {
    bat._exit(DebugJS.EXIT_SUCCESS);
    return;
  }
  if (bat.isLocked()) {
    ctrl.tmid = setTimeout(bat.exec, 50);
    return;
  }
  if (ctx.status & DebugJS.ST_BAT_BREAK) {
    ctx.status &= ~DebugJS.ST_BAT_BREAK;
    bat.setPc(--ctrl.pc);
  } else {
    if (ctrl.pc + 1 == ctrl.break) {
      ctx.status |= DebugJS.ST_BAT_BREAK;
      bat.setPc(++ctrl.pc, true);
      bat.pause();
      ctx.showDbgWin();
      return;
    }
  }
  var c = bat.cmds[ctrl.pc];
  if (c == undefined) {
    bat._exit(DebugJS.EXIT_CLEARED);
    return;
  }
  ctrl.pc++;
  ctx.updateCurPc();
  switch (bat.prepro(ctx, c)) {
    case 1:
      ctrl.tmpEchoOff = false;
      bat.next(0);
      return;
    case 2:
      ctrl.tmpEchoOff = false;
      return;
  }
  var echoFlg = (ctrl.echo && !ctrl.tmpEchoOff);
  ctrl.tmpEchoOff = false;
  if (ctrl.pc > ctrl.startPc) {
    ctx._execCmd(c, echoFlg);
  }
  bat.next(1);
};
DebugJS.bat.next = function(f) {
  var d = (f == 1 ? DebugJS.bat.ctrl.delay : 0);
  DebugJS.bat.ctrl.tmid = setTimeout(DebugJS.bat.exec, d);
};
DebugJS.bat.exec1 = function(l) {
  var cmd = DebugJS.bat.cmds[l - 1];
  if (cmd == undefined) return;
  if (DebugJS.bat.isPpTkn(cmd)) {
    DebugJS._log(cmd);
    return;
  }
  return DebugJS.ctx._execCmd(cmd, true);
};
DebugJS.bat.isPpTkn = function(cmd) {
  var c = DebugJS.splitCmdLineInTwo(cmd)[0];
  if (c.match(/^\s*@/)) {
    c = c.substr(c.indexOf('@') + 1);
  }
  if (((c.charAt(0) == '#') || (c.substr(0, 2) == '//')) ||
      (DebugJS.delLeadingSP(cmd).substr(0, 2) == '/*') ||
      (DebugJS.delTrailingSP(cmd).slice(-2) == '*/') ||
      (c.charAt(0) == DebugJS.BAT_TKN_LABEL)) {
    return 1;
  }
  switch (c) {
    case DebugJS.BAT_TKN_IF:
    case DebugJS.BAT_TKN_LOOP:
    case DebugJS.BAT_TKN_BREAK:
    case DebugJS.BAT_TKN_CONTINUE:
    case DebugJS.BAT_TKN_JS:
    case DebugJS.BAT_TKN_TXT:
    case DebugJS.BAT_TKN_BLOCK_END:
      return 1;
  }
  if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
    return 1;
  }
  return 0;
};
DebugJS.bat._exit = function(st) {
  var bat = DebugJS.bat;
  bat.setExitStatus(st);
  if (!bat.ldCtx()) {
    bat._stop(st);
  }
};
DebugJS.bat.setExecArg = function(a) {
  a = ((a === undefined) ? '' : a);
  DebugJS.ctx.CMDVALS['%%ARG%%'] = a;
  DebugJS.bat.ctrl.execArg = a;
  DebugJS.ctx.setBatArgTxt(DebugJS.ctx);
};
DebugJS.bat.setLabel = function(s) {
  s = ((s === undefined) ? '' : s);
  DebugJS.ctx.CMDVALS['%LABEL%'] = s;
  DebugJS.bat.ctrl.label = s;
};
DebugJS.bat.setFnNm = function(s) {
  s = ((s === undefined) ? '' : s);
  DebugJS.ctx.CMDVALS['%FUNCNAME%'] = s;
  DebugJS.bat.ctrl.fnnm = s;
};
DebugJS.bat.setExitStatus = function(st) {
  if ((st == undefined) || (st == '')) {
    st = DebugJS.EXIT_SUCCESS;
  } else {
    try {
      st = eval(st);
    } catch (e) {
      DebugJS._log.e(e);
      st = DebugJS.EXIT_FAILURE;
    }
  }
  DebugJS.ctx.CMDVALS['?'] = st;
};
DebugJS.bat.prepro = function(ctx, cmd) {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (cmd.match(/^\s*@/)) {
    ctrl.tmpEchoOff = true;
    cmd = cmd.substr(cmd.indexOf('@') + 1);
  }
  cmd = DebugJS.replaceCmdVals(cmd);
  var cmds = DebugJS.splitCmdLineInTwo(cmd);
  var c = cmds[0];
  for (var key in ctx.CMD_ALIAS) {
    if (c == key) {
      cmd = cmd.replace(new RegExp(c), ctx.CMD_ALIAS[key]);
      cmd = DebugJS.replaceCmdVals(cmd);
      cmds = DebugJS.splitCmdLineInTwo(cmd);
      c = cmds[0];
      break;
    }
  }
  var a = DebugJS.splitArgs(cmds[1]);
  var b;
  var pc = bat.nextExecLine(ctrl.pc - 1);
  if (pc != ctrl.pc - 1) {
    bat.setPc(pc);
    return 1;
  }
  if (c == DebugJS.BAT_TKN_FNC) {
    if (ctrl.stack.length == 0) {
      pc = bat.findEndOfFnc(ctrl.pc);
      bat.setPc(pc + 1);
    } else {
      bat.setFnNm(a[0]);
    }
    return 1;
  }
  if (c.charAt(0) == DebugJS.BAT_TKN_LABEL) {
    bat.setLabel(c.substr(1));
    return 1;
  }
  switch (c) {
    case 'nop':
      DebugJS._log('');
    case '':
      return 1;
    case 'echo':
      if (a[0] == 'off') {
        bat.ppEcho(cmd);
        ctrl[c] = false;
        return 1;
      } else if (a[0] == 'on') {
        bat.ppEcho(cmd);
        ctrl[c] = true;
        return 1;
      }
      break;
    case DebugJS.BAT_TKN_IF:
      if (ctrl.pc <= ctrl.startPc) return 1;
      var r = bat.ppIf(c, cmds[1], cmd);
      if (!r.err) {
        if (r.cond) {
          ctrl.block.push({t: DebugJS.BAT_TKN_IF});
        } else {
          bat.ppElIf(ctrl.pc);
        }
      }
      return 1;
    case DebugJS.BAT_TKN_LOOP:
      if (ctrl.pc <= ctrl.startPc) return 1;
      var r = bat.ppIf(c, cmds[1], cmd);
      var endBlk = bat.findEndOfBlock(DebugJS.BAT_TKN_LOOP, ctrl.pc);
      if (!r.err) {
        if (r.cond) {
          if ((ctrl.block.length == 0) ||
              ((ctrl.block.length > 0) && (ctrl.block[ctrl.block.length - 1].s != (ctrl.pc - 1)))) {
            ctrl.block.push({t: DebugJS.BAT_TKN_LOOP, s: (ctrl.pc - 1), e: endBlk.l});
          }
        } else {
          if ((ctrl.block.length > 0) && (ctrl.block[ctrl.block.length - 1].s == (ctrl.pc - 1))) {
            ctrl.block.pop();
          }
          ctrl.pc = endBlk.l + 1;
        }
      }
      return 1;
    case DebugJS.BAT_TKN_BREAK:
    case DebugJS.BAT_TKN_CONTINUE:
      while (ctrl.block.length > 0) {
        b = ctrl.block.pop();
        if (b.t == DebugJS.BAT_TKN_LOOP) {
          ctrl.pc = (c == DebugJS.BAT_TKN_BREAK ? (b.e + 1) : b.s);
          break;
        }
      }
      return 1;
    case DebugJS.BAT_TKN_JS:
      if (ctrl.js) {
        ctrl.js = 0;
      } else {
        ctrl.js = ((a[0] == 'pure') ? 1 : 2);
        bat.execJs();
      }
      return 1;
    case DebugJS.BAT_TKN_TXT:
      bat.text();
      return 1;
  }
  if (DebugJS.unifySP(DebugJS.delLeadingAndTrailingSP(cmd)).match(DebugJS.RE_ELIF)) {
    b = ctrl.block.pop();
    if (b != undefined) {
      ctrl.pc = bat.findEndOfBlock(DebugJS.BAT_TKN_BLOCK_END, ctrl.pc).l + 1;
      return 1;
    }
  } else if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
    b = ctrl.block.pop();
    if (b != undefined) {
      ctrl.pc = bat.findEndOfBlock(DebugJS.BAT_TKN_IF, ctrl.pc).l + 1;
      return 1;
    }
  } else if (DebugJS.delLeadingAndTrailingSP(cmd) == DebugJS.BAT_TKN_BLOCK_END) {
    if (ctrl.block.length > 0) {
      b = ctrl.block[ctrl.block.length - 1];
      if (b.t == DebugJS.BAT_TKN_LOOP) {
        if (b.e == (ctrl.pc - 1)) {
          ctrl.pc = b.s;
        }
      } else {
        ctrl.block.pop();
      }
      return 1;
    }
  }
  if (ctrl.pc <= ctrl.startPc) {
    return 1;
  }
  switch (c) {
    case 'exit':
      bat.ppEcho(cmd);
      bat._exit(cmds[1]);
      return 2;
    case 'wait':
      var w = cmds[1];
      if (w == '') {
        w = ctx.props.wait;
      } else if (!((DebugJS.isTimeFormat(w)) || (w.match(/\|/)))) {
        try {
          w = eval(w);
        } catch (e) {
          DebugJS._log.e(e);
        }
      }
      w += '';
      if (w.match(/\|/)) {
        w = DebugJS.calcNextTime(w).t;
      }
      if (DebugJS.isTimeFormat(w)) {
        w = DebugJS.calcTargetTime(w);
      }
      bat.ppEcho(cmd);
      ctrl.tmid = setTimeout(bat.exec, w | 0);
      return 2;
  }
  if (ctrl.js) {
    ctrl.pc--;
    ctx.updateCurPc();
    bat.execJs();
    return 1;
  }
  return 0;
};
DebugJS.bat.nextExecLine = function(pc) {
  var bat = DebugJS.bat;
  var cmnt = 0;
  while (pc <= bat.ctrl.endPc) {
    var cmd = bat.cmds[pc];
    pc++;
    var cmds = DebugJS.splitCmdLineInTwo(cmd);
    var c = cmds[0];
    if ((c == '') || (c.charAt(0) == '#') || (c.substr(0, 2) == '//')) {
      continue;
    }
    if (DebugJS.delLeadingSP(cmd).substr(0, 2) == '/*') {
      cmnt++;
      continue;
    }
    if (DebugJS.delTrailingSP(cmd).slice(-2) == '*/') {
      cmnt--;
      if (cmnt < 0) {
        bat.syntaxErr(cmd);
        break;
      }
      continue;
    }
    if (cmnt == 0) {
      if ((c == DebugJS.BAT_TKN_FNC) && (bat.ctrl.stack.length == 0)) {
        pc = bat.findEndOfFnc(pc) + 1;
      } else {
        pc--;
        break;
      }
    }
  }
  return pc;
};
DebugJS.bat.ppIf = function(t, cnd, cmd) {
  var r = {cond: false, err: true};
  var v = DebugJS.delLeadingAndTrailingSP(cnd);
  if (DebugJS.endsWith(v, DebugJS.BAT_TKN_BLOCK_START)) {
    v = v.substr(0, v.length - 1);
    if ((t == DebugJS.BAT_TKN_LOOP) && (v == '')) {
      r.cond = true;r.err = false;
      return r;
    }
    v = DebugJS.replaceCmdVals(v);
    try {
      r.cond = eval(v);
      r.err = false;
    } catch (e) {
      DebugJS._log.e(e);
    }
  } else {
    DebugJS.bat.syntaxErr(cmd);
  }
  return r;
};
DebugJS.bat.ppElIf = function(pc) {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  while (pc <= ctrl.endPc) {
    var endBlk = bat.findEndOfBlock(DebugJS.BAT_TKN_ELIF, pc);
    pc = endBlk.l + 1;
    if (endBlk.endTkn == DebugJS.BAT_TKN_ELSE) {
      ctrl.block.push({t: DebugJS.BAT_TKN_ELSE});
      break;
    } else if (endBlk.endTkn == DebugJS.BAT_TKN_BLOCK_END) {
      break;
    }
    var cmd = bat.cmds[pc - 1];
    var cnd = DebugJS.getArgsFrom(cmd, 3);
    var r = bat.ppIf(DebugJS.BAT_TKN_IF, cnd, cmd);
    if (r.err) break;
    if (r.cond) {
      ctrl.block.push({t: DebugJS.BAT_TKN_IF});
      break;
    }
  }
  ctrl.pc = pc;
};
DebugJS.bat.findEndOfBlock = function(type, pc) {
  var bat = DebugJS.bat;
  var l = pc;
  var ignoreBlkLv = 0;
  var data = {l: 0, endTkn: DebugJS.BAT_TKN_BLOCK_END};
  while (l <= bat.ctrl.endPc) {
    var cmd = bat.cmds[l];
    var c = DebugJS.splitCmdLineInTwo(cmd)[0];
    if (DebugJS.unifySP(DebugJS.delLeadingAndTrailingSP(cmd)).match(DebugJS.RE_ELIF)) {
      if (ignoreBlkLv == 0) {
        if (type == DebugJS.BAT_TKN_ELIF) {
          data.endTkn = DebugJS.BAT_TKN_ELIF;
          break;
        }
      }
    } else if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
      if (ignoreBlkLv == 0) {
        if ((type == DebugJS.BAT_TKN_IF) || (type == DebugJS.BAT_TKN_ELIF)) {
          data.endTkn = DebugJS.BAT_TKN_ELSE;
          break;
        }
      }
    } else if (DebugJS.delLeadingAndTrailingSP(cmd) == DebugJS.BAT_TKN_BLOCK_END) {
      if (ignoreBlkLv == 0) {
        break;
      }
      ignoreBlkLv--;
    } else if ((c == DebugJS.BAT_TKN_IF) || (c == DebugJS.BAT_TKN_LOOP)) {
      ignoreBlkLv++;
    }
    l++;
  }
  if (l > bat.ctrl.endPc) {
    DebugJS._log.e('End of block "' + DebugJS.BAT_TKN_BLOCK_END + '" not found');
    DebugJS._log.e('L' + pc + ': ' + bat.cmds[pc - 1]);
  }
  data.l = l;
  return data;
};
DebugJS.bat.findEndOfFnc = function(pc) {
  var blkLv = 0;
  while (pc <= DebugJS.bat.ctrl.endPc) {
    var cmd = DebugJS.bat.cmds[pc];
    var c = DebugJS.splitCmdLineInTwo(cmd)[0];
    var l = DebugJS.bat.nextExecLine(pc);
    if (l != pc) {
      pc = l;
      continue;
    }
    if ((c == DebugJS.BAT_TKN_IF) || (c == DebugJS.BAT_TKN_LOOP)) {
      blkLv++;
    } else if (DebugJS.delLeadingAndTrailingSP(cmd) == DebugJS.BAT_TKN_BLOCK_END) {
      blkLv--;
    } else if (c == DebugJS.BAT_TKN_RET) {
      if (blkLv == 0) break;
    }
    pc++;
  }
  return pc;
};
DebugJS.bat.execJs = function() {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  var pure = (ctrl.js == 1);
  var js = '';
  while ((ctrl.pc >= ctrl.startPc) && (ctrl.pc <= ctrl.endPc)) {
    c = bat.cmds[ctrl.pc];
    ctrl.pc++;
    DebugJS.ctx.updateCurPc();
    if (!DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_JS)) {
      if (!pure) {
        c = DebugJS.replaceCmdVals(c);
      }
      js += c + '\n';
    }
    if (DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_JS) || (ctrl.pc > ctrl.endPc)) {
      try {
        eval(js);
      } catch (e) {
        DebugJS._log.e(e);
      }
      ctrl.js = 0;
      return;
    }
  }
};
DebugJS.bat.text = function() {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  var txt = '';
  while ((ctrl.pc >= ctrl.startPc) && (ctrl.pc <= ctrl.endPc)) {
    c = bat.cmds[ctrl.pc];
    ctrl.pc++;
    DebugJS.ctx.updateCurPc();
    if (!DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_TXT)) {
      txt += c + '\n';
    }
    if (DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_TXT) || (ctrl.pc > ctrl.endPc)) {
      DebugJS.ctx.CMDVALS['%TEXT%'] = txt;
      return;
    }
  }
};
DebugJS.bat.ppEcho = function(c) {
  if (DebugJS.bat.ctrl.echo && !DebugJS.bat.ctrl.tmpEchoOff) {
    DebugJS._log.s(c);
  }
};
DebugJS.bat.ret = function(arg) {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (bat.isCmdExecutable()) {
    var fnCtx = ctrl.stack.pop();
    if (!fnCtx) {
      bat.syntaxErr('Illegal return statement');
      return;
    }
    try {
      DebugJS.ctx.CMDVALS['%RET%'] = eval(arg);
    } catch (e) {
      DebugJS._log.e(e);
      return;
    }
    DebugJS.ctx.CMDVALS['%ARG%'] = fnCtx.fnArg;
    ctrl.fnArg = fnCtx.fnArg;
    ctrl.block = fnCtx.block;
    ctrl.lr = fnCtx.lr;
    ctrl.pc = ctrl.lr;
    bat.setLabel(fnCtx.label);
    bat.setFnNm(fnCtx.fnnm);
  }
};
DebugJS.bat.syntaxErr = function(c) {
  DebugJS._log.e('BAT SyntaxError: ' + c);
};
DebugJS.bat.lock = function() {
  DebugJS.bat.ctrl.lock++;
};
DebugJS.bat.unlock = function() {
  var ctrl = DebugJS.bat.ctrl;
  ctrl.lock--;
  if (ctrl.lock < 0) {
    ctrl.lock = 0;
  }
};
DebugJS.bat.isLocked = function() {
  return (DebugJS.bat.ctrl.lock != 0);
};
DebugJS.bat.list = function(s, e) {
  var l = '';
  var pc = DebugJS.bat.ctrl.pc;
  var js = false;
  var cmds = DebugJS.bat.cmds;
  var len = cmds.length;
  if ((s == undefined) || (s == '*')) {
    s = 0;
    e = len;
  } else {
    s -= 1;
    if (s < 0) s = 0;
    if (e == undefined) {
      e = s + 1;
    }
  }
  if ((e > len) || (e == '*')) {
    e = len;
  }
  s |= 0; e |= 0;
  if ((s == 0) && (e == len) && (pc == 0)) {l += '>\n';}
  for (var i = 0; i < len; i++) {
    var cmd = cmds[i];
    var n = i + 1;
    var df = DebugJS.digits(len) - DebugJS.digits(n);
    var pdng = '';
    for (var j = 0; j < df; j++) {
      pdng += '0';
    }
    if (DebugJS.startsWith(DebugJS.delLeadingSP(cmd), DebugJS.BAT_TKN_JS)) {
      if (!js) {
        l += '<span style="color:#0ff">';
      }
    }
    if ((i >= s) && (i < e)) {
      if (i == pc - 1) {
        l += '>';
      } else {
        l += ' ';
      }
      l += ' ' + pdng + n + ': ' + cmd + '\n';
    }
    if (DebugJS.startsWith(DebugJS.delLeadingSP(cmd), DebugJS.BAT_TKN_JS)) {
      if (js) {
        l += '</span>';
        js = false;
      } else {
        js = true;
      }
    }
  }
  if (js) l += '</span>';
  return l;
};
DebugJS.bat.pause = function() {
  DebugJS.ctx.status |= DebugJS.ST_BAT_PAUSE;
  DebugJS.ctx.updateBatRunBtn();
};
DebugJS.bat.resume = function(key) {
  var bat = DebugJS.bat;
  if (key == undefined) {
    bat._resume();
  } else {
    if (bat.ctrl.pauseKey == '') {
      bat._resume('cmd-key', key);
    } else {
      if (bat.ctrl.pauseKey != null) {
        if (DebugJS.hasKeyWd(DebugJS.delAllSP(bat.ctrl.pauseKey), key, '|')) {
          bat._resume('cmd-key', key);
        }
      }
    }
  }
};
DebugJS.bat._resume = function(trigger, key, to, fmCnd) {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (trigger) {
    var resumed = false;
    if (trigger == 'cmd') {
      if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
        ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD;
        ctx.updateBatResumeBtn();
        resumed = true;
      }
    } else if (trigger == 'cmd-key') {
      if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
        ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD_KEY;
        ctrl.pauseKey = null;
        ctx.CMDVALS['%RESUMED_KEY%'] = (key == undefined ? '' : key);
        ctx.updateBatResumeBtn();
        resumed = true;
      }
    }
    if (resumed) ctrl.pauseTimeout = 0;
    var msg;
    if (resumed) {
      ctrl.pauseKey = null;
      msg = 'Resumed.';
      if (to) msg += ' (timed out)';
      if (key != undefined) msg += ' (' + key + ')';
    } else {
      if (!fmCnd) msg = 'not paused.';
    }
    if (msg) DebugJS._log(msg);
  } else {
    ctx.status &= ~DebugJS.ST_BAT_PAUSE;
    ctx.updateBatRunBtn();
  }
  bat.stopNext();
  if (bat.isRunning()) {
    ctrl.tmid = setTimeout(bat.exec, 0);
  }
};
DebugJS.bat.stopNext = function() {
  if (DebugJS.bat.ctrl.tmid > 0) {
    DebugJS.bat.clearTimer();
  }
};
DebugJS.bat.stop = function(c) {
  var ctx = DebugJS.ctx;
  DebugJS.bat._stop(c);
  DebugJS.bat.resetPc();
};
DebugJS.bat._stop = function(st) {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  bat.stopNext();
  bat.ctx = [];
  ctx.updateBatNestLv();
  ctx.status &= ~DebugJS.ST_BAT_BREAK;
  ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD_KEY;
  ctx.updateBatResumeBtn();
  bat.setRunningSt(false);
  ctx.status &= ~DebugJS.ST_BAT_PAUSE;
  ctx.updateBatRunBtn();
  delete ctx.CMDVALS['%%ARG%%'];
  delete ctx.CMDVALS['%ARG%'];
  delete ctx.CMDVALS['%RET%'];
  delete ctx.CMDVALS['%LABEL%'];
  delete ctx.CMDVALS['%FUNCNAME%'];
  delete ctx.CMDVALS['%TEXT%'];
  bat.setExitStatus(st);
  DebugJS.callEvtListener('batstop', ctx.CMDVALS['?']);
};
DebugJS.bat.terminate = function() {
  DebugJS.bat.stop(DebugJS.EXIT_SIG + DebugJS.SIGTERM);
};
DebugJS.bat.cancel = function() {
  DebugJS._log('Canceled.');
  DebugJS.bat.terminate();
  DebugJS.point.init();
};
DebugJS.bat.exit = function() {
  DebugJS.bat.terminate();
  DebugJS.point.init();
  DebugJS.bat.clear();
};
DebugJS.bat.hasBatStopCond = function(key) {
  return DebugJS.hasKeyWd(DebugJS.ctx.props.batstop, key, '|');
};
DebugJS.bat.setPc = function(v, b) {
  DebugJS.bat.ctrl.pc = v;
  DebugJS.ctx.updateCurPc(b);
};
DebugJS.bat.resetPc = function() {
  DebugJS.bat.setPc(0);
};
DebugJS.bat.clear = function() {
  DebugJS.bat.set('');
};
DebugJS.bat.initCtrl = function(all) {
  var ctrl = DebugJS.bat.ctrl;
  ctrl.pc = 0;
  ctrl.lr = 0;
  ctrl.fnArg = undefined;
  ctrl.startPc = 0;
  ctrl.endPc = 0;
  ctrl.tmpEchoOff = false;
  ctrl.block = [];
  ctrl.js = 0;
  ctrl.lock = 0;
  ctrl.conddKey = null;
  ctrl.pauseKey = null;
  ctrl.pauseTimeout = 0;
  ctrl.stopReq = false;
  ctrl.stack = [];
  if (all) {
    ctrl.echo = true;
    ctrl.execArg = '';
    DebugJS.ctx.status &= ~DebugJS.ST_BAT_CONT;
  }
  if (ctrl.tmid > 0) {
    clearTimeout(ctrl.tmid);
    ctrl.tmid = 0;
  }
  DebugJS.bat.setLabel('');
  DebugJS.bat.setFnNm('');
  DebugJS.ctx.updateCurPc();
};
DebugJS.bat.stCtx = function() {
  var bat = DebugJS.bat;
  var ctrl = {};
  DebugJS.deepCopy(bat.ctrl, ctrl);
  var cmds = bat.cmds.slice();
  var batCtx = {
    cmds: cmds,
    ctrl: ctrl,
    labels: bat.labels,
    fncs: bat.fncs
  };
  bat.ctx.push(batCtx);
};
DebugJS.bat.ldCtx = function() {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var batCtx = bat.ctx.pop();
  if (!batCtx) return false;
  DebugJS.deepCopy(batCtx.ctrl, bat.ctrl);
  bat.setExecArg(bat.ctrl.execArg);
  bat.setLabel(bat.ctrl.label);
  bat.setFnNm(bat.ctrl.fnnm);
  bat.cmds = batCtx.cmds;
  bat.labels = batCtx.labels;
  bat.fncs = batCtx.fncs;
  ctx.setBatTxt(ctx);
  ctx.updateTotalLine();
  ctx.updateBatNestLv();
  ctx.updateCurPc();
  bat.next(1);
  return true;
};
DebugJS.bat.save = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var bt = {
    ctrl: DebugJS.bat.ctrl,
    cmds: DebugJS.bat.cmds,
    ctx: DebugJS.bat.ctx,
    vals: DebugJS.ctx.CMDVALS
  };
  var b = JSON.stringify(bt);
  localStorage.setItem('DebugJS-bat', b);
};
DebugJS.bat.load = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var b = localStorage.getItem('DebugJS-bat');
  localStorage.removeItem('DebugJS-bat');
  if (b == null) return;
  var bt = JSON.parse(b);
  var bat = DebugJS.bat;
  bat.ctrl = bt.ctrl;
  bat.cmds = bt.cmds;
  bat.ctx = bt.ctx;
  DebugJS.ctx.CMDVALS = bt.vals;
  bat.setExecArg(bat.ctrl.execArg);
  bat.parseLabelFncs();
  if (DebugJS.ctx.props.batcont == 'on') {
    if (bat.ctrl.pauseKey != null) {
      DebugJS.ctx._cmdPause('key', bat.ctrl.pauseKey, 0);
    }
    bat.setRunningSt(true);
    bat.exec();
  }
};
DebugJS.bat.setRunningSt = function(f) {
  var ctx = DebugJS.ctx;
  if (f) {
    ctx.status |= DebugJS.ST_BAT_RUNNING;
    if (ctx.props.batcont == 'on') {
      ctx.status |= DebugJS.ST_BAT_CONT;
    }
  } else {
    ctx.status &= ~DebugJS.ST_BAT_RUNNING;
    ctx.status &= ~DebugJS.ST_BAT_CONT;
  }
};
DebugJS.bat.isRunning = function() {
  return ((DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) ? true : false);
};
DebugJS.bat.isCmdExecutable = function() {
  if (DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) {
    return true;
  }
  DebugJS._log('BAT dedicated command');
  return false;
};
DebugJS.bat.status = function() {
  var ctx = DebugJS.ctx;
  var st = 'STOPPED';
  if (ctx.status & DebugJS.ST_BAT_PAUSE) {
    st = 'PAUSED';
  } else if ((ctx.status & DebugJS.ST_BAT_PAUSE_CMD) ||
             (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY)) {
    st = 'PAUSED2';
  } else if (ctx.status & DebugJS.ST_BAT_RUNNING) {
    st = 'RUNNING';
  }
  return st;
};
DebugJS.bat.getPauseKey = function() {
  return DebugJS.bat.ctrl.pauseKey;
};
DebugJS.bat.getCondKey = function() {
  return DebugJS.bat.ctrl.condKey;
};
DebugJS.bat.setCond = function(key) {
  var bat = DebugJS.bat;
  if (DebugJS.hasKeyWd(bat.ctrl.condKey, key, '|')) {
    bat._resume('cmd-key', key, false, true);
    bat.ctrl.condKey = null;
  }
};
DebugJS.bat._initCond = function() {
  var bat = DebugJS.bat;
  if (bat.ctrl.condKey == null) return;
  if (bat.ctrl.pauseKey == bat.ctrl.condKey) {
    bat._resume('cmd-key');
  }
  bat.ctrl.condKey = null;
};
DebugJS.bat.getSymbols = function(t, p) {
  var a = [];
  var re = null;
  if (p) {
    try {
      var cnd = eval('/' + p + '/');
    } catch (e) {
      DebugJS._log.e('Get symbols error (' + e + ')');
      return a;
    }
    re = new RegExp(cnd);
  }
  var o = (t == 'function' ? DebugJS.bat.fncs : DebugJS.bat.labels);
  for (var k in o) {
    if ((!re) || ((re) && (k.match(re)))) {
      a.push(k);
    }
  }
  return a;
};
DebugJS.bat.nestLv = function() {
  return DebugJS.bat.ctx.length;
};
DebugJS.bat.isAvailable = function() {
  return DebugJS.bat.cmds.length > 0;
};
DebugJS.isBat = function(s) {
  var BAT_HEAD = '#!BAT!';
  if (DebugJS.startsWith(s, BAT_HEAD)) {
    return true;
  }
  return false;
};

DebugJS.led = function(v) {
  DebugJS.ctx.setLed(v);
};
DebugJS.led.on = function(pos) {
  DebugJS.ctx.turnLed(pos, true);
};
DebugJS.led.off = function(pos) {
  DebugJS.ctx.turnLed(pos, false);
};
DebugJS.led.val = function() {
  return DebugJS.ctx.led;
};

DebugJS.msg = function(val) {
  DebugJS.ctx.setMsg(val);
};
DebugJS.msg.clear = function() {
  DebugJS.ctx.setMsg('');
};

DebugJS.point = function(x, y) {
  x += ''; y += '';
  var point = DebugJS.point;
  if (point.ptr == null) point.createPtr();
  if (x.charAt(0) == '+') {
    point.x += (x.substr(1) | 0);
  } else if (x.charAt(0) == '-') {
    point.x -= (x.substr(1) | 0);
  } else {
    point.x = x | 0;
  }
  if (y.charAt(0) == '+') {
    point.y += (y.substr(1) | 0);
  } else if (y.charAt(0) == '-') {
    point.y -= (y.substr(1) | 0);
  } else {
    point.y = y | 0;
  }
  var ptr = point.ptr;
  ptr.style.top = point.y + 'px';
  ptr.style.left = point.x + 'px';
  document.body.appendChild(ptr);
  point.hint.move();
  if (DebugJS.ctx.props.mousemovesim == 'true') {
    var e = DebugJS.event.create('mousemove');
    e.clientX = point.x;
    e.clientY = point.y;
    var el = point.getElementFromCurrentPos();
    if (el) {
      el.dispatchEvent(e);
    } else {
      window.dispatchEvent(e);
    }
  }
};
DebugJS.point.ptr = null;
DebugJS.point.ptrW = 12;
DebugJS.point.ptrH = 19;
DebugJS.point.x = 0;
DebugJS.point.y = 0;
DebugJS.point.d = false;
DebugJS.point.CURSOR_DFLT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAMAAACTKxybAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD9QTFRFCwsY9PT3S0xX1tbYKCg04eHjLCw4wsLJMzM/zs7S+Pn7Q0ROs7S86OjqLi468PDzYWJsGBgkQkNN////////FEPnZwAAABV0Uk5T//////////////////////////8AK9l96gAAAF5JREFUeNpMzlcOwDAIA1Cyulcw9z9rQ0aLv3iSZUFZ/lBmC7DFL8WniqGGro6mgY0NcLMBTjZA4gpXBjQKRwf2vuZIJqSpotziZ3gFkxYiwlXQvvIByweJzyryCjAA+AIPnHnE+0kAAAAASUVORK5CYII=';
DebugJS.point.CURSOR_PTR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAMAAADAi10DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJZQTFRF////EhQmHyIzPkBPT1Be+fn68fHywcHHFxorWltovr/E4+PmUlNgLS8//Pz8GRwuqquyFBcpSUtZeHqEa2x35ubo6enrQENRw8TKnJ6lTE5bc3R/9/f3paatRkhWKyw8NThHhoiRtra8lJWdFBYo1dbZKi092NjbFxkrMDJCMjVE0NDUx8jM9PT1ZWZyoqOqOz1M////QATI2QAAADJ0Uk5T/////////////////////////////////////////////////////////////////wANUJjvAAAAoUlEQVR42ozQ1xKDIBAF0GuwYO+a3nvn/38uChGFvOTODrNzXpZdMB7TZTIQ4mxdjfaRRTUyAOM/ehY/lCyKmqjU1NwPCVFo1LyPcqVRq5IosNaoBGzA4xRQTjIGAs/OU5WmY8C5KsSOFVCpxDJrALDO7cTZkPyQf+I1oEQsFJ96Wn53JHYnk+4S7HLjEG1SSSzO7wdnV/f3apO9TdF8BBgAC6AoMWCQ0+8AAAAASUVORK5CYII=';
DebugJS.point.CURSOR_TXT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAMAAADtX5XCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAGElEQVR42mJgYGBgZAARjIx0xVB7AQIMABYAAFfcyzDzAAAAAElFTkSuQmCC';
DebugJS.point.createPtr = function() {
  var point = DebugJS.point;
  point.x = 0;
  point.y = 0;
  var ptr = document.createElement('img');
  ptr.style.position = 'fixed';
  ptr.style.width = point.ptrW + 'px';
  ptr.style.height = point.ptrH + 'px';
  ptr.style.top = point.y;
  ptr.style.left = point.x;
  ptr.style.zIndex = 0x7ffffffe;
  ptr.src = point.CURSOR_DFLT;
  ptr.onmousedown = point.startDragging;
  document.body.appendChild(ptr);
  point.ptr = ptr;
};
DebugJS.point.init = function() {
  var point = DebugJS.point;
  point(0, 0);
  point.cursor();
  point.hint.clear();
  point.hide();
};
DebugJS.point.show = function() {
  var point = DebugJS.point;
  var ptr = point.ptr;
  if (ptr == null) {
    point.createPtr();
  } else {
    document.body.appendChild(ptr);
  }
  if (point.hint.st.visible) {
    point.hint.show();
  }
};
DebugJS.point.hide = function() {
  var ptr = DebugJS.point.ptr;
  if ((ptr != null) && (ptr.parentNode)) {
    document.body.removeChild(ptr);
  }
  DebugJS.point.hint.hide(true);
};
DebugJS.point.cursor = function(src, w, h) {
  var point = DebugJS.point;
  if (point.ptr == null) {
    point.createPtr();
  }
  if (!src) {
    src = point.CURSOR_DFLT;
  } else if (src == 'pointer') {
    src = point.CURSOR_PTR;
  } else if (src == 'text') {
    src = point.CURSOR_TXT;
  } else if (src == 'none') {
    src = point.CURSOR_DFLT;
    w = 0;
    h = 0;
  }
  if (w == undefined) {
    w = '';
  } else {
    w += 'px';
  }
  if (h == undefined) {
    h = '';
  } else {
    h += 'px';
  }
  point.ptr.src = src;
  point.ptr.style.width = w;
  point.ptr.style.height = h;
};
DebugJS.point.event = function(args) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var type = DebugJS.getArgVal(args, 0);
  var opts = DebugJS.getOptVals(args);
  var e = DebugJS.event.create(type);
  e.clientX = DebugJS.point.x;
  e.clientY = DebugJS.point.y;
  for (var k in opts) {
    try {
      e[k] = eval(opts[k]);
    } catch (e) {
      DebugJS._log.e('Set property error (' + e + ')');
    }
  }
  return el.dispatchEvent(e);
};
DebugJS.point.simpleEvent = function(type, opt) {
  var point = DebugJS.point;
  var el = point.getElementFromCurrentPos();
  if (!el) return;
  switch (type) {
    case 'click':
      point.click(0, el, opt);
      break;
    case 'cclick':
      point.click(1, el, opt);
      break;
    case 'rclick':
      point.click(2, el, opt);
      break;
    case 'dblclick':
      point.dblclick(el, opt);
      break;
    case 'focus':
      point.focus(el);
      break;
    case 'blur':
      point.blur(el);
      break;
    case 'change':
      DebugJS.dispatchChangeEvt(el);
      break;
    case 'contextmenu':
      point.contextmenu(el);
      break;
    case 'mousedown':
    case 'mouseup':
      point.mouseevt(el, type, opt);
  }
};
DebugJS.point.click = function(button, target, speed, cb) {
  var click = DebugJS.point.click;
  if (click.tmid[button] > 0) {
    clearTimeout(click.tmid[button]);
    click.tmid[button] = 0;
    DebugJS.point.clickUp(button);
  }
  DebugJS.bat.lock();
  click.target[button] = target;
  click.cb = cb;
  DebugJS.point.mouseevt(target, 'mousedown', button);
  var el = DebugJS.findFocusableEl(target);
  if (el != null) el.focus();
  if (speed == undefined) speed = 100;
  click.tmid[button] = setTimeout('DebugJS.point.clickUp(' + button + ')', speed);
};
DebugJS.point.dblclick = function(target, speed) {
  var data = DebugJS.point.dblclick.data;
  if (data.cnt > 1) {
    if (data.tmid > 0) {
      clearTimeout(data.tmid);
      data.tmid = 0;
    }
    data.cnt = 0;
    DebugJS.bat.unlock();
  }
  if (speed == undefined) speed = 100;
  var clickcpeed = speed / 2 | 0;
  data.target = target;
  data.cnt = 0;
  data.speed = speed;
  DebugJS.bat.lock();
  DebugJS.point._dblclick();
};
DebugJS.point._dblclick = function() {
  var data = DebugJS.point.dblclick.data;
  var clickcpeed = data.speed / 2 | 0;
  DebugJS.point.click(0, data.target, clickcpeed, DebugJS.point.dblclick.onDone);
};
DebugJS.point.dblclick.onDone = function() {
  var data = DebugJS.point.dblclick.data;
  data.tmid = 0;
  data.cnt++;
  if (data.cnt < 2) {
    data.tmid = setTimeout(DebugJS.point._dblclick, data.speed);
  } else {
    DebugJS.point.mouseevt(data.target, 'dblclick', 0);
    data.cnt = 0;
    DebugJS.bat.unlock();
  }
};
DebugJS.point.dblclick.data = {
  target: null,
  tmid: 0,
  cnt: 0,
  speed: 0
};
DebugJS.point.clickUp = function(n) {
  var click = DebugJS.point.click;
  var target = click.target[n];
  click.tmid[n] = 0;
  DebugJS.point.mouseevt(target, 'mouseup', n);
  switch (n) {
    case 0:
      if (!click.invalid) {
        target.click();
      }
      click.invalid = false;
      break;
    case 1:
      if (click.tmid[0] > 0) {
        click.invalid = true;
      }
      break;
    case 2:
      DebugJS.point.contextmenu(target);
      if (click.tmid[0] > 0) {
        click.invalid = true;
      }
  }
  click.target[n] = null;
  DebugJS.bat.unlock();
  if (click.cb) {
    click.cb();
    click.cb = null;
  }
};
DebugJS.point.click.target = [null, null, null];
DebugJS.point.click.tmid = [0, 0, 0];
DebugJS.point.click.invalid = false;
DebugJS.point.click.cb = null;
DebugJS.point.focus = function(el) {
  el.focus();
};
DebugJS.point.blur = function(el) {
  el.blur();
};
DebugJS.point.contextmenu = function(el) {
  var e = DebugJS.event.create('contextmenu');
  el.dispatchEvent(e);
};
DebugJS.point.mouseevt = function(el, ev, b) {
  var e = DebugJS.event.create(ev);
  e.button = b | 0;
  e.clientX = DebugJS.point.x;
  e.clientY = DebugJS.point.y;
  el.dispatchEvent(e);
};
DebugJS.point.keyevt = function(args) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var ev = args[0];
  var e = DebugJS.event.create(ev);

  var keyCode = DebugJS.getOptVal(args, 'keyCode');
  if (keyCode != null) {e.keyCode = keyCode | 0;}

  var code = DebugJS.getOptVal(args, 'code');
  if (code != null) e.code = code;

  var key = DebugJS.getOptVal(args, 'key');
  if (key != null) e.key = key;

  e.shiftKey = false;
  e.ctrlKey = false;
  e.altKey = false;
  e.metaKey = false;
  e = DebugJS.point.setKeyFlag(e, args);

  el.dispatchEvent(e);
};
DebugJS.point.setKeyFlag = function(e, a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] == '-s') e.shiftKey = true;
    if (a[i] == '-c') e.ctrlKey = true;
    if (a[i] == '-a') e.altKey = true;
    if (a[i] == '-m') e.metaKey = true;
  }
  return e;
};
DebugJS.point.getElementFromCurrentPos = function() {
  var ctx = DebugJS.ctx;
  var point = DebugJS.point;
  var ptr = point.ptr;
  var hide = false;
  var cmdActive = (document.activeElement == ctx.cmdLine);
  if ((ptr == null) || (!ptr.parentNode)) {
    return null;
  }
  var hint = point.hint.area;
  var hintFlg = false;
  if (hint && (hint.parentNode)) {
    hintFlg = true;
    ctx.bodyEl.removeChild(hint);
  }
  ctx.bodyEl.removeChild(ptr);
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    if (ctx.isOnDbgWin(point.x, point.y)) {
      hide = true;
      ctx.bodyEl.removeChild(ctx.win);
    }
  }
  var el = document.elementFromPoint(point.x, point.y);
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    if (hide) {
      ctx.bodyEl.appendChild(ctx.win);
      ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      if (cmdActive) ctx.cmdLine.focus();
    }
  }
  ctx.bodyEl.appendChild(ptr);
  if (hintFlg) {
    ctx.bodyEl.appendChild(hint);
  }
  return el;
};
DebugJS.point.getProp = function(prop) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var p = prop.split('.');
  var v = el;
  for (var i = 0; i < p.length; i++) {
    v = v[p[i]];
  }
  DebugJS._log(DebugJS.styleValue(v));
  return v;
};
DebugJS.point.setProp = function(prop, val, echo) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  try {
    var v = eval(val);
  } catch (e) {
    DebugJS._log.e(e);
    return;
  }
  var p = prop.split('.');
  var e = el;
  for (var i = 0; i < (p.length - 1); i++) {
    e = e[p[i]];
  }
  e[p[(p.length - 1)]] = v;
  if (echo) DebugJS._log.res(v);
};
DebugJS.point.verify = function(prop, method, exp, label) {
  var test = DebugJS.test;
  var st = test.STATUS_ERR;
  var info;
  var errPfix = 'Verify error: ';
  if (prop == undefined) {
    info = errPfix + 'Property name is undefined';
    DebugJS._log.e(info);
    test.addResult(st, label, exp, undefined, method, info);
    test.onVrfyAftr(st);
    return st;
  }
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) {
    info = errPfix + 'No element (x=' + DebugJS.point.x + ', y=' + DebugJS.point.y + ')';
    DebugJS._log.e(info);
    test.addResult(st, label, exp, undefined, method, info);
    test.onVrfyAftr(st);
    return st;
  }
  var p = prop.split('.');
  var got = el;
  for (var i = 0; i < p.length; i++) {
    got = got[p[i]];
  }
  return test.verify(got, method, exp, false, label);
};
DebugJS.point.move = function(x, y, speed, step) {
  x += ''; y += '';
  var point = DebugJS.point;
  var dst = point.move.dstPos;
  if (x.charAt(0) == '+') {
    dst.x = point.x + (x.substr(1) | 0);
  } else if (x.charAt(0) == '-') {
    dst.x = point.x - (x.substr(1) | 0);
  } else {
    dst.x = x | 0;
  }
  if (y.charAt(0) == '+') {
    dst.y = point.y + (y.substr(1) | 0);
  } else if (y.charAt(0) == '-') {
    dst.y = point.y - (y.substr(1) | 0);
  } else {
    dst.y = y | 0;
  }
  if (dst.x < 0) dst.x = 0;
  if (dst.y < 0) dst.y = 0;
  if ((speed == null) || (speed == undefined) || (speed == 'auto')) {
    speed = DebugJS.ctx.props.pointspeed;
  }
  speed |= 0;
  if (speed == 0) {
    point(x, y);
  }
  if ((step == null) || (step == undefined) || (step == 'auto')) {
    step = DebugJS.ctx.props.pointstep;
  }
  step |= 0;
  point.move.speed = speed;
  if (dst.x >= point.x) {
    point.move.mvX = step;
  } else {
    point.move.mvX = step * (-1);
  }
  if (dst.y >= point.y) {
    point.move.mvY = step;
  } else {
    point.move.mvY = step * (-1);
  }
  if (point.move.tmid > 0) {
    DebugJS.bat.unlock();
    clearTimeout(point.move.tmid);
    point.move.tmid = 0;
  }
  DebugJS.bat.lock();
  point._move();
};
DebugJS.point.move.dstPos = {x: 0, y: 0};
DebugJS.point.move.speed = 10;
DebugJS.point.move.step = 10;
DebugJS.point.move.tmid = 0;
DebugJS.point.move.cb = null;
DebugJS.point._move = function() {
  var point = DebugJS.point;
  var move = point.move;
  move.tmid = 0;
  if ((move.mvX == 0) && (move.mvY == 0)) {
    DebugJS.bat.unlock();
    return;
  }
  var dst = move.dstPos;
  var mvX = move.mvX;
  var mvY = move.mvY;
  var x = point.x + mvX;
  var y = point.y + mvY;

  if (mvX < 0) {
    if (x < dst.x) {
      x = dst.x;
    }
  } else {
    if (x > dst.x) {
      x = dst.x;
    }
  }

  if (mvY < 0) {
    if (y < dst.y) {
      y = dst.y;
    }
  } else {
    if (y > dst.y) {
      y = dst.y;
    }
  }

  point(x, y);
  if ((x == dst.x) && (y == dst.y)) {
    DebugJS.bat.unlock();
    if (move.cb) {
      setTimeout(move.cb, 10);
      move.cb = null;
    }
  } else {
    move.tmid = setTimeout(point._move, move.speed);
  }
};
DebugJS.point.move.stop = function() {
  if (DebugJS.point.move.tmid > 0) {
    clearTimeout(DebugJS.point.move.tmid);
    DebugJS.point.move.tmid = 0;
    DebugJS.bat.unlock();
  }
};
DebugJS.point.startDragging = function() {
  DebugJS.point.d = true;
  DebugJS.point.ptr.style.cursor = 'move';
};
DebugJS.point.endDragging = function() {
  DebugJS.point.d = false;
  DebugJS.point.ptr.style.cursor = 'auto';
};
DebugJS.point.drag = function(arg) {
  var data = DebugJS.point.drag.data;
  DebugJS.point.drag.cancel();
  data.step = 0;
  data.arg = arg;
  data.mousemovesim = DebugJS.ctx.props.mousemovesim;
  DebugJS.ctx.props.mousemovesim = 'true';
  DebugJS.bat.lock();
  DebugJS.point.drag.proc();
};
DebugJS.point.drag.data = {
  step: 0,
  arg: null,
  mousemovesim: undefined
};
DebugJS.point.drag.proc = function() {
  var point = DebugJS.point;
  var drag = point.drag;
  var data = drag.data;
  drag.data.step++;
  switch (data.step) {
    case 1:
      point.simpleEvent('mousedown', 0);
      setTimeout(drag.proc, 10);
      break;
    case 2:
      point.move.cb = drag.proc;
      DebugJS.ctx.cmdPoint('move ' + data.arg);
      break;
    case 3:
      point.simpleEvent('mouseup', 0);
      drag.stop();
  }
};
DebugJS.point.drag.cancel = function() {
  if (DebugJS.point.drag.data.step == 2) {
    DebugJS.point.move.stop();
  }
  DebugJS.point.drag.stop();
};
DebugJS.point.drag.stop = function() {
  var data = DebugJS.point.drag.data;
  data.arg = null;
  data.step = 0;
  if (data.mousemovesim != undefined) {
    DebugJS.ctx.props.mousemovesim = data.mousemovesim;
  }
  DebugJS.bat.unlock();
};

DebugJS.pointBySelector = function(selector, idx, alignX, alignY) {
  var el = DebugJS.getElement(selector, idx);
  if (!el) {
    DebugJS._log.e(selector + (selector.charAt(0) == '#' ? '' : (idx == undefined ? '' : ' [' + idx + ']')) + ': Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  DebugJS.scrollWinToTarget(ps);
  ps = DebugJS.getElPosSize(selector, idx);
  DebugJS.pointTarget(ps, alignX, alignY);
};
DebugJS.pointByLabel = function(label, idx, alignX, alignY) {
  var el = DebugJS.getLabelEl(label, idx);
  if (!el) {
    DebugJS._log.e(label + ' [' + idx + ']: Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  DebugJS.scrollWinToTarget(ps);
  el = DebugJS.getLabelEl(label, idx);
  ps = DebugJS.getElPosSize(el);
  DebugJS.pointTarget(ps, alignX, alignY);
};
DebugJS.pointTarget = function(ps, alignX, alignY) {
  if (alignX == undefined) alignX = 0.5;
  if (alignY == undefined) alignY = 0.5;
  var p = DebugJS.getAlignedPos(ps, alignX, alignY);
  DebugJS.point(p.x, p.y);
};

DebugJS.getCenterPos = function(ps) {
  return DebugJS.getAlignedPos(ps, 0.5, 0.5);
};
DebugJS.getAlignedPos = function(ps, alignX, alignY) {
  var x = ps.x;
  var y = ps.y;
  if (ps.w > 1) x = x + ps.w * alignX;
  if (ps.h > 1) y = y + ps.h * alignY;
  return {x: x, y: y};
};

DebugJS.point.moveToSelector = function(selector, idx, speed, step, alignX, alignY) {
  var data = {
    selector: selector,
    idx: idx,
    speed: speed,
    step: step,
    alignX: alignX,
    alignY: alignY
  };
  var ps = DebugJS.getElPosSize(selector, idx);
  if (!ps) {
    DebugJS._log.e(selector + (selector.charAt(0) == '#' ? '' : (idx == undefined ? '' : ' [' + idx + ']')) + ': Element not found');
    return;
  }
  if (DebugJS.scrollWinToTarget(ps, DebugJS.ctx.props.scrollspeed, DebugJS.ctx.props.scrollstep, DebugJS.point._moveToSelector, data)) {
    return;
  }
  DebugJS.point._moveToSelector(data);
};
DebugJS.point._moveToSelector = function(data) {
  var el = DebugJS.getElement(data.selector, data.idx);
  var ps = DebugJS.getElPosSize(el);
  if (data.alignX == undefined) data.alignX = 0.5;
  if (data.alignY == undefined) data.alignY = 0.5;
  DebugJS.point.moveToElement(ps, data.speed, data.step, data.alignX, data.alignY);
};

DebugJS.point.moveToLabel = function(label, idx, speed, step, alignX, alignY) {
  var data = {
    label: label,
    idx: idx,
    speed: speed,
    step: step,
    alignX: alignX,
    alignY: alignY
  };
  var el = DebugJS.getLabelEl(label, idx);
  if (!el) {
    DebugJS._log.e(label + ' [' + idx + ']: Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  if (DebugJS.scrollWinToTarget(ps, DebugJS.ctx.props.scrollspeed, DebugJS.ctx.props.scrollstep, DebugJS.point._moveToLabel, data)) {
    return;
  }
  DebugJS.point._moveToLabel(data);
};
DebugJS.point._moveToLabel = function(data) {
  var el = DebugJS.getLabelEl(data.label, data.idx);
  var ps = DebugJS.getElPosSize(el);
  if (data.alignX == undefined) data.alignX = 0.5;
  if (data.alignY == undefined) data.alignY = 0.5;
  DebugJS.point.moveToElement(ps, data.speed, data.step, data.alignX, data.alignY);
};

DebugJS.point.moveToElement = function(ps, speed, step, alignX, alignY) {
  if (ps) {
    var p = DebugJS.getAlignedPos(ps, alignX, alignY);
    if (p) {
      DebugJS.point.move(p.x, p.y, speed, step);
    }
  }
};

DebugJS.point.hint = function(msg) {
  var BTN_PREFIX = '<span class="' + DebugJS.ctx.id + '-btn ' + DebugJS.ctx.id + '-nomove" ';
  var BTN_SUFFIX = '</span>';
  var RESUME = BTN_PREFIX + 'onclick="DebugJS.ctx.batResume();">[RESUME]' + BTN_SUFFIX;
  var STOP = BTN_PREFIX + 'onclick="DebugJS.bat.cancel();">[STOP]' + BTN_SUFFIX;
  var CLOSE = BTN_PREFIX + 'onclick="DebugJS.point.hide();">[CLOSE]' + BTN_SUFFIX;
  var hint = DebugJS.point.hint;
  if (hint.area == null) {
    hint.createArea();
  }
  var area = hint.area;
  var reg = /\\n/g;
  try {
    msg = eval(msg) + '';
  } catch (e) {
    msg = e + '';
  }
  msg = msg.replace(reg, '\n');
  msg = msg.replace(/!RESUME!/g, RESUME);
  msg = msg.replace(/!STOP!/g, STOP);
  if (msg.match(/!TEST_COUNT!/)) msg = msg.replace(/!TEST_COUNT!/g, DebugJS.test.getCountStr(DebugJS.test.getSumCount()));
  if (msg.match(/!TEST_RESULT!/)) msg = msg.replace(/!TEST_RESULT!/g, DebugJS.test.result());
  msg = msg.replace(/!CLOSE!/g, CLOSE);
  hint.pre.innerHTML = msg;
  hint.st.hasMsg = true;
  hint.show();
};
DebugJS.point.hint.area = null;
DebugJS.point.hint.pre = null;
DebugJS.point.hint.st = {
  visible: false,
  hasMsg: false
};
DebugJS.point.hint.createArea = function() {
  var ctx = DebugJS.ctx;
  var hint = DebugJS.point.hint;
  var el = document.createElement('div');
  el.className = ctx.id + '-hint';
  var pre = document.createElement('pre');
  ctx.setStyle(pre, 'width', 'auto');
  ctx.setStyle(pre, 'height', 'auto');
  ctx.setStyle(pre, 'margin', 0);
  ctx.setStyle(pre, 'padding', 0);
  ctx.setStyle(pre, 'line-height', '1.2');
  ctx.setStyle(pre, 'color', ctx.opt.fontColor);
  ctx.setStyle(pre, 'font-size', '12px');
  ctx.setStyle(pre, 'font-family', ctx.opt.fontFamily);
  el.appendChild(pre);
  hint.pre = pre;
  document.body.appendChild(el);
  hint.area = el;
};
DebugJS.point.hint.move = function() {
  var point = DebugJS.point;
  var area = point.hint.area;
  if (!area) return;
  var clientW = document.documentElement.clientWidth;
  var clientH = document.documentElement.clientHeight;
  var ps = DebugJS.getElPosSize(area);
  var y = (point.y - ps.h - 2);
  if (y < 0) {
    if (ps.h > point.y) {
      y = point.y + point.ptrH;
    } else {
      y = 0;
    }
  }
  var x = point.x;
  if (x < 0) {
    x = 0;
  }
  if ((y + ps.h) > point.y) {
    x = point.x + point.ptrW;
  }
  if ((x + ps.w) > clientW) {
    if (ps.w < clientW) {
      x = clientW - ps.w;
    } else {
      x = 0;
    }
  }
  if ((y + ps.h) > clientH) {
    if (ps.h < clientH) {
      y = clientH - ps.h;
    } else {
      y = 0;
    }
  }
  area.style.top = y + 'px';
  area.style.left = x + 'px';
};
DebugJS.point.hint.show = function() {
  var point = DebugJS.point;
  var hint = point.hint;
  if (!hint.st.hasMsg) return;
  var area = hint.area;
  if (area == null) {
    hint.createArea();
  } else {
    document.body.appendChild(area);
  }
  hint.st.visible = true;
  hint.move();
};
DebugJS.point.hint.hide = function(hold) {
  var area = DebugJS.point.hint.area;
  if ((area != null) && (area.parentNode)) {
    document.body.removeChild(area);
  }
  if (!hold) {
    DebugJS.point.hint.st.visible = false;
  }
};
DebugJS.point.hint.clear = function() {
  var point = DebugJS.point;
  var area = point.hint.area;
  if (area != null) {
    point.hint.pre.innerHTML = '';
    point.hint.hide();
  }
  point.hint.st.hasMsg = false;
};

DebugJS.scrollWinTo = function(x, y, speed, step) {
  var ctx = DebugJS.ctx;
  var d = DebugJS.scrollWinTo.data;
  DebugJS.scrollWinTo.stop();
  d.dstX = x - ctx.scrollPosX;
  d.dstY = y - ctx.scrollPosY;
  if ((speed == undefined) || (speed == null)) {
    d.speed = ctx.props.scrollspeed | 0;
  } else {
    d.speed = speed | 0;
  }
  if ((step == undefined) || (step == null)) {
    d.step = ctx.props.scrollstep | 0;
  } else {
    d.step = step | 0;
  }
  DebugJS.bat.lock();
  DebugJS._scrollWinTo();
  return true;
};
DebugJS._scrollWinTo = function() {
  var d = DebugJS.scrollWinTo.data;
  d.tmid = 0;
  if (d.speed == 0) d.step = 0;
  var dX = DebugJS.calcDestPosAndStep(d.dstX, d.step);
  d.dstX = dX.dest;
  var dY = DebugJS.calcDestPosAndStep(d.dstY, d.step);
  d.dstY = dY.dest;
  window.scrollBy(dX.step, dY.step);
  if ((d.dstX == 0) && (d.dstY == 0)) {
    if (d.cb) {
      d.cb(d.arg);
    }
    DebugJS.scrollWinTo.fin();
  } else {
    d.tmid = setTimeout(DebugJS._scrollWinTo, d.speed);
  }
};
DebugJS.scrollWinTo.data = {};
DebugJS.scrollWinTo.initData = function() {
  var d = DebugJS.scrollWinTo.data;
  d.dstX = 0;
  d.dstY = 0;
  d.speed = 10;
  d.step = 100;
  d.tmid = 0;
  d.cb = null;
  d.arg = null;
};
DebugJS.scrollWinTo.initData();
DebugJS.scrollWinTo.stop = function() {
  var tmid = DebugJS.scrollWinTo.data.tmid;
  if (tmid > 0) {
    clearTimeout(tmid);
    DebugJS.scrollWinTo.fin();
  }
};
DebugJS.scrollWinTo.fin = function() {
  DebugJS.scrollWinTo.initData();
  DebugJS.bat.unlock();
};
DebugJS.scrollWinToTarget = function(ps, speed, step, cb, arg) {
  if (!ps) return false;
  var d = DebugJS.scrollWinTo.data;
  if (d.tmid > 0) {
    clearTimeout(d.tmid);
    d.tmid = 0;
    DebugJS.bat.unlock();
  }
  d.dstX = 0;
  d.dstY = 0;
  d.speed = speed | 0;
  d.cb = cb;
  d.arg = arg;
  if ((ps.x < 0) || ((ps.x + ps.w) > document.documentElement.clientWidth)) {
    d.dstX = ps.x;
  }
  var clientH = document.documentElement.clientHeight;
  var bodyH = document.body.clientHeight;
  var absScreenBottomT = bodyH - clientH;
  var absScreenBottomB = bodyH;
  var relTargetPosYinScreen = (ps.y + window.pageYOffset) - absScreenBottomT;
  var absTargetPosYinDoc = ps.y + window.pageYOffset;
  if (ps.y < 0) {
    if ((ps.y + window.pageYOffset) < (clientH / 2)) {
      d.dstY = window.pageYOffset * (-1);
    } else {
      d.dstY = ps.y - (clientH / 2);
    }
  } else if ((ps.y + ps.h) > clientH) {
    if ((absTargetPosYinDoc >= absScreenBottomT) && (absTargetPosYinDoc <= absScreenBottomB)) {
      d.dstY = absScreenBottomB - DebugJS.ctx.scrollPosY;
    } else {
      d.dstY = ps.y - (clientH / 2);
    }
  }
  if ((d.dstX != 0) || (d.dstY != 0)) {
    if (step >= 0) {
      d.step = step | 0;
    } else {
      d.step = DebugJS.ctx.props.scrollstep | 0;
    }
    DebugJS.bat.lock();
    DebugJS._scrollWinTo();
    return true;
  }
  DebugJS.scrollWinTo.initData();
  return false;
};
DebugJS.scrollElTo = function(target, x, y) {
  x += '';
  y += '';
  el = DebugJS.getElement(target);
  if (!el) {
    DebugJS._log.e('Element not found: ' + target);
    return;
  }

  if ((x.charAt(0) == '+') || (x.charAt(0) == '-')) {
    x = el.scrollLeft + (x | 0);
  } else {
    switch (x) {
      case 'left':
        x = 0;
        break;
      case 'center':
        el.scrollLeft = el.scrollWidth;
        var wkX = el.scrollLeft;
        x = wkX / 2;
        break;
      case 'right':
        x = el.scrollWidth;
        break;
      case 'current':
        x = null;
    }
  }

  if ((y.charAt(0) == '+') || (y.charAt(0) == '-')) {
    y = el.scrollTop + (y | 0);
  } else {
    switch (y) {
      case 'top':
        y = 0;
        break;
      case 'middle':
        el.scrollTop = el.scrollHeight;
        var wkY = el.scrollTop;
        y = wkY / 2;
        break;
      case 'bottom':
        y = el.scrollHeight;
        break;
      case 'current':
        y = null;
    }
  }

  if (x != null) el.scrollLeft = x;
  if (y != null) el.scrollTop = y;
};

DebugJS.calcDestPosAndStep = function(dest, step) {
  if (dest < 0) {
    if (((dest * (-1)) < step) || (step == 0)) {
      step = dest * (-1);
    }
    dest += step;
    step *= (-1);
  } else {
    if ((dest < step) || (step == 0)) {
      step = dest;
    }
    dest -= step;
  }
  var d = {
    dest: dest,
    step: step
  };
  return d;
};

DebugJS.inputText = function(el, txt, speed, step, start, end) {
  if (txt == undefined) return;
  var data = DebugJS.inputText.data;
  if (data.tmid > 0) {
    clearTimeout(data.tmid);
    data.tmid = 0;
    DebugJS.bat.unlock();
  }
  try {
    txt = eval(txt) + '';
  } catch (e) {
    DebugJS._log.e('inputText(): ' + e);
  }
  txt = DebugJS.replaceCtrlChr(txt, true);
  data.txt = txt;
  if ((speed == undefined) || (speed == null) || (speed == '')) {
    speed = DebugJS.ctx.props.textinputspeed;
  }
  if ((step == undefined) || (step == null) || (step == '')) {
    step = DebugJS.ctx.props.textinputstep;
  }
  data.speed = speed;
  data.step = step | 0;
  data.i = start | 0;
  data.end = end | 0;
  data.el = DebugJS.getElement(el);
  if (data.el) {
    DebugJS.bat.lock();
    DebugJS._inputText();
  } else {
    DebugJS._log.e('Element not found: ' + el);
  }
};
DebugJS._inputText = function() {
  var data = DebugJS.inputText.data;
  var speed = data.speed;
  var step = data.step;
  if ((speed == 0) || (step == 0) || (data.end > 0) && (data.i >= data.end)) {
    data.i = data.txt.length;
  } else {
    data.i += step;
  }
  data.tmid = 0;
  var txt = data.txt.substr(0, data.i);
  data.el.value = txt;
  var e = DebugJS.event.create('input');
  data.el.dispatchEvent(e);
  if (data.i < data.txt.length) {
    speed = DebugJS.getSpeed(speed) | 0;
    data.tmid = setTimeout(DebugJS._inputText, speed);
  } else {
    DebugJS.inputText.stop();
  }
};
DebugJS.inputText.stop = function() {
  DebugJS.inputText.finalize();
  DebugJS.bat.unlock();
};
DebugJS.inputText.finalize = function() {
  var data = DebugJS.inputText.data;
  if (data.tmid > 0) {
    clearTimeout(data.tmid);
    data.tmid = 0;
  }
  data.el = null;
  data.txt = '';
  data.speed = 0;
  data.end = 0;
  data.i = 0;
};
DebugJS.inputText.data = {el: null, txt: '', speed: 0, end: 0, i: 0, tmid: 0};

DebugJS.getSpeed = function(v) {
  v += '';
  if (v.indexOf('-') == -1) return v;
  var a = v.split('-');
  var min = a[0];
  var max = a[1];
  if ((min == '') || (max == '')) return 0;
  var s = DebugJS.getRndNum(min, max);
  return s;
};

DebugJS.selectOption = function(el, method, type, val) {
  var select = null;
  select = DebugJS.getElement(el);
  if (!select) {
    DebugJS._log.e('Element not found: ' + el);
    return;
  }
  if (select.tagName != 'SELECT') {
    DebugJS._log.e('Element is not select (' + select + ')');
    return;
  }
  if (method == 'set') {
    var prevVal = select.value;
    for (var i = 0; i < select.options.length; i++) {
      if (((type == 'text') && (select.options[i].innerText == val)) ||
          ((type == 'value') && (select.options[i].value == val))) {
        select.options[i].selected = true;
        if (prevVal != val) {
          DebugJS.dispatchChangeEvt(select);
        }
        return;
      }
    }
  } else {
    var prop = 'innerText';
    if (type == 'value') {
      prop = 'value';
    }
    var idx = select.selectedIndex;
    return select.options[idx][prop];
  }
  DebugJS._log.e('No such option: ' + val);
};

DebugJS.dispatchChangeEvt = function(target) {
  var e = DebugJS.event.create('change');
  return target.dispatchEvent(e);
};

DebugJS.event = {};
DebugJS.event.evt = null;
DebugJS.event.evtDef = {
  blur: {bubbles: false, cancelable: false},
  change: {bubbles: true, cancelable: false},
  click: {bubbles: true, cancelable: true},
  contextmenu: {bubbles: true, cancelable: true},
  dblclick: {bubbles: true, cancelable: true},
  dragover: {bubbles: true, cancelable: true},
  drop: {bubbles: true, cancelable: true},
  focus: {bubbles: false, cancelable: false},
  input: {bubbles: true, cancelable: false},
  keydown: {bubbles: true, cancelable: true},
  keypress: {bubbles: true, cancelable: true},
  keyup: {bubbles: true, cancelable: true},
  mousedown: {bubbles: true, cancelable: true},
  mousemove: {bubbles: true, cancelable: true},
  mouseup: {bubbles: true, cancelable: true},
  wheel: {bubbles: true, cancelable: true}
};
DebugJS.event.create = function(type) {
  var e = document.createEvent('Events');
  e.initEvent(type, true, true);
  var df = DebugJS.event.evtDef[type];
  if (df) {
    e.bubbles = df.bubbles;
    e.cancelable = df.cancelable;
  }
  DebugJS.event.evt = e;
  return e;
};
DebugJS.event.set = function(prop, val) {
  var e = DebugJS.event.evt;
  if (e) {
    e[prop] = val;
  } else {
    DebugJS._log.e('Event is not created');
  }
};
DebugJS.event.dispatch = function(el, idx) {
  var target;
  if (el == 'window') {
    target = window;
  } else if (el == 'document') {
    target = document;
  } else if (el == 'active') {
    target = document.activeElement;
  } else if (el == 'point') {
    target = DebugJS.point.getElementFromCurrentPos();
  } else {
    target = DebugJS.getElement(el, idx);
  }
  if (!target) {
    DebugJS._log.e('Target is not found');
    return false;
  }
  var e = DebugJS.event.evt;
  if (e) {
    return target.dispatchEvent(e);
  } else {
    DebugJS._log.e('Event is not created');
    return false;
  }
};
DebugJS.event.clear = function() {
  DebugJS.event.evt = null;
};

DebugJS.keyPress = function(data) {
  DebugJS.keyPress.data = data;
  DebugJS.bat.lock();
  DebugJS.keyPress.down();
};
DebugJS.keyPress.data = null;
DebugJS.keyPress.down = function() {
  DebugJS.keyPress.send('keydown');
  setTimeout(DebugJS.keyPress.up, 10);
};
DebugJS.keyPress.up = function() {
  DebugJS.keyPress.send('keyup');
  DebugJS.keyPress.end();
};
DebugJS.keyPress.send = function(type) {
  var data = DebugJS.keyPress.data;
  DebugJS.event.create(type);
  DebugJS.event.set('keyCode', data.keyCode);
  DebugJS.event.set('shiftKey', data.shift);
  DebugJS.event.set('ctrlKey', data.ctrl);
  DebugJS.event.set('altKey', data.alt);
  DebugJS.event.set('metaKey', data.meta);
  var target = (DebugJS.isDescendant(document.activeElement, DebugJS.ctx.win) ? 'window' : 'active');
  DebugJS.event.dispatch(target);
};
DebugJS.keyPress.end = function() {
  DebugJS.bat.unlock();
};

DebugJS.test = {};
DebugJS.test.STATUS_OK = 'OK';
DebugJS.test.STATUS_NG = 'NG';
DebugJS.test.STATUS_ERR = 'ERR';
DebugJS.test.STATUS_NT = 'NT';
DebugJS.test.COLOR_OK = '#0f0';
DebugJS.test.COLOR_NG = '#f66';
DebugJS.test.COLOR_ERR = '#fa0';
DebugJS.test.STATUS_NT_COLOR = '#fff';
DebugJS.test.data = {};
DebugJS.test.initData = function() {
  var data = DebugJS.test.data;
  data.name = '';
  data.desc = [];
  data.running = false;
  data.startTime = 0;
  data.endTime = 0;
  data.executingTestId = '';
  data.status = DebugJS.test.STATUS_NT;
  data.lastRslt = DebugJS.test.STATUS_NT;
  data.cnt = {ok: 0, ng: 0, err: 0, nt: 0};
  data.results = {};
};
DebugJS.test.initData();
DebugJS.test.init = function(name) {
  var test = DebugJS.test;
  test.initData();
  DebugJS.ctx.CMDVALS['%TEST_STATUS%'] = test.STATUS_NT;
  DebugJS.ctx.CMDVALS['%TEST_LAST_RESULT%'] = test.STATUS_NT;
  var data = test.data;
  data.name = ((name == undefined) ? '' : name);
  data.running = true;
  data.startTime = (new Date()).getTime();
};
DebugJS.test.setName = function(n) {
  DebugJS.test.data.name = n;
  DebugJS._log('TestName: ' + n);
};
DebugJS.test.setDesc = function(s) {
  DebugJS.test.data.desc.push(s);
  DebugJS._log(s);
};
DebugJS.test.save = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var d = JSON.stringify(DebugJS.test.data);
  localStorage.setItem('DebugJS-test', d);
};
DebugJS.test.load = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var d = localStorage.getItem('DebugJS-test');
  localStorage.removeItem('DebugJS-test');
  if (d == null) return;
  DebugJS.test.data = JSON.parse(d);
};
DebugJS.test.fin = function() {
  DebugJS.test.data.running = false;
  DebugJS.test.data.endTime = (new Date()).getTime();
};
DebugJS.test.setResult = function(st, label, info) {
  var test = DebugJS.test;
  switch (st) {
    case test.STATUS_OK:
    case test.STATUS_NG:
    case test.STATUS_ERR:
    case test.STATUS_NT:
      break;
    default:
      DebugJS._log.e('Test status must be OK|NG|ERR|NT: ' + st);
      return;
  }
  test.addResult(st, label, null, null, null, info);
};
DebugJS.test.addResult = function(st, label, exp, got, method, info) {
  var ctx = DebugJS.ctx;
  var test = DebugJS.test;
  var data = test.data;
  var limit = ctx.props.testvallimit;
  switch (st) {
    case test.STATUS_OK:
      data.cnt.ok++;
      break;
    case test.STATUS_NG:
      data.cnt.ng++;
      break;
    case test.STATUS_ERR:
      data.cnt.err++;
      break;
    case test.STATUS_NT:
      data.cnt.nt++;
  }
  test.setStatus(st);
  test.setLastResult(st);
  var id = data.executingTestId;
  test.prepare();
  if (label == null) {
    label = '';
  } else if (label.match(/^".*"$/)) {
    label = eval(label);
  }
  if (typeof exp == 'string') {
    exp = DebugJS.trimDownText(exp, limit);
  }
  if (typeof got == 'string') {
    got = DebugJS.trimDownText(got, limit);
  }
  var rslt = {
    label: label,
    status: st,
    method: method,
    exp: exp,
    got: got,
    info: info
  };
  data.results[id].results.push(rslt);
};
DebugJS.test.setStatus = function(st) {
  var test = DebugJS.test;
  var data = test.data;
  switch (st) {
    case test.STATUS_NT:
      return;
    case test.STATUS_OK:
      if (data.status != test.STATUS_NT) return;
      break;
    case test.STATUS_NG:
      if (data.status == test.STATUS_ERR) return;
  }
  data.status = st;
  DebugJS.ctx.CMDVALS['%TEST_STATUS%'] = st;
};
DebugJS.test.getStatus = function() {
  return DebugJS.test.data.status;
};
DebugJS.test.setLastResult = function(st) {
  DebugJS.test.data.lastRslt = st;
  DebugJS.ctx.CMDVALS['%TEST_LAST_RESULT%'] = st;
};
DebugJS.test.getLastResult = function() {
  return DebugJS.test.data.lastRslt;
};
DebugJS.test.prepare = function() {
  DebugJS.test.setId(DebugJS.test.data.executingTestId);
};
DebugJS.test.setId = function(id) {
  var data = DebugJS.test.data;
  if (data.results[id] == undefined) {
    data.results[id] = {comment: [], results: []};
  }
  data.executingTestId = id;
};
DebugJS.test.setCmnt = function(c) {
  DebugJS.test.prepare();
  DebugJS.test.data.results[DebugJS.test.data.executingTestId].comment.push(c);
  DebugJS._log('# ' + c);
};
DebugJS.test.chkResult = function(results) {
  var test = DebugJS.test;
  var r = test.STATUS_NT;
  for (var i = 0; i < results.length; i++) {
    var st = results[i].status;
    if (st == test.STATUS_ERR) {
      return test.STATUS_ERR;
    } else if (st == test.STATUS_NG) {
      r = test.STATUS_NG;
    } else if ((st == test.STATUS_OK) && (r == test.STATUS_NT)) {
      r = test.STATUS_OK;
    }
  }
  return r;
};
DebugJS.test.getStyledResultStr = function(st, info) {
  var s = DebugJS.test.getStyledStStr(st);
  if (info) s += ' ' + info;
  return s;
};
DebugJS.test.getStyledStStr = function(st) {
  var test = DebugJS.test;
  var color;
  switch (st) {
    case test.STATUS_OK:
      color = test.COLOR_OK;
      break;
    case test.STATUS_NG:
      color = test.COLOR_NG;
      break;
    case test.STATUS_ERR:
      color = test.COLOR_ERR;
      break;
    default:
      color = test.COLOR_NT;
  }
  return '[<span style="color:' + color + '">' + st + '</span>]';
};
DebugJS.test.getStyledInfoStr = function(result) {
  if (result.info) return result.info;
  if (!result.method) return '';
  var echoExp = result.exp;
  if (result.method == 'regexp') {
    echoExp = DebugJS.decodeEsc(echoExp);
    echoExp = '<span style="color:#0ff">/</span>' + echoExp + '<span style="color:#0ff">/</span>';
  } else if (typeof echoExp == 'string') {
    echoExp = DebugJS.styleValue(echoExp);
    echoExp = DebugJS.hlCtrlChr(echoExp);
  } else {
    echoExp = DebugJS.styleValue(echoExp);
  }
  var echoGot = result.got;
  if (typeof echoGot == 'string') {
    echoGot = DebugJS.styleValue(echoGot);
    echoGot = DebugJS.hlCtrlChr(echoGot);
  } else {
    echoGot = DebugJS.styleValue(echoGot);
  }
  var s = 'Got=' + echoGot + ' ' + result.method + ' Exp=' + echoExp;
  return s;
};
DebugJS.test.getCountStr = function(cnt) {
  var test = DebugJS.test;
  var total = test.countTotal(cnt);
  return '<span style="color:' + test.COLOR_OK + '">OK</span>:' + cnt.ok + '/' + total + ' <span style="color:' + test.COLOR_NG + '">NG</span>:' + cnt.ng + ' <span style="color:' + test.COLOR_ERR + '">ERR</span>:' + cnt.err + ' <span style="color:' + test.COLOR_NT + '">NT</span>:' + cnt.nt;
};
DebugJS.test.getSumCount = function() {
  var test = DebugJS.test;
  var cnt = {ok: 0, ng: 0, err: 0, nt: 0};
  for (var id in test.data.results) {
    var st = test.chkResult(test.data.results[id].results);
    switch (st) {
      case test.STATUS_OK:
        cnt.ok++;
        break;
      case test.STATUS_NG:
        cnt.ng++;
        break;
      case test.STATUS_ERR:
        cnt.err++;
        break;
      case test.STATUS_NT:
        cnt.nt++;
    }
  }
  return cnt;
};
DebugJS.test.countTotal = function(cnt) {
  return (cnt.ok + cnt.ng + cnt.err + cnt.nt);
};
DebugJS.test.result = function() {
  var test = DebugJS.test;
  var data = test.data;
  var nm = data.name;
  var tstSt = test.getStatus();
  var cnt = test.getSumCount();
  var s = 'Test Result:\n';
  if (nm != '') s += '[TEST NAME]\n' + nm + '\n\n';
  if (data.desc.length > 0) s += '[DESCRIPTION]\n';
  var i;
  for (i = 0; i < data.desc.length; i++) {
    s += data.desc[i] + '\n';
  }
  if (data.desc.length > 0) s += '\n';
  if (test.countTotal(cnt) > 0) s += '[RESULTS]\n---------\n';
  s += test.getDetailStr(data.results);
  s += '[SUMMARY]\n' + test.getCountStr(cnt) + ' (' + test.getCountStr(data.cnt) + ')\n';
  s += DebugJS.repeatCh('-', tstSt.length + 2) + '\n' + test.getStyledStStr(tstSt);
  return s;
};
DebugJS.test.getDetailStr = function(results) {
  var test = DebugJS.test;
  var M = 16;
  var n = test.countLongestLabel();
  if (n > M) n = M;
  var details = '';
  for (var id in results) {
    var testId = (id == '' ? '<span style="color:#ccc">&lt;No Test ID&gt;</span>' : id);
    var st = test.chkResult(results[id].results);
    var rs = test.getStyledStStr(st);
    details += rs + ' ' + testId + '\n';
    for (i = 0; i < results[id].comment.length; i++) {
      var comment = results[id].comment[i];
      details += ' # ' + comment + '\n';
    }
    for (i = 0; i < results[id].results.length; i++) {
      var result = results[id].results[i];
      var info = test.getStyledInfoStr(result);
      details += ' ' + DebugJS.strPadding(result.label, ' ', n, 'R') + ' ' + test.getStyledResultStr(result.status, info) + '\n';
    }
    details += '\n';
  }
  return details;
};
DebugJS.test.getResult = function() {
  var data = DebugJS.test.data;
  var r = {
    name: data.name,
    desc: data.desc,
    startTime: data.startTime,
    endTime: data.endTime,
    status: data.status,
    count: data.cnt,
    results: data.results
  };
  return r;
};
DebugJS.test.getResultJSON = function(j) {
  return DebugJS.toJSON(DebugJS.test.getResult());
};
DebugJS.test.verify = function(got, method, exp, reqEval, label) {
  var test = DebugJS.test;
  var status = test.STATUS_ERR;
  var info = '';
  try {
    if (method != 'regexp') {
      exp = eval(exp);
      if (typeof exp == 'string') {
        exp = exp.replace(/\r?\n/g, '\n');
      }
    }
    if (reqEval) {
      got = eval(got);
    }
    if (typeof got == 'string') {
      got = got.replace(/\r?\n/g, '\n');
    }
    if (method == '==') {
      if (got == exp) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else if (method == '!=') {
      if (got != exp) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else if ((method == 'regexp') ||
        (method == '<') || (method == '<=') ||
        (method == '>') || (method == '>=')) {
      var evl;
      if (method == 'regexp') {
        exp = DebugJS.encodeEsc(exp);
        var wkGot = got.replace(/\n/g, '\\n');
        evl = '(new RegExp(\'' + exp + '\')).test(\'' + wkGot + '\')';
      } else {
        evl = got + method + exp;
      }
      try {
        r = eval(evl);
      } catch (e) {
        info = 'Failed to evaluate: ' + e;
        DebugJS._log.e(info);
        test.addResult(status, label, exp, got, method, info);
        test.onVrfyAftr(status);
        return status;
      }
      if (r) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else {
      if (method == undefined) {
        DebugJS.printUsage('test|point verify [-label:text] got ==|!=|<|>|<=|>=|regexp exp');
      } else {
        info = 'Unknown verify method: ' + method;
        DebugJS._log.e(info);
        test.addResult(status, label, exp, got, method, info);
        test.onVrfyAftr(status);
      }
      return status;
    }
  } catch (e) {
    info = e.toString();
  }
  test.addResult(status, label, exp, got, method, info);
  var s = test.getStyledResultStr(status, info);
  DebugJS._log(s);
  test.onVrfyAftr(status);
  return status;
};
DebugJS.test.onVrfyAftr = function(st) {
  if ((DebugJS.bat.isRunning()) && (DebugJS.bat.hasBatStopCond('test'))) {
    if (st != DebugJS.test.STATUS_OK) {
      DebugJS.bat.ctrl.stopReq = true;
    }
  }
};
DebugJS.test.countLongestLabel = function() {
  var l = 0;
  for (var id in DebugJS.test.data.results) {
    for (var i = 0; i < DebugJS.test.data.results[id].results.length; i++) {
      var r = DebugJS.test.data.results[id].results[i];
      if (r.label.length > l) {
        l = r.label.length;
      }
    }
  }
  return l;
};

DebugJS.getElement = function(selector, idx) {
  if (typeof selector != 'string') return selector;
  idx |= 0;
  var el = null;
  try {
    var nodeList = document.querySelectorAll(selector);
    el = nodeList.item(idx);
  } catch (e) {}
  return el;
};

DebugJS.getElPosSize = function(el, idx) {
  el = DebugJS.getElement(el, idx);
  if (!el) return null;
  var rect = el.getBoundingClientRect();
  var rectT = Math.round(rect.top);
  var rectL = Math.round(rect.left);
  var rectR = Math.round(rect.right);
  var rectB = Math.round(rect.bottom);
  var ps = {
    x: rectL,
    y: rectT,
    w: ((rectR - rectL) + 1),
    h: ((rectB - rectT) + 1)
  };
  return ps;
};

DebugJS.getScreenCenter = function() {
  var p = {
    x: (document.documentElement.clientWidth / 2),
    y: (document.documentElement.clientHeight / 2)
  };
  return p;
};

DebugJS.getLabelEl = function(label, idx) {
  var el = null;
  var cnt = 0;
  var c = document.getElementsByTagName('label');
  for (var i = 0; i < c.length; i++) {
    if (c[i].innerText == label) {
      if (idx == cnt) {
        el = c[i];
        break;
      }
      cnt++;
    }
  }
  return el;
};

DebugJS.findFocusableEl = function(e) {
  var el = e;
  do {
    if (el.tagName == 'HTML') {
      el = null;
      break;
    }
    if (DebugJS.isFocusable(el.tagName)) break;
    el = el.parentNode;
  } while (el != null);
  return el;
};
DebugJS.isFocusable = function(n) {
  switch (n) {
    case 'A':
    case 'BUTTON':
    case 'INPUT':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
  }
  return false;
};

DebugJS.toggleElShowHide = function(el) {
  if (el.style.display == 'none') {
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
};

DebugJS.createBtn = function(label, base) {
  return DebugJS.ctx.createBtn(DebugJS.ctx, label, base);
};
DebugJS.createBtnHtml = function(label, onclick, style) {
  return DebugJS.ctx.createBtnHtml(DebugJS.ctx, label, onclick, style);
};

DebugJS.random = function(min, max) {
  return DebugJS.getRandom(DebugJS.RND_TYPE_NUM, min, max);
};
DebugJS.randomStr = function(min, max) {
  return DebugJS.getRandom(DebugJS.RND_TYPE_STR, min, max);
};

DebugJS.createResBox = function(m) {
  return DebugJS._createResBox(m);
};
DebugJS.createResBoxErr = function(m) {
  return DebugJS._createResBox(m, true);
};
DebugJS._createResBox = function(m, e) {
  return '<textarea class="dbg-resbox box ' + (e ? 'err' : 'ok') + '" readonly>' + m + '</textarea>';
};
DebugJS.adjustResBox = function(adj) {
  DebugJS.adjustResBox.a = adj | 0;
  setTimeout(DebugJS._adjustResBox, 10);
};
DebugJS.adjustResBox.a = 0;
DebugJS._adjustResBox = function() {
  var el = document.getElementsByClassName('dbg-resbox box');
  for (var i = 0; i < el.length; i++) {
    var e = el[i];
    e.style.height = (e.scrollHeight + DebugJS.adjustResBox.a) + 'px';
  }
};

DebugJS.wd = {};
DebugJS.wd.INTERVAL = 50;
DebugJS.wd.wdTmId = 0;
DebugJS.wd.wdPetTime = 0;
DebugJS.wd.cnt = 0;
DebugJS.wd.start = function(interval) {
  var ctx = DebugJS.ctx;
  var wd = DebugJS.wd;
  interval |= 0;
  if (interval > 0) ctx.props.wdt = interval;
  ctx.status |= DebugJS.ST_WD;
  wd.cnt = 0;
  wd.wdPetTime = (new Date()).getTime();
  DebugJS._log.s('Start watchdog (' + ctx.props.wdt + 'ms)');
  if (wd.wdTmId > 0) clearTimeout(wd.wdTmId);
  wd.wdTmId = setTimeout(wd.pet, wd.INTERVAL);
};
DebugJS.wd.pet = function() {
  var ctx = DebugJS.ctx;
  if (!(ctx.status & DebugJS.ST_WD)) return;
  var wd = DebugJS.wd;
  var now = (new Date()).getTime();
  var elapsed = now - wd.wdPetTime;
  if (elapsed > ctx.props.wdt) {
    wd.cnt++;
    DebugJS._log.w('Watchdog bark! (' + elapsed + 'ms)');
    DebugJS.callEvtListener('watchdog', elapsed);
  }
  wd.wdPetTime = now;
  wd.wdTmId = setTimeout(wd.pet, wd.INTERVAL);
};
DebugJS.wd.stop = function() {
  var wd = DebugJS.wd;
  if (wd.wdTmId > 0) {
    clearTimeout(wd.wdTmId);
    wd.wdTmId = 0;
  }
  DebugJS.ctx.status &= ~DebugJS.ST_WD;
  DebugJS._log.s('Stop watchdog');
};

DebugJS.log = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log(m);
};
DebugJS.log.e = function(m) {
  var ctx = DebugJS.ctx;
  if (ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  ctx.errStatus |= DebugJS.ERR_ST_LOG;
  DebugJS._log.e(m);
};
DebugJS.log.w = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.w(m);
};
DebugJS.log.i = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.i(m);
};
DebugJS.log.d = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.d(m);
};
DebugJS.log.v = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.v(m);
};
DebugJS.log.t = function(m, n) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS.timeLog(m, n);
};
DebugJS.log.p = function(o, l, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.p(o, l, m, false);
};
DebugJS.log.json = function(o, l, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.p(o, l, m, true);
};
DebugJS.log.j = DebugJS.log.json;
DebugJS.log.res = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.res(m);
};
DebugJS.log.res.err = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS._log.res.err(m);
};
DebugJS.log.clear = function() {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  DebugJS.ctx.clearLog();
};
DebugJS.log.suspend = function() {
  DebugJS.ctx.suspendLog();
};
DebugJS.log.resume = function() {
  DebugJS.ctx.resumeLog();
};
DebugJS.log.preserve = function(f) {
  var ctx = DebugJS.ctx;
  if (f == undefined) {
    return ((ctx.status & DebugJS.ST_LOG_PRESERVED) ? true : false);
  }
  if (DebugJS.LS_AVAILABLE) ctx.setLogPreserve(ctx, f);
};
DebugJS.log.root = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  if (window.opener) {
    window.opener.log.root(m);
  } else if (window.top.opener) {
    window.top.opener.log.root(m);
  } else {
    window.top.DebugJS._log(m);
  }
};
DebugJS.log.root.fn = function(lv, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPENDING) return;
  if (window.opener) {
    window.opener.log[lv].root(m);
  } else if (window.top.opener) {
    window.top.opener.log[lv].root(m);
  } else {
    window.top.DebugJS._log[lv](m);
  }
};
DebugJS.rootFncs = function() {
  var fn = ['v', 'd', 'i', 'w', 'e'];
  for (var i = 0; i < fn.length; i++) {
    var lv = fn[i];
    DebugJS.log[lv].root = (DebugJS.ENABLE ? DebugJS.log.root.fn.bind(undefined, lv) : DebugJS.f_);
  }
};

DebugJS.setConsoleLogOut = function(f) {
  if (!window.console) return;
  if (f) {
    console.log = function(x) {log(x);};
    console.info = function(x) {log.i(x);};
    console.warn = function(x) {log.w(x);};
    console.error = function(x) {log.e(x);};
    console.time = function(x) {DebugJS.time.start(x);};
    console.timeEnd = function(x) {DebugJS.time.end(x);};
  } else {
    console.log = DebugJS.bak.console.log;
    console.info = DebugJS.bak.console.info;
    console.warn = DebugJS.bak.console.warn;
    console.error = DebugJS.bak.console.error;
    console.time = DebugJS.bak.console.time;
    console.timeEnd = DebugJS.bak.console.timeEnd;
  }
};

DebugJS.restoreStatus = function(ctx) {
  var data = DebugJS.loadStatus();
  if ((data == null) || !((data.status & DebugJS.ST_LOG_PRESERVED) || (data.status & DebugJS.ST_BAT_CONT))) {
    return;
  }
  if (data.status & DebugJS.ST_LOG_PRESERVED) {
    ctx.status |= DebugJS.ST_LOG_PRESERVED;
    DebugJS.restoreLog();
  }
  if (data.status & DebugJS.ST_BAT_CONT) {
    ctx.status |= DebugJS.ST_BAT_CONT;
  }
  ctx.swElapsedTime = data.swElapsedTime;
  if (data.status & DebugJS.ST_STOPWATCH_RUNNING) {
    ctx.startStopWatch();
  } else {
    ctx.updateSwLabel();
  }
  DebugJS.restoreProps(ctx, data.props);
  DebugJS.ctx.CMD_ALIAS = data.alias;
};
DebugJS.restoreProps = function(ctx, props) {
  for (var key in props) {
    ctx._cmdSet(ctx, key, props[key], false);
  }
};
DebugJS.ver = function() {
  return DebugJS.ctx.v;
};
DebugJS.x = DebugJS.x || {};
DebugJS.x.addCmdTbl = function(table) {
  var ctx = DebugJS.ctx;
  for (var i = 0; i < table.length; i++) {
    var c = table[i];
    if ((ctx.existCmd(c.cmd, ctx.INT_CMD_TBL)) ||
        (ctx.existCmd(c.cmd, ctx.EXT_CMD_TBL))) {
      c.attr |= DebugJS.CMD_ATTR_DISABLED;
    }
    ctx.EXT_CMD_TBL.push(c);
  }
};
DebugJS.x.addPanel = function(p) {
  var ctx = DebugJS.ctx;
  p.base = null; p.btn = null;
  var idx = ctx.extPanels.push(p) - 1;
  if (ctx.status & DebugJS.ST_INITIALIZED) {
    ctx.initExtPanel(ctx);
  }
  return idx;
};
DebugJS.x.getPanel = function(idx) {
  var p = DebugJS.ctx.extPanels[idx];
  if (p) return p.panel;
  return null;
};
DebugJS.x.removePanel = function(idx) {
  var ctx = DebugJS.ctx;
  if (!ctx.extPanels[idx]) return;
  var nIdx = -1;
  var p = ctx.extPanels[idx];
  ctx.extPanels[idx] = null;
  if (ctx.extActPnlIdx == idx) {
    nIdx = ctx.prevValidExtPanelIdx(ctx, idx);
    if (nIdx == -1) {
      nIdx = ctx.nextValidExtPanelIdx(ctx, idx);
    }
  }
  if (ctx.status & DebugJS.ST_INITIALIZED) {
    if ((ctx.status & DebugJS.ST_EXT_PANEL) && (p.onInActive)) {
      ctx.onExtPanelInActive(ctx, p);
    }
    ctx.redrawExtPanelBtn(ctx);
    if (ctx.existsValidExtPanel(ctx)) {
      if (nIdx != -1) {
        ctx.switchExtPanel(nIdx);
      }
    } else {
      ctx.extActPnlIdx = -1;
      ctx.extPanels = [];
      ctx.closeExtPanel(ctx);
      if (ctx.extBtn) ctx.extBtn.style.display = 'none';
    }
  }
};
DebugJS.x.setBtnLabel = function(l) {
  DebugJS.ctx.extBtnLabel = l;
  if (DebugJS.ctx.extBtn) DebugJS.ctx.extBtn.innerHTML = l;
};
DebugJS._init = function() {
  if (DebugJS.ctx.status & DebugJS.ST_INITIALIZED) {
    return true;
  } else {
    return DebugJS.ctx.init(null, null);
  }
};
DebugJS.init = function(opt) {
  DebugJS.ctx.init(opt, null);
};
DebugJS.onReady = function() {
  DebugJS._init();
};
DebugJS.onLoad = function() {
  window.addEventListener('unload', DebugJS.onUnload, true);
  DebugJS.test.load();
  DebugJS.bat.load();
};
DebugJS.onUnload = function() {
  if (DebugJS.test.data.running) {
    DebugJS.test.save();
  }
  if ((DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) && (DebugJS.ctx.props.batcont == 'on')) {
    DebugJS.bat.save();
  }
  if ((DebugJS.ctx.status & DebugJS.ST_LOG_PRESERVED) || (DebugJS.ctx.status & DebugJS.ST_BAT_CONT)) {
    DebugJS.saveStatus();
  }
  if (DebugJS.ctx.status & DebugJS.ST_LOG_PRESERVED) {
    DebugJS.preserveLog();
  }
};
DebugJS.onError = function(e) {
  var ctx = DebugJS.ctx;
  var msg;
  ctx.errStatus |= DebugJS.ERR_ST_SCRIPT;
  if ((e.error) && (e.error.stack)) {
    msg = e.error.stack;
  } else {
    if ((e.message == undefined) && (e.filename == undefined)) {
      if ((e.target) && (e.target.outerHTML)) {
        ctx.errStatus |= DebugJS.ERR_ST_LOAD;
        ctx.errStatus &= ~DebugJS.ERR_ST_SCRIPT;
        msg = 'LOAD_ERROR: ' + (e.target.outerHTML).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
        msg = 'UNKNOWN_ERROR';
      }
    } else {
      msg = e.message + ' ' + e.filename + '(' + e.lineno + ':' + e.colno + ')';
    }
  }
  DebugJS._log.e(msg);
};
DebugJS.balse = function() {
  var x = DebugJS.f_;
  DebugJS.boot = x;
  DebugJS.start = x;
  DebugJS.log = x;
  DebugJS.log.e = x;
  DebugJS.log.w = x;
  DebugJS.log.i = x;
  DebugJS.log.d = x;
  DebugJS.log.v = x;
  DebugJS.log.t = x;
  DebugJS.log.p = x;
  DebugJS.log.json = x;
  DebugJS.log.clear = x;
  DebugJS.log.res = x;
  DebugJS.log.res.err = x;
  DebugJS.log.suspend = x;
  DebugJS.log.resume = x;
  DebugJS.log.root = x;
  DebugJS.addEvtListener = x;
  DebugJS.addFileLoader = x;
  DebugJS.adjustResBox = x;
  DebugJS.cmd = x;
  DebugJS.bat = x;
  DebugJS.bat.set = x;
  DebugJS.bat.run = x;
  DebugJS.bat.pause = x;
  DebugJS.bat.resume = x;
  DebugJS.bat.stop = x;
  DebugJS.bat.list = x;
  DebugJS.bat.status = x;
  DebugJS.bat.isRunning = x;
  DebugJS.bat.setCond = x;
  DebugJS.countElements = x;
  DebugJS.getHTML = x;
  DebugJS.init = x;
  DebugJS.dumpLog = x;
  DebugJS.show = x;
  DebugJS.hide = x;
  DebugJS.http = x;
  DebugJS.led = x;
  DebugJS.led.on = x;
  DebugJS.led.off = x;
  DebugJS.msg = x;
  DebugJS.msg.clear = x;
  DebugJS.opacity = x;
  DebugJS.stack = x;
  DebugJS.stopwatch = x;
  DebugJS.stopwatch.start = x;
  DebugJS.stopwatch.stop = x;
  DebugJS.stopwatch.end = x;
  DebugJS.stopwatch.split = x;
  DebugJS.stopwatch.reset = x;
  DebugJS.time.start = x;
  DebugJS.time.split = x;
  DebugJS.time.end = x;
  DebugJS.time.check = x;
  DebugJS.ver = x;
  DebugJS.wd.start = x;
  DebugJS.wd.stop = x;
  DebugJS.x.addCmdTbl = x;
  DebugJS.x.addPanel = x;
  DebugJS.x.getPanel = x;
  DebugJS.x.removePanel = x;
  DebugJS.x.setBtnLabel = x;
  DebugJS._createResBox = x;
};
DebugJS.boot = function() {
  DebugJS.rootFncs();
  DebugJS.ctx = DebugJS.ctx || new DebugJS();
  DebugJS.el = null;
  if (window.el === undefined) DebugJS.G_EL_AVAILABLE = true;
  try {
    if (typeof window.localStorage != 'undefined') {
      DebugJS.LS_AVAILABLE = true;
    }
  } catch (e) {}
  try {
    if (typeof window.sessionStorage != 'undefined') {
      DebugJS.SS_AVAILABLE = true;
    }
  } catch (e) {}
  window.addEventListener('DOMContentLoaded', DebugJS.onReady, true);
  window.addEventListener('load', DebugJS.onLoad, true);
  window.addEventListener('error', DebugJS.onError, true);
  DebugJS.bak = {
    console: {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      time: console.time,
      timeEnd: console.timeEnd
    }
  };
  DebugJS.restoreStatus(DebugJS.ctx);
};
DebugJS.start = function() {DebugJS.init();DebugJS.show();};
DebugJS.ENABLE = true;
if (DebugJS.ENABLE) {
  DebugJS.boot();
} else {
  DebugJS.balse();
}
DebugJS.time.s = DebugJS.time.start;
DebugJS.time.e = DebugJS.time.end;
var dbg = (dbg === undefined ? DebugJS : dbg);
var log = (log === undefined ? DebugJS.log : log);

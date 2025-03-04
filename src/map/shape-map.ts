import Dinogram from "@/assets/logo.svg?react";
import Home from "@/assets/svg/home.svg?react";
import Circle from "@/assets/svg/circle.svg?react";
import Square from "@/assets/svg/square.svg?react";
import Triangle from "@/assets/svg/triangle.svg?react";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import DrawIcon from "@mui/icons-material/Draw";
import WarningIcon from "@mui/icons-material/Warning";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  AcUnit as AcUnitIcon,
  Article as ArticleIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  ArrowForward as ArrowForwardIcon,
  Build as BuildIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Storage as DatabaseIcon,
  Devices as DevicesIcon,
  DeveloperMode as DeveloperModeIcon,
  Dns as DnsIcon,
  GitHub as GitHubIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  Memory as MemoryIcon,
  Security as SecurityIcon,
  Terminal as TerminalIcon,
  TrendingUp as TrendingUpIcon,
  Workspaces as WorkspacesIcon,
  DataUsage as DataUsageIcon,
  QueryStats as QueryStatsIcon,
  Insights as InsightsIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  Task as TaskIcon,
  FactCheck as FactCheckIcon,
  Checklist as ChecklistIcon,
  ChecklistRtl as ChecklistRtlIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Forum as ForumIcon,
  Mail as MailIcon,
  Sync as SyncIcon,
  Autorenew as AutorenewIcon,
  Folder as FolderIcon,
  FileCopy as FileCopyIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  UploadFile as UploadFileIcon,
  Download as DownloadIcon,
  Backup as BackupIcon,
  StorageOutlined as StorageOutlinedIcon,
  Power as PowerIcon,
  Router as RouterIcon,
  SettingsEthernet as SettingsEthernetIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Usb as UsbIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  DeveloperBoard as DeveloperBoardIcon,
  SmartToy as SmartToyIcon,
  Android as AndroidIcon,
  Apple as AppleIcon,
  DesktopWindows as DesktopWindowsIcon,
  Laptop as LaptopIcon,
  PhoneIphone as PhoneIphoneIcon,
  TabletAndroid as TabletAndroidIcon,
  Watch as WatchIcon,
  LocationOn as LocationOnIcon,
  Navigation as NavigationIcon,
  Directions as DirectionsIcon,
  Map as MapIcon,
  SyncProblem as SyncProblemIcon,
  BugReport as BugReportIcon,
  VpnKey as VpnKeyIcon,
  SecurityUpdate as SecurityUpdateIcon,
  Settings as SettingsIcon,
  BuildCircle as BuildCircleIcon,
  Tune as TuneIcon,
  ManageAccounts as ManageAccountsIcon,
  PermDataSetting as PermDataSettingIcon,
  Analytics as AnalyticsIcon,
  AutoGraph as AutoGraphIcon,
  Dashboard as DashboardIcon,
  Monitor as MonitorIcon,
  PieChart as PieChartIcon,
  Work as WorkIcon,
  TaskAlt as TaskAltIcon,
  ChecklistOutlined as ChecklistOutlinedIcon,
  EventNote as EventNoteIcon,
  Update as UpdateIcon,
  History as HistoryIcon,
  Layers as LayersIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  DragIndicator as DragIndicatorIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  ViewList as ViewListIcon,
  ViewColumn as ViewColumnIcon,
  ViewComfy as ViewComfyIcon,
  ViewCompact as ViewCompactIcon,
  TableChart as TableChartIcon,
  DashboardCustomize as DashboardCustomizeIcon,
} from "@mui/icons-material";

const icons = {
  // Edges
  airlineStopsIcon: {
    key: "airlineStopsIcon",
    label: "Airline Stops Icon",
    icon: AirlineStopsIcon,
  },

  // Mode
  lightMode: { key: "lightMode", label: "Light Mode", icon: LightModeIcon },
  darkMode: { key: "darkMode", label: "Dark Mode", icon: DarkModeIcon },

  // Basic Shapes
  home: { key: "home", label: "Home", icon: Home },
  square: { key: "square", label: "Square", icon: Square },
  circle: { key: "circle", label: "Circle", icon: Circle },
  triangle: { key: "triangle", label: "Triangle", icon: Triangle },

  // General UI Elements
  web: { key: "web", label: "Web", icon: LanguageIcon },
  richText: { key: "richText", label: "Rich Text", icon: ArticleIcon },
  text: { key: "text", label: "Text", icon: FormatSizeIcon },
  storage: { key: "storage", label: "Storage", icon: StorageIcon },
  arrow: { key: "arrow", label: "Arrow", icon: ArrowForwardIcon },

  // Project Planning & Management
  task: { key: "task", label: "Task", icon: TaskIcon },
  checklist: { key: "checklist", label: "Checklist", icon: ChecklistIcon },
  factCheck: { key: "factCheck", label: "Fact Check", icon: FactCheckIcon },
  calendar: { key: "calendar", label: "Calendar", icon: CalendarTodayIcon },
  event: { key: "event", label: "Event", icon: EventIcon },
  notifications: {
    key: "notifications",
    label: "Notifications",
    icon: NotificationsIcon,
  },

  // Development & Tech
  code: { key: "code", label: "Code", icon: CodeIcon },
  terminal: { key: "terminal", label: "Terminal", icon: TerminalIcon },
  developerMode: {
    key: "developerMode",
    label: "Developer Mode",
    icon: DeveloperModeIcon,
  },
  bugReport: { key: "bugReport", label: "Bug Report", icon: BugReportIcon },

  // Cloud & Infrastructure
  cloud: { key: "cloud", label: "Cloud", icon: CloudIcon },
  server: { key: "server", label: "Server", icon: DnsIcon },
  dns: { key: "dns", label: "DNS", icon: DnsIcon },
  security: { key: "security", label: "Security", icon: SecurityIcon },
  database: { key: "database", label: "Database", icon: DatabaseIcon },

  // Connectivity & Devices
  wifi: { key: "wifi", label: "WiFi", icon: WifiIcon },
  bluetooth: { key: "bluetooth", label: "Bluetooth", icon: BluetoothIcon },
  usb: { key: "usb", label: "USB", icon: UsbIcon },
  router: { key: "router", label: "Router", icon: RouterIcon },

  // Hardware & System
  keyboard: { key: "keyboard", label: "Keyboard", icon: KeyboardIcon },
  mouse: { key: "mouse", label: "Mouse", icon: MouseIcon },
  desktop: { key: "desktop", label: "Desktop", icon: DesktopWindowsIcon },
  laptop: { key: "laptop", label: "Laptop", icon: LaptopIcon },
  mobile: { key: "mobile", label: "Mobile", icon: PhoneIphoneIcon },
  tablet: { key: "tablet", label: "Tablet", icon: TabletAndroidIcon },
  watch: { key: "watch", label: "Smart Watch", icon: WatchIcon },

  // System & Security
  settings: { key: "settings", label: "Settings", icon: SettingsIcon },
  update: { key: "update", label: "Update", icon: UpdateIcon },
  history: { key: "history", label: "History", icon: HistoryIcon },
  vpnKey: { key: "vpnKey", label: "VPN Key", icon: VpnKeyIcon },

  // Data & Analytics
  analytics: { key: "analytics", label: "Analytics", icon: AnalyticsIcon },
  insights: { key: "insights", label: "Insights", icon: InsightsIcon },
  timeline: { key: "timeline", label: "Timeline", icon: TimelineIcon },
  pieChart: { key: "pieChart", label: "Pie Chart", icon: PieChartIcon },
  barChart: { key: "barChart", label: "Bar Chart", icon: BarChartIcon },
  tableChart: { key: "tableChart", label: "Table Chart", icon: TableChartIcon },

  // General
  warning: { key: "warning", label: "Warning", icon: WarningIcon },
  warningOutlined: {
    key: "warningOutlined",
    label: "Warning Outlined",
    icon: WarningAmberIcon,
  },
  rotate: { key: "rotate", label: "Rotate", icon: RefreshIcon },
  refresh: { key: "refresh", label: "Refresh", icon: RefreshIcon },

  // Media & Files
  image: { key: "image", label: "Image", icon: ImageIcon },
  movie: { key: "movie", label: "Movie", icon: MovieIcon },
  draw: { key: "draw", label: "Draw", icon: DrawIcon },

  // Dinogram
  dinogram: { key: "dinogram", label: "Dinogram", icon: Dinogram },
};

const sortedIcons = Object.fromEntries(
  Object.entries(icons).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
);

export default sortedIcons;

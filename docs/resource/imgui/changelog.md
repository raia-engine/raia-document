
# 更新履歴

```

This document holds the user-facing changelog that we also use in release notes.
We generally fold multiple commits pertaining to the same topic as a single entry.
Changes to backends are also included within the individual .cpp files of each backend.

FAQ                     https://www.dearimgui.com/faq/
RELEASE NOTES:          https://github.com/ocornut/imgui/releases
WIKI                    https://github.com/ocornut/imgui/wiki
GETTING STARTED         https://github.com/ocornut/imgui/wiki/Getting-Started
GLOSSARY                https://github.com/ocornut/imgui/wiki/Glossary
ISSUES & SUPPORT        https://github.com/ocornut/imgui/issues

WHEN TO UPDATE?

- Keeping your copy of Dear ImGui updated regularly is recommended.
- It is generally safe and recommended to sync to the latest commit in 'master' or 'docking'
  branches. The library is fairly stable and regressions tends to be fixed fast when reported.

HOW TO UPDATE?

- Update submodule or copy/overwrite every file.
- About imconfig.h:
  - You may modify your copy of imconfig.h, in this case don't overwrite it.
  - or you may locally branch to modify imconfig.h and merge/rebase latest.
  - or you may '#define IMGUI_USER_CONFIG "my_config_file.h"' globally from your build system to
    specify a custom path for your imconfig.h file and instead not have to modify the default one.
- Read the `Breaking Changes` section (in imgui.cpp or here in the Changelog).
- If you have a problem with a missing function/symbols, search for its name in the code, there will likely be a comment about it.
- If you are copying this repository in your codebase, please leave the demo and documentations files in there, they will be useful.
- You may diff your previous Changelog with the one you just copied and read that diff.
- You may enable `IMGUI_DISABLE_OBSOLETE_FUNCTIONS` in imconfig.h to forcefully disable legacy names and symbols.
  Doing it every once in a while is a good way to make sure you are not using obsolete symbols. Dear ImGui is in active development,
  and API updates have been a little more frequent lately. They are documented below and in imgui.cpp and should not affect all users.
- Please report any issue!

-----------------------------------------------------------------------
 VERSION 1.91.6 WIP (In Progress)
-----------------------------------------------------------------------

Breaking changes:

Other changes:

- Error Handling: fixed cases where recoverable error handling would crash when 
  processing errors outside of the NewFrame()..EndFrame() scope. (#1651)


-----------------------------------------------------------------------
 VERSION 1.91.5 (Released 2024-11-07)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.5

Breaking changes:

- Commented out pre-1.87 IO system (equivalent to using IMGUI_DISABLE_OBSOLETE_KEYIO or IMGUI_DISABLE_OBSOLETE_FUNCTIONS before).
  - io.KeyMap[] and io.KeysDown[] are removed (obsoleted February 2022).
  - io.NavInputs[] and ImGuiNavInput are removed (obsoleted July 2022).
  - Pre-1.87 backends are not supported:
    - backends need to call io.AddKeyEvent(), io.AddMouseEvent() instead of writing to io.KeysDown[], io.MouseDown[] fields.
    - backends need to call io.AddKeyAnalogEvent() for gamepad values instead of writing to io.NavInputs[] fields.
  - For more references:
    - read 1.87 and 1.88 part of API BREAKING CHANGES in imgui.cpp or read Changelog for 1.87 and 1.88.
    - read https://github.com/ocornut/imgui/issues/4921
  - If you have trouble updating a very old codebase using legacy backend-specific key codes:
    consider updating to 1.91.4 first, then #define IMGUI_DISABLE_OBSOLETE_KEYIO, then update to latest.
  - Obsoleted ImGuiKey_COUNT (it is unusually error-prone/misleading since valid keys don't start at 0).
    Probably use ImGuiKey_NamedKey_BEGIN/ImGuiKey_NamedKey_END?
- Fonts: removed const qualifiers from most font functions in prevision for upcoming fonts improvements.

Other changes:

- Selectable: selected Selectables use ImGuiCol_Header instead of an arbitrary lerp
  between _Header and _HeaderHovered which was introduced v1.91 (#8106, #1861)
- Buttons: using ImGuiItemFlags_ButtonRepeat makes default button behavior use
  PressedOnClick instead of PressedOnClickRelease when unspecified.
- InputText: fixed a bug (regression in 1.91.2) where modifying text buffer within
  a callback would sometimes prevents further appending to the buffer.
- Tabs, Style: made ImGuiCol_TabDimmedSelectedOverline alpha 0 (not visible) in default
  styles as the current look is not right (but ImGuiCol_TabSelectedOverline stays the same).
- Log/Capture: added experimental io.ConfigWindowsCopyContentsWithCtrlC option to
  automatically copy window contents into clipboard using CTRL+C. This is experimental
  because (1) it currently breaks on nested Begin/End, (2) text output quality varies,
  and (3) text output comes in submission order rather than spatial order.
- Log/Capture: better decorating of BeginMenu() and TabItem() output.
- Log/Capture: a non terminated log ends automatically in the window which called it.
- imgui_freetype: Fixed a crash in build font atlas when using merged fonts and the
  first font in a merged set has no loaded glyph. (#8081)
- Backends: DX12: Unmap() call specify written range. The range is informational and
  may be used by debug tools.
- Backends: SDL2: Replace SDL_Vulkan_GetDrawableSize() forward declaration with the
  actual include. (#8095, #7967, #3190) [@sev-]
- Backends: SDL2, SDL3: SDL_EVENT_MOUSE_WHEEL event doesn't require dividing
  by 100.0f on Emscripten target. (#4019, #6096, #1463)
- Examples: SDL3+Vulkan: Added example. (#8084, #8085)
- Examples: Android+OpenGL: Using ALooper_pollOnce() instead of ALooper_pollAll()
  which has been deprecated. (#8013) [@feather179]


-----------------------------------------------------------------------
 VERSION 1.91.4 (Released 2024-10-18)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.4

Breaking changes:

- Style: renamed ImGuiCol_NavHighlight to ImGuiCol_NavCursor, for consistency with
  newly exposed and reworked features. Kept inline redirection enum (will obsolete).
- The typedef for ImTextureID now defaults to ImU64 instead of void*. (#1641)
  - This removes the requirement to redefine it for backends which are e.g. storing
    descriptor sets or other 64-bits structures when building on 32-bits archs
    (namely our DX12 and Vulkan backends). It therefore simplify various building scripts/helpers.
  - You may have compile-time warnings if you were casting to 'void*' instead of 'ImTextureID'
    when passing your types to functions taking ImTextureID values, e.g. ImGui::Image().
    In doubt it is almost always better to do an intermediate intptr_t cast, since it
    allows casting any pointer/integer type without warning:
    - May warn:     ImGui::Image((void*)MyTextureData, ...);
    - May warn:     ImGui::Image((void*)(intptr_t)MyTextureData, ...);
    - Won't warn:   ImGui::Image((ImTextureID)(intptr_t)MyTextureData), ...);
  - Note that you can always define ImTextureID to be your own high-level structures
    (with dedicated constructors and extra render parameters) if you like.
- IO: moved ImGuiConfigFlags_NavEnableSetMousePos to standalone io.ConfigNavMoveSetMousePos bool.
- IO: moved ImGuiConfigFlags_NavNoCaptureKeyboard to standalone io.ConfigNavCaptureKeyboard bool
  (note the inverted value!). (#2517, #2009)
  Kept legacy names (will obsolete) + code that copies settings once the first time.
  Dynamically changing the old value won't work. Switch to using the new value!

Other changes:

- IO: added 'void* platform_io.Renderer_RenderState' which is set during the
  ImGui_ImplXXXX_RenderDrawData() of standard backends to expose selected render
  states to your draw callbacks. (#6969, #5834, #7468, #3590)
- IO: io.WantCaptureKeyboard is never set when ImGuiConfigFlags_NoKeyboard is enabled. (#4921)
- Error Handling: turned a few more functions into recoverable errors. (#1651)
- Nav (Keyboard/Gamepad navigation):
  - Nav: added io.ConfigNavCursorVisibleAuto and io.ConfigNavCursorVisibleAlways to configure
    visibility of navigation cursor. (#1074, #2048, #7237, #8059, #3200, #787)
     - Set io.ConfigNavCursorVisibleAuto = true (default) to enable automatic toggling
       of cursor visibility (mouse click hide the cursor, arrow keys makes it visible).
     - Set io.ConfigNavCursorVisibleAlways to keep cursor always visible.
  - Nav: added NavSetCursorVisible(bool visible) function to manipulate visibility of
    navigation cursor (e.g. set default state, or after some actions). (#1074, #2048, #7237, #8059)
  - Nav: added io.ConfigNavEscapeClearFocusItem and io.ConfigNavEscapeClearFocusWindow to change
    how pressing Escape affects navigation. (#8059, #2048, #1074, #3200)
    - Set io.ConfigNavEscapeClearFocusItem = true (default) to clear focused item and highlight.
    - Set io.ConfigNavEscapeClearFocusItem = false for Escape to not have an effect.
    - Set io.ConfigNavEscapeClearFocusWindow = true to completely unfocus the dear imgui window,
      is for some reason your app relies on imgui focus to take other decisions.
  - Nav: pressing escape to hide the navigation cursor doesn't clear location, so it may be
    restored when Ctrl+Tabbing back into the same window later.
  - Nav: fixed Ctrl+Tab initiated with no focused window from skipping the top-most window. (#3200)
  - Nav: navigation cursor is not rendered for items with `ImGuiItemFlags_NoNav`. Can be relevant
    when e.g activating a _NoNav item with mouse, then Ctrl+Tabbing back and forth.
- Disabled: clicking a disabled item focuses parent window. (#8064)
- InvisibleButton, Nav: fixed an issue when InvisibleButton() would be navigable into but
  not display navigation highlight. Properly navigation on it by default. (#8057)
- InvisibleButton: added ImGuiButtonFlags_EnableNav to enable navigation. (#8057)
- Tooltips: fixed incorrect tooltip positioning when using keyboard/gamepad navigation
  (1.91.3 regression). (#8036)
- DrawList: AddCallback() added an optional size parameter allowing to copy and
  store any amount of user data for usage by callbacks: (#6969, #4770, #7665)
  - If userdata_size == 0: we copy/store the 'userdata' argument as-is (existing behavior).
    It will be available unmodified in ImDrawCmd::UserCallbackData during render.
  - If userdata_size > 0, we copy/store 'userdata_size' bytes pointed to by 'userdata' (new behavior).
    We store them in a buffer stored inside the drawlist. ImDrawCmd::UserCallbackData
    will point inside that buffer so you have to retrieve data from there. Your callback
    may need to use ImDrawCmd::UserCallbackDataSize if you expect dynamically-sized data.
  - Note that we use a raw type-less copy.
- Tables: fixed initial auto-sizing issue with synced-instances. (#8045, #7218)
- InputText: fixed an issue with not declaring ownership of Delete/Backspace/Arrow keys,
  preventing use of external shortcuts that are not guarded by an ActiveId check. (#8048)
  [@geertbleyen]
- InputText: ensure mouse cursor shape is set regardless of whether keyboard mode is
  enabled or not. (#6417)
- InputScalar: added an assert to clarify that ImGuiInputTextFlags_EnterReturnsTrue is not
  supported by InputFloat, InputInt, InputScalar etc. widgets. It actually never was. (#8065, #3946)
- imgui_freetype: Added support for plutosvg (as an alternative to lunasvg) to render
  OpenType SVG fonts. Requires defining IMGUI_ENABLE_FREETYPE_PLUTOSVG along with IMGUI_ENABLE_FREETYPE.
  Providing headers/librairies for plutosvg + plutovg is up to you (see #7927 for help).
  (#7927, #7187, #6591, #6607) [@pthom]
- Backends: DX11, DX12, SDLRenderer2/3. Vulkan, WGPU: expose selected state in
  ImGui_ImplXXXX_RenderState structures during render loop user draw callbacks.
  (#6969, #5834, #7468, #3590)
- Backends: DX9, DX10, DX11, DX12, OpenGL, Vulkan, WGPU: Changed default texture sampler
  to Clamp instead of Repeat/Wrap. (#7468, #7511, #5999, #5502, #7230)


-----------------------------------------------------------------------
 VERSION 1.91.3 (Released 2024-10-04)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.3

Breaking changes:

- Drags: treat v_min==v_max as a valid clamping range when != 0.0f. Zero is still a special
  value due to legacy reasons, unless using ImGuiSliderFlags_ClampZeroRange. (#7968, #3361, #76)
- Drags: extended behavior of ImGuiSliderFlags_AlwaysClamp to include _ClampZeroRange.
  It considers v_min==v_max==0.0f as a valid clamping range (aka edits not allowed).
  Although unlikely, it you wish to only clamp on text input but want v_min==v_max==0.0f
  to mean unclamped drags, you can use _ClampOnInput instead of _AlwaysClamp. (#7968, #3361, #76)

Other changes:

- Error Handling: Enabled/improved error recovery systems. (#1651, #5654)
  - Error recovery is provided as a way to facilitate:
    - Recovery after a programming error. Native code or scripting language (the later
      tends to facilitate iterating on code while running).
    - Recovery after running an exception handler or any error processing which may skip code
      after an error has been detected.
  - Error recovery is not perfect nor guaranteed! It is a feature to ease development.
    You not are not supposed to rely on it in the course of a normal application run.
  - Functions that support error recovery are using IM_ASSERT_USER_ERROR() instead of IM_ASSERT().
  - By design, we do not allow error recovery to be 100% silent. One of the options needs to be enabled!
  - Possible usage: facilitate recovery from errors triggered from a scripting language or
    after specific exceptions handlers. Surface errors to programmers in less aggressive ways.
  - Always ensure that on programmers seats you have at minimum Asserts or Tooltips enabled
    when making direct imgui API calls! Otherwise it would severely hinder your ability to
    catch and correct mistakes!
  - Added io.ConfigErrorRecovery to enable error recovery support.
  - Added io.ConfigErrorRecoveryEnableAssert to assert on recoverable errors.
  - Added io.ConfigErrorRecoveryEnableDebugLog to output to debug log on recoverable errors.
  - Added io.ConfigErrorRecoveryEnableTooltip to enable displaying an error tooltip on recoverable errors.
    The tooltip include a way to enable asserts if they were disabled.
  - All options are enabled by default.
  - Read https://github.com/ocornut/imgui/wiki/Error-Handling for a bit more details.
- Windows: BeginChild(): made it possible to call SetNextWindowSize() on a child window
  using ImGuiChildFlags_ResizeX,ImGuiChildFlags_ResizeY in order to override its current
  size. (#1710, #8020)
- Scrollbar: Shift+Click scroll to clicked location (pre-1.90.8 default). (#8002, #7328)
- Scrollbar: added io.ConfigScrollbarScrollByPage setting (default to true). (#8002, #7328)
  Set io.ConfigScrollbarScrollByPage=false to enforce always scrolling to clicked location.
- Drags: split ImGuiSliderFlags_AlwaysClamp into two distinct flags: (#7968, #3361, #76)
  - ImGuiSliderFlags_AlwaysClamp = ImGuiSliderFlags_ClampOnInput + ImGuiSliderFlags_ClampZeroRange.
  - Previously _AlwaysClamp only did the equivalent of _ClampOnInput.
  - Added ImGuiSliderFlags_ClampOnInput which is now a subset of AlwaysClamp.
    (note that it was the old name of AlwaysClamp, but we are reintroducing that name).
  - Added ImGuiSliderFlags_ClampZeroRange to enforce clamping even when v_min==v_max==0.0f
    in drag functions. Sliders are not affected.
- Tooltips, Drag and Drop: Fixed an issue where the fallback drag and drop payload tooltip
  appeared during drag and drop release.
- Tooltips, Drag and Drop: Stabilized name of drag and drop tooltip window so that
  transitioning from an item tooltip to a drag tooltip doesn't leak window auto-sizing
  info from one to the other. (#8036)
- Tooltips: Tooltips triggered from touch inputs are positioned above the item. (#8036)
- Backends: SDL3: Update for API changes: SDL_bool removal. SDL_INIT_TIMER removal.
- Backends: WebGPU: Fixed DAWN api change using WGPUStringView in WGPUShaderSourceWGSL.
  (#8009, #8010) [@blitz-research]

-----------------------------------------------------------------------
 VERSION 1.91.2 (Released 2024-09-19)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.2

Breaking changes:

 - Internals: using multiple overlayed ButtonBehavior() with same ID will now have the
   io.ConfigDebugHighlightIdConflicts=true feature emit a warning. (#8030)
   It was one of the rare case where using same ID is legal. Workarounds:
   - use single ButtonBehavior() call with multiple _MouseButton flags
   - or surround the calls with PushItemFlag(ImGuiItemFlags_AllowDuplicateId, true); ... PopItemFlag()

Other changes:

- Added io.ConfigDebugHighlightIdConflicts debug feature! (#7961, #7669)
  THIS DETECTS THE MOST COMMON USER ERROR BY FIRST-TIME DEAR IMGUI PROGRAMMERS!
  - The tool detects when multiple items are sharing the same identifier, due to not
    using PushID/PopID in loops, or not using ID stack facilities such as "##" suffixes.
    Very frequently it happens when using empty "" labels.
  - When hovering an item with a conflicting ID, all visible items with the same ID will
    be highlighted and an explanatory tooltip is made visible.
  - The feature may be disabled and is exposed in Demo->Tools menu.
  - I've been wanting to add this tool for a long time, but was stalled by finding a way to
    not make it spammy + make it practically zero cost. After @pthom made various proposals to
    solve the same problem (thanks for pushing me!), I decided it was time to finish it.
  - Added ImGuiItemFlags_AllowDuplicateId to use with PushItemFlag()/PopItemFlag() if for some
    reason you intend to have duplicate identifiers.
  - (#74, #96, #480, #501, #647, #654, #719, #843, #894, #1057, #1173, #1390, #1414, #1556, #1768,
     #2041, #2116, #2330, #2475, #2562, #2667, #2807, #2885, #3102, #3375, #3526, #3964, #4008,
     #4070, #4158, #4172, #4199, #4375, #4395, #4471, #4548, #4612, #4631, #4657, #4796, #5210,
     #5303, #5360, #5393, #5533, #5692, #5707, #5729, #5773, #5787, #5884, #6046, #6093, #6186,
     #6223, #6364, #6387, #6567, #6692, #6724, #6939, #6984, #7246, #7270, #7375, #7421, #7434,
     #7472, #7581, #7724, #7926, #7937 and probably more..)
- Nav: pressing any keyboard key while holding Alt disable toggling nav layer on Alt release. (#4439)
- MultiSelect+Tables: fixed an issue where box-select would skip items while drag-scrolling
  in a table with outer borders. (#7970, #7821).
- Inputs: SetNextItemShortcut() with ImGuiInputFlags_Tooltip doesn't show tooltip when item is active.
- InputText: internal refactoring to simplify and optimize the code. The ImWchar buffer has been
  removed. Simplifications allowed to implement new optimizations for handling very large text buffers
  (e.g. in our testing, handling of a 1 MB text buffer is now 3 times faster in VS2022 Debug build).
  This is the first step toward more refactoring. (#7925) [@alektron, @ocornut]
- InputText: added CJK double-width punctuation to list of separators considered for CTRL+Arrow.
- Tables: fixed auto-width columns when using synced-instances of same table. The previous fix
  done in v1.90.5 was incomplete. (#7218)
- Tables: fixed assertion related to inconsistent outer clipping when sizes are not rounded. (#7957) [@eclbtownsend]
- Tables: fixed assertion with tables with borders when clipped by parent. (#6765, #3752, #7428)
- Windows: fixed an issue where double-click to collapse could be triggered even while another
  item is active, if the item didn't use the left mouse button. (#7841)
- Misc: Made it accepted to call SetMouseCursor() with any out-of-bound value, as a way to allow
  hacking in custom cursors if desirable.
- Fonts: fixed ellipsis "..." rendering width miscalculation bug introduced in 1.91.0. (#7976) [@DDeimos]
- TextLinkOpenURL(): modified tooltip to display a verb "Open 'xxxx'". (#7885, #7660)
- Backends: SDL2: use SDL_Vulkan_GetDrawableSize() when available. (#7967, #3190) [@scribam]
- Backends: GLFW+Emscripten: use OSX behaviors automatically when using contrib glfw port. (#7965, #7915)
  [@ypujante]
- Backends: WebGPU: Added support for optional IMGUI_IMPL_WEBGPU_BACKEND_DAWN / IMGUI_IMPL_WEBGPU_BACKEND_WGPU
  defines to handle ever-changing native implementations. (#7977, #7969, #6602, #6188, #7523) [@acgaudette]

-----------------------------------------------------------------------
 VERSION 1.91.1 (Released 2024-09-04)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.1

Breaking changes:

- BeginChild(): renamed ImGuiChildFlags_Border to ImGuiChildFlags_Borders for consistency. [@cfillion]
  Kept inline redirection flag (will obsolete).
- IO: moved clipboard functions from ImGuiIO to ImGuiPlatformIO:
    - io.GetClipboardTextFn         -> platform_io.Platform_GetClipboardTextFn
    - io.SetClipboardTextFn         -> platform_io.Platform_SetClipboardTextFn
    - in function signatures, changed 'void* user_data' to 'ImGuiContext* ctx' for consistency
      with other functions. Pull your user data from platform_io.ClipboardUserData if used.
    - as this is will affect all users of custom engines/backends, we are providing proper
      legacy redirection (will obsolete).
- IO: moved other functions from ImGuiIO to ImGuiPlatformIO:
    - io.PlatformOpenInShellFn      -> platform_io.Platform_OpenInShellFn (#7660)
    - io.PlatformSetImeDataFn       -> platform_io.Platform_SetImeDataFn
    - io.PlatformLocaleDecimalPoint -> platform_io.Platform_LocaleDecimalPoint (#7389, #6719, #2278)
    - access those via GetPlatformIO() instead of GetIO().
  (Because PlatformOpenInShellFn and PlatformSetImeDataFn were introduced very recently and
  often automatically set by core library and backends, we are exceptionally not maintaining
  a legacy redirection symbol for those two.)
- Commented the old ImageButton() signature obsoleted in 1.89 (~August 2022). (#5533, #4471, #2464, #1390)
   - old ImageButton() used ImTextureId as item id (created issue with e.g. multiple buttons in same scope, transient texture id values, opaque computation of ID)
   - new ImageButton() requires an explicit 'const char* str_id'
   - old ImageButton() had frame_padding' override argument.
   - new ImageButton() always use style.FramePadding, which you can modify using PushStyleVar()/PopStyleVar().

Other changes:

- IO: Added GetPlatformIO() and ImGuiPlatformIO, pulled from 'docking' branch, which
  is a centralized spot to connect os/platform/renderer related functions.
  Clipboard, IME and OpenInShell hooks are moved here. (#7660)
- IO, InputText: fixed an issue where typing text in an InputText() would defer character
  processing by one frame, because of the trickling input queue. Reworked interleaved
  keys<>char trickling to take account for keys known to input characters. (#7889, #4921, #4858)
- Windows: adjust default ClipRect to better match rendering of thick borders (which are in
  theory not supported). Compensate for the fact that borders are centered around the windows
  edge rather than inner. (#7887, #7888 + #3312, #7540, #3756, #6170, #6365)
- Made BeginItemTooltip() and IsItemHovered() with delay flag infer an implicit ID (for
  ID-less items such as Text element) in a way that works when item resizes. (#7945, #1485)
- MultiSelect+TreeNode+Drag and Drop: fixed an issue where carrying a drag and drop payload
  over an already open tree node using multi-select would incorrectly select it. (#7850)
- MultiSelect+TreeNode: default open behavior is _OpenOnDoubleClick + _OpenOnArrow when
  used in a multi-select context without any ImGuiTreeNode_OpenOnXXX flags set. (#7850)
- Tables: fixes/revert a 1.90 change were outer border would be moved bottom and right
  by an extra pixel + rework the change so that contents doesn't overlap the bottom and
  right border in a scrolling table. (#6765, #3752, #7428)
- Tables: fixed an issue resizing columns or querying hovered column/row when using multiple
  synched instances that are layed out at different X positions. (#7933)
- Tabs: avoid queuing a refocus when tab is already focused, which would have the
  side-effect of e.g. closing popup on a mouse release. (#7914)
- InputText: allow callback to update buffer while in read-only mode. (imgui_club/#46)
- InputText: fixed an issue programmatically refocusing a multi-line input which was just active. (#4761, #7870)
- TextLink(), TextLinkOpenURL(): change mouse cursor to Hand shape when hovered. (#7885, #7660)
- Tooltips, Drag and Drop: made it possible to override BeginTooltip() position while inside
  a drag and drop source or target: a SetNextWindowPos() call won't be overridden. (#6973)
- PlotHistogram, PlotLines: register item ID and use button behavior in a more idiomatic manner,
  fixes preventing e.g. GetItemID() and other ID-based helper to work. (#7935, #3072)
- Style: added PushStyleVarX(), PushStyleVarY() helpers to conveniently modify only
  one component of a ImVec2 var.
- Fonts: made it possible to use PushFont()/PopFont() calls across Begin() calls. (#3224, #3875, #6398, #7903)
- Backends:
  - Backends: GLFW: added ImGui_ImplGlfw_Sleep() helper function because GLFW does not
    provide a way to do a portable sleep. (#7844)
  - Backends: GLFW+Emscripten: Use OpenURL() from GLFW3 contrib port when available and using
    the contrib port instead of Emscripten own GLFW3 implementation. (#7647, #7915, #7660) [@ypujante]
  - Backends: SDL2, SDL3: ignore events of other SDL windows. (#7853) [@madebr, @ocornut]
  - Backends: SDL2, SDL3: storing SDL_WindowID inside ImGuiViewport::PlatformHandle instead of SDL_Window*.
  - Backends: SDL3: Update for API changes: SDL_GetGamepads() memory ownership logic was reverted back
    by SDL3 on July 27. (#7918, #7898, #7807) [@cheyao, @MattGuerrette]
  - Backends: GLFW: passing null window to glfwGetClipboardString()/glfwSetClipboardString()
    since GLFW own tests are doing that and it seems unnecessary.
  - Backends: SDL2, SDL3, GLFW, OSX, Allegro: update to set function handlers in ImGuiPlatformIO
    instead of ImGuiIO.
- Examples:
  - Examples: GLFW (all), SDL2 (all), SDL3 (all), Win32+OpenGL3: rework examples main loop
    to handle minimization without burning CPU or GPU by running unthrottled code. (#7844)
  - Examples: SDL3: Update for API changes: SDL_Init() returns 0 on failure.

-----------------------------------------------------------------------
 VERSION 1.91.0 (Released 2024-07-30)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.91.0

Breaking changes:

- IO, IME: renamed platform IME hook and added explicit context for consistency and future-proofness.
    - old: io.SetPlatformImeDataFn(ImGuiViewport* viewport, ImGuiPlatformImeData* data);
    - new: io.PlatformSetImeDataFn(ImGuiContext* ctx, ImGuiViewport* viewport, ImGuiPlatformImeData* data);
  It is expected that for a vast majority of users this is automatically set by core
  library and/or platform backend so it won't have any effect.
- Obsoleted GetContentRegionMax(), GetWindowContentRegionMin() and GetWindowContentRegionMax(). (#7838)
  You should never need those functions! You can do everything in less a confusing manner by only
  using GetCursorScreenPos() and GetContentRegionAvail(). Also always consider that if you are using
  GetWindowPos() and GetCursorPos() you may also be making things unnecessarily complicated.
  I repeat: You can do everything with GetCursorScreenPos() and GetContentRegionAvail()!
   - GetWindowContentRegionMax().x - GetCursorPos().x              -->  GetContentRegionAvail().x
   - GetWindowContentRegionMax().x + GetWindowPos().x              -->  GetCursorScreenPos().x + GetContentRegionAvail().x              // when called from left edge of window
   - GetContentRegionMax()                                         -->  GetContentRegionAvail() + GetCursorScreenPos() - GetWindowPos() // right edge in local coordinates
   - GetWindowContentRegionMax().x - GetWindowContentRegionMin().x -->  GetContentRegionAvail()                                         // when called from left edge of window
- Item flag changes:
  - Obsoleted PushButtonRepeat()/PopButtonRepeat() in favor of using new PushItemFlag()/PopItemFlag()
    with ImGuiItemFlags_ButtonRepeat. Kept inline redirecting functions (will obsolete).
  - Obsoleted PushTabStop()/PopTabStop() in favor of using new PushItemFlag()/PopItemFlag()
    with ImGuiItemFlags_NoTabStop. Kept inline redirecting functions (will obsolete).
  - Renamed ImGuiSelectableFlags_DontClosePopups to ImGuiSelectableFlags_NoAutoClosePopups for
    consistency. Kept inline redirecting functions (will obsolete).
    + Internals: changed/inverted ImGuiItemFlags_SelectableDontClosePopup (default==false) to
      ImGuiItemFlags_AutoClosePopups (default==true), same logic, only inverted behavior.
    (#1379, #1468, #2200, #4936, #5216, #7302, #7573)
- Commented out obsolete ImGuiModFlags (renamed to ImGuiKeyChord in 1.89). (#4921, #456)
- Commented out obsolete ImGuiModFlags_XXX values (renamed to ImGuiMod_XXX in 1.89). (#4921, #456)
    - ImGuiModFlags_Ctrl -> ImGuiMod_Ctrl, ImGuiModFlags_Shift -> ImGuiMod_Shift etc.
- Backends: GLFW+Emscripten: Renamed ImGui_ImplGlfw_InstallEmscriptenCanvasResizeCallback() to
  ImGui_ImplGlfw_InstallEmscriptenCallbacks(), with an additional GLFWWindow* parameter. (#7647) [@ypujante]

Other changes:

- Added TextLink(), TextLinkOpenURL() hyperlink widgets. (#7660)
- IO: added io.PlatformOpenInShellFn handler to open a link/folder/file in OS shell. (#7660)
  (*EDIT* From next version 1.91.1 we moved this to platform_io.Platform_OpenInShellFn *EDIT**)
  Added IMGUI_DISABLE_DEFAULT_SHELL_FUNCTIONS to disable default Windows/Linux/Mac implementations.
- IO: added io.ConfigNavSwapGamepadButtons to swap Activate/Cancel (A<>B) buttons, to match the
  typical "Nintendo/Japanese consoles" button layout when using Gamepad navigation. (#787, #5723)
- Added PushItemFlag()/PopItemFlags(), ImGuiItemFlags to modify shared item flags:
   - Added ImGuiItemFlags_NoTabStop to disable tabbing through items.
   - Added ImGuiItemFlags_NoNav to disable any navigation and focus of items. (#787)
   - Added ImGuiItemFlags_NoNavDefaultFocus to disable item being default focus. (#787)
   - Added ImGuiItemFlags_ButtonRepeat to enable repeat on any button-like behavior.
   - Added ImGuiItemFlags_AutoClosePopups to disable menu items/selection auto closing parent popups.
     Disabling this was previously possible for Selectable() via a direct flag but not for MenuItem().
     (#1379, #1468, #2200, #4936, #5216, #7302, #7573)
   - This was mostly all previously in imgui_internal.h.
- Multi-Select: added multi-select API and demos. (#1861, #6518)
   - This system implements standard multi-selection idioms (CTRL+mouse click, CTRL+keyboard moves,
     SHIFT+mouse click, SHIFT+keyboard moves, etc.) with support for clipper (not submitting non-visible
     items), box-selection with scrolling, and many other details.
   - In the spirit of Dear ImGui design, your code owns both items and actual selection data.
     This is designed to allow all kinds of selection storage you may use in your application
     (e.g. set/map/hash, intrusive selection, interval trees, up to you).
   - The supported widgets are Selectable(), Checkbox(). TreeNode() is also technically supported but...
     using this correctly is more complicated. You need some sort of linear/random access to your tree,
     which is suited to advanced trees setups already implementing filters and clipper.
     We will work toward simplifying our existing demo for trees.
   - A helper ImGuiSelectionBasicStorage is provided to facilitate getting started in a typical app
     (likely to suit a majority of users).
   - Documentation:
     - Wiki page https://github.com/ocornut/imgui/wiki/Multi-Select for API overview.
     - Demo code + headers are well commented.
  - Added BeginMultiSelect(), EndMultiSelect(), SetNextItemSelectionUserData().
  - Added IsItemToggledSelection() for use if you need latest selection update during current iteration.
  - Added ImGuiMultiSelectIO and ImGuiSelectionRequest structures:
    - BeginMultiSelect() and EndMultiSelect() return a ImGuiMultiSelectIO structure, which
      is mostly an array of ImGuiSelectionRequest actions (clear, select all, set range, etc.)
    - Other fields are helpful when using a clipper, or wanting to handle deletion nicely.
  - Added ImGuiSelectionBasicStorage helper to store and maintain a selection (optional):
    - This is similar to if you used e.g. a std::set<ID> to store a selection, with all the right
      glue to honor ImGuiMultiSelectIO requests. Most applications can use that.
  - Added ImGuiSelectionExternalStorage helper to maintain an externally stored selection (optional):
    - Helpful to easily bind multi-selection to e.g. an array of checkboxes.
  - Added ImGuiMultiSelectFlags options:
    - ImGuiMultiSelectFlags_SingleSelect
    - ImGuiMultiSelectFlags_NoSelectAll
    - ImGuiMultiSelectFlags_NoRangeSelect
    - ImGuiMultiSelectFlags_NoAutoSelect
    - ImGuiMultiSelectFlags_NoAutoClear
    - ImGuiMultiSelectFlags_NoAutoClearOnReselect (#7424)
    - ImGuiMultiSelectFlags_BoxSelect1d
    - ImGuiMultiSelectFlags_BoxSelect2d
    - ImGuiMultiSelectFlags_BoxSelectNoScroll
    - ImGuiMultiSelectFlags_ClearOnEscape
    - ImGuiMultiSelectFlags_ClearOnClickVoid
    - ImGuiMultiSelectFlags_ScopeWindow (default), ImGuiMultiSelectFlags_ScopeRect
    - ImGuiMultiSelectFlags_SelectOnClick (default), ImGuiMultiSelectFlags_SelectOnClickRelease
    - ImGuiMultiSelectFlags_NavWrapX
  - Demo: Added "Examples->Assets Browser" demo.
  - Demo: Added "Widgets->Selection State & Multi-Select" section, with:
    - Multi-Select
    - Multi-Select (with clipper)
    - Multi-Select (with deletion)
    - Multi-Select (dual list box) (#6648)
    - Multi-Select (in a table)
    - Multi-Select (checkboxes)
    - Multi-Select (multiple scopes)
    - Multi-Select (tiled assert browser)
    - Multi-Select (trees) (#1861)
    - Multi-Select (advanced)
- Inputs: added SetItemKeyOwner(ImGuiKey key) in public API.
  This is a simplified version of a more complete set of function available in imgui_internal.h.
  One common use-case for this is to allow your widgets to disable standard inputs behaviors such
  as Tab or Alt handling, Mouse Wheel scrolling, etc.
  (#456, #2637, #2620, #2891, #3370, #3724, #4828, #5108, #5242, #5641)
     // Hovering or activating the button will disable mouse wheel default behavior to scroll
     InvisibleButton(...);
     SetItemKeyOwner(ImGuiKey_MouseWheelY);
- Nav: fixed clicking window decorations (e.g. resize borders) from losing focused item when
  within a child window using ImGuiChildFlags_NavFlattened.
- InputText: added '\' and '/' as word separator. (#7824, #7704) [@reduf]
- TreeNode: added SetNextItemStorageID() to specify/override the identifier used for persisting
  open/close storage. Useful if needing to often read/write from storage without manipulating
  the ID stack. (#7553, #6990, #3823, #1131)
- Selectable: added ImGuiSelectableFlags_Highlight flag to highlight items independently from
  the hovered state. (#7820) [@rerilier]
- Clipper: added SeekCursorForItem() function. When using ImGuiListClipper::Begin(INT_MAX) you can
  can use the clipper without knowing the amount of items beforehand. (#1311)
  In this situation, call ImGuiListClipper::SeekCursorForItem(items_count) at the end of your iteration
  loop to position the layout cursor correctly. This is done automatically if provided a count to Begin().
- Groups, Tables: fixed EndGroup() failing to correctly capture current table occupied size. (#7543)
- Style, TabBar: added style.TabBarOverlineSize / ImGuiStyleVar_TabBarOverlineSize to manipulate
  thickness of the horizontal line over selected tabs. [@DctrNoob]
- Style: close button and collapse/window-menu button hover highlight made rectangular instead of round.
- Misc: added GetID(int) variant for consistency. (#7111)
- Debug Tools:
  - Debug Log: Added IMGUI_DEBUG_LOG(), ImGui::DebugLog() in public API. (#5855)
    Printed entries include imgui frame counter prefix + are redirected to ShowDebugLogWindow() and
    other configurable locations. Always call IMGUI_DEBUG_LOG() for maximum stripping in caller code.
  - Debug Log: Added "Configure Outputs.." button. (#5855)
  - Debug Log: Fixed incorrect checkbox layout when partially clipped.
- Demo: Reworked "Property Editor" demo in a manner that more resemble the tree data and
  struct description data that a real application would want to use.
- Backends:
  - Backends: Win32: Fixed ImGuiMod_Super being mapped to VK_APPS instead of (VK_LWIN || VK_RWIN).
    (#7768, #4858, #2622) [@Aemony]
  - Backends: SDL3: Update for API changes: SDL_GetGamepads() memory ownership change. (#7807)
  - Backends: SDL3: Update for API changes: SDL_GetClipboardText() memory ownership change. (#7801)
  - Backends: SDL3: Update for API changes: SDLK_x renames and SDLK_KP_x removals (#7761, #7762)
  - Backends: SDL3: Update for API changes: SDL_GetProperty() change to SDL_GetPointerProperty(). (#7794) [@wermipls]
  - Backends: SDL2,SDL3,OSX: Update for io.SetPlatformImeDataFn() -> io.PlatformSetImeDataFn() rename.
  - Backends: GLFW,SDL2: Added io.PlatformOpenInShellFn handler for web/Emscripten versions. (#7660)
    [@ypujante, @ocornut]
  - Backends: GLFW+Emscripten: Added support for GLFW3 contrib port which fixes many of the things
    not supported by the embedded GLFW: gamepad support, mouse cursor shapes, copy to clipboard,
    workaround for Super/Meta key, different ways of resizing, multi-window (glfw/canvas) support.
    (#7647) [@ypujante]
  - Backends: GLFW+Emscripten: Fixed Emscripten warning when using mouse wheel on some setups
    "Unable to preventDefault inside passive event listener". (#7647, #7600) [@ypujante]


-----------------------------------------------------------------------
 VERSION 1.90.9 (Released 2024-07-01)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.9

Breaking changes:

- Removed old nested structure: renaming ImGuiStorage::ImGuiStoragePair type to
  ImGuiStoragePair (simpler for many languages). No significant nested type left.
- BeginChild: added ImGuiChildFlags_NavFlattened as a replacement for the window
  flag ImGuiWindowFlags_NavFlattened: the feature only ever made sense for
  BeginChild() calls anyhow. (#7687) [@cfillion]
   - old: BeginChild("Name", size, 0, ImGuiWindowFlags_NavFlattened);
   - new: BeginChild("Name", size, ImGuiChildFlags_NavFlattened, 0)
  Kept inline redirection flag (will obsolete).
- Style: renamed tab colors for clarity and consistency with other changes: (#261, #351)
  - ImGuiCol_TabActive          -> ImGuiCol_TabSelected
  - ImGuiCol_TabUnfocused       -> ImGuiCol_TabDimmed
  - ImGuiCol_TabUnfocusedActive -> ImGuiCol_TabDimmedSelected
  Kept inline redirecting enums (will obsolete).
- IO: io.ClearInputKeys() (first exposed in 1.89.8) doesn't clear mouse data.
  Newly added io.ClearInputMouse() does. (#4921)
- Drag and Drop: renamed ImGuiDragDropFlags_SourceAutoExpirePayload to
  ImGuiDragDropFlags_PayloadAutoExpire. Kept inline redirecting enum (will obsolete). (#1725, #143)

Other changes:

- IO: do not disable io.ConfigWindowsResizeFromEdges (which allow resizing from borders
  and lower-left corner) when ImGuiBackendFlags_HasMouseCursors is not set by backend.
  The initial reasoning is that resizing from borders feels better when correct mouse cursor
  shape change as honored by backends. Keeping this enabling will hopefully increase pressure
  on third-party backends to set ImGuiBackendFlags_HasMouseCursors and honor changes of
  ImGui::GetMouseCursor() value. (#1495)
- IO: do not claim io.WantCaptureMouse=true on the mouse release frame of a button
  which was pressed over void/underlying app, which is consistent/needed to allow the
  mouse up event of a drag over void/underlying app to catch release. (#1392) [@Moka42]
- IO: Added io.ClearInputMouse() to clear mouse state. (#4921)
- IO: Added ImGuiConfigFlags_NoKeyboard for consistency and convenience. (#4921)
- Windows: BeginChild(): fixed a glitch when during a resize of a child window which is
  tightly close to the boundaries of its parent (e.g. with zero WindowPadding), the child
  position could have temporarily be moved around by erroneous padding application. (#7706)
- TabBar, Style: added ImGuiTabBarFlags_DrawSelectedOverline option to draw an horizontal
  line over selected tabs to increase visibility. This is used by docking.
  Added corresponding ImGuiCol_TabSelectedOverline and ImGuiCol_TabDimmedSelectedOverline colors.
- Tables: added TableGetHoveredColumn() to public API, as an alternative to testing for
  'TableGetColumnFlags(column) & ImGuiTableColumnFlags_IsHovered' on each column. (#3740)
- Disabled, Inputs: fixed using Shortcut() or SetNextItemShortcut() within a disabled block
  bypassing the disabled state. (#7726)
- Disabled: Reworked 1.90.8 behavior of Begin() not inheriting current BeginDisabled() state,
  to make it that only tooltip windows are temporarily clearing it. (#211, #7640)
- Drags: added ImGuiSliderFlags_WrapAround flag for DragInt(), DragFloat() etc. (#7749)
- Drag and Drop: BeginDragDropSource() with ImGuiDragDropFlags_SourceExtern sets
  active id so a multi-frame extern source doesn't interfere with hovered widgets. (#143)
- Drag and Drop: BeginDragDropSource() with ImGuiDragDropFlags_SourceExtern does not assume
  a mouse button being pressed. Facilitate implementing cross-context drag and drop. (#143)
- Drag and Drop: Added ImGuiDragDropFlags_PayloadNoCrossContext/_PayloadNoCrossProcess flags
  as metadata to specify that a payload may not be copied outside the context/process by
  some logic aiming to copy payloads around.
- Drag and Drop: Fixes an issue when elapsing payload would be based on last payload
  frame instead of last drag source frame, which makes a difference if not resubmitting
  payload every frame. (#143)
- Debug Tools: Metrics/Debugger: Browsing a Storage perform hover lookup on identifier.
- Viewports: Backported 'void* ImGuiViewport::PlatformHandle' from docking branch for
  use by backends.
- imgui_freetype: Fixed divide by zero while handling FT_PIXEL_MODE_BGRA glyphs. (#7267, #3369)
- Backends: OpenGL2, OpenGL3: ImGui_ImplOpenGL3_NewFrame() recreates font texture if it
  has been destroyed by ImGui_ImplOpenGL3_DestroyFontsTexture(). (#7748) [@mlauss2]
- Backends: SDL3: Update for API removal of keysym field in SDL_KeyboardEvent. (#7728)
- Backends: SDL3: Update for SDL_StartTextInput()/SDL_StopTextInput() API changes. (#7735)
- Backends: SDL3: Update for SDL_SetTextInputRect() API rename. (#7760, #7754) [@maxortner01]
- Backends: SDLRenderer3: Update for SDL_RenderGeometryRaw() API changes. (SDL#9009).
- Backends: Vulkan: Remove Volk/ from volk.h #include directives. (#7722, #6582, #4854)
  [@martin-ejdestig]
- Examples: SDL3: Remove use of SDL_HINT_IME_NATIVE_UI since new SDL_HINT_IME_IMPLEMENTED_UI
  values has a more suitable default for our case case.
- Examples: GLFW+Vulkan, SDL+Vulkan: handle swap chain resize even without Vulkan
  returning VK_SUBOPTIMAL_KHR, which doesn't seem to happen on Wayland. (#7671)
  [@AndreiNego, @ocornut]


-----------------------------------------------------------------------
 VERSION 1.90.8 (Released 2024-06-06)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.8

Breaking changes:

- Reordered various ImGuiInputTextFlags values. This should NOT be breaking unless
  you are using generated headers that have values not matching the main library.
- Removed ImGuiButtonFlags_MouseButtonDefault_ = ImGuiButtonFlags_MouseButtonLeft
  from imgui.h, was mostly unused and misleading.

Other changes:

- Inputs: fixed IsMouseClicked(..., repeat=true); broken in 1.90.7 on 2024/05/22.
  (due to an internal api parameter swap, repeat wouldn't be honored and
  ownership would be accidentally checked even though this api is meant to not
  check ownership). (#7657) [@korenkonder]
- Windows: fixed altering FramePadding mid-frame not correctly affecting logic
  responsible for honoring io.ConfigWindowsMoveFromTitleBarOnly. (#7576, #899)
- Scrollbar: made scrolling logic more standard: clicking above or below the
  grab scrolls by one page, holding mouse button repeats scrolling. (#7328, #150)
- Scrollbar: fixed miscalculation of vertical scrollbar visibility when required
  solely by the presence of an horizontal scrollbar. (#1574)
- InputScalar, InputInt, InputFloat: added ImGuiInputTextFlags_ParseEmptyRefVal
  to parse an empty field as zero-value. (#7305) [@supermerill, @ocornut]
- InputScalar, InputInt, InputFloat: added ImGuiInputTextFlags_DisplayEmptyRefVal
  to display a zero-value as empty. (#7305) [@supermerill, @ocornut]
- Popups: fixed an issue preventing to close a popup opened over a modal by clicking
  over void (it required clicking over the visible part of the modal). (#7654)
- Tables: fixed an issue where ideal size reported to parent container wouldn't
  correctly take account of inner scrollbar, affecting potential auto-resize of
  parent container. (#7651)
- Tables: fixed a bug where after disabling the ScrollY flag for a table,
  previous scrollbar width would be accounted for. (#5920)
- Combo: simplified Combo() API uses a list clipper (due to its api it wasn't
  previously trivial before we added clipper.IncludeItemByIndex() function).
- Disabled: nested tooltips or other non-child window within a BeginDisabled()
  block disable the disabled state. (#211, #7640)
- Misc: made ImGuiDir and ImGuiSortDirection stronger-typed enums.
- Backends: SDL3: Update for SDL_SYSTEM_CURSOR_xxx api renames. (#7653)


-----------------------------------------------------------------------
 VERSION 1.90.7 (Released 2024-05-27)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.7

Breaking changes:

- Inputs: on macOS X, Cmd and Ctrl keys are now automatically swapped by io.AddKeyEvent(),
  as this naturally align with how macOS X uses those keys. (#2343, #4084, #5923, #456)
  - Effectively it means that e.g. ImGuiMod_Ctrl | ImGuiKey_C is a valid idiomatic shortcut
    for both Windows and Mac style users.
  - It shouldn't really affect your code unless you had explicit/custom shortcut swapping in
    place for macOS X apps in your input logic.
  - Removed ImGuiMod_Shortcut which was previously dynamically remapping to Ctrl or Cmd/Super.
    It is now unnecessary to specific cross-platform idiomatic shortcuts.
    Kept symbols redirecting ImGuiMod_Shortcut to ImGuiMod_Ctrl (will obsolete).
- Commented out obsolete symbols renamed in 1.88 (May 2022):
    CaptureKeyboardFromApp() -> SetNextFrameWantCaptureKeyboard()
    CaptureMouseFromApp()    -> SetNextFrameWantCaptureMouse()
- Backends: SDL_Renderer2/SDL_Renderer3: ImGui_ImplSDLRenderer2_RenderDrawData() and
  ImGui_ImplSDLRenderer3_RenderDrawData() now takes a SDL_Renderer* parameter. This was previously
  overlooked from the API but it will allow eventual support for multi-viewports.

Other changes:

- Windows: BeginChild(): fixed visibility of fully clipped child windows and tables to Test Engine.
- Windows: BeginChild(): fixed auto-fit calculation when using either (not both) ResizeX/ResizeY
  and double-clicking on a border. Calculation incorrectly didn't always account for scrollbar as
  it assumed the other axis would also be auto-fit. (#1710)
- Inputs: added shortcut and routing system in public API. (#456, #2637) [BETA]
  - The general idea is that several callers may register interest in a shortcut, and only one owner gets it.
    - in Parent: call Shortcut(Ctrl+S)    // When Parent is focused, Parent gets the shortcut.
    - in Child1: call Shortcut(Ctrl+S)    // When Child1 is focused, Child1 gets the shortcut (Child1 overrides Parent shortcuts)
    - in Child2: no call                  // When Child2 is focused, Parent gets the shortcut.
    The whole system is order independent, so if Child1 makes its calls before Parent, results will be identical.
    This is an important property as it facilitate working with foreign code or larger codebase.
  - Added Shortcut() function:
    e.g. Using ImGui::Shortcut(ImGuiMod_Ctrl | ImGuiKey_C); with default policy:
    - checks that CTRL+C is pressed,
    - and that current window is in focus stack,
    - and that no other requests for CTRL+C have been made from higher priority locations
      (e.g. deeper in the window/item stack).
  - Added SetNextItemShortcut() to set a shortcut to locally or remotely press or activate
    an item (depending on specified routing policy: using ImGuiInputFlags_RouteGlobal the item
    shortcut may be executed even if its window is not in focus stack).
    Items like buttons are not fully activated, in the sense that they get pressed but another
    active item, e.g. InputText() won't be deactivated.
  - Added routing policies for Shortcut(), SetNextItemShortcut(): (#456, #2637)
    - ImGuiInputFlags_RouteFocused: focus stack route (default)
    - ImGuiInputFlags_RouteActive: only route to active item
    - ImGuiInputFlags_RouteGlobal: route globally, unless a focus route claim shame shortcut.
    - ImGuiInputFlags_RouteAlways: no routing submission, no routing check.
  - Added other shortcut/routing options: (#456, #2637)
    - ImGuiInputFlags_Repeat: for use by Shortcut() and by upcoming rework of various
      input functions (which are still internal for now).
    - ImGuiInputFlags_Tooltip: for SetNextItemShortcut() to show a tooltip when hovering item.
    - ImGuiInputFlags_RouteOverFocused: global route takes priority over focus route.
    - ImGuiInputFlags_RouteOverActive: global route takes priority over active item.
    - ImGuiInputFlags_RouteUnlessBgFocused: global route disabled if no imgui window focused.
    - ImGuiInputFlags_RouteFromRootWindow: route evaluated from the point of view of root window rather than current window.
- Inputs: (OSX) Fixes variety of code which inconsistently required using Ctrl instead of Cmd.
  - e.g. Drags/Sliders now use Cmd+Click to input a value. (#4084)
  - Some shortcuts still uses Ctrl on Mac: e.g. Ctrl+Tab to switch windows. (#4828)
- Inputs: (OSX) Ctrl+Left Click alias as a Right click. (#2343) [@haldean, @ocornut]
- Inputs: Fixed ImGui::GetKeyName(ImGuiKey_None) from returning "N/A" or "None" depending
  on value of IMGUI_DISABLE_OBSOLETE_KEYIO. It always returns "None".
- Nav: fixed holding Ctrl or gamepad L1 from not slowing down keyboard/gamepad tweak speed.
  Broken during a refactor refactor for 1.89. Holding Shift/R1 to speed up wasn't broken.
- Tables: fixed cell background of fully clipped row overlapping with header. (#7575, #7041) [@prabuinet]
- Demo: Added "Inputs & Focus -> Shortcuts" section. (#456, #2637)
- Demo: Documents: Added shortcuts and renaming tabs/documents. (#7233)
- Examples: Win32+DX9,DX10,DX11,DX12: rework main loop to handle minimization and screen
  locking without burning resources by running unthrottled code. (#2496, #3907, #6308, #7615)
- Backends: all backends + demo now call IMGUI_CHECKVERSION() to verify ABI compatibility between caller
  code and compiled version of Dear ImGui. If you get an assert it most likely mean you have a build issue,
  read comments near the assert. (#7568)
- Backends: Win32: undo an assert introduced in 1.90.6 which didn't allow WndProc
  handler to be called before backend initialization. Because of how ::CreateWindow()
  calls in WndProc this is facilitating. (#6275) [@MennoVink]
- Backends, Examples: SDL3: updates for latest SDL3 API changes. (#7580) [@kuvaus, @ocornut]

Breaking changes IF you were using imgui_internal.h versions of Shortcut() or owner-aware
versions of IsKeyPressed(), IsKeyChordPressed(), IsMouseClicked() prior to this version:

- Inputs (Internals): Renamed ImGuiKeyOwner_None to ImGuiKeyOwner_NoOwner, to make use more
  explicit and reduce confusion with the fact it is a non-zero value and cannot be a default.
- Inputs (Internals): Renamed symbols global routes:
      Renamed ImGuiInputFlags_RouteGlobalLow  -> ImGuiInputFlags_RouteGlobal (this is the suggested global route)
      Renamed ImGuiInputFlags_RouteGlobal     -> ImGuiInputFlags_RouteGlobal | ImGuiInputFlags_RouteOverFocused
      Renamed ImGuiInputFlags_RouteGlobalHigh -> ImGuiInputFlags_RouteGlobal | ImGuiInputFlags_RouteOverFocused | ImGuiInputFlags_RouteOverActive
- Inputs (Internals): Shortcut(), SetShortcutRouting(): swapped last two parameters order
  in function signatures:
      Before: Shortcut(ImGuiKeyChord key_chord, ImGuiID owner_id = 0, ImGuiInputFlags flags = 0);
      After:  Shortcut(ImGuiKeyChord key_chord, ImGuiInputFlags flags = 0, ImGuiID owner_id = 0);
- Inputs (Internals): owner-aware versions of IsKeyPressed(), IsKeyChordPressed(), IsMouseClicked():
  swapped last two parameters order in function signatures:
      Before: IsKeyPressed(ImGuiKey key, ImGuiID owner_id, ImGuiInputFlags flags = 0);
      After:  IsKeyPressed(ImGuiKey key, ImGuiInputFlags flags, ImGuiID owner_id = 0);
      Before: IsMouseClicked(ImGuiMouseButton button, ImGuiID owner_id, ImGuiInputFlags flags = 0);
      After:  IsMouseClicked(ImGuiMouseButton button, ImGuiInputFlags flags, ImGuiID owner_id = 0);
- For several reasons those changes makes sense. They were all made before making some of
  those API public. Only past users of imgui_internal.h with the extra parameters will be affected.
  Added asserts for valid flags in various functions to detect _some_ misuses, BUT NOT ALL.


-----------------------------------------------------------------------
 VERSION 1.90.6 (Released 2024-05-08)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.6

Breaking changes:

- TreeNode: Fixed a layout inconsistency when using a empty/hidden label followed
  by a SameLine() call. (#7505, #282)
     Before: TreeNode("##Hidden"); SameLine(); Text("Hello");
             // This was actually incorrect! BUT appeared to look ok with the default style
             // where ItemSpacing.x == FramePadding.x * 2 (it didn't look aligned otherwise).
     After:  TreeNode("##Hidden"); SameLine(0, 0); Text("Hello");
             // This is correct for all values in style.
  With the fix, IF you were successfully using TreeNode("")+SameLine(); you will now
  have extra spacing between your TreeNode and the following item. You'll need to change
  the SameLine() call to SameLine(0,0) to remove this extraneous spacing.
  This seemed like the more sensible fix that's not making things less consistent.
  (Note: when using this idiom you are likely to also use ImGuiTreeNodeFlags_SpanAvailWidth).

Other changes:

- Windows: Changed default ClipRect to extend to windows' left and right borders,
  instead of adding arbitrary WindowPadding.x * 0.5f space on left and right.
  That ClipRect half-padding was arbitrary/confusing and inconsistent with Y axis.
  It also made it harder to draw items covering whole window without pushing an
  extended ClipRect. Some items near windows left and right edge that used to be clipped
  may be partly more visible. (#3312, #7540, #3756, #6170, #6365)
- Windows: Fixed subsequent Begin() append calls from setting last item information
  for title bar, making it impossible to use IsItemHovered() on a Begin()-to-append,
  and causing issue bypassing hover detection on collapsed windows. (#7506, #823)
- Fonts: Fixed font ascent and descent calculation when a font hits exact integer values.
  It is possible that some prior manual use of ImFontConfig::GlyphOffset may become
  duplicate with this fix. (#7399, #7404) [@GamingMinds-DanielC]
- TreeNode: Added ImGuiTreeNodeFlags_SpanTextWidth to make hitbox and highlight only
  cover the label. (#6937) [@dimateos]
- Tables: Angled headers: fixed multi-line label display when angle is flipped. (#6917)
- Tables: Angled headers: added style.TableAngledHeadersTextAlign and corresponding
  ImGuiStyleVar_TableAngledHeadersTextAlign variable. Default to horizontal center. (#6917)
  [@thedmd, @ocornut]
- ProgressBar: Added support for indeterminate progress bar by passing an animated
  negative fraction, e.g. ProgressBar(-1.0f * GetTime()). (#5316, #5370, #1901)[@gan74]
- Text, DrawList: Improved handling of long single-line wrapped text. Faster and
  mitigate issues with reading vertex indexing limits with 16-bit indices. (#7496, #5720)
- Backends: OpenGL3: Detect ES3 contexts on desktop based on version string,
  to e.g. avoid calling glPolygonMode() on them. (#7447) [@afraidofdark, @ocornut]
- Backends: OpenGL3: Update loader for Linux to support EGL/GLVND. (#7562) [@ShadowNinja, @vanfanel]
- Backends: Vulkan: Added convenience support for Volk via IMGUI_IMPL_VULKAN_USE_VOLK define.
  (you could always use IMGUI_IMPL_VULKAN_NO_PROTOTYPES + ImGui_ImplVulkan_LoadFunctions() as well).
  (#6582, #4854) [@adalsteinnh, @kennyalive, @ocornut]
- Backends: SDL3: Fixed text inputs. Re-enable calling SDL_StartTextInput()/SDL_StopTextInput()
  as SDL3 no longer enables it by default. (#7452, #6306, #6071, #1953) [@Green-Sky]
- Examples: GLFW+Vulkan, SDL+Vulkan: Added optional support for Volk. (#6582, #4854)
- Examples: GLFW+WebGPU: Added support for WebGPU-native/Dawn (#7435, #7132) [@eliasdaler, @Zelif]
- Examples: GLFW+WebGPU: Renamed example_emscripten_wgpu/ to example_glfw_wgpu/. (#7435, #7132)


-----------------------------------------------------------------------
 VERSION 1.90.5 (Released 2024-04-11)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.5

Breaking changes:

- More formally obsoleted GetKeyIndex() when IMGUI_DISABLE_OBSOLETE_FUNCTIONS is set.
  It has been unnecessary and a no-op since 1.87 (it returns the same value as passed
  when used with a 1.87+ backend using io.AddKeyEvent() function). (#4921)
  - IsKeyPressed(GetKeyIndex(ImGuiKey_XXX)) --> IsKeyPressed(ImGuiKey_XXX)
- ImDrawList: Merged the radius_x/radius_y parameters in AddEllipse(), AddEllipseFilled()
  and PathEllipticalArcTo() into a single ImVec2 parameter. Exceptionally, because those
  functions were added recently in 1.90, we are not adding inline redirection functions.
  The transition is easy and should affect few users. (#2743, #7417) [@cfillion]

Other changes:

- Windows: Scrollbar visibility decision uses current size when both size and contents
  size are submitted by API. (#7252)
- Windows: Double-click to collapse may be disabled via key-ownership mechanism. (#7369)
- Windows: BeginChild(): Extend outer resize borders to the edges when there are no corner
  grips. Essentially affects resizable child windows. (#7440, #1710) [@cfillion]
- Windows: BeginChild(): Resizing logic for child windows evaluates whether per-axis clamping
  should be applied based on parent scrollbars, not child scrollbars. (#7440, #1710) [@cfillion]
  Adjust those resizing limits to match window padding rather than inner clipping rectangle.
- Tables: Fixed auto-width columns when using synced-instances of same table, width of
  one instance would bleed into next one instead of sharing their widths. (#7218)
- Tables: Angled headers: fixed border hit box extending beyond when used within
  non-scrollable tables. (#7416) [@cfillion]
- Tables: Angled headers: fixed borders not moving back up after TableAngleHeadersRow()
  stops being called. (#7416) [@cfillion]
- Tables: Angled headers: rounding header size to nearest integers, fixes some issues
  when using clipper.
- Menus, Popups: Fixed an issue where sibling menu popups re-opening in successive
  frames would erroneously close the window. While it is technically a popup issue
  it would generally manifest when fast moving the mouse bottom to top in a sub-menu.
  (#7325, #7287, #7063)
- ProgressBar: Fixed passing fraction==NaN from leading to a crash. (#7451)
- ListBox: Fixed text-baseline offset when using SameLine()+Text() after a labeled ListBox().
- Drags, Sliders, Inputs: Fixed io.PlatformLocaleDecimalPoint decimal point localization
  feature not working regression from 1.90.1. (#7389, #6719, #2278) [@GamingMinds-DanielC]
- Style: Added ImGuiStyleVar_TabBorderSize, ImGuiStyleVar_TableAngledHeadersAngle for
  consistency. (#7411) [@cfillion]
- DrawList: Added AddConcavePolyFilled(), PathFillConcave() concave filling. (#760) [@thedmd]
  Note that only simple polygons (no self-intersections, no holes) are supported.
- DrawList: Allow AddText() to accept null ranges. (#3615, 7391)
- Docs: added more wiki links to headers of imgui.h/imgui.cpp to facilitate discovery
  of interesting resources, because github doesn't allow Wiki to be crawled by search engines.
  - This is the main wiki: https://github.com/ocornut/imgui/wiki
  - This is the crawlable version: https://github-wiki-see.page/m/ocornut/imgui/wiki
    Adding a link to the crawlable version, even though it is not intended for humans,
    to increase its search rank.


-----------------------------------------------------------------------
 VERSION 1.90.4 (Released 2024-02-22)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.4

Other changes:

- Nav: Fixed SetKeyboardFocusHere() or programmatic tabbing API from not working on
  windows with the ImGuiWindowFlags_NoNavInputs flag (regression in 1.90.2, which
  among other things broke imgui_memory_editor).
- Menus, Popups: Fixed an issue where hovering a parent-menu upward would
  erroneously close the window. (#7325, #7287, #7063)
- Popups: Fixed resizable popup minimum size being too small. Standardized minimum
  size logic. (#7329).
- Modals: Temporary changes of ImGuiCol_ModalWindowDimBg are properly handled by
  BeginPopupModal(). (#7340)
- Tables: Angled headers: fixed support for multi-line labels. (#6917)
- Tables: Angled headers: various fixes to accurately handle CellPadding changes. (#6917)
- Tables: Angled headers: properly registers horizontal component of angled headers
  for auto-resizing of columns. (#6917)
- Tables: Angled headers: fixed TableAngledHeadersRow() incorrect background fill
  drawn too low, particularly visible with tables that have no scrolling. (#6917)
- ProgressBar: Fixed a minor tessellation issue when rendering rounded progress bars,
  where in some situations the rounded section wouldn't follow regular tessellation rules.
- Debug Tools: Item Picker: Promoted ImGui::DebugStartItemPicker() to public API. (#2673)
- Debug Tools: Item Picker: Menu entry visible in Demo->Tools but greyed out unless
  io.ConfigDebugIsDebuggerPresent is set. (#2673)
- Misc: Added optional alpha multiplier parameter to GetColorU32(ImU32) variant.
- Demo: Custom Rendering: better demonstrate PathArcTo(), PathBezierQuadraticCurveTo(),
  PathBezierCubicCurveTo(), PathStroke(), PathFillConvex() functions.


-----------------------------------------------------------------------
 VERSION 1.90.3 (Released 2024-02-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.3

Breaking changes:

- Backends: SDL2: Removed obsolete ImGui_ImplSDL2_NewFrame(SDL_Window*) signature which
  was obsoleted in 1.84. Calling ImGui_ImplSDL2_NewFrame() is fine.
- Backends: Vulkan: Moved RenderPass parameter from ImGui_ImplVulkan_Init() function to
  ImGui_ImplVulkan_InitInfo structure. Not required when using dynamic rendering. (#7308) [@shawnhatori]
- Backends: Vulkan: Using dynamic rendering now require filling the PipelineRenderingCreateInfo
  structure in ImGui_ImplVulkan_InitInfo, allowing to configure color/depth/stencil formats.
  Removed ColorAttachmentFormat field previously provided for dynamic rendering.
  (#7166, #6855, #5446, #5037) [@shawnhatori]

Other changes:

- Menus, Popups: Fixed menus and popups with ChildWindow flag erroneously not displaying
  a scrollbar when contents is over parent viewport size. (#7287, #7063) [@ZingBallyhoo]
- Backends: SDL2, SDL3: Handle gamepad disconnection + fixed increasing gamepad reference
  counter continuously. Added support for multiple simultaneous gamepads.
  Added ImGui_ImplSDL2_SetGamepadMode()) function to select whether to automatically pick
  first available gamepad, all gamepads, or specific gamepads.
  (#3884, #6559, #6890, #7180) [@ocornut, @lethal-guitar, @wn2000, @bog-dan-ro]
- Backends: SDL3: Fixed gamepad handling. (#7180) [@bog-dan-ro]
- Backends: SDLRenderer3: query newly added SDL_RenderViewportSet() to not restore
  a wrong viewport if none was initially set.
- Backends: DirectX9: Using RGBA format when allowed by the driver to avoid CPU side
  conversion. (#6575) [@Demonese]
- Internals: Fixed ImFileOpen not working before context is created, preventing creation
  of a font atlas before main context creation. (#7314, #7315) [@PathogenDavid, @ocornut]


-----------------------------------------------------------------------
 VERSION 1.90.2 (Released 2024-02-09)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.2

Breaking changes:

- Commented out ImGuiIO::ImeWindowHandle obsoleted in 1.87 in favor of writing
  to 'void* ImGuiViewport::PlatformHandleRaw'.
- Backends: WebGPU: ImGui_ImplWGPU_Init() now takes a ImGui_ImplWGPU_InitInfo structure
  instead of variety of parameters, allowing for easier further changes. (#7240)

Other changes:

- Nav: keyboard/gamepad activation mark widgets as held to give better visual feedback.
- Nav: tweak to logic marking navigated item as hovered when using keyboard, allowing
  the hover highlight to stay even while another item is activated.
- Nav: Fixed SetKeyboardFocusHere() not working when current nav focus is in different scope,
  regression from 1.90.1 related to code scoping Tab presses to local scope. (#7226) [@bratpilz]
- Nav: Fixed pressing Escape while in a child window with _NavFlattened flag. (#7237)
- Nav: Improve handling of Alt key to toggle menu so that key ownership may be claimed on
  individual left/right alt key without interfering with the other.
- Nav, Menus: Fixed click on a BeginMenu() followed by right-arrow from making the child menu
  reopen and flicker (using ImGuiPopupFlags_NoReopen).
- Nav: ImGuiWindowFlags_NoNavInputs is tested during scoring so NavFlattened windows can use it.
- Popups: OpenPopup(): added ImGuiPopupFlags_NoReopen flag to specifically not close and reopen
  a popup when it is already open. (#1497, #1533)
  (Note that this differs from specific handling we already have in place for the case of calling
  OpenPopup() repeatedly every frame: we already didn't reopen in that specific situation, otherwise
  the effect would be very disastrous in term of confusion, as reopening would steal focus).
- Popups: Slight change to popup closing logic (e.g. after focusing another window) which skipped
  over popups that are also child windows.
- Combo: Fixed not reusing windows optimally when used inside a popup stack.
- Debug Tools: Metrics: Fixed debug break in SetShortcutRouting() not handling ImGuiMod_Shortcut redirect.
- Debug Tools: Metrics: Improved Monitors and Viewports minimap display. Highlight on hover.
- Debug Tools: Debug Log: Added "Input Routing" logging.
- Debug Tools: Added "nop" to IM_DEBUG_BREAK macro on GCC to work around GDB bug (#7266) [@Peter0x44]
- Backends: Vulkan: Fixed vkAcquireNextImageKHR() validation errors in VulkanSDK 1.3.275 by
  allocating one extra semaphore than in-flight frames. (#7236) [@mklefrancois]
- Backends: Vulkan: Fixed vkMapMemory() calls unnecessarily using full buffer size. (#3957)
- Backends: Vulkan: Fixed handling of ImGui_ImplVulkan_InitInfo::MinAllocationSize field. (#7189, #4238)
- Backends: WebGPU: Added ImGui_ImplWGPU_InitInfo::PipelineMultisampleState. (#7240)
- Backends: WebGPU: Filling all WGPUDepthStencilState fields explicitly as a recent Dawn
  update stopped setting default values. (#7232) [@GrigoryGraborenko]
- Backends: WebGPU: Fixed pipeline layout leak. (#7245) [@rajveermalviya]
- Backends: OpenGL3: Backup and restore GL_PIXEL_UNPACK_BUFFER. (#7253)
- Internals: Many improvements related to yet unpublicized shortcut routing and input ownership systems.
- Internals: InputText: Added internal helpers to force reload of user-buf when active. (#2890) [@kudaba, @ocornut]
  Often requested in some form (#6962, #5219, #3290, #4627, #5054, #3878, #2881, #1506, #1216, #968),
  and useful for interactive completion/suggestions popups (#2057, #718)


-----------------------------------------------------------------------
 VERSION 1.90.1 (Released 2024-01-10)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90.1

Breaking changes:

- imgui_freetype: commented out ImGuiFreeType::BuildFontAtlas() obsoleted in 1.81.
  Prefer using #define IMGUI_ENABLE_FREETYPE or see commented code for manual calls.
- Removed CalcListClipping() marked obsolete in 1.86. (#3841)
  Prefer using ImGuiListClipper which can return non-contiguous ranges.
- Internals, Columns: commented out legacy ImGuiColumnsFlags_XXX symbols redirecting
  to ImGuiOldColumnsFlags_XXX, obsoleted from imgui_internal.h in 1.80.
- Commented out obsolete ImGuiKey_KeyPadEnter redirection to ImGuiKey_KeypadEnter. (#2625, #7143)

Other changes:

- Windows:
  - BeginChild(): Fixed auto-resizing erroneously limiting size to host viewport
    minus padding. There are no limit to a child width/height. (#7063) [@Devyre]
  - BeginChild(): Resize borders rendered even when ImGuiWindowFlags_NoBackground
    is specified. (#1710, #7194)
  - Fixed some auto-resizing path using style.WindowMinSize.x (instead of x/y)
    for both axises since 1.90. (#7106) [@n0bodysec]
  - Scrolling: internal scrolling value is rounded instead of truncated, as a way to reduce
    speed asymmetry when (incorrectly) attempting to scroll by non-integer amount. (#6677)
- Navigation (Keyboard/gamepad):
  - Nav, IO: SetNextFrameWantCaptureKeyboard(false) calls are not overridden back to true when
    navigation is enabled. SetNextFrameWantCaptureKeyboard() is always higher priority. (#6997)
  - Nav: Activation can also be performed with Keypad Enter. (#5606)
- Drag and Drop:
  - Fixed drop target highlight on items temporarily pushing a widened clip rect
    (namely Selectables and Treenodes using SpanAllColumn flag) so the highlight properly covers
    all columns. (#7049, #4281, #3272)
- InputText:
  - InputTextMultiline: Fixed Tab character input not repeating (1.89.4 regression).
  - InputTextMultiline: Tabbing through a multi-line text editor which allows Tab character inputs
    (using the ImGuiInputTextFlags_AllowTabInput flag) doesn't automatically activate it, in order
    to allow passing through multiple widgets easily. (#3092, #5759, #787)
- Drags, Sliders, Inputs:
  - DragScalarN, SliderScalarN, InputScalarN: Fixed incorrect pushes into ItemWidth
    stack when number of components is 1. [#7095] [@Nahor]
  - Drags, Sliders, Inputs: removed all attempts to filter non-numerical characters during text
    editing. Invalid inputs not applied to value, visibly reverted after validation. (#6810, #7096)
  - Drags, Sliders, Inputs: removal of filter means that "nan" and "inf" values may be input. (#7096)
  - DragScalarN, SliderScalarN, InputScalarN, PushMultiItemsWidths: improve multi-components
    width computation to better distribute the error. (#7120, #7121) [@Nahor]
- Menus:
  - Tweaked hover slack logic, adding an extra timeout to avoid situations where a slow vertical
    movements toward another parent BeginMenu() can keep the wrong child menu open. (#6671, #6926)
- Color Editors:
  - ColorEdit: Layout tweaks for very small sizes. (#7120, #7121)
  - ColorPicker: Fixed saturation/value cursor radius not scaling properly.
- Tabs: Added ImGuiTabItemFlags_NoAssumedClosure to enable app to react on closure attempt,
  without having to draw an unsaved document marker (ImGuiTabItemFlags_UnsavedDocument sets
  _NoAssumedClosure automatically). (#7084)
- Debug Tools:
  - Added io.ConfigDebugIsDebuggerPresent option. When enabled, this adds buttons in various
    locations of Metrics/Debugger to manually request a debugger break:
    - Request a debug break in a Begin() call.
    - Request a debug break in a ItemAdd() call via debug log and hovering 0xXXXXXX identifiers.
    - Request a debug break in a BeginTable() call.
    - Request a debug break in a SetShortcutRouting()/Shortcut() call. [Internal]
  - Metrics: Reorganize Tools menu.
  - Added DebugFlashStyleColor() to identify a style color. Added to Style Editor.
  - Debug Log: Hide its own clipper log to reduce noise in the output. (#5855)
  - Debug Log: Clicking any filter with SHIFT held enables it for 2 frames only,
    making it easier when dealing with spammy logs. (#5855)
- Settings: Fixed an issue marking settings as dirty when merely clicking on a border or resize
  grip without moving it.
- Misc: Added IMGUI_USER_H_FILENAME to change the path included when using
  IMGUI_INCLUDE_IMGUI_USER_H. (#7039) [@bryceberger]
- Misc: Rework debug display of texture id in Metrics window to avoid compile-error when
  ImTextureID is defined to be larger than 64-bits. (#7090)
- Misc: Added extra courtesy ==/!= operators when IMGUI_DEFINE_MATH_OPERATORS is defined.
- Misc: Fixed text functions fast-path for handling "%s" and "%.*s" to handle null pointers gracefully,
  like most printf implementations. (#7016, #3466, #6846) [@codefrog2002]
- Misc: Renamed some defines in imstb_textedit.h to avoid conflicts when using unity/jumbo builds
  on a codebase where another copy of the library is used.
- Misc: During shutdown, check that io.BackendPlatformUserData and io.BackendRendererUserData are NULL
  in order to catch cases where backend was not shut down. (#7175)
- Misc: Reworked Issue Template to a shinier and better form. (#5927) [@Panquesito7, @PathogenDavid, @ocornut]
- Backends:
  - GLFW, Emscripten: Added ImGui_ImplGlfw_InstallEmscriptenCanvasResizeCallback() to
    register canvas selector and auto-resize GLFW window. (#6751) [@Traveller23, @ypujante]
  - GLFW: Fixed Windows specific hooks to use Unicode version of WndProc even when
    compiling in MBCS mode. (#7174) [@kimidaisuki22]
  - OpenGL3: Update GL3W based imgui_impl_opengl3_loader.h to load libGL.so variants in
    case of missing symlink. Fix 1.90 regression for some distros. (#6983)
  - Vulkan: Fixed mismatching allocator passed to vkCreateCommandPool() vs
    vkDestroyCommandPool(). (#7075) [@FoonTheRaccoon]
  - Vulkan: Added MinAllocationSize field in ImGui_ImplVulkan_InitInfo to workaround zealous
    "best practice" validation layer. (#7189, #4238) [@philae-ael]
  - Vulkan: Stopped creating command pools with VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT
    as we don't reset them.
  - WebGPU: Fixed wgpuRenderPassEncoderSetScissorRect() crash when rendering modal window's
    dimming layer, which has an unclipped value in ImDrawCmd::ClipRect. (#7191) [@aparis69]
- Examples:
  - Examples: GLFW+Emscripten: Fixed examples not consistently resizing according to host canvas.
    (#6751) [@Traveller23, @ypujante]
  - Examples: SDL3: Minor fixes following recent SDL3 in-progress development.


-----------------------------------------------------------------------
 VERSION 1.90.0 (Released 2023-11-15)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.90

Breaking changes:

 - BeginChild(): Upgraded 'bool border = false' parameter to 'ImGuiChildFlags flags = 0'.
   Added ImGuiChildFlags_Border value. As with our prior "bool-to-flags" API updates,
   the ImGuiChildFlags_Border value is guaranteed to be == true forever to ensure a
   smoother transition, meaning all existing calls will still work.
   If you want to neatly transition your call sites:
      Before:  BeginChild("Name", size, true)
      After:   BeginChild("Name", size, ImGuiChildFlags_Border)
      Before:  BeginChild("Name", size, false)
      After:   BeginChild("Name", size) or BeginChild("Name", 0) or BeginChild("Name", size, ImGuiChildFlags_None)
   Existing code will still work as 'ImGuiChildFlags_Border == true', but you are encouraged to update call sites.
   **AMEND FROM THE FUTURE: from 1.91.1, 'ImGuiChildFlags_Border' is called 'ImGuiChildFlags_Borders'**
 - BeginChild(): Added child-flag ImGuiChildFlags_AlwaysUseWindowPadding as a replacement for
   the window-flag ImGuiWindowFlags_AlwaysUseWindowPadding: the feature only ever made sense
   for use with BeginChild() anyhow, passing it to Begin() had no effect. Now that we accept
   child-flags we are moving it there. (#462)
      Before:  BeginChild("Name", size, 0, ImGuiWindowFlags_AlwaysUseWindowPadding);
      After:   BeginChild("Name", size, ImGuiChildFlags_AlwaysUseWindowPadding, 0);
   Kept inline redirection enum (will obsolete later) so existing code will work.
 - BeginChildFrame()/EndChildFrame(): removed functions in favor of using BeginChild() with
   the ImGuiChildFlags_FrameStyle flag. Kept inline redirection function (will obsolete).
   Those functions were merely PushStyle/PopStyle helpers and custom versions are easy to create.
   (The removal isn't so much motivated by needing to add the feature in BeginChild(), but by the
   necessity to avoid BeginChildFrame() signature mismatching BeginChild() signature and features.)
 - Debug Tools: Renamed ShowStackToolWindow() ("Stack Tool") to ShowIDStackToolWindow() ("ID Stack Tool"),
   as earlier name was misleading. Kept inline redirection function. (#4631)
 - IO: Removed io.MetricsActiveAllocations introduced in 1.63, was displayed in Metrics and unlikely to
   be accessed by end-user. Value still visible in the UI and easily to recompute from a delta.
 - Defining IMGUI_DISABLE_OBSOLETE_FUNCTIONS now automatically defines IMGUI_DISABLE_OBSOLETE_KEYIO. (#4921)
 - Removed IM_OFFSETOF() macro in favor of using offsetof() available in C++11. Kept redirection define. (#4537)
 - ListBox, Combo: Changed signature of "name getter" callback in old one-liner ListBox()/Combo() apis.
   Before:
      getter type:   bool (*getter)(void* user_data, int idx, const char** out_text)
      function:      bool Combo(const char* label, int* current_item, bool (*getter)(void* user_data, int idx, const char** out_text), ...);
      function:      bool ListBox(const char* label, int* current_item, bool (*getting)(void* user_data, int idx, const char** out_text), ...);
   After:
      getter type:   const char* (*getter)(void* user_data, int idx)
      function:      bool Combo(const char* label, int* current_item, const char* (*getter)(void* user_data, int idx), ...);
      function:      bool ListBox(const char* label, int* current_item, const char* (*getter)(void* user_data, int idx), ...);
   Old type was unnecessarily complex and harder to wrap in e.g. a lambda. Kept inline redirection function (will obsolete).
 - Commented out obsolete redirecting enums/functions that were marked obsolete two years ago:
   - GetWindowContentRegionWidth() -> use GetWindowContentRegionMax().x - GetWindowContentRegionMin().x.
     Consider that generally 'GetContentRegionAvail().x' is often more correct and more useful.
   - ImDrawCornerFlags_XXX         -> use ImDrawFlags_RoundCornersXXX names.
     Read 1.82 changelog for details + grep commented names in sources.
   - Commented out runtime support for hardcoded ~0 or 0x01..0x0F rounding flags values for
     AddRect()/AddRectFilled()/PathRect()/AddImageRounded(). -> Use ImDrawFlags_RoundCornersXXX flags.
     Read 1.82 changelog for details.
 - Backends: Vulkan: Removed parameter from ImGui_ImplVulkan_CreateFontsTexture(): backend now creates its own
   command-buffer to upload fonts. Removed ImGui_ImplVulkan_DestroyFontUploadObjects() which is now unnecessary.
   No need to call ImGui_ImplVulkan_CreateFontsTexture() as it is done automatically in ImGui_ImplVulkan_NewFrame().
   You can call ImGui_ImplVulkan_CreateFontsTexture() manually if you need to reload the font atlas texture.
   (#6943, #6715, #6327, #3743, #4618)

Other changes:

- Windows:
  - BeginChild(): Added ImGuiChildFlags_ResizeX and ImGuiChildFlags_ResizeY to allow resizing
    child windows from the bottom/right border (toward layout direction). Resized child windows
    settings are saved and persistent in .ini file. (#1710)
  - BeginChild(): Added ImGuiChildFlags_Border as a replacement for 'bool border = true' parameter.
    **AMEND FROM THE FUTURE: from 1.91.1, 'ImGuiChildFlags_Border' is called 'ImGuiChildFlags_Borders'**
  - BeginChild(): Added ImGuiChildFlags_AutoResizeX and ImGuiChildFlags_AutoResizeY to auto-resize
    on one axis, while generally providing a size on the other axis. (#1666, #1395, #1496, #1710)
    e.g. BeginChild("name", {-FLT_MIN, 0.0f}, ImGuiChildFlags_AutoResizeY);
    - Size is only reevaluated if the child window is within visible boundaries or just appearing.
      This allows coarse clipping to be performed and auto-resizing childs to return false when
      hidden because of being scrolled out.
    - Combining this with also specifying ImGuiChildFlags_AlwaysAutoResize disables
      this optimization, meaning child contents will never be clipped (not recommended).
    - Please be considerate that child are full windows and carry significant overhead:
      combining auto-resizing for both axises to create a non-scrolling child to merely draw
      a border would be better more optimally using BeginGroup(). (see #1496)
      (until we come up with new helpers for framed groups and work-rect adjustments).
  - BeginChild(): made it possible to use SetNextWindowSizeConstraints() rectangle, often
    useful when ImGuiChildFlags_AutoResizeX or ImGuiChildFlags_AutoResizeY. (#1666, #1395, #1496)
    Custom constraint callback are not supported with child window.
  - BeginChild(): Added ImGuiChildFlags_FrameStyle as a replacement for BeginChildFrame(),
    use it to make child window use FrameBg, FrameRounding, FrameBorderSize, FramePadding
    instead of ChildBg, ChildRounding, ChildBorderSize, WindowPadding.
  - Popups: clarified meaning of 'p_open != NULL' in BeginPopupModal() + set back user value
    to false when popup is closed in ways other than clicking the close button. (#6900)
  - Double-clicking lower-left resize grip auto-resize (like lower-right one).
  - Double-clicking bottom or right window border auto-resize on a singles axis.
  - Use relative mouse movement for border resize when the border geometry has moved
    (e.g. resizing a child window triggering parent scroll) in order to avoid resizing
    feedback loops. Unless manually mouse-wheeling while border resizing. (#1710)
- Separators:
  - Altered end-points to use more standard boundaries. (#205, #4787, #1643)
    Left position is always current cursor X position, right position is always work-rect
    rightmost edge. It effectively means that:
    - A separator in the root of a window will end up a little more distant from edges
      than previously (essentially following WindowPadding instead of clipping edges).
    - A separator inside a table cell end up a little distance from edges instead of
      touching them (essentially following CellPadding instead of clipping edges).
    - Matches tree indentation (was not the case before).
    - Matches SeparatorText(). (#1643)
    - Makes things correct inside groups without specific/hard-coded handling. (#205)
  - Support legacy behavior when used inside old Columns(), as we favored that idiom back then,
    only different is left position follows indentation level, to match calling a Separator()
    inside or outside Columns().
- Tooltips:
  - Made using SetItemTooltip()/IsItemHovered(ImGuiHoveredFlags_ForTooltip) defaults to
    activate tooltips on disabled items. This is done by adding ImGuiHoveredFlags_AllowWhenDisabled
    to the default value of style.HoverFlagsForTooltipMouse/HoverFlagsForTooltipNav. (#1485)
  - Made is possible to combine ImGuiHoveredFlags_ForTooltip with a ImGuiHoveredFlags_DelayXXX
    override. (#1485)
- Drag and Drop:
  - Reworked drop target highlight: reduce rectangle to its visible portion, and then expand
    slightly. A full rectangle is always visible and it may protrude slightly. (#4281, #3272)
  - Fixed submitting a tooltip from drop target location when using AcceptDragDropPayload()
    with ImGuiDragDropFlags_AcceptNoPreviewTooltip and submitting a tooltip manually.
- Tables:
  - Added angled headers support. You need to set ImGuiTableColumnFlags_AngledHeader on selected
    columns and call TableAngledHeadersRow(). Added style.TableAngledHeadersAngle style option. (#6917)
  - Added ImGuiTableFlags_HighlightHoveredColumn flag, currently highlighting column header.
  - Fixed an edge-case when no columns are visible + table scrollbar is visible + user
    code is always testing return value of TableSetColumnIndex() to coarse clip. With an active
    clipper it would have asserted. Without a clipper, the scrollbar range would be wrong.
  - Request user to submit contents when outer host-window is requesting auto-resize,
    so a scrolling table can contribute to initial window size. (#6510)
  - Fixed subtle drawing overlap between borders in some situations.
  - Fixed bottom-most and right-most outer border offset by one. (#6765, #3752) [@v-ein]
  - Fixed top-most and left-most outer border overlapping inner clip-rect when scrolling. (#6765)
  - Fixed top-most outer border being drawn with both TableBorderLight and TableBorderStrong
    in some situations, causing the earlier to be visible underneath when alpha is not 1.0f.
  - Fixed right-clicking right-most section (past right-most column) from highlighting a column.
  - Fixed an issue with ScrollX enabled where an extraneous draw command would be created.
- Menus:
  - Menus: Fixed a bug where activating an item in a child-menu and dragging mouse over the
    parent-menu would erroneously close the child-menu. (Regression from 1.88). (#6869)
  - MenuBar: Fixed an issue where layouting an item in the menu-bar would erroneously
    register contents size in a way that would affect the scrolling layer.
    Was most often noticeable when using an horizontal scrollbar. (#6789)
- InputText:
  - InputTextMultiline: Fixed a crash pressing Down on last empty line of a multi-line buffer.
    (regression from 1.89.2, only happened in some states). (#6783, #6000)
  - InputTextMultiline: Fixed Tabbing cycle leading to a situation where Enter key wouldn't
    be accepted by the widget when navigation highlight is visible. (#6802, #3092, #5759, #787)
- Nav: Tabbing always enable nav highlight when ImGuiConfigFlags_NavEnableKeyboard is set.
  Previously was inconsistent and only enabled when stepping through a non-input item.
  (#6802, #3092, #5759, #787)
- TreeNode: Added ImGuiTreeNodeFlags_SpanAllColumns for use in tables. (#3151, #3565, #2451, #2438)
- TabBar: Fixed position of unsaved document marker (ImGuiTabItemFlags_UnsavedDocument) which was
  accidentally offset in 1.89.9. (#6862) [@alektron]
- ColorPicker4(): Fixed ImGuiColorEditFlags_NoTooltip not being forwarded to individual DragFloat3
  sub-widgets which have a visible color preview when ImGuiColorEditFlags_NoSidePreview is also set. (#6957)
- BeginGroup(): Fixed a bug pushing line lower extent too far down when called after a call
  to SameLine() followed by manual cursor manipulation.
- BeginCombo(): Added ImGuiComboFlags_WidthFitPreview flag. (#6881) [@mpv-enjoyer]
- BeginListBox(): Fixed not consuming SetNextWindowXXX() data when returning false.
- Fonts:
  - Argument 'float size_pixels' passed to AddFontXXX() functions is now rounded to lowest integer.
    This is because our layout/font system currently doesn't fully support non-integer sizes. Until
    it does, this has been a common pitfall leading to more or less subtle issues. (#3164, #3309, #6800)
  - Better assert during load when passing truncated font data or wrong data size. (#6822)
  - Ensure calling AddFontXXX function doesn't invalidates ImFont's ConfigData pointers
    prior to building again. (#6825)
  - Added ImFontConfig::RasterizerDensity field to increase texture size of rendered glyphs
    without altering other metrics. Among other things, this makes it easier to have zooming code
    swapping between 2 fonts (e.g. a 100% and a 400% fonts) depending on current scale. (#6925) [@thedmd]
    Important: if you increase this it is expected that you would render the font with a scale of
    similar value or magnitude. Merely increasing this without increasing scale may lower quality.
  - imgui_freetype: Added support for RasterizerDensity. (#6925) [@thedmd]
  - imgui_freetype: Fixed a warning and leak in IMGUI_ENABLE_FREETYPE_LUNASVG support. (#6842, #6591)
- Inputs: Added IsKeyChordPressed() helper function e.g. IsKeyChordPressed(ImGuiMod_Ctrl | ImGuiKey_S).
  (note that ImGuiMod_Shortcut may be used as an alias for Cmd on OSX and Ctrl on other systems).
- Misc: Most text functions also treat "%.*s" (along with "%s") specially to bypass formatting. (#3466, #6846)
- IO: Add extra keys to ImGuiKey enum: ImGuiKey_F13 to ImGuiKey_F24. (#6891, #4921)
- IO: Add extra keys to ImGuiKey enum: ImGuiKey_AppBack, ImGuiKey_AppForward. (#4921)
- IO: Setting io.WantSetMousePos ignores incoming MousePos events. (#6837, #228) [@bertaye]
- Debug Tools: Metrics: Added log of recent alloc/free calls.
- Debug Tools: Metrics: Added "Show groups rectangles" in tools.
- ImDrawList: Added AddEllipse(), AddEllipseFilled(), PathEllipticalArcTo(). (#2743) [@Doohl]
- ImVector: Added find_index() helper.
- Demo: Added "Drag and Drop -> Tooltip at target location" demo.
- Demo: Added "Layout -> Child Windows -> Manual-resize" demo. (#1710)
- Demo: Added "Layout -> Child Windows -> Auto-resize with constraints" demo. (#1666, #1395, #1496, #1710)
- Demo: Partly fixed "Examples -> Constrained-resizing window" custom constrains demo. (#6210) [@cfillion]
- Backends: Vulkan: Removed parameter from ImGui_ImplVulkan_CreateFontsTexture(): backend now creates its own
  command-buffer to upload fonts. Removed ImGui_ImplVulkan_DestroyFontUploadObjects() which is now unnecessary.
  No need to call ImGui_ImplVulkan_CreateFontsTexture() as it is done automatically in ImGui_ImplVulkan_NewFrame().
  You can call ImGui_ImplVulkan_CreateFontsTexture() manually if you need to reload font atlas texture.
  Fixed leaks, and added ImGui_ImplVulkan_DestroyFontsTexture() (probably no need to call this directly).
  (#6943, #6715, #6327, #3743, #4618)
  [@helynranta, @thomasherzog, @guybrush77, @albin-johansson, @MiroKaku, @benbatya-fb, @ocornut]
- Backends: GLFW: Clear emscripten's MouseWheel callback before shutdown. (#6790, #6096, #4019) [@halx99]
- Backends: GLFW: Added support for F13 to F24 function keys. (#6891)
- Backends: SDL2, SDL3: Added support for F13 to F24 function keys, AppBack, AppForward. (#6891)
- Backends: SDL3: Updates for recent API changes. (#7000, #6974)
- Backends: Win32: Added support for F13 to F24 function keys, AppBack, AppForward. (#6891)
- Backends: Win32: Added support for keyboard codepage conversion for when application
  is compiled in MBCS mode and using a non-Unicode window. (#6785, #6782, #5725, #5961) [@sneakyevil]
- Backends: Win32: Synthesize key-down event on key-up for VK_SNAPSHOT / ImGuiKey_PrintScreen as Windows
  doesn't emit it (same behavior as GLFW/SDL). (#6859) [@thedmd, @SuperWangKai]
- Backends: OpenGL3: rename symbols in our internal loader so that LTO compilation with another
  copy of gl3w becomes possible. (#6875, #6668, #4445) [@nicolasnoble]
- Backends: OpenGL3: Update GL3W based imgui_impl_opengl3_loader.h to load "libGL.so" instead
  of "libGL.so.1", accommodating for NetBSD systems having only "libGL.so.3" available. (#6983)
- Backends: OSX: Added support for F13 to F20 function keys. Support mapping F13 to PrintScreen. (#6891)
- Examples: GLFW+Vulkan, SDL+Vulkan: Simplified and removed code due to backend improvements.
- Internals: Renamed ImFloor() to ImTrunc(). Renamed ImFloorSigned() to ImFloor(). (#6861)


-----------------------------------------------------------------------
 VERSION 1.89.9 (Released 2023-09-04)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.9

Breaking changes:

- Clipper: Renamed IncludeRangeByIndices(), also called ForceDisplayRangeByIndices()
  before 1.89.6, to IncludeItemsByIndex(). Kept inline redirection function. (#6424, #3841)

Other changes:

- Tables: Made it possible to use SameLine(0,0) after TableNextColumn() or
  TableSetColumnIndex() in order to reuse line pos/height from previous cell. (#3740)
- Tables: Made it possible to change style.CellPadding.y between rows. (#3740)
- Nav, TreeNode: Pressing Left with ImGuiTreeNodeFlags_NavLeftJumpsBackHere now goes
  through proper navigation logic: honor scrolling and selection. (#1079, #1131)
- Sliders: Fixed an integer overflow and div-by-zero in SliderInt() when
  v_max=INT_MAX (#6675, #6679) [@jbarthelmes]
- Windows: Layout of Close/Collapse buttons uses style.ItemInnerSpacing.x between items,
  stopped incorrectly using FramePadding in a way where hit-boxes could overlap when
  setting large values. (#6749)
- TabBar, Style: added style.TabBarBorderSize and associated ImGuiStyleVar_TabBarBorderSize.
  Tweaked rendering of that separator to allow thicker values. (#6820, #4859, #5022, #5239)
- InputFloat, SliderFloat, DragFloat: always turn both '.' and ',' into the current decimal
  point character when using Decimal/Scientific character filter. (#6719, #2278) [@adamsepp]
- ColorEdit, ColorPicker: Manipulating options popup don't mark item as edited. (#6722)
  (Note that they may still be marked as Active/Hovered.)
- Clipper: Added IncludeItemByIndex() helper to include a single item. (#6424, #3841)
- Clipper: Fixed a bug if attempt to force-include a range which matches an already
  included range, clipper would end earlier. (#3841)
- ImDrawData: Fixed an issue where TotalVtxCount/TotalIdxCount does not match the sum
  of individual ImDrawList's buffer sizes when a dimming/modal background is rendered. (#6716)
- ImDrawList: Automatically calling ChannelsMerge() if not done after a split.
- ImDrawList: Fixed OOB access in _CalcCircleAutoSegmentCount when passing excessively
  large radius to AddCircle(). (#6657, #5317) [@EggsyCRO, @jdpatdiscord]
- IO: Exposed io.PlatformLocaleDecimalPoint to configure decimal point ('.' or ',') for
  languages needing it. Should ideally be set to the value of '*localeconv()->decimal_point'
  but our backends don't do it yet. (#6719, #2278)
- IO: Fixed io.AddMousePosEvent() and io.AddMouseButtonEvent() writing MouseSource to
  wrong union section. Was semantically incorrect and accidentally had no side-effects
  with default compiler alignment settings. (#6727) [@RickHuang2001]
- Misc: Made multiple calls to Render() during the same frame early out faster.
- Debug Tools: Metrics: Fixed "Drawlists" section and per-viewport equivalent
  appearing empty (regression in 1.89.8).
- Demo: Reorganized "Examples" menu.
- Demo: Tables: Demonstrate using SameLine() between cells. (#3740)
- Demo: Tables: Demonstrate altering CellPadding.y between rows. (#3740)
- Demo: Custom Rendering: Demonstrate out-of-order rendering using ImDrawListSplitter.
- Backends: SDL2,SDL3: added ImGui_ImplSDL2_InitForOther()/ImGui_ImplSDL3_InitForOther()
  for consistency (matching GLFW backend) and as most initialization paths don't actually
  need to care about rendering backend.
- Examples: Emscripten+WebGPU: Fixed WGPUInstance creation process + use preferred
  framebuffer format. (#6640, #6748) [@smileorigin]


-----------------------------------------------------------------------
 VERSION 1.89.8 (Released 2023-08-01)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.8

Breaking changes:

- IO: Obsoleted io.ClearInputCharacters() (added in 1.47) as it now ambiguous
  and often incorrect/misleading considering the existence of a higher-level
  input queue. This is automatically cleared by io.ClearInputKeys(). (#4921)
- ImDrawData: CmdLists[] array is now owned, changed from 'ImDrawList**' to
  'ImVector<ImDrawList*>'. Majority of users shouldn't be affected, but you
  cannot compare to NULL nor reassign manually anymore.
  Instead use AddDrawList(). Allocation count are identical. (#6406, #4879, #1878)

Other changes:

- Fonts: ImFontConfig::OversampleH now defaults to 2 instead of 3, since the
  quality increase is largely minimal.
- Fonts, imgui_freetype: Added support to render OpenType SVG fonts using lunasvg.
  Requires enabling IMGUI_ENABLE_FREETYPE_LUNASVG along with IMGUI_ENABLE_FREETYPE,
  and providing headers/libraries for lunasvg. (#6591, #6607) [@sakiodre]
- ImDrawData: CmdLists[] array is now an ImVector<> owned by ImDrawData rather
  than a pointer to internal state.
  - This makes it easier for user to create their own or append to an existing draw data.
    Added a ImDrawData::AddDrawList() helper function to do that. (#6406, #4879, #1878)
  - This makes it easier to perform a deep-swap instead of a deep-copy, as array
    ownership is now clear. (#6597, #6475, #6167, #5776, #5109, #4763, #3515, #1860)
  - Syntax and allocation count are otherwise identical.
- Fixed CTRL+Tab dimming background assert when target window has a callback
  in the last ImDrawCmd. (#4857, #5937)
- IsItemHovered: Fixed ImGuiHoveredFlags_ForTooltip for Keyboard/Gamepad navigation,
  got broken prior to 1.89.7 due to an unrelated change making flags conflict. (#6622, #1485)
- InputText: Fixed a case where deactivation frame would write to underlying
  buffer or call CallbackResize although unnecessary, in a frame where the
  return value was false.
- Tables: fixed GetContentRegionAvail().y report not taking account of lower cell
  padding or of using ImGuiTableFlags_NoHostExtendY. Not taking it into account
  would make the idiom of creating vertically bottom-aligned content (e.g. a child
  window) inside a table make the parent window erroneously have a scrollbar. (#6619)
- Tables: fixed calculation of multi-instance shared decoration/scrollbar width of
  scrolling tables, to avoid flickering width variation when resizing down a table
  hosting a child window. (#5920, #6619)
- Scrollbar: layout needs to take account of window border size, so a border size
  will slightly reduce scrollbar size. Generally we tried to make it that window
  border size has no incidence on layout but this can't work with thick borders. (#2522)
- IO: Added io.ClearEventsQueue() to clear incoming inputs events. (#4921)
  May be useful in conjunction with io.ClearInputKeys() if you need to clear
  both current inputs state and queued events (e.g. when using blocking native
  dialogs such as Windows's ::MessageBox() or ::GetOpenFileName()).
- IO: Changed io.ClearInputKeys() specs to also clear current frame character buffer
  (what now obsoleted io.ClearInputCharacters() did), as this is effectively the
  desirable behavior.
- Misc: Added IMGUI_DISABLE_STB_SPRINTF_IMPLEMENTATION config macro to disable
  stb_sprintf implementation when using IMGUI_USE_STB_SPRINTF. (#6626) [@septag]
- Misc: Avoid stb_textedit.h reincluding string.h while in a namespace, which
  messes up with building with Clang Modules. (#6653, #4791) [@JohelEGP]
- Demo: Better showcase use of SetNextItemAllowOverlap(). (#6574, #6512, #3909, #517)
- Demo: Showcase a few more InputText() flags.
- Backends: Made all backends sources files support global IMGUI_DISABLE. (#6601)
- Backends: GLFW: Revert ignoring mouse data on GLFW_CURSOR_DISABLED as it can be used
  differently. User may set ImGuiConfigFlags_NoMouse if desired. (#5625, #6609) [@scorpion-26]
- Backends: WebGPU: Update for changes in Dawn. (#6602, #6188) [@williamhCode]
- Examples: Vulkan: Creating minimal descriptor pools to fit only what is needed by
  example. (#6642) [@SaschaWillem]


-----------------------------------------------------------------------
 VERSION 1.89.7 (Released 2023-07-04)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.7

Breaking changes:

- Moved io.HoverDelayShort/io.HoverDelayNormal to style.HoverDelayShort/style.HoverDelayNormal.
  As the fields were added in 1.89 and expected to be left unchanged by most users, or only
  tweaked once during app initialisation, we are exceptionally accepting the breakage.
  Majority of users should not even notice.
- Overlapping items: (#6512, #3909, #517)
  - Added 'SetNextItemAllowOverlap()' (called before an item) as a replacement for using
    'SetItemAllowOverlap()' (called after an item). This is roughly equivalent to using the
    legacy 'SetItemAllowOverlap()' call (public API) + ImGuiButtonFlags_AllowOverlap (internal).
  - Obsoleted 'SetItemAllowOverlap()': it didn't and couldn't work reliably since 1.89 (2022-11-15),
    and relied on ambiguously defined design. Use 'SetNextItemAllowOverlap()' before item instead.
  - Selectable, TreeNode: When using ImGuiSelectableFlags_AllowOverlap/ImGuiTreeNodeFlags_AllowOverlap
    and holding item held, overlapping widgets won't appear as hovered. (#6512, #3909)
    While this fixes a common small visual issue, it also means that calling IsItemHovered()
    after a non-reactive elements - e.g. Text() - overlapping an active one may fail if you don't
    use IsItemHovered(ImGuiHoveredFlags_AllowWhenBlockedByActiveItem). (#6610)
  - Renamed 'ImGuiTreeNodeFlags_AllowItemOverlap' to 'ImGuiTreeNodeFlags_AllowOverlap'.
  - Renamed 'ImGuiSelectableFlags_AllowItemOverlap' to 'ImGuiSelectableFlags_AllowOverlap'
  - Kept redirecting enums (will obsolete).

Other changes:

- Tooltips/IsItemHovered() related changes:
  - Tooltips: Added SetItemTooltip() and BeginItemTooltip() functions.
    They are shortcuts for the common idiom of using IsItemHovered().
    - SetItemTooltip("Hello")   == if (IsItemHovered(ImGuiHoveredFlags_Tooltip)) { SetTooltip("Hello"); }
    - BeginItemTooltip()        == IsItemHovered(ImGuiHoveredFlags_Tooltip) && BeginTooltip()
    The newly added ImGuiHoveredFlags_Tooltip is meant to facilitate standardizing
    mouse hovering delays and rules for a given application.
    The previously common idiom of using 'if (IsItemHovered()) { SetTooltip(...); }'
    won't use delay or stationary test.
  - IsItemHovered: Added ImGuiHoveredFlags_Stationary to require mouse being
    stationary when hovering a new item. Added style.HoverStationaryDelay (~0.15 sec).
    Once the mouse has been stationary once the state is preserved for same item. (#1485)
  - IsItemHovered: Added ImGuiHoveredFlags_ForTooltip as a shortcut for pulling flags
    from style.HoverFlagsForTooltipMouse or style.HoverFlagsForTooltipNav depending
    on active inputs (#1485)
    - style.HoverFlagsForTooltipMouse defaults to 'ImGuiHoveredFlags_Stationary | ImGuiHoveredFlags_DelayShort'
    - style.HoverFlagsForTooltipNav defaults to 'ImGuiHoveredFlags_NoSharedDelay | ImGuiHoveredFlags_DelayNormal'.
  - Tooltips: Tweak default offset for non-drag and drop tooltips so underlying items
    isn't covered as much. (Match offset for drag and drop tooltips)
  - IsItemHovered: Tweaked default value of style.HoverDelayNormal from 0.30 to 0.40,
    Tweaked default value of style.HoverDelayShort from 0.10 to 0.15. (#1485)
  - IsItemHovered: Added ImGuiHoveredFlags_AllowWhenOverlappedByWindow to ignore window-overlap only.
    Option ImGuiHoveredFlags_AllowWhenOverlapped now expand into a combination of both
    _AllowWhenOverlappedByWindow + _AllowWhenOverlappedByItem, matching old behavior.
- Overlapping items: (#6512, #3909, #517)
  - Most item types should now work with SetNextItemAllowOverlap(). (#6512, #3909, #517)
  - Fixed first frame of an overlap highlighting underlying item if previous frame didn't hover anything.
  - IsItemHovered: Changed to return false when querying an item using AllowOverlap mode which
    is being overlapped. Added ImGuiHoveredFlags_AllowWhenOverlappedByItem to opt-out. (#6512, #3909, #517)
- IsWindowHovered: Added support for ImGuiHoveredFlags_Stationary.
- IsWindowHovered, IsItemHovered: Assert when passed any unsupported flags.
- Tables: Fixed a regression in 1.89.6 leading to the first column of tables with either
  ScrollX or ScrollY flags from being impossible to resize. (#6503)
- CollapsingHeader/TreeNode: Fixed text padding when using _Framed+_Leaf flags. (#6549) [@BobbyAnguelov]
- InputText: Fixed not returning true when buffer is cleared while using the
  ImGuiInputTextFlags_EscapeClearsAll flag. (#5688, #2620)
- InputText: Fixed a crash on deactivating a ReadOnly buffer. (#6570, #6292, #4714)
- InputText: ImGuiInputTextCallbackData::InsertChars() accept (NULL,NULL) range, in order to conform
  to common idioms (e.g. passing .data(), .data() + .size() from a null string). (#6565, #6566, #3615)
- Combo: Made simple/legacy Combo() function not returns true when picking already selected item.
  This is consistent with other widgets. If you need something else, you can use BeginCombo(). (#1182)
- Clipper: Rework inner logic to allow functioning with a zero-clear constructor.
  This is order to facilitate usage for language bindings (e.g cimgui or dear_binding)
  where user may not be calling a constructor manually. (#5856)
- Drag and Drop: Apply default behavior of drag source not reporting itself as hovered
  at lower-level, so DragXXX, SliderXXX, InputXXX, Plot widgets are fulfilling it.
  (Behavior doesn't apply when ImGuiDragDropFlags_SourceNoDisableHover is set).
- Modals: In the case of nested modal, made sure that focused or appearing windows are
  moved below the lowest blocking modal (rather than the highest one). (#4317)
- GetKeyName(): Fixed assert with ImGuiMod_XXX values when IMGUI_DISABLE_OBSOLETE_KEYIO is set.
- Debug Tools: Added 'io.ConfigDebugIniSettings' option to save .ini data with extra
  comments. Currently mainly for inspecting Docking .ini data, but makes saving slower.
- Demo: Added more developed "Widgets->Tooltips" section. (#1485)
- Backends: OpenGL3: Fixed support for glBindSampler() backup/restore on ES3. (#6375, #6508) [@jsm174]
- Backends: OpenGL3: Fixed erroneous use glGetIntegerv(GL_CONTEXT_PROFILE_MASK) on contexts
  lower than 3.2. (#6539, #6333) [@krumelmonster]
- Backends: Vulkan: Added optional support for VK_KHR_dynamic_rendering (Vulkan 1.3+) in the
  backend for applications using it. User needs to set 'init_info->UseDynamicRendering = true'
  and 'init_info->ColorAttachmentFormat'. RenderPass becomes unused. (#5446, #5037) [@spnda, @cmarcelo]
- Backends: GLFW: Accept glfwGetTime() not returning a monotonically increasing value.
  This seems to happens on some Windows setup when peripherals disconnect, and is likely
  to also happen on browser+Emscripten. Matches similar 1.89.4 fix in SDL backend. (#6491)
- Examples: Win32+OpenGL3: Changed DefWindowProc() to DefWindowProcW() to match other examples
  and support the example app being compiled without UNICODE. (#6516, #5725, #5961, #5975) [@yenixing]


-----------------------------------------------------------------------
 VERSION 1.89.6 (Released 2023-05-31)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.6

Breaking changes:

- Clipper: Commented out obsolete redirection constructor which was marked obsolete in 1.79:
   'ImGuiListClipper(int items_count, float items_height)' --> Use 'ImGuiListClipper() + clipper.Begin()'.
- Clipper: Renamed ForceDisplayRangeByIndices() to IncludeRangeByIndices(), kept
  inline redirection function (introduced in 1.86 and rarely used). (#6424, #3841)
- Commented out obsolete/redirecting functions that were marked obsolete more than two years ago:
   - ListBoxHeader()  -> use BeginListBox()
   - ListBoxFooter()  -> use EndListBox()
   - Note how two variants of ListBoxHeader() existed. Check commented versions in imgui.h for refeence.
- Backends: SDL_Renderer: Renamed 'imgui_impl_sdlrenderer.h/cpp' to 'imgui_impl_sdlrenderer2.h/cpp',
  in order to accommodate for upcoming SDL3 and change in its SDL_Renderer API. (#6286)
- Backends: GLUT: Removed call to ImGui::NewFrame() from ImGui_ImplGLUT_NewFrame().
  It needs to be called from the main app loop, like with every other backends. (#6337) [@GereonV]

Other changes:

- Window: Fixed resizing from upper border when io.ConfigWindowsMoveFromTitleBarOnly is set. (#6390)
- Tables: Fixed a small miscalculation in TableHeader() leading to an empty tooltip
  showing when a sorting column has no visible name. (#6342) [@lukaasm]
- Tables: Fixed command merging when compiling with VS2013 (one array on stack was not
  initialized on VS2013. Unsure if due to a bug or UB/standard conformance). (#6377)
- InputText: Avoid setting io.WantTextInputNextFrame during the deactivation frame.
  (#6341) [@lukaasm]
- Drag, Sliders: if the format string doesn't contain any %, CTRL+Click to input text will
  use the default format specifier for the type. Allow display/input of raw value when using
  "enums" patterns (display label instead of value) + allow using when value is hidden. (#6405)
- Nav: Record/restore preferred position on each given axis after a movement on that axis,
  then score movement on the other axis using this as a bias. This allows going up and down
  between e.g. a large header spanning horizontal space and three-ways-columns, landing
  on the same column as before.
- Nav: Fixed navigation within tables/columns where item boundaries goes beyond columns limits,
  unclipped bounding boxes would interfere with other columns. (#2221) [@zzzyap, @ocornut]
- Nav: Fixed CTRL+Tab into a root window with only childs with _NavFlattened flags
  erroneously initializing default nav layer to menu layer.
- Menus: Fixed an issue when opening a menu hierarchy in a given menu-bar would allow
  opening another via simple hovering. (#3496, #4797)
- Fonts: Fixed crash when merging fonts and the first font has no valid glyph. (#6446) [@JaedanC]
- Fonts: Fixed crash when manually specifying an EllipsisChar that doesn't exist. (#6480)
- Misc: Added ImVec2 unary minus operator. (#6368) [@Koostosh]
- Debug Tools: Debug Log: Fixed not parsing 0xXXXXXXXX values for geo-locating on mouse
  hover hover when the identifier is at the end of the line. (#5855)
- Debug Tools: Added 'io.ConfigDebugIgnoreFocusLoss' option to disable 'io.AddFocusEvent(false)'
  handling. May facilitate interactions with a debugger when focus loss leads to clearing
  inputs data. (#4388, #4921)
- Backends: Clear bits sets io.BackendFlags on backend Shutdown(). (#6334, #6335] [@GereonV]
  Potentially this would facilitate switching runtime backend mid-session.
- Backends: Win32: Added ImGui_ImplWin32_InitForOpenGL() to facilitate combining raw
  Win32/Winapi with OpenGL. (#3218)
- Backends: OpenGL3: Restore front and back polygon mode separately when supported
  by context (Desktop 3.0, 3.1, or 3.2+ with compat bit). (#6333) [@GereonV]
- Backends: OpenGL3: Support for glBindSampler() backup/restore on ES3. (#6375) [@jsm174]
- Backends: SDL3: Fixed build on Emscripten/iOS/Android. (#6391) [@jo-codegirl]
- Backends: SDLRenderer3: Added SDL_Renderer for SDL3 backend. (#6286) [@Carcons, @ocornut]
- Examples: Added native Win32+OpenGL3 example. We don't recommend using this setup but we
  provide it for completeness. (#3218, #5170, #6086, #2772, #2600, #2359, #2022, #1553) [@learn-more]
- Examples: Vulkan: Use integrated GPU if nothing else is available. (#6359) [@kimidaisuki22]
- Examples: DX9, DX10, DX11: Queue framebuffer resize instead of processing in WM_SIZE,
  as some drivers tends to only cleanup after existing the native resize modal loop. (#6374)
- Examples: Added SDL3+SDL_Renderer example. (#6286)
- Examples: Updated all Visual Studio projects and batches to use /utf-8 argument.


-----------------------------------------------------------------------
 VERSION 1.89.5 (Released 2023-04-13)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.5

Other changes:

- InputText: Reworked prev/next-word behavior to more closely match Visual Studio
  text editor. Include '.' as a delimiter and alter varying subtle behavior with how
  blanks and separators are treated when skipping words. (#6067) [@ajweeks]
- InputText: Fixed a tricky edge case, ensuring value is always written back on the
  frame where IsItemDeactivated() returns true, in order to allow usage without user
  retaining underlying data. While we don't really want to encourage user not retaining
  underlying data, in the absence of a "late commit" behavior/flag we understand it may
  be desirable to take advantage of this trick. (#4714)
- Drag, Sliders: Fixed parsing of text input when '+' or '#' format flags are used
  in the format string. (#6259) [@idbrii]
- Nav: Made Ctrl+Tab/Ctrl+Shift+Tab windowing register ownership to held modifier so
  it doesn't interfere with other code when remapping those actions. (#4828, #3255, #5641)
- Nav: Made PageUp/PageDown/Home/End navigation also scroll parent windows when
  necessary to make the target location fully visible (same as e.g. arrow keys).
- ColorEdit: Fixed shading of S/V triangle in Hue Wheel mode. (#5200, #6254) [@jamesthomasgriffin]
- TabBar: Tab-bars with ImGuiTabBarFlags_FittingPolicyScroll can be scrolled with
  horizontal mouse-wheel (or Shift + WheelY). (#2702)
- Rendering: Using adaptive tessellation for RadioButton, ColorEdit preview circles,
  Windows Close and Collapse Buttons.
- ButtonBehavior: Fixed an edge case where changing widget type/behavior while active
  and using same id could lead to an assert. (#6304)
- Misc: Fixed ImVec2 operator[] violating aliasing rules causing issue with Intel C++
  compiler. (#6272) [@BayesBug]
- IO: Input queue trickling adjustment for touch screens. (#2702, #4921)
  This fixes single-tapping to move simulated mouse and immediately click on a widget
  that is using the ImGuiButtonFlags_AllowItemOverlap policy.
  - This only works if the backend can distinguish TouchScreen vs Mouse.
    See 'Demo->Tools->Metrics->Inputs->Mouse Source' to verify.
  - Fixed tapping on BeginTabItem() on a touch-screen. (#2702)
  - Fixed tapping on CollapsingHeader() with a close button on a touch-screen.
  - Fixed tapping on TreeNode() using ImGuiTreeNodeFlags_AllowItemOverlap on a touch-screen.
  - Fixed tapping on Selectable() using ImGuiSelectableFlags_AllowItemOverlap on a touch-screen.
  - Fixed tapping on TableHeader() on a touch-screen.
- IO: Added io.AddMouseSourceEvent() and ImGuiMouseSource enum. This is to allow backend to
  specify actual event source between Mouse/TouchScreen/Pen. (#2702, #2334, #2372, #3453, #5693)
- IO: Fixed support for calling io.AddXXXX functions from inactive context (wrongly
  advertised as supported in 1.89.4). (#6199, #6256, #5856) [@cfillion]
- Backends: OpenGL3: Fixed GL loader crash when GL_VERSION returns NULL. (#6154, #4445, #3530)
- Backends: OpenGL3: Properly restoring "no shader program bound" if it was the case prior to
  running the rendering function. (#6267, #6220, #6224) [@BrunoLevy]
- Backends: Win32: Added support for io.AddMouseSourceEvent() to discriminate Mouse/TouchScreen/Pen. (#2334, #2702)
- Backends: SDL2/SDL3: Added support for io.AddMouseSourceEvent() to discriminate Mouse/TouchScreen.
  This is relying on SDL passing SDL_TOUCH_MOUSEID in the event's 'which' field. (#2334, #2702)
- Backends: SDL2/SDL3: Avoid calling SDL_StartTextInput()/SDL_StopTextInput() as they actually
  block text input input and don't only pertain to IME. It's unclear exactly what their relation
  is to other IME function such as SDL_SetTextInputRect(). (#6306, #6071, #1953)
- Backends: GLFW: Added support on Win32 only for io.AddMouseSourceEvent() to discriminate
  Mouse/TouchScreen/Pen. (#2334, #2702)
- Backends: GLFW: Fixed key modifiers handling on secondary viewports. (#6248, #6034) [@aiekick]
- Backends: Android: Added support for io.AddMouseSourceEvent() to discriminate Mouse/TouchScreen/Pen.
  (#6315) [@PathogenDavid]
- Backends: OSX: Added support for io.AddMouseSourceEvent() to discriminate Mouse/Pen.
  (#6314) [@PathogenDavid]
- Backends: WebGPU: Align buffers. Use WGSL shaders instead of SPIR-V. Add gamma uniform. (#6188) [@eliemichel]
- Backends: WebGPU: Reorganized to store data in io.BackendRendererUserData like other backends.
- Examples: Vulkan: Fixed validation errors with newer VulkanSDK by explicitly querying and enabling
  "VK_KHR_get_physical_device_properties2", "VK_KHR_portability_enumeration", and
  VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR. (#6109, #6172, #6101)
- Examples: Windows: Added 'misc/debuggers/imgui.natstepfilter' file to all Visual Studio projects,
  now that VS 2022 17.6 Preview 2 support adding Debug Step Filter spec files into projects.
- Examples: SDL3: Updated for latest WIP SDL3 branch. (#6243)
- TestSuite: Added variety of new regression tests and improved/amended existing ones
  in imgui_test_engine/ repo. [@PathogenDavid, @ocornut]


-----------------------------------------------------------------------
 VERSION 1.89.4 (Released 2023-03-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.4

Breaking Changes:

- Renamed PushAllowKeyboardFocus()/PopAllowKeyboardFocus() to PushTabStop()/PopTabStop().
  Kept inline redirection functions (will obsolete).
- Moved the optional "courtesy maths operators" implementation from imgui_internal.h in imgui.h.
  Even though we encourage using your own maths types and operators by setting up IM_VEC2_CLASS_EXTRA,
  it has been frequently requested by people to use our own. We had an opt-in define which was
  previously fulfilled by imgui_internal.h. It is now fulfilled by imgui.h. (#6164, #6137, #5966, #2832)
   OK:     #define IMGUI_DEFINE_MATH_OPERATORS / #include "imgui.h" / #include "imgui_internal.h"
   Error:  #include "imgui.h" / #define IMGUI_DEFINE_MATH_OPERATORS / #include "imgui_internal.h"
  Added a dedicated compile-time check message to help diagnose this.
- Tooltips: Added 'bool' return value to BeginTooltip() for API consistency.
  Please only submit contents and call EndTooltip() if BeginTooltip() returns true.
  In reality the function will _currently_ always return true, but further changes down the
  line may change this, best to clarify API sooner. Updated demo code accordingly.
- Commented out redirecting enums/functions names that were marked obsolete two years ago:
  - ImGuiSliderFlags_ClampOnInput        -> use ImGuiSliderFlags_AlwaysClamp
  - ImGuiInputTextFlags_AlwaysInsertMode -> use ImGuiInputTextFlags_AlwaysOverwrite
  - ImDrawList::AddBezierCurve()         -> use ImDrawList::AddBezierCubic()
  - ImDrawList::PathBezierCurveTo()      -> use ImDrawList::PathBezierCubicCurveTo()

Other changes:

- Nav: Tabbing now cycles through all items when ImGuiConfigFlags_NavEnableKeyboard is set.
  (#3092, #5759, #787)
  While this was generally desired and requested by many, note that its addition means
  that some types of UI may become more fastidious to use TAB key with, if the navigation
  cursor cycles through too many items. You can mark items items as not tab-spottable:
   - Public API: PushTabStop(false) / PopTabStop()
   - Internal: PushItemFlag(ImGuiItemFlags_NoTabStop, true);
   - Internal: Directly pass ImGuiItemFlags_NoTabStop to ItemAdd() for custom widgets.
- Nav: Tabbing/Shift-Tabbing can more reliably be used to step out of an item that is not
  tab-stoppable. (#3092, #5759, #787)
- Nav: Made Enter key submit the same type of Activation event as Space key,
  allowing to press buttons with Enter. (#5606)
  (Enter emulates a "prefer text input" activation vs.
   Space emulates a "prefer tweak" activation which is to closer to gamepad controls).
- Nav: Fixed an issue with Gamepad navigation when the movement lead to a scroll and
  frame time > repeat rate. Triggering a new move request on the same frame as a move
  result lead to an incorrect calculation and loss of navigation id. (#6171)
- Nav: Fixed SetItemDefaultFocus() from not scrolling when item is partially visible.
  (#2814, #2812) [@DomGries]
- Tables: Fixed an issue where user's Y cursor movement within a hidden column would
  have side-effects.
- IO: Lifted constraint to call io.AddEventXXX functions from current context. (#4921, #5856, #6199)
- InputText: Fixed not being able to use CTRL+Tab while an InputText() using Tab
  for completion or text data is active (regression from 1.89).
- Drag and Drop: Fixed handling of overlapping targets when smaller one is submitted
  before and can accept the same data type. (#6183).
- Drag and Drop: Clear drag and drop state as soon as delivery is accepted in order to
  avoid interferences. (#5817, #6183) [@DimaKoltun]
- Debug Tools: Added io.ConfigDebugBeginReturnValueOnce / io.ConfigDebugBeginReturnValueLoop
  options to simulate Begin/BeginChild returning false to facilitate debugging user behavior.
- Demo: Updated to test return value of BeginTooltip().
- Backends: OpenGL3: Fixed restoration of a potentially deleted OpenGL program. If an active
  program was pending deletion, attempting to restore it would error. (#6220, #6224) [@Cyphall]
- Backends: Win32: Use WM_NCMOUSEMOVE / WM_NCMOUSELEAVE to track mouse positions over
  non-client area (e.g. OS decorations) when app is not focused. (#6045, #6162)
- Backends: SDL2, SDL3: Accept SDL_GetPerformanceCounter() not returning a monotonically
  increasing value. (#6189, #6114, #3644) [@adamkewley]
- Backends: GLFW: Avoid using glfwGetError() and glfwGetGamepadState() on Emscripten, which
  recently updated its GLFW emulation layer to GLFW 3.3 without supporting those. (#6240)
- Examples: Android: Fixed example build for Gradle 8. (#6229, #6227) [@duddel]
- Examples: Updated all examples application to enable ImGuiConfigFlags_NavEnableKeyboard
  and ImGuiConfigFlags_NavEnableGamepad by default. (#787)
- Internals: Misc tweaks to facilitate applying an explicit-context patch. (#5856) [@Dragnalith]


-----------------------------------------------------------------------
 VERSION 1.89.3 (Released 2023-02-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.3

Breaking Changes:

- Backends+Examples: SDL2: renamed all unnumbered references to "sdl" to "sdl2".
  This is in prevision for the future release of SDL3 and its associated backend. (#6146)
  - imgui_impl_sdl.cpp -> imgui_impl_sdl2.cpp
  - imgui_impl_sdl.h   -> imgui_impl_sdl2.h
  - example_sdl_xxxx/  -> example_sdl2_xxxx/ (folders and projects)

Other changes:

- SeparatorText(): Added SeparatorText() widget. (#1643) [@phed, @ocornut]
  - Added to style: float  SeparatorTextBorderSize.
  - Added to style: ImVec2 SeparatorTextAlign, SeparatorTextPadding.
- Tables: Raised max Columns count from 64 to 512. (#6094, #5305, #4876, #3572)
  The previous limit was due to using 64-bit integers but we moved to bits-array
  and tweaked the system enough to ensure no performance loss.
- Tables: Solved an ID conflict issue with multiple-instances of a same table,
  due to how unique table instance id was generated. (#6140) [@ocornut, @rodrigorc]
- Inputs, Scrolling: Made horizontal scroll wheel and horizontal scroll direction consistent
  across backends/os. (#4019, #6096, #1463) [@PathogenDavid, @ocornut, @rokups]
  - Clarified that 'wheel_y > 0.0f' scrolls Up, 'wheel_y > 0.0f' scrolls Down.
    Clarified that 'wheel_x > 0.0f' scrolls Left, 'wheel_x > 0.0f' scrolls Right.
  - Backends: Fixed horizontal scroll direction for Win32 and SDL backends. (#4019)
  - Shift+WheelY support on non-OSX machines was already correct. (#2424, #1463)
    (whereas on OSX machines Shift+WheelY turns into WheelX at the OS level).
  - If you use a custom backend, you should verify horizontal wheel direction.
    - Axises are flipped by OSX for mouse & touch-pad when 'Natural Scrolling' is on.
    - Axises are flipped by Windows for touch-pad when 'Settings->Touchpad->Down motion scrolls up' is on.
    - You can use 'Demo->Tools->Debug Log->IO" to visualize values submitted to Dear ImGui.
  - Known issues remaining with Emscripten:
    - The magnitude of wheeling values on Emscripten was improved but isn't perfect. (#6096)
    - When running the Emscripten app on a Mac with a mouse, SHIFT+WheelY doesn't turn into WheelX.
      This is because we don't know that we are running on Mac and apply our own Shift+swapping
      on top of OSX' own swapping, so wheel axises are swapped twice. Emscripten apps may need
      to find a way to detect this and set io.ConfigMacOSXBehaviors manually (if you know a way
      let us know!), or offer the "OSX-style behavior" option to their user.
- Window: Avoid rendering shapes for hidden resize grips.
- Text: Fixed layouting of wrapped-text block skipping successive empty lines,
  regression from the fix in 1.89.2. (#5720, #5919)
- Text: Fixed clipping of single-character "..." ellipsis (U+2026 or U+0085) when font
  is scaled. Scaling wasn't taken into account, leading to ellipsis character straying
  slightly out of its expected boundaries. (#2775)
- Text: Tweaked rendering of three-dots "..." ellipsis variant. (#2775, #4269)
- InputText: Added support for Ctrl+Delete to delete up to end-of-word. (#6067) [@ajweeks]
  (Not adding Super+Delete to delete to up to end-of-line on OSX, as OSX doesn't have it)
- InputText: On OSX, inhibit usage of Alt key to toggle menu when active (used for work skip).
- Menus: Fixed layout of MenuItem()/BeginMenu() when label contains a '\n'. (#6116) [@imkcy9]
- ColorEdit, ColorPicker: Fixed hue/saturation preservation logic from interfering with
  the displayed value (but not stored value) of others widgets instances. (#6155)
- PlotHistogram, PlotLines: Passing negative sizes honor alignment like other widgets.
- Combo: Allow SetNextWindowSize() to alter combo popup size. (#6130)
- Fonts: Assert that in each GlyphRanges[] pairs first is <= second.
- ImDrawList: Added missing early-out in AddPolyline() and AddConvexPolyFilled() when
  color alpha is zero.
- Misc: Most text functions treat "%s" as a shortcut to no-formatting. (#3466)
- Misc: Tolerate zero delta-time under Emscripten as backends are imprecise in their
  values for io.DeltaTime, and browser features such as "privacy.resistFingerprinting=true"
  can exacerbate that. (#6114, #3644)
- Backends: OSX: Fixed scroll/wheel scaling for devices emitting events with
  hasPreciseScrollingDeltas==false (e.g. non-Apple mices).
- Backends: Win32: flipping WM_MOUSEHWHEEL horizontal value to match other backends and
  offer consistent horizontal scrolling direction. (#4019)
- Backends: SDL2: flipping SDL_MOUSEWHEEL horizontal value to match other backends and
  offer consistent horizontal scrolling direction. (#4019)
- Backends: SDL2: Removed SDL_MOUSEWHEEL value clamping. (#4019, #6096, #6081)
- Backends: SDL2: Added support for SDL 2.0.18+ preciseX/preciseY mouse wheel data
  for smooth scrolling as reported by SDL. (#4019, #6096)
- Backends: SDL2: Avoid calling SDL_SetCursor() when cursor has not changed, as the function
  is surprisingly costly on Mac with latest SDL (already fixed in SDL latest trunk). (#6113)
- Backends: SDL2: Implement IME handler to call SDL_SetTextInputRect()/SDL_StartTextInput().
  It will only works with SDL 2.0.18+ if your code calls 'SDL_SetHint(SDL_HINT_IME_SHOW_UI, "1")'
  prior to calling SDL_CreateWindow(). Updated all examples accordingly. (#6071, #1953)
- Backends: SDL3: Added experimental imgui_impl_sdl3.cpp backend. (#6146) [@dovker, @ocornut]
  SDL 3.0.0 has not yet been released, so it is possible that its specs/api will change before
  release. This backend is provided as a convenience for early adopters etc. We don't recommend
  switching to SDL3 before it is released.
- Backends: GLFW: Registering custom low-level mouse wheel handler to get more accurate
  scrolling impulses on Emscripten. (#4019, #6096) [@ocornut, @wolfpld, @tolopolarity]
- Backends: GLFW: Added ImGui_ImplGlfw_SetCallbacksChainForAllWindows() to instruct backend
  to chain callbacks even for secondary viewports/windows. User callbacks may need to test
  the 'window' parameter. (#6142)
- Backends: OpenGL3: Fixed GL loader compatibility with 2.x profiles. (#6154, #4445, #3530) [@grauw]
- Backends: WebGPU: Fixed building for latest WebGPU specs (remove implicit layout generation).
  (#6117, #4116, #3632) [@tonygrue, @bfierz]
- Examples: refactored SDL2+GL and GLFW+GL examples to compile with Emscripten.
  (#2492, #2494, #3699, #3705) [@ocornut, @nicolasnoble]
  The dedicated example_emscripten_opengl3/ has been removed.
- Examples: Added SDL3+GL experimental example. (#6146)
- Examples: Win32: Fixed examples using RegisterClassW() since 1.89 to also call
  DefWindowProcW() instead of DefWindowProc() so that title text are correctly converted
  when application is compiled without /DUNICODE. (#5725, #5961, #5975) [@markreidvfx]
- Examples: SDL2+SDL_Renderer: Added call to SDL_RenderSetScale() to fix display on a
  Retina display (albeit lower-res as our other unmodified examples). (#6121, #6065, #5931).


-----------------------------------------------------------------------
 VERSION 1.89.2 (Released 2023-01-05)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.2

All changes:

- Tables, Nav, Scrolling: fixed scrolling functions and focus tracking with frozen rows and
  frozen columns. Windows now have a better understanding of outer/inner decoration sizes,
  which should later lead us toward more flexible uses of menu/status bars. (#5143, #3692)
- Tables, Nav: frozen columns are not part of menu layer and can be crossed over. (#5143, #3692)
- Tables, Columns: fixed cases where empty columns may lead to empty ImDrawCmd. (#4857, #5937)
- Tables: fixed matching width of synchronized tables (multiple tables with same id) when only
  some instances have a vertical scrollbar and not all. (#5920)
- Fixed cases where CTRL+Tab or Modal can occasionally lead to the creation of ImDrawCmd with
  zero triangles, which would makes the render loop of some backends assert (e.g. Metal with
  debugging, Allegro). (#4857, #5937)
- Inputs, IO: reworked ImGuiMod_Shortcut to redirect to Ctrl/Super at runtime instead of
  compile-time, being consistent with our support for io.ConfigMacOSXBehaviors and making it
  easier for bindings generators to process that value. (#5923, #456)
- Inputs, Scrolling: better selection of scrolling window when hovering nested windows
  and when backend/OS is emitting dual-axis wheeling inputs (typically touch pads on macOS).
  We now select a primary axis based on recent events, and select a target window based on it.
  We expect this behavior to be further improved/tweaked. (#3795, #4559) [@ocornut, @folays]
- InputText: fixed cursor navigation when pressing Up Arrow on the last character of a
  multiline buffer which doesn't end with a carriage return. (#6000)
- Text: fixed layouting of wrapped-text block when the last source line is above the
  clipping region. Regression added in 1.89. (#5720, #5919)
- Misc: added GetItemID() in public API. It is not often expected that you would use this,
  but it is useful for Shortcut() and upcoming owner-aware input functions which wants to
  be implemented with public API.
- Fonts: imgui_freetype: fixed a packing issue which in some occurrences would prevent large
  amount of glyphs from being packed correctly. (#5788, #5829)
- Fonts: added a 'void* UserData' field in ImFontAtlas, as a convenience for use by
  applications using multiple font atlases.
- Demo: simplified "Inputs" section, moved contents to Metrics->Inputs.
- Debug Tools: Metrics: added "Inputs" section, moved from Demo for consistency.
- Misc: fixed parameters to IMGUI_DEBUG_LOG() not being dead-stripped when building
  with IMGUI_DISABLE_DEBUG_TOOLS is used. (#5901) [@Teselka]
- Misc: fixed compile-time detection of SSE features on MSVC 32-bits builds. (#5943) [@TheMostDiligent]
- Examples: DirectX10, DirectX11: try WARP software driver if hardware driver is not available. (#5924, #5562)
- Backends: GLFW: Fixed mods state on Linux when using Alt-GR text input (e.g. German keyboard layout), which
  could lead to broken text input. Revert a 2022/01/17 change were we resumed using mods provided by GLFW,
  turns out they are faulty in this specific situation. (#6034)
- Backends: Allegro5: restoring using al_draw_indexed_prim() when Allegro version is >= 5.2.5. (#5937) [@Espyo]
- Backends: Vulkan: Fixed sampler passed to ImGui_ImplVulkan_AddTexture() not being honored as we were using
  an immutable sampler. (#5502, #6001, #914) [@martin-ejdestig, @rytisss]


-----------------------------------------------------------------------
 VERSION 1.89.1 (Released 2022-11-24)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89.1

Other changes:

- Scrolling, Focus: fixed SetKeyboardFocusHere()/SetItemDefaultFocus() during a window-appearing
  frame (and associated lower-level functions e.g. ScrollToRectEx()) from not centering item. (#5902)
- Inputs: fixed moving a window or drag and dropping from preventing input-owner-unaware code
  from accessing keys. (#5888, #4921, #456)
- Inputs: fixed moving a window or drag and dropping from capturing mods. (#5888, #4921, #456)
- Layout: fixed End()/EndChild() incorrectly asserting if users manipulates cursor position
  inside a collapsed/culled window and IMGUI_DISABLE_OBSOLETE_FUNCTIONS is enabled. (#5548, #5911)
- Combo: fixed selected item (marked with SetItemDefaultFocus()) from not being centered when
  the combo window initially appears. (#5902).
- ColorEdit: fixed label overlapping when using style.ColorButtonPosition == ImGuiDir_Left to
  move the color button on the left side (regression introduced in 1.88 WIP 2022/02/28). (#5912)
- Drag and Drop: fixed GetDragDropPayload() returning a non-NULL value if a drag source is
  active but a payload hasn't been submitted yet. This is convenient to detect new payload
  from within a drag source handler. (#5910, #143)
- Backends: GLFW: cancel out errors emitted by glfwGetKeyName() when a name is missing. (#5908)
- Backends: WebGPU: fixed validation error with default depth buffer settings. (#5869, #5914) [@kdchambers]


-----------------------------------------------------------------------
 VERSION 1.89 (Released 2022-11-15)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.89

Breaking changes:

- Layout: Obsoleted using SetCursorPos()/SetCursorScreenPos() to extend parent window/cell boundaries. (#5548)
  This relates to when moving the cursor position beyond current boundaries WITHOUT submitting an item.
  - Previously this would make the window content size ~200x200:
      Begin(...) + SetCursorScreenPos(GetCursorScreenPos() + ImVec2(200,200)) + End();
  - Instead, please submit an item:
      Begin(...) + SetCursorScreenPos(GetCursorScreenPos() + ImVec2(200,200)) + Dummy(ImVec2(0,0)) + End();
  - Alternative:
      Begin(...) + Dummy(ImVec2(200,200)) + End();
  Content size is now only extended when submitting an item.
  With '#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS' this will now be detected and assert.
  Without '#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS' this will silently be fixed until we obsolete it.
  (This incorrect pattern has been mentioned or suggested in: #4510, #3355, #1760, #1490, #4152, #150,
   threads have been amended to refer to this issue).
- Inputs: ImGuiKey is now a typed enum, allowing ImGuiKey_XXX symbols to be named in debuggers. (#4921)
  This will require uses of legacy backend-dependent indices to be casted, e.g.
   - with imgui_impl_glfw:  IsKeyPressed(GLFW_KEY_A) -> IsKeyPressed((ImGuiKey)GLFW_KEY_A);
   - with imgui_impl_win32: IsKeyPressed('A')        -> IsKeyPressed((ImGuiKey)'A')
   - etc. however if you are upgrading code you might as well use the backend-agnostic IsKeyPressed(ImGuiKey_A) now.
- Renamed and merged keyboard modifiers key enums and flags into a same set:  (#4921, #456)
   - ImGuiKey_ModCtrl  and ImGuiModFlags_Ctrl  -> ImGuiMod_Ctrl
   - ImGuiKey_ModShift and ImGuiModFlags_Shift -> ImGuiMod_Shift
   - ImGuiKey_ModAlt   and ImGuiModFlags_Alt   -> ImGuiMod_Alt
   - ImGuiKey_ModSuper and ImGuiModFlags_Super -> ImGuiMod_Super
  Kept inline redirection enums (will obsolete).
  This change simplifies a few things, reduces confusion, and will facilitate upcoming
  shortcut/input ownership apis.
  - The ImGuiKey_ModXXX were introduced in 1.87 and mostly used by backends.
  - The ImGuiModFlags_XXX have been exposed in imgui.h but not really used by any public api,
    only by third-party extensions. They were however subject to a recent rename
    (ImGuiKeyModFlags_XXX -> ImGuiModFlags_XXX) and we are exceptionally commenting out
    the older ImGuiKeyModFlags_XXX names ahead of obsolescence schedule to reduce confusion
    and because they were not meant to be used anyway.
- Removed io.NavInputs[] and ImGuiNavInput enum that were used to feed gamepad inputs.
  Basically 1.87 already obsoleted them from the backend's point of view, but internally
  our navigation code still used this array and enum, so they were still present.
  Not anymore! (#4921, #4858, #787, #1599, #323)
  Transition guide:
   - Official backends from 1.87+                  -> no issue.
   - Official backends from 1.60 to 1.86           -> will build and convert gamepad inputs, unless IMGUI_DISABLE_OBSOLETE_KEYIO is defined. Need updating!
   - Custom backends not writing to io.NavInputs[] -> no issue.
   - Custom backends writing to io.NavInputs[]     -> will build and convert gamepad inputs, unless IMGUI_DISABLE_OBSOLETE_KEYIO is defined. Need fixing!
   - TL;DR: Backends should call io.AddKeyEvent()/io.AddKeyAnalogEvent() with ImGuiKey_GamepadXXX values instead of filling io.NavInput[].
  The ImGuiNavInput enum was essentially 1.60's attempt to combine keyboard and gamepad inputs with named
  semantic, but the additional indirection and copy added complexity and got in the way of other
  incoming work. User's code (other than backends) should not be affected, unless you have custom
  widgets intercepting navigation events via the named enums (in which case you can upgrade your code).
- DragInt()/SliderInt(): Removed runtime patching of invalid "%f"/"%.0f" types of format strings.
  This was obsoleted in 1.61 (May 2018). See 1.61 changelog for details.
- Changed signature of ImageButton() function: (#5533, #4471, #2464, #1390)
  - Added 'const char* str_id' parameter + removed 'int frame_padding = -1' parameter.
  - Old signature: bool ImageButton(ImTextureID tex_id, ImVec2 size, ImVec2 uv0 = ImVec2(0,0), ImVec2 uv1 = ImVec2(1,1), int frame_padding = -1, ImVec4 bg_col = ImVec4(0,0,0,0), ImVec4 tint_col = ImVec4(1,1,1,1));
    - used the ImTextureID value to create an ID. This was inconsistent with other functions, led to ID conflicts, and caused problems with engines using transient ImTextureID values.
    - had a FramePadding override which was inconsistent with other functions and made the already-long signature even longer.
  - New signature: bool ImageButton(const char* str_id, ImTextureID tex_id, ImVec2 size, ImVec2 uv0 = ImVec2(0,0), ImVec2 uv1 = ImVec2(1,1), ImVec4 bg_col = ImVec4(0,0,0,0), ImVec4 tint_col = ImVec4(1,1,1,1));
    - requires an explicit identifier. You may still use e.g. PushID() calls and then pass an empty identifier.
    - always uses style.FramePadding for padding, to be consistent with other buttons. You may use PushStyleVar() to alter this.
  - As always we are keeping a redirection function available (will obsolete later).
- Removed the bizarre legacy default argument for 'TreePush(const void* ptr = NULL)'. (#1057)
  Must always pass a pointer value explicitly, NULL/nullptr is ok but require cast, e.g. TreePush((void*)nullptr);
  If you used TreePush() replace with TreePush((void*)NULL);
- Removed support for 1.42-era IMGUI_DISABLE_INCLUDE_IMCONFIG_H / IMGUI_INCLUDE_IMCONFIG_H. (#255)
  They only made sense before we could use IMGUI_USER_CONFIG.

Other Changes:

- Popups & Modals: fixed nested Begin() inside a popup being erroneously input-inhibited.
  While it is unusual, you can nest a Begin() inside a popup or modal, it is occasionally
  useful to achieve certain things (e.g. to implement suggestion popups #718, #4461).
- Inputs: Standard widgets now claim for key/button ownership and test for them.
  - Fixes scenario where e.g. a Popup with a Selectable() reacting on mouse down
    (e.g. double click) closes, and behind it is another window with an item reacting
    on mouse up. Previously this would lead to both items reacting, now the item in the
    window behind won't react on the mouse up since the mouse button ownership has already
    been claimed earlier.
  - Internals: There are MANY more aspects to this changes. Added experimental/internal APIs
    to allow handling input/shorting routing and key ownership. Things will be moved into
    public APIs over time. For now this release is a way to test the solidity of underlying
    systems while letting early adopters adopters toy with internals.
    (#456, #2637, #2620, #2891, #3370, #3724, #4828, #5108, #5242, #5641)
- Scrolling: Tweak mouse-wheel locked window timer so it is shorter but also gets reset
  whenever scrolling again. Modulate for small (sub-pixel) amounts. (#2604)
- Scrolling: Mitigated issue where multi-axis mouse-wheel inputs (usually from touch pad
  events) are incorrectly locking scrolling in a parent window. (#4559, #3795, #2604)
- Scrolling: Exposed SetNextWindowScroll() in public API. Useful to remove a scrolling
  delay in some situations where e.g. windows need to be synched. (#1526)
- InputText: added experimental io.ConfigInputTextEnterKeepActive feature to make pressing
  Enter keep the input active and select all text.
- InputText: numerical fields automatically accept full-width characters (U+FF01..U+FF5E)
  by converting them to half-width (U+0021..U+007E).
- InputText: added ImGuiInputTextFlags_EscapeClearsAll flag: first press on Escape clears
  text if any, second press deactivate the InputText(). (#5688, #2620)
- InputText: added support for shift+click style selection. (#5619) [@procedural]
- InputText: clarified that callbacks cannot modify buffer when using the ReadOnly flag.
- InputText: fixed minor one-frame selection glitch when reverting with Escape.
- ColorEdit3: fixed id collision leading to an assertion. (#5707)
- IsItemHovered: Added ImGuiHoveredFlags_DelayNormal and ImGuiHoveredFlags_DelayShort flags,
  allowing to introduce a shared delay for tooltip idioms. The delays are respectively
  io.HoverDelayNormal (default to 0.30f) and io.HoverDelayShort (default to 0.10f). (#1485)
- IsItemHovered: Added ImGuiHoveredFlags_NoSharedDelay to disable sharing delays between items,
  so moving from one item to a nearby one will requires delay to elapse again. (#1485)
- Tables: activating an ID (e.g. clicking button inside) column doesn't prevent columns
  output flags from having ImGuiTableColumnFlags_IsHovered set. (#2957)
- Tables,Columns: fixed a layout issue where SameLine() prior to a row change would set the
  next row in such state where subsequent SameLine() would move back to previous row.
- Tabs: Fixed a crash when closing multiple windows (possible with docking only) with an
  appended TabItemButton(). (#5515, #3291) [@rokups]
- Tabs: Fixed shrinking policy leading to infinite loops when fed unrounded tab widths. (#5652)
- Tabs: Fixed shrinking policy sometimes erroneously making right-most tabs stray a little out
  bar boundaries (bug in 1.88). (#5652).
- Tabs: Enforcing minimum size of 1.0f, fixed asserting on zero-tab widths. (#5572)
- Window: Fixed a potential crash when appending to a child window. (#5515, #3496, #4797) [@rokups]
- Window: Fixed an issue where uncollapsed a window would show a scrollbar for a frame.
- Window: Auto-fit size takes account of work rectangle (menu bars eating from viewport). (#5843)
- Window: Fixed position not being clamped while auto-resizing (fixes appearing windows without
  .ini data from moving for a frame when using io.ConfigWindowsMoveFromTitleBarOnly). (#5843)
- IO: Added ImGuiMod_Shortcut which is ImGuiMod_Super on Mac and ImGuiMod_Ctrl otherwise. (#456)
- IO: Added ImGuiKey_MouseXXX aliases for mouse buttons/wheel so all operations done on ImGuiKey
  can apply to mouse data as well. (#4921)
- IO: Filter duplicate input events during the AddXXX() calls. (#5599, #4921)
- IO: Fixed AddFocusEvent(false) to also clear MouseDown[] state. (#4921)
- Menus: Fixed incorrect sub-menu parent association when opening a menu by closing another.
  Among other things, it would accidentally break part of the closing heuristic logic when moving
  towards a sub-menu. (#2517, #5614). [@rokups]
- Menus: Fixed gaps in closing logic which would make child-menu erroneously close when crossing
  the gap between a menu item inside a window and a child-menu in a secondary viewport. (#5614)
- Menus: Fixed using IsItemHovered()/IsItemClicked() on BeginMenu(). (#5775)
- Menus, Popups: Experimental fix for issue where clicking on an open BeginMenu() item called from
  a window which is neither a popup neither a menu used to incorrectly close and reopen the menu
  (the fix may have side-effect and is labelld as experimental as we may need to revert). (#5775)
- Menus, Nav: Fixed keyboard/gamepad navigation occasionally erroneously landing on menu-item
  in parent window when the parent is not a popup. (#5730)
- Menus, Nav: Fixed not being able to close a menu with Left arrow when parent is not a popup. (#5730)
- Menus, Nav: Fixed using left/right navigation when appending to an existing menu (multiple
  BeginMenu() call with same names). (#1207)
- Menus: Fixed a one-frame issue where SetNextWindowXXX data are not consumed by a BeginMenu()
  returning false.
- Nav: Fixed moving/resizing window with gamepad or keyboard when running at very high framerate.
- Nav: Pressing Space/GamepadFaceDown on a repeating button uses the same repeating rate as a mouse hold.
- Nav: Fixed an issue opening a menu with Right key from a non-menu window.
- Text: Fixed wrapped-text not doing a fast-forward on lines above the clipping region,
  which would result in an abnormal number of vertices created (was slower and more likely to
  asserts with 16-bits ImDrawVtx). (#5720)
- Fonts: Added GetGlyphRangesGreek() helper for Greek & Coptic glyph range. (#5676, #5727) [@azonenberg]
- ImDrawList: Not using alloca() anymore, lift single polygon size limits. (#5704, #1811)
  - Note: now using a temporary buffer stored in ImDrawListSharedData.
    This change made it more visible than you cannot append to multiple ImDrawList from multiple
    threads if they share the same ImDrawListSharedData. Previously it was a little more likely
    for this to "accidentally" work, but was already incorrect. (#6167)
- Platform IME: [Windows] Removed call to ImmAssociateContextEx() leading to freeze on some setups.
  (#2589, #5535, #5264, #4972)
- Misc: better error reporting for PopStyleColor()/PopStyleVar() + easier to recover. (#1651)
- Misc: io.Framerate moving average now converge in 60 frames instead of 120. (#5236, #4138)
- Debug Tools: Debug Log: Visually locate items when hovering a 0xXXXXXXXX value. (#5855)
- Debug Tools: Debug Log: Added 'IO' and 'Clipper' events logging. (#5855)
- Debug Tools: Metrics: Visually locate items when hovering a 0xXXXXXXXX value (in most places).
- Debug Tools: Item Picker: Mouse button can be changed by holding Ctrl+Shift, making it easier
  to use the Item Picker in e.g. menus. (#2673)
- Docs: Fixed various typos in comments and documentations. (#5649, #5675, #5679) [@tocic, @lessigsx]
- Demo: Improved "Constrained-resizing window" example, more clearly showcase aspect-ratio. (#5627)
- Demo: Added more explicit "Center window" mode to "Overlay example". (#5618)
- Demo: Fixed Log & Console from losing scrolling position with Auto-Scroll when child is clipped. (#5721)
- Examples: Added all SDL examples to default VS solution.
- Examples: Win32: Always use RegisterClassW() to ensure windows are Unicode. (#5725)
- Examples: Android: Enable .ini file loading/saving into application internal data folder. (#5836) [@rewtio]
- Backends: GLFW: Honor GLFW_CURSOR_DISABLED by not setting mouse position. (#5625) [@scorpion-26]
- Backends: GLFW: Add glfwGetError() call on GLFW 3.3 to inhibit missing mouse cursor errors. (#5785) [@mitchellh]
- Backends: SDL: Disable SDL 2.0.22 new "auto capture" which prevents drag and drop across windows
  (e.g. for multi-viewport support) and don't capture mouse when drag and dropping. (#5710)
- Backends: Win32: Convert WM_CHAR values with MultiByteToWideChar() when window class was
  registered as MBCS (not Unicode). (#5725, #1807, #471, #2815, #1060) [@or75, @ocornut]
- Backends: OSX: Fixed mouse inputs on flipped views. (#5756) [@Nemirtingas]
- Backends: OSX: Fixed mouse coordinate before clicking on the host window. (#5842) [@maezawa-akira]
- Backends: OSX: Fixes to support full app creation in C++. (#5403) [@stack]
- Backends: OpenGL3: Reverted use of glBufferSubData(), too many corruptions issues were reported,
  and old leaks issues seemingly can't be reproed with Intel drivers nowadays (revert earlier changes).
  (#4468, #4504, #3381, #2981, #4825, #4832, #5127).
- Backends: Metal: Use __bridge for ARC based systems. (#5403) [@stack]
- Backends: Metal: Add dispatch synchronization. (#5447) [@luigifcruz]
- Backends: Metal: Update deprecated property 'sampleCount'->'rasterSampleCount'. (#5603) [@dcvz]
- Backends: Vulkan: Added experimental ImGui_ImplVulkan_RemoveTexture() for api symmetry. (#914, #5738).
- Backends: WebGPU: fixed rendering when a depth buffer is enabled. (#5869) [@brainlag]


-----------------------------------------------------------------------
 VERSION 1.88 (Released 2022-06-21)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.88

Breaking changes:

- Renamed IMGUI_DISABLE_METRICS_WINDOW to IMGUI_DISABLE_DEBUG_TOOLS for correctness.
  Kept support for old define (will obsolete).
- Renamed CaptureMouseFromApp() and CaptureKeyboardFromApp() to SetNextFrameWantCaptureMouse()
  and SetNextFrameWantCaptureKeyboard() to clarify purpose, old name was too misleading.
  Kept inline redirection functions (will obsolete).
- Renamed ImGuiKeyModFlags to ImGuiModFlags. Kept inline redirection enums (will obsolete).
  (This was never used in public API functions but technically present in imgui.h and ImGuiIO).
- Backends: OSX: Removed ImGui_ImplOSX_HandleEvent() from backend API in favor of backend
  automatically handling event capture. Examples that are using the OSX backend have removed
  all the now-unnecessary calls to ImGui_ImplOSX_HandleEvent(), applications can do as well.
  [@stuartcarnie] (#4821)
- Internals: calling ButtonBehavior() without calling ItemAdd() now requires a KeepAliveID()
  call. This is because the KeepAliveID() call was moved from GetID() to ItemAdd(). (#5181)

Other Changes:

- IO: Fixed backward-compatibility regression introduced in 1.87: (#4921, #4858)
  - Direct accesses to io.KeysDown[] with legacy indices didn't work (with new backends).
  - Direct accesses to io.KeysDown[GetKeyIndex(XXX)] would access invalid data (with old/new backends).
  - Calling IsKeyDown() didn't have those problems, and is recommended as io.KeysDown[] is obsolete.
- IO: Fixed input queue trickling of interleaved keys/chars events (which are frequent especially
  when holding down a key as OS submits chars repeat events) delaying key presses and mouse movements.
  In particular, using the input system for fast game-like actions (e.g. WASD camera move) would
  typically have been impacted, as well as holding a key while dragging mouse. Constraints have
  been lifted and are now only happening when e.g. an InputText() widget is active. (#4921, #4858)
  Note that even thought you shouldn't need to disable io.ConfigInputTrickleEventQueue, you can
  technically dynamically change its setting based on the context (e.g. disable only when hovering
  or interacting with a game/3D view).
- IO: Fixed input queue trickling of mouse wheel events: multiple wheel events are merged, while
  a mouse pos followed by a mouse wheel are now trickled. (#4921, #4821)
- IO: Added io.SetAppAcceptingEvents() to set a master flag for accepting key/mouse/characters
  events (default to true). Useful if you have native dialog boxes that are interrupting your
  application loop/refresh, and you want to disable events being queued while your app is frozen.
- Windows: Fixed first-time windows appearing in negative coordinates from being initialized
  with a wrong size. This would most often be noticeable in multi-viewport mode (docking branch)
  when spawning a window in a monitor with negative coordinates. (#5215, #3414) [@DimaKoltun]
- Clipper: Fixed a regression in 1.86 when not calling clipper.End() and late destructing the
  clipper instance. High-level languages (Lua,Rust etc.) would typically be affected. (#4822)
- Layout: Fixed mixing up SameLine() and SetCursorPos() together from creating situations where line
  height would be emitted from the wrong location (e.g. 'ItemA+SameLine()+SetCursorPos()+ItemB' would
  emit ItemA worth of height from the position of ItemB, which is not necessarily aligned with ItemA).
- Sliders: An initial click within the knob/grab doesn't shift its position. (#1946, #5328)
- Sliders, Drags: Fixed dragging when using hexadecimal display format string. (#5165, #3133)
- Sliders, Drags: Fixed manual input when using hexadecimal display format string. (#5165, #3133)
- InputScalar: Fixed manual input when using %03d style width in display format string. (#5165, #3133)
- InputScalar: Automatically allow hexadecimal input when format is %X (without extra flag).
- InputScalar: Automatically allow scientific input when format is float/double (without extra flag).
- Nav: Fixed nav movement in a scope with only one disabled item from focusing the disabled item. (#5189)
- Nav: Fixed issues with nav request being transferred to another window when calling SetKeyboardFocusHere()
  and simultaneous changing window focus. (#4449)
- Nav: Changed SetKeyboardFocusHere() to not behave if a drag or window moving is in progress.
- Nav: Fixed inability to cancel nav in modal popups. (#5400) [@rokups]
- IsItemHovered(): added ImGuiHoveredFlags_NoNavOverride to disable the behavior where the
  return value is overridden by focus when gamepad/keyboard navigation is active.
- InputText: Fixed pressing Tab emitting two tabs characters because of dual Keys/Chars events being
  trickled with the new input queue (happened on some backends only). (#2467, #1336)
- InputText: Fixed a one-frame display glitch where pressing Escape to revert after a deletion
  would lead to small garbage being displayed for one frame. Curiously a rather old bug! (#3008)
- InputText: Fixed an undo-state corruption issue when editing main buffer before reactivating item. (#4947)
- InputText: Fixed an undo-state corruption issue when editing in-flight buffer in user callback.
  (#4947, #4949] [@JoshuaWebb]
- Tables: Fixed incorrect border height used for logic when resizing one of several synchronized
  instance of a same table ID, when instances have a different height. (#3955).
- Tables: Fixed incorrect auto-fit of parent windows when using non-resizable weighted columns. (#5276)
- Tables: Fixed draw-call merging of last column. Depending on some unrelated settings (e.g. BorderH)
  merging draw-call of the last column didn't always work (regression since 1.87). (#4843, #4844) [@rokups]
- Inputs: Fixed IsMouseClicked() repeat mode rate being half of keyboard repeat rate.
- ColorEdit: Fixed text baseline alignment after a SameLine() after a ColorEdit() with visible label.
- Tabs: BeginTabItem() now reacts to SetNextItemWidth(). (#5262)
- Tabs: Tweak shrinking policy so that while resizing tabs that don't need shrinking keep their
  initial width more precisely (without the occasional +1 worth of width).
- Menus: Adjusted BeginMenu() closing logic so hovering void or non-MenuItem() in parent window
  always lead to menu closure. Fixes using items that are not MenuItem() or BeginItem() at the root
  level of a popup with a child menu opened.
- Menus: Menus emitted from the main/scrolling layer are not part of the same menu-set as menus emitted
  from the menu-bar, avoiding  accidental hovering from one to the other. (#3496, #4797) [@rokups]
- Style: Adjust default value of GrabMinSize from 10.0f to 12.0f.
- Stack Tool: Added option to copy item path to clipboard. (#4631)
- Settings: Fixed out-of-bounds read when .ini file on disk is empty. (#5351) [@quantum5]
- Settings: Fixed some SetNextWindowPos/SetNextWindowSize API calls not marking settings as dirty.
- DrawList: Fixed PathArcTo() emitting terminating vertices too close to arc vertices. (#4993) [@thedmd]
- DrawList: Fixed texture-based anti-aliasing path with RGBA textures (#5132, #3245) [@cfillion]
- DrawList: Fixed divide-by-zero or glitches with Radius/Rounding values close to zero. (#5249, #5293, #3491)
- DrawList: Circle with a radius smaller than 0.5f won't appear, to be consistent with other primitives. [@thedmd]
- Debug Tools: Debug Log: Added ShowDebugLogWindow() showing an opt-in synthetic log of principal events
  (focus, popup, active id changes) helping to diagnose issues.
- Debug Tools: Added DebugTextEncoding() function to facilitate diagnosing issues when not sure about
  whether you have a UTF-8 text encoding issue or a font loading issue. [@LaMarche05, @ocornut]
- Demo: Add better demo of how to use SetNextFrameWantCaptureMouse()/SetNextFrameWantCaptureKeyboard().
- Metrics: Added a "UTF-8 Encoding Viewer" section using the aforementioned DebugTextEncoding() function.
- Metrics: Added "InputText" section to visualize internal state (#4947, #4949).
- Misc: Fixed calling GetID("label") _before_ a widget emitting this item inside a group (such as InputInt())
  from causing an assertion when closing the group. (#5181).
- Misc: Fixed IsAnyItemHovered() returning false when using navigation.
- Misc: Allow redefining IM_COL32_XXX layout macros to facilitate use on big-endian systems. (#5190, #767, #844)
- Misc: Added IMGUI_STB_SPRINTF_FILENAME to support custom path to stb_sprintf. (#5068, #2954) [@jakubtomsu]
- Misc: Added constexpr to ImVec2/ImVec4 inline constructors. (#4995) [@Myriachan]
- Misc: Updated stb_truetype.h from 1.20 to 1.26 (many fixes). (#5075)
- Misc: Updated stb_textedit.h from 1.13 to 1.14 (our changes so this effectively is a no-op). (#5075)
- Misc: Updated stb_rect_pack.h from 1.00 to 1.01 (minor). (#5075)
- Misc: binary_to_compressed_c tool: Added -nostatic option. (#5021) [@podsvirov]
- ImVector: Fixed erase() with empty range. (#5009) [@thedmd]
- Backends: Vulkan: Don't use VK_PRESENT_MODE_MAX_ENUM_KHR as specs state it isn't part of the API. (#5254)
- Backends: GLFW: Fixed a regression in 1.87 which resulted in keyboard modifiers events being
  reported incorrectly on Linux/X11, due to a bug in GLFW. [@rokups]
- Backends: GLFW: Fixed untranslated keys when pressing lower case letters on OSX (#5260, #5261) [@cpichard]
- Backends: SDL: Fixed dragging out viewport broken on some SDL setups. (#5012) [@rokups]
- Backends: SDL: Added support for extra mouse buttons (SDL_BUTTON_X1/SDL_BUTTON_X2). (#5125) [@sgiurgiu]
- Backends: SDL, OpenGL3: Fixes to facilitate building on AmigaOS4. (#5190) [@afxgroup]
- Backends: OSX: Monitor NSKeyUp events to catch missing keyUp for key when user press Cmd + key (#5128) [@thedmd]
- Backends: OSX, Metal: Store backend data in a per-context struct, allowing to use these backends with
  multiple contexts. (#5203, #5221, #4141) [@noisewuwei]
- Backends: Metal: Fixed null dereference on exit inside command buffer completion handler. (#5363, #5365) [@warrenm]
- Backends: OpenGL3: Partially revert 1.86 change of using glBufferSubData(): now only done on Windows and
  Intel GPU, based on querying glGetString(GL_VENDOR). Essentially we got report of accumulating leaks on Intel
  with multi-viewports when using simple glBufferData() without orphaning, and report of corruptions on other
  GPUs with multi-viewports when using orphaning and glBufferSubData(), so currently switching technique based
  on GPU vendor, which unfortunately reinforce the cargo-cult nature of dealing with OpenGL drivers.
  Navigating the space of mysterious OpenGL drivers is particularly difficult as they are known to rely on
  application specific whitelisting. (#4468, #3381, #2981, #4825, #4832, #5127).
- Backends: OpenGL3: Fix state corruption on OpenGL ES 2.0 due to not preserving GL_ELEMENT_ARRAY_BUFFER_BINDING
  and vertex attribute states. [@rokups]
- Examples: Emscripten+WebGPU: Fix building for latest WebGPU specs. (#3632)
- Examples: OSX+Metal, OSX+OpenGL: Removed now-unnecessary calls to ImGui_ImplOSX_HandleEvent(). (#4821)


-----------------------------------------------------------------------
 VERSION 1.87 (Released 2022-02-07)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.87

Breaking Changes:

- Removed support for pre-C++11 compilers. We'll stop supporting VS2010. (#4537)
- Reworked IO mouse input API: (#4921, #4858) [@thedmd, @ocornut]
  - Added io.AddMousePosEvent(), io.AddMouseButtonEvent(), io.AddMouseWheelEvent() functions,
    obsoleting writing directly to io.MousePos, io.MouseDown[], io.MouseWheel, etc.
  - This enable input queue trickling to support low framerates. (#2787, #1992, #3383, #2525, #1320)
  - For all calls to IO new functions, the Dear ImGui context should be bound/current.
- Reworked IO keyboard input API: (#4921, #2625, #3724) [@thedmd, @ocornut]
  - Added io.AddKeyEvent() function, obsoleting writing directly to io.KeyMap[], io.KeysDown[] arrays.
  - For keyboard modifiers, you can call io.AddKeyEvent() with ImGuiKey_ModXXX values,
    obsoleting writing directly to io.KeyCtrl, io.KeyShift etc.
  - Added io.SetKeyEventNativeData() function (optional) to pass native and old legacy indices.
  - Added full range of key enums in ImGuiKey (e.g. ImGuiKey_F1).
  - Added GetKeyName() helper function.
  - Obsoleted GetKeyIndex(): it is now unnecessary and will now return the same value.
  - All keyboard related functions taking 'int user_key_index' now take 'ImGuiKey key':
    - IsKeyDown(), IsKeyPressed(), IsKeyReleased(), GetKeyPressedAmount().
  - Added io.ConfigInputTrickleEventQueue (defaulting to true) to disable input queue trickling.
  - Backward compatibility:
    - All backends updated to use new functions.
    - Old backends populating those arrays should still work!
    - Calling e.g. IsKeyPressed(MY_NATIVE_KEY_XXX) will still work! (for a while)
    - Those legacy arrays will only be disabled if '#define IMGUI_DISABLE_OBSOLETE_KEYIO' is set in your imconfig.
      In a few versions, IMGUI_DISABLE_OBSOLETE_FUNCTIONS will automatically enable IMGUI_DISABLE_OBSOLETE_KEYIO,
      so this will be moved into the regular obsolescence path.
    - BREAKING: If your custom backend used ImGuiKey as mock native indices (e.g. "io.KeyMap[ImGuiKey_A] = ImGuiKey_A")
      this is a use case that will now assert and be breaking for your old backend.
  - Transition guide:
     - IsKeyPressed(MY_NATIVE_KEY_XXX)           -> use IsKeyPressed(ImGuiKey_XXX)
     - IsKeyPressed(GetKeyIndex(ImGuiKey_XXX))   -> use IsKeyPressed(ImGuiKey_XXX)
     - Backend writing to io.KeyMap[],KeysDown[] -> backend should call io.AddKeyEvent(), if legacy indexing is desired, call io.SetKeyEventNativeData()
     - Basically the trick we took advantage of is that we previously only supported native keycode from 0 to 511,
       so ImGuiKey values can still express a legacy native keycode, and new named keys are all >= 512.
  - This will enable a few things in the future:
     - Access to portable keys allows for backend-agnostic keyboard input code. Until now it was difficult
       to share code using keyboard across project because of this gap. (#2625, #3724)
     - Access to full key ranges will allow us to develop a proper keyboard shortcut system. (#456)
     - io.SetKeyEventNativeData() include native keycode/scancode which may later be exposed. (#3141, #2959)
- Reworked IO nav/gamepad input API and unifying inputs sources: (#4921, #4858, #787)
  - Added full range of ImGuiKey_GamepadXXXX enums (e.g. ImGuiKey_GamepadDpadUp, ImGuiKey_GamepadR2) to use with
    io.AddKeyEvent(), io.AddKeyAnalogEvent().
  - Added io.AddKeyAnalogEvent() function, obsoleting writing directly to io.NavInputs[] arrays.
- Renamed ImGuiKey_KeyPadEnter to ImGuiKey_KeypadEnter to align with new symbols. Kept redirection enum. (#2625)
- Removed support for legacy arithmetic operators (+,+-,*,/) when inputing text into a slider/drag. (#4917, #3184)
  This doesn't break any api/code but a feature that was accessible by end-users (which seemingly no one used).
  (Instead you may implement custom expression evaluators to provide a better version of this).
- Backends: GLFW: backend now uses glfwSetCursorPosCallback().
  - If calling ImGui_ImplGlfw_InitXXX with install_callbacks=true: nothing to do. is already done for you.
  - If calling ImGui_ImplGlfw_InitXXX with install_callbacks=false: you WILL NEED to register the GLFW callback
    using glfwSetCursorPosCallback() and forward it to the backend function ImGui_ImplGlfw_CursorPosCallback().
- Backends: SDL: Added SDL_Renderer* parameter to ImGui_ImplSDL2_InitForSDLRenderer(), so backend can call
  SDL_GetRendererOutputSize() to obtain framebuffer size valid for hi-dpi. (#4927) [@Clownacy]
- Commented out redirecting functions/enums names that were marked obsolete in 1.69, 1.70, 1.71, 1.72 (March-July 2019)
  - ImGui::SetNextTreeNodeOpen()        -> use ImGui::SetNextItemOpen()
  - ImGui::GetContentRegionAvailWidth() -> use ImGui::GetContentRegionAvail().x
  - ImGui::TreeAdvanceToLabelPos()      -> use ImGui::SetCursorPosX(ImGui::GetCursorPosX() + ImGui::GetTreeNodeToLabelSpacing());
  - ImFontAtlas::CustomRect             -> use ImFontAtlasCustomRect
  - ImGuiColorEditFlags_RGB/HSV/HEX     -> use ImGuiColorEditFlags_DisplayRGB/HSV/Hex
- Removed io.ImeSetInputScreenPosFn() in favor of more flexible io.SetPlatformImeDataFn() for IME support.
  Because this field was mostly only ever used by Dear ImGui internally, not by backends nor the vast majority
  of user code, this should only affect a very small fraction for users who are already very IME-aware.
- Obsoleted 'void* io.ImeWindowHandle' in favor of writing to 'void* ImGuiViewport::PlatformHandleRaw'.
  This removes an incompatibility between 'master' and 'multi-viewports' backends and toward enabling
  better support for IME. Updated backends accordingly. Because the old field is set by existing backends,
  we are keeping it (marked as obsolete).

Other Changes:

- IO: Added event based input queue API, which now trickles events to support low framerates. [@thedmd, @ocornut]
  Previously the most common issue case (button presses in low framerates) was handled by backend. This is now
  handled by core automatically for all kind of inputs. (#4858, #2787, #1992, #3383, #2525, #1320)
  - New IO functions for keyboard/gamepad: AddKeyEvent(), AddKeyAnalogEvent().
  - New IO functions for mouse: AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent().
- IO: Unified key enums allow using key functions on key mods and gamepad values.
- Fixed CTRL+Tab into an empty window causing artifacts on the highlight rectangle due to bad reordering on ImDrawCmd.
- Fixed a situation where CTRL+Tab or Modal can occasionally lead to the creation of ImDrawCmd with zero triangles,
  which would makes the draw operation of some backends assert (e.g. Metal with debugging). (#4857)
- Popups: Fixed a regression crash when a new window is created after a modal on the same frame. (#4920) [@rokups]
- Popups: Fixed an issue when reopening a same popup multiple times would offset them by 1 pixel on the right. (#4936)
- Tables, ImDrawListSplitter: Fixed erroneously stripping trailing ImDrawList::AddCallback() when submitted in
  last column or last channel and when there are no other drawing operation. (#4843, #4844) [@hoffstadt]
- Tables: Fixed positioning of Sort icon on right-most column with some settings (not resizable + no borders). (#4918).
- Nav: Fixed gamepad navigation in wrapping popups not wrapping all the way. (#4365)
- Sliders, Drags: Fixed text input of values with a leading sign, common when using a format enforcing sign. (#4917)
- Demo: draw a section of keyboard in "Inputs > Keyboard, Gamepad & Navigation state" to visualize keys. [@thedmd]
- Platform IME: changed io.ImeSetInputScreenPosFn() to io.SetPlatformImeDataFn() API,
  now taking a ImGuiPlatformImeData structure which we can more easily extend in the future.
- Platform IME: moved io.ImeWindowHandle to GetMainViewport()->PlatformHandleRaw.
- Platform IME: add ImGuiPlatformImeData::WantVisible, hide IME composition window when not used. (#2589) [@actboy168]
- Platform IME: add ImGuiPlatformImeData::InputLineHeight. (#3113) [@liuliu]
- Platform IME: [windows] call ImmSetCandidateWindow() to position candidate window.
- Backends: GLFW: Pass localized keys (matching keyboard layout). Fix e.g. CTRL+A, CTRL+Z, CTRL+Y shortcuts.
  We are now converting GLFW untranslated keycodes back to translated keycodes in order to match the behavior of
  other backend, and facilitate the use of GLFW with lettered-shortcuts API. (#456, #2625)
- Backends: GLFW: Submit keys and key mods using io.AddKeyEvent(). (#2625, #4921)
- Backends: GLFW: Submit mouse data using io.AddMousePosEvent(), io.AddMouseButtonEvent(), io.AddMouseWheelEvent() functions. (#4921)
- Backends: GLFW: Retrieve mouse position using glfwSetCursorPosCallback() + fallback when focused but not hovered/captured.
- Backends: GLFW: Submit gamepad data using io.AddKeyEvent/AddKeyAnalogEvent() functions, stopped writing to io.NavInputs[]. (#4921)
- Backends: GLFW: Added ImGui_ImplGlfw_InstallCallbacks()/ImGui_ImplGlfw_RestoreCallbacks() helpers to facilitate user installing
  callbacks after iniitializing backend. (#4981)
- Backends: Win32: Submit keys and key mods using io.AddKeyEvent(). (#2625, #4921)
- Backends: Win32: Retrieve mouse position using WM_MOUSEMOVE/WM_MOUSELEAVE + fallback when focused but not hovered/captured.
- Backends: Win32: Submit mouse data using io.AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent() functions. (#4921)
- Backends: Win32: Maintain a MouseButtonsDown mask instead of using ImGui::IsAnyMouseDown() which will be obsoleted.
- Backends: Win32: Submit gamepad data using io.AddKeyEvent/AddKeyAnalogEvent() functions, stopped writing to io.NavInputs[]. (#4921)
- Backends: SDL: Pass localized keys (matching keyboard layout). Fix e.g. CTRL+A, CTRL+Z, CTRL+Y shortcuts. (#456, #2625)
- Backends: SDL: Submit key data using io.AddKeyEvent(). Submit keymods using io.AddKeyModsEvent() at the same time. (#2625)
- Backends: SDL: Retrieve mouse position using SDL_MOUSEMOTION/SDL_WINDOWEVENT_LEAVE + fallback when focused but not hovered/captured.
- Backends: SDL: Submit mouse data using io.AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent() functions. (#4921)
- Backends: SDL: Maintain a MouseButtonsDown mask instead of using ImGui::IsAnyMouseDown() which will be obsoleted.
- Backends: SDL: Submit gamepad data using io.AddKeyEvent/AddKeyAnalogEvent() functions, stopped writing to io.NavInputs[]. (#4921)
- Backends: Allegro5: Submit keys using io.AddKeyEvent(). Submit keymods using io.AddKeyModsEvent() at the same time. (#2625)
- Backends: Allegro5: Submit mouse data using io.AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent() functions. (#4921)
- Backends: OSX: Submit keys using io.AddKeyEvent(). Submit keymods using io.AddKeyModsEvent() at the same time. (#2625)
- Backends: OSX: Submit mouse data using io.AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent() functions. (#4921)
- Backends: OSX: Submit gamepad data using io.AddKeyEvent/AddKeyAnalogEvent() functions, stopped writing to io.NavInputs[]. (#4921)
- Backends: OSX: Added basic Platform IME support. (#3108, #2598) [@liuliu]
- Backends: OSX: Fix Game Controller nav mapping to use shoulder for both focusing and tweak speed. (#4759)
- Backends: OSX: Fix building with old Xcode versions that are missing gamepad features. [@rokups]
- Backends: OSX: Forward keyDown/keyUp events to OS when unused by Dear ImGui.
- Backends: Android, GLUT: Submit keys using io.AddKeyEvent(). Submit keymods using io.AddKeyModsEvent() at the same time. (#2625)
- Backends: Android, GLUT: Submit mouse data using io.AddMousePosEvent(), AddMouseButtonEvent(), AddMouseWheelEvent() functions. (#4858)
- Backends: OpenGL3: Fixed a buffer overflow in imgui_impl_opengl3_loader.h init (added in 1.86). (#4468, #4830) [@dymk]
  It would generally not have noticeable side-effect at runtime but would be detected by runtime checkers.
- Backends: OpenGL3: Fix OpenGL ES2 includes on Apple systems. [@rokups]
- Backends: Metal: Added Apple Metal C++ API support. (#4824, #4746) [@luigifcruz]
  Enable with '#define IMGUI_IMPL_METAL_CPP' in your imconfig.h file.
- Backends: Metal: Ignore ImDrawCmd where ElemCount == 0, which are normally not emitted by the library but
  can theoretically be created by user code manipulating a ImDrawList. (#4857)
- Backends: Vulkan: Added support for ImTextureID as VkDescriptorSet, add ImGui_ImplVulkan_AddTexture(). (#914) [@martty]
- Backends: SDL_Renderer: Fix texture atlas format on big-endian hardware (#4927) [@Clownacy]
- Backends: WebGPU: Fixed incorrect size parameters in wgpuRenderPassEncoderSetIndexBuffer() and
  wgpuRenderPassEncoderSetVertexBuffer() calls. (#4891) [@FeepsDev]


-----------------------------------------------------------------------
 VERSION 1.86 (Released 2021-12-22)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.86

Breaking Changes:

- Removed CalcListClipping() function. Prefer using ImGuiListClipper which can return non-contiguous ranges.
  Please open an issue if you think you really need this function. (#3841)
- Backends: OSX: Added NSView* parameter to ImGui_ImplOSX_Init(). (#4759) [@stuartcarnie]
- Backends: Marmalade: Removed obsolete Marmalade backend (imgui_impl_marmalade.cpp) + example app. (#368, #375)
  Find last supported version at https://github.com/ocornut/imgui/wiki/Bindings

Other Changes:

- Added an assertion for the common user mistake of using "" as an identifier at the root level of a window
  instead of using "##something". Empty identifiers are valid and useful in a very small amount of cases,
  but 99.9% of the time if you need an empty label you should use "##something". (#1414, #2562, #2807, #4008,
  #4158, #4375, #4548, #4657, #4796). READ THE FAQ ABOUT HOW THE ID STACK WORKS -> https://dearimgui.com/faq
- Added GetMouseClickedCount() function, returning the number of successive clicks. (#3229) [@kudaba]
  (so IsMouseDoubleClicked(ImGuiMouseButton_Left) is same as GetMouseClickedCount(ImGuiMouseButton_Left) == 2,
  but it allows testing for triple clicks and more).
- Modals: fixed issue hovering popups inside a child windows inside a modal. (#4676, #4527)
- Modals, Popups, Windows: changes how appearing windows are interrupting popups and modals. (#4317) [@rokups]
  - appearing windows created from within the begin stack of a popup/modal will no longer close it.
  - appearing windows created not within the begin stack of a modal will no longer close the modal,
    and automatically appear behind it.
- Fixed IsWindowFocused()/IsWindowHovered() issues with child windows inside popups. (#4676)
- Nav: Ctrl+tabbing to cycle through windows is now enabled regardless of using the _NavEnableKeyboard
  configuration flag. This is part of an effort to generalize the use of keyboard inputs. (#4023, #787).
  Note that while this is active you can also moving windows (with arrow) and resize (shift+arrows).
- Nav: tabbing now cycles through clipped items and scroll accordingly. (#4449)
- Nav: pressing PageUp/PageDown/Home/End when in Menu layer automatically moves back to Main layer.
- Nav: fixed resizing window from borders setting navigation to Menu layer.
- Nav: prevent child from clipping items when using _NavFlattened and parent has a pending request.
- Nav: pressing Esc to exit a child window reactivates the Nav highlight if it was disabled by mouse.
- Nav: with ImGuiConfigFlags_NavEnableSetMousePos enabled: Fixed absolute mouse position when using
  Home/End leads to scrolling. Fixed not setting mouse position when a failed move request (e.g. when
  already at edge) reactivates the navigation highlight.
- Menus: fixed closing a menu inside a popup/modal by clicking on the popup/modal. (#3496, #4797)
- Menus: fixed closing a menu by clicking on its menu-bar item when inside a popup. (#3496, #4797) [@xndcn]
- Menus: fixed menu inside a popup/modal not inhibiting hovering of items in the popup/modal. (#3496, #4797)
- Menus: fixed sub-menu items inside a popups from closing the popup.
- Menus: fixed top-level menu from not consistently using style.PopupRounding. (#4788)
- InputText, Nav: fixed repeated calls to SetKeyboardFocusHere() preventing to use InputText(). (#4682)
- Inputtext, Nav: fixed using SetKeyboardFocusHere() on InputTextMultiline(). (#4761)
- InputText: made double-click select word, triple-line select line. Word delimitation logic differs
  slightly from the one used by CTRL+arrows. (#2244)
- InputText: fixed ReadOnly flag preventing callbacks from receiving the text buffer. (#4762) [@actondev]
- InputText: fixed Shift+Delete from not cutting into clipboard. (#4818, #1541) [@corporateshark]
- InputTextMultiline: fixed incorrect padding when FrameBorder > 0. (#3781, #4794)
- InputTextMultiline: fixed vertical tracking with large values of FramePadding.y. (#3781, #4794)
- Separator: fixed cover all columns while called inside a table. (#4787)
- Clipper: currently focused item is automatically included in clipper range.
  Fixes issue where e.g. drag and dropping an item and scrolling ensure the item source location is
  still submitted. (#3841, #1725) [@GamingMinds-DanielC, @ocornut]
- Clipper: added ForceDisplayRangeByIndices() to force a given item (or several) to be stepped out
  during a clipping operation. (#3841) [@GamingMinds-DanielC]
- Clipper: rework so gamepad/keyboard navigation doesn't create spikes in number of items requested
  by the clipper to display. (#3841)
- Clipper: fixed content height declaration slightly mismatching the value of when not using a clipper.
  (an additional ItemSpacing.y was declared, affecting scrollbar range).
- Clipper: various and incomplete changes to tame down scrolling and precision issues on very large ranges.
  Passing an explicit height to the clipper now allows larger ranges. (#3609, #3962).
- Clipper: fixed invalid state when number of frozen table row is smaller than ItemCount.
- Drag and Drop: BeginDragDropSource() with ImGuiDragDropFlags_SourceAllowNullID doesn't lose
  tooltip when scrolling. (#143)
- Fonts: fixed infinite loop in ImFontGlyphRangesBuilder::AddRanges() when passing UINT16_MAX or UINT32_MAX
  without the IMGUI_USE_WCHAR32 compile-time option. (#4802) [@SlavicPotato]
- Metrics: Added a node showing windows in submission order and showing the Begin() stack.
- Misc: Added missing ImGuiMouseCursor_NotAllowed cursor for software rendering (when the
  io.MouseDrawCursor flag is enabled). (#4713) [@nobody-special666]
- Misc: Fixed software mouse cursor being rendered multiple times if Render() is called more than once.
- Misc: Fix MinGW DLL build issue (when IMGUI_API is defined). [@rokups]
- CI: Add MinGW DLL build to test suite. [@rokups]
- Backends: Vulkan: Call vkCmdSetScissor() at the end of render with a full-viewport to reduce
  likehood of issues with people using VK_DYNAMIC_STATE_SCISSOR in their app without calling
  vkCmdSetScissor() explicitly every frame. (#4644)
- Backends: OpenGL3: Using buffer orphaning + glBufferSubData(), seems to fix leaks with multi-viewports
  with some Intel HD drivers, and perhaps improve performances. (#4468, #4504, #2981, #3381) [@parbo]
- Backends: OpenGL2, Allegro5, Marmalade: Fixed mishandling of the ImDrawCmd::IdxOffset field.
  This is an old bug, but due to the way we created drawlists, it never had any visible side-effect before.
  The new code for handling Modal and CTRL+Tab dimming/whitening recently made the bug surface. (#4790)
- Backends: Win32: Store left/right variants of Ctrl/Shift/Alt mods in KeysDown[] array. (#2625) [@thedmd]
- Backends: DX12: Fixed DRAW_EMPTY_SCISSOR_RECTANGLE warnings. (#4775)
- Backends: SDL_Renderer: Added support for large meshes (64k+ vertices) with 16-bit indices,
  enabling 'ImGuiBackendFlags_RendererHasVtxOffset' in the backend. (#3926) [@rokups]
- Backends: SDL_Renderer: Fix for SDL 2.0.19+ RenderGeometryRaw() API signature change. (#4819) [@sridenour]
- Backends: OSX: Generally fix keyboard support. Keyboard arrays indexed using kVK_* codes, e.g.
  ImGui::IsKeyPressed(kVK_Space). Don't set mouse cursor shape unconditionally. Handle two fingers scroll
  cancel event. (#4759, #4253, #1873) [@stuartcarnie]
- Backends: OSX: Add Game Controller support (need linking GameController framework) (#4759) [@stuartcarnie]
- Backends: WebGPU: Passing explicit buffer sizes to wgpuRenderPassEncoderSetVertexBuffer() and
  wgpuRenderPassEncoderSetIndexBuffer() functions as validation layers appears to not do what the
  in-flux specs says. (#4766) [@meshula]


-----------------------------------------------------------------------
 VERSION 1.85 (Released 2021-10-12)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.85

This is the last release officially supporting C++03 and Visual Studio 2008/2010. (#4537)
We expect that the next release will require a subset of the C++11 language (VS 2012~, GCC 4.8.1, Clang 3.3).
We may use some C++11 language features but we will not use any C++ library headers.
If you are stuck on ancient compiler you may need to stay at this version onward.

Breaking Changes:

- Removed GetWindowContentRegionWidth() function. Kept inline redirection helper.
  Can use 'GetWindowContentRegionMax().x - GetWindowContentRegionMin().x' instead but it's not
  very useful in practice, and the only use of it in the demo was illfit.
  Using 'GetContentRegionAvail().x' is generally a better choice.

Other Changes:

- Debug: Stack Tool: Added "Stack Tool" available in "Demo->Tools->Stack Tool", "Metrics->Tools",
  or by calling the ShowStackToolWindow() function. The tool run queries on hovered id to display
  details about individual components that were hashed to create an ID. It helps understanding
  the ID stack system and debugging potential ID collisions. (#4631) [@ocornut, @rokups]
- Windows: Fixed background order of overlapping childs submitted sequentially. (#4493)
- IsWindowFocused: Added ImGuiFocusedFlags_NoPopupHierarchy flag allowing to exclude child popups
  from the tested windows when combined with _ChildWindows.
- IsWindowHovered: Added ImGuiHoveredFlags_NoPopupHierarchy flag allowing to exclude child popups
  from the tested windows when combined with _ChildWindows.
- InputTextMultiline: Fixed label size not being included into window contents rect unless
  the whole widget is clipped.
- InputText: Allow activating/cancelling/validating input with gamepad nav events. (#2321, #4552)
- InputText: Fixed selection rectangle appearing one frame late when selecting all.
- TextUnformatted: Accept null ranges including (NULL,NULL) without asserting, in order to conform
  to common idioms (e.g. passing .data(), .data() + .size() from a null string). (#3615)
- Disabled: Added assert guard for mismatching BeginDisabled()/EndDisabled() blocks. (#211)
- Nav: Fixed using SetKeyboardFocusHere() on non-visible/clipped items. It now works and will scroll
  toward the item. When called during a frame where the parent window is appearing, scrolling will
  aim to center the item in the window. When calling during a frame where the parent window is already
  visible, scrolling will aim to scroll as little as possible to make the item visible. We will later
  expose scroll functions and flags in public API to select those behaviors. (#343, #4079, #2352)
- Nav: Fixed using SetKeyboardFocusHere() from activating a different item on the next frame if
  submitted items have changed during that frame. (#432)
- Nav: Fixed toggling menu layer with Alt or exiting menu layer with Esc not moving mouse when
  the ImGuiConfigFlags_NavEnableSetMousePos config flag is set.
- Nav: Fixed a few widgets from not setting reference keyboard/gamepad navigation ID when
  activated with mouse. More specifically: BeginTabItem(), the scrolling arrows of BeginTabBar(),
  the arrow section of TreeNode(), the +/- buttons of InputInt()/InputFloat(), Selectable() with
  ImGuiSelectableFlags_SelectOnRelease. More generally: any direct use of ButtonBehavior() with
  the PressedOnClick/PressedOnDoubleClick/PressedOnRelease button policy.
- Nav: Fixed an issue with losing focus on docked windows when pressing Alt while keyboard navigation
  is disabled. (#4547, #4439) [@PathogenDavid]
- Nav: Fixed vertical scoring offset when wrapping on Y in a decorated window.
- Nav: Improve scrolling behavior when navigating to an item larger than view.
- TreePush(): removed unnecessary/inconsistent legacy behavior where passing a NULL value to
  the TreePush(const char*) and TreePush(const void*) functions would use an hard-coded replacement.
  The only situation where that change would make a meaningful difference is TreePush((const char*)NULL)
  (_explicitly_ casting a null pointer to const char*), which is unlikely and will now crash.
  You may replace it with anything else.
- ColorEdit4: Fixed not being able to change hue when saturation is 0. (#4014) [@rokups]
- ColorEdit4: Fixed hue resetting to 0 when it is set to 255. [@rokups]
- ColorEdit4: Fixed hue value jitter when source color is stored as RGB in 32-bit integer and perform
  RGB<>HSV round trips every frames. [@rokups]
- ColorPicker4: Fixed picker being unable to select exact 1.0f color when dragging toward the edges
  of the SV square (previously picked 0.999989986f). (#3517) [@rokups]
- Menus: Fixed vertical alignments of MenuItem() calls within a menu bar (broken in 1.84). (#4538)
- Menus: Improve closing logic when moving diagonally in empty between between parent and child menus to
  accommodate for varying font size and dpi.
- Menus: Fixed crash when navigating left inside a child window inside a sub-menu. (#4510).
- Menus: Fixed an assertion happening in some situations when closing nested menus (broken in 1.83). (#4640)
- Drag and Drop: Fixed using BeginDragDropSource() inside a BeginChild() that returned false. (#4515)
- PlotHistogram: Fixed zero-line position when manually specifying min<0 and max>0. (#4349) [@filippocrocchini]
- Misc: Added asserts for missing PopItemFlag() calls.
- Misc: Fixed printf-style format checks on Clang+MinGW. (#4626, #4183, #3592) [@guusw]
- IO: Added 'io.WantCaptureMouseUnlessPopupClose' alternative to `io.WantCaptureMouse'. (#4480)
  This allows apps to receive the click on void when that click is used to close popup (by default,
  clicking on a void when a popup is open will close the popup but not release io.WantCaptureMouse).
- Fonts: imgui_freetype: Fixed crash when FT_Render_Glyph() fails to render a glyph and returns NULL
  (which apparently happens with Freetype 2.11). (#4394, #4145?).
- Fonts: Fixed ImFontAtlas::ClearInputData() marking atlas as not built. (#4455, #3487)
- Backends: Added more implicit asserts to detect invalid/redundant calls to Shutdown functions. (#4562)
- Backends: OpenGL3: Fixed our custom GL loader conflicting with user using GL3W. (#4445) [@rokups]
- Backends: WebGPU: Fixed for latest specs. (#4472, #4512) [@Kangz, @bfierz]
- Backends: SDL_Renderer: Added SDL_Renderer backend compatible with upcoming SDL 2.0.18. (#3926) [@1bsyl]
- Backends: Metal: Fixed a crash when clipping rect larger than framebuffer is submitted via
  a direct unclipped PushClipRect() call. (#4464)
- Backends: OSX: Use mach_absolute_time as CFAbsoluteTimeGetCurrent can jump backwards. (#4557, #4563) [@lfnoise]
- Backends: All renderers: Normalize clipping rect handling across backends. (#4464)
- Examples: Added SDL + SDL_Renderer example in "examples/example_sdl_sdlrenderer/" folder. (#3926) [@1bsyl]


-----------------------------------------------------------------------
 VERSION 1.84.2 (Released 2021-08-23)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.84.2

- Disabled: Fixed nested BeginDisabled()/EndDisabled() calls. (#211, #4452, #4453, #4462) [@Legulysse]
- Backends: OpenGL3: OpenGL: Fixed ES 3.0 shader ("#version 300 es") to use normal precision
  floats. Avoid wobbly rendering at HD resolutions. (#4463) [@nicolasnoble]


-----------------------------------------------------------------------
 VERSION 1.84.1 (Released 2021-08-20)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.84.1

- Disabled: Fixed BeginDisabled(false) - BeginDisabled(true) was working. (#211, #4452, #4453)


-----------------------------------------------------------------------
 VERSION 1.84 (Released 2021-08-20)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.84

Breaking Changes:

- Commented out redirecting functions/enums names that were marked obsolete in 1.67 and 1.69 (March 2019):
  - ImGui::GetOverlayDrawList() -> use ImGui::GetForegroundDrawList()
  - ImFont::GlyphRangesBuilder  -> use ImFontGlyphRangesBuilder
- Backends: OpenGL3: added a third source file "imgui_impl_opengl3_loader.h". (#4445) [@rokups]
- Backends: GLFW: backend now uses glfwSetCursorEnterCallback(). (#3751, #4377, #2445)
- Backends: GLFW: backend now uses glfwSetWindowFocusCallback(). (#4388) [@thedmd]
  - If calling ImGui_ImplGlfw_InitXXX with install_callbacks=true: this is already done for you.
  - If calling ImGui_ImplGlfw_InitXXX with install_callbacks=false: you WILL NEED to register the GLFW callbacks
    and forward them to the backend:
    - Register glfwSetCursorEnterCallback, forward events to ImGui_ImplGlfw_CursorEnterCallback().
    - Register glfwSetWindowFocusCallback, forward events to ImGui_ImplGlfw_WindowFocusCallback().
- Backends: SDL2: removed unnecessary SDL_Window* parameter from ImGui_ImplSDL2_NewFrame(). (#3244) [@funchal]
  Kept inline redirection function (will obsolete).
- Backends: SDL2: backend needs to set 'SDL_SetHint(SDL_HINT_MOUSE_FOCUS_CLICKTHROUGH, "1")' in order to
  receive mouse clicks events on window focus, otherwise SDL doesn't emit the event. (#3751, #4377, #2445)
  This is unfortunately a global SDL setting, so enabling it _might_ have a side-effect on your application.
  It is unlikely to make a difference, but if your app absolutely needs to ignore the initial on-focus click:
  you can ignore SDL_MOUSEBUTTONDOWN events coming right after a SDL_WINDOWEVENT_FOCUS_GAINED event).
- Internals: (for custom widgets): because disabled items now sets HoveredId, if you want custom widgets to
  not react as hovered when disabled, in the majority of use cases it is preferable to check the "hovered"
  return value of ButtonBehavior() rather than (HoveredId == id).

Other Changes:

- IO: Added io.AddFocusEvent() api for backend to tell when host window has gained/lost focus. (#4388) [@thedmd]
  If you use a custom backend, consider adding support for this!
- Disabled: added BeginDisabled()/EndDisabled() api to create a scope where interactions are disabled. (#211)
  - Added style.DisabledAlpha (default to 0.60f) and ImGuiStyleVar_DisabledAlpha. (#211)
  - Unlike the internal-and-undocumented-but-somehow-known PushItemFlag(ImGuiItemFlags_Disabled), this also alters
    visuals. Currently this is done by lowering alpha of all widgets. Future styling system may do that differently.
  - Disabled items set HoveredId, allowing e.g. HoveredIdTimer to run. (#211, #3419) [@rokups]
  - Disabled items more consistently release ActiveId if the active item got disabled. (#211)
  - Nav: Fixed disabled items from being candidate for default focus. (#211, #787)
  - Fixed Selectable() selection not showing when disabled. (#211)
  - Fixed IsItemHovered() returning true on disabled item when navigated to. (#211)
  - Fixed IsItemHovered() when popping disabled state after item, or when using Selectable_Disabled. (#211)
- Windows: ImGuiWindowFlags_UnsavedDocument/ImGuiTabItemFlags_UnsavedDocument displays a dot instead of a '*' so it
  is independent from font style. When in a tab, the dot is displayed at the same position as the close button.
  Added extra comments to clarify the purpose of this flag in the context of docked windows.
- Tables: Added ImGuiTableColumnFlags_Disabled acting a master disable over (hidden from user/context menu). (#3935)
- Tables: Clarified that TableSetColumnEnabled() requires the table to use the ImGuiTableFlags_Hideable flag,
  because it manipulates the user-accessible show/hide state. (#3935)
- Tables: Added ImGuiTableColumnFlags_NoHeaderLabel to request TableHeadersRow() to not submit label for a column.
  Convenient for some small columns. Name will still appear in context menu. (#4206).
- Tables: Fixed columns order on TableSetupScrollFreeze() if previous data got frozen columns out of their section.
- Tables: Fixed invalid data in TableGetSortSpecs() when SpecsDirty flag is unset. (#4233)
- Tabs: Fixed using more than 32 KB-worth of tab names. (#4176)
- InputInt/InputFloat: When used with Steps values and _ReadOnly flag, the step button look disabled. (#211)
- InputText: Fixed named filtering flags disabling newline or tabs in multiline inputs (#4409, #4410) [@kfsone]
- Drag and Drop: drop target highlight doesn't try to bypass host clipping rectangle. (#4281, #3272)
- Drag and Drop: Fixed using AcceptDragDropPayload() with ImGuiDragDropFlags_AcceptNoPreviewTooltip. [@JeffM2501]
- Menus: MenuItem() and BeginMenu() are not affected/overlapping when style.SelectableTextAlign is altered.
- Menus: Fixed hovering a disabled menu or menu item not closing other menus. (#211)
- Popups: Fixed BeginPopup/OpenPopup sequence failing when there are no focused windows. (#4308) [@rokups]
- Nav: Alt doesn't toggle menu layer if other modifiers are held. (#4439)
- Fixed printf-style format checks on non-MinGW flavors. (#4183, #3592)
- Fonts: Functions with a 'float size_pixels' parameter can accept zero if it is set in ImFontSize::SizePixels.
- Fonts: Prefer using U+FFFD character for fallback instead of '?', if available. (#4269)
- Fonts: Use U+FF0E dot character to construct an ellipsis if U+002E '.' is not available. (#4269)
- Fonts: Added U+FFFD ("replacement character") to default asian glyphs ranges. (#4269)
- Fonts: Fixed calling ClearTexData() (clearing CPU side font data) triggering an assert in NewFrame(). (#3487)
- DrawList: Fixed AddCircle/AddCircleFilled() with auto-tesselation not using accelerated paths for small circles.
  Fixed AddCircle/AddCircleFilled() with 12 segments which had a broken edge. (#4419, #4421) [@thedmd]
- Demo: Fixed requirement in 1.83 to link with imgui_demo.cpp if IMGUI_DISABLE_METRICS_WINDOW is not set. (#4171)
  Normally the right way to disable compiling the demo is to set IMGUI_DISABLE_DEMO_WINDOWS, but we want to avoid
  implying that the file is required.
- Metrics: Fixed a crash when inspecting the individual draw command of a foreground drawlist. [@rokups]
- Backends: Reorganized most backends (Win32, SDL, GLFW, OpenGL2/3, DX9/10/11/12, Vulkan, Allegro) to pull their
  data from a single structure stored inside the main Dear ImGui context. This facilitate/allow usage of standard
  backends with multiple-contexts BUT is only partially tested and not well supported. It is generally advised to
  instead use the multi-viewports feature of docking branch where a single Dear ImGui context can be used across
  multiple windows. (#586, #1851, #2004, #3012, #3934, #4141)
- Backends: Win32: Rework to handle certain Windows 8.1/10 features without a manifest. (#4200, #4191)
  - ImGui_ImplWin32_GetDpiScaleForMonitor() will handle per-monitor DPI on Windows 10 without a manifest.
  - ImGui_ImplWin32_EnableDpiAwareness() will call SetProcessDpiAwareness() fallback on Windows 8.1 without a manifest.
- Backends: Win32: IME functions are disabled by default for non-Visual Studio compilers (MinGW etc.). Enable with
  '#define IMGUI_ENABLE_WIN32_DEFAULT_IME_FUNCTIONS' for those compilers. Undo change from 1.82. (#2590, #738, #4185, #4301)
- Backends: Win32: Mouse position is correctly reported when the host window is hovered but not focused. (#2445, #2696, #3751, #4377)
- Backends: Win32, SDL2, GLFW, OSX, Allegro: now calling io.AddFocusEvent() on focus gain/loss. (#4388) [@thedmd]
  This allow us to ignore certain inputs on focus loss (previously relied on mouse loss but backends are now
  reporting mouse even when host window is unfocused, as per #2445, #2696, #3751, #4377)
- Backends: Fixed keyboard modifiers being reported when host window doesn't have focus. (#2622)
- Backends: GLFW: Mouse position is correctly reported when the host window is hovered but not focused. (#3751, #4377, #2445)
  (backend now uses glfwSetCursorEnterCallback(). If you called ImGui_ImplGlfw_InitXXX with install_callbacks=false, you will
  need to install this callback and forward the data to the backend via ImGui_ImplGlfw_CursorEnterCallback).
- Backends: SDL2: Mouse position is correctly reported when the host window is hovered but not focused. (#3751, #4377, #2445)
  (enabled with SDL 2.0.5+ as SDL_GetMouseFocus() is only usable with SDL_HINT_MOUSE_FOCUS_CLICKTHROUGH).
- Backends: DX9: Explicitly disable texture state stages after >= 1. (#4268) [@NZJenkins]
- Backends: DX12: Fix texture casting crash on 32-bit systems (introduced on 2021/05/19 and v1.83) + added comments
  about building on 32-bit systems. (#4225) [@kingofthebongo2008]
- Backends: OpenGL3: Embed our own minimal GL headers/loader (imgui_impl_opengl3_loader.h) based on gl3w.
  Reduces the frequent issues and confusion coming from having to support multiple loaders and requiring users to use and
  initialize the same loader as the backend. (#4445) [@rokups]
  Removed support for gl3w, glew, glad, glad2, glbinding2, glbinding3 (all now unnecessary).
- Backends: OpenGL3: Handle GL_CLIP_ORIGIN on <4.5 contexts if "GL_ARB_clip_control" extension is detected. (#4170, #3998)
- Backends: OpenGL3: Destroy vertex/fragment shader objects right after they are linked into main shader. (#4244) [@Crowbarous]
- Backends: OpenGL3: Use OES_vertex_array extension on Emscripten + backup/restore current state. (#4266, #4267) [@harry75369]
- Backends: GLFW: Installing and exposed ImGui_ImplGlfw_MonitorCallback() for forward compatibility with docking branch.
- Backends: OSX: Added a fix for shortcuts using CTRL key instead of CMD key. (#4253) [@rokups]
- Examples: DX12: Fixed handling of Alt+Enter in example app (using swapchain's ResizeBuffers). (#4346) [@PathogenDavid]
- Examples: DX12: Removed unnecessary recreation of backend-owned device objects when window is resized. (#4347) [@PathogenDavid]
- Examples: OpenGL3+GLFW,SDL: Remove include cruft to support variety of GL loaders (no longer necessary). [@rokups]
- Examples: OSX+OpenGL2: Fix event forwarding (fix key remaining stuck when using shortcuts with Cmd/Super key).
  Other OSX examples were not affected. (#4253, #1873) [@rokups]
- Examples: Updated all .vcxproj to VS2015 (toolset v140) to facilitate usage with vcpkg.
- Examples: SDL2: Accommodate  for vcpkg install having headers in SDL2/SDL.h vs SDL.h.


-----------------------------------------------------------------------
 VERSION 1.83 (Released 2021-05-24)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.83

Breaking Changes:

- Backends: Obsoleted direct access to ImDrawCmd::TextureId in favor of calling ImDrawCmd::GetTexID(). (#3761) [@thedmd]
  - If you are using official backends from the source tree: you have nothing to do.
  - If you copied old backend code or using your own: change access to draw_cmd->TextureId to draw_cmd->GetTexID().
  Why are we doing this?
  - This change will be required in the future when adding support for incremental texture atlas updates.
  - Please note this won't break soon, but we are making the change ahead of time.

Other Changes:

- Scrolling: Fix scroll tracking with e.g. SetScrollHereX/Y() when WindowPadding < ItemSpacing.
- Scrolling: Fix scroll snapping on edge of scroll region when both scrollbars are enabled.
- Scrolling: Fix mouse wheel axis swap when using SHIFT on macOS (system already does it). (#4010)
- Window: Fix IsWindowAppearing() from returning true twice in most cases. (#3982, #1497, #1061)
- Nav: Fixed toggling menu layer while an InputText() is active not stealing active id. (#787)
- Nav: Fixed pressing Escape to leave menu layer while in a popup or child window. (#787)
- Nav, InputText: Fixed accidental menu toggling while typing non-ascii characters using AltGR. [@rokups] (#370)
- Nav: Fixed using SetItemDefaultFocus() on windows with _NavFlattened flag. (#787)
- Nav: Fixed Tabbing initial activation from skipping the first item if it is tabbable through. (#787)
- Nav: Fixed fast CTRL+Tab (where keys are only held for one single frame) from properly enabling the
  menu layer of target window if it doesn't have other active layers.
- Tables: Expose TableSetColumnEnabled() in public api. (#3935)
- Tables: Better preserve widths when columns count changes. (#4046)
- Tables: Sharing more memory buffers between tables, reducing general memory footprints. (#3740)
- Tabs: Fixed mouse reordering with very fast movements (e.g. crossing multiple tabs in a single
  frame and then immediately standing still (would only affect automation/bots). [@rokups]
- Menus: made MenuItem() in a menu bar reflect the 'selected' argument with a highlight. (#4128) [@mattelegende]
- Drags, Sliders, Inputs: Specifying a NULL format to Float functions default them to "%.3f" to be
  consistent with the compile-time default. (#3922)
- DragScalar: Add default value for v_speed argument to match higher-level functions. (#3922) [@eliasdaler]
- ColorEdit4: Alpha default to 255 (instead of 0) when omitted in hex input. (#3973) [@squadack]
- InputText: Fix handling of paste failure (buffer full) which in some cases could corrupt the undo stack. (#4038)
  (fix submitted to https://github.com/nothings/stb/pull/1158) [@Unit2Ed, @ocornut]
- InputText: Do not filter private unicode codepoints (e.g. icons) when pasted from clipboard. (#4005) [@dougbinks]
- InputText: Align caret/cursor to pixel coordinates. (#4080) [@elvissteinjr]
- InputText: Fixed CTRL+Arrow or OSX double-click leaking the presence of spaces when ImGuiInputTextFlags_Password
  is used. (#4155, #4156) [@michael-swan]
- LabelText: Fixed clipping of multi-line value text when label is single-line. (#4004)
- LabelText: Fixed vertical alignment of single-line value text when label is multi-line. (#4004)
- Combos: Changed the combo popup to use a different id to also using a context menu with the default item id.
  Fixed using BeginPopupContextItem() with no parameter after a combo. (#4167)
- Popups: Added 'OpenPopup(ImGuiID id)' overload to facilitate calling from nested stacks. (#3993, #331) [@zlash]
- Tweak computation of io.Framerate so it is less biased toward high-values in the first 120 frames. (#4138)
- Optimization: Disabling some of MSVC most aggressive Debug runtime checks for some simple/low-level functions
  (e.g. ImVec2, ImVector) leading to a 10-20% increase of performances with MSVC "default" Debug settings.
- ImDrawList: Add and use SSE-enabled ImRsqrt() in place of 1.0f / ImSqrt(). (#4091) [@wolfpld]
- ImDrawList: Fixed/improved thickness of thick strokes with sharp angles. (#4053, #3366, #2964, #2868, #2518, #2183)
  Effectively introduced a regression in 1.67 (Jan 2019), and a fix in 1.70 (Apr 2019) but the fix wasn't actually on
  par with original version. Now incorporating the correct revert.
- ImDrawList: Fixed PathArcTo() regression from 1.82 preventing use of counter-clockwise angles. (#4030, #3491) [@thedmd]
- Demo: Improved popups demo and comments.
- Metrics: Added "Fonts" section with same information as available in "Style Editor">"Fonts".
- Backends: SDL2: Rework global mouse pos availability check listing supported platforms explicitly,
  effectively fixing mouse access on Raspberry Pi. (#2837, #3950) [@lethal-guitar, @hinxx]
- Backends: Win32: Clearing keyboard down array when losing focus (WM_KILLFOCUS). (#2062, #3532, #3961)
  [@1025798851]
- Backends: OSX: Fix keys remaining stuck when CMD-tabbing to a different application. (#3832) [@rokups]
- Backends: DirectX9: calling IDirect3DStateBlock9::Capture() after CreateStateBlock() which appears to
  workaround/fix state restoring issues. Unknown exactly why so, bit of a cargo-cult fix. (#3857)
- Backends: DirectX9: explicitly setting up more graphics states to increase compatibility with unusual
  non-default states. (#4063)
- Backends: DirectX10, DirectX11: fixed a crash when backing/restoring state if nothing is bound when
  entering the rendering function. (#4045) [@Nemirtingas]
- Backends: GLFW: Adding bound check in KeyCallback because GLFW appears to send -1 on some setups. [#4124]
- Backends: Vulkan: Fix mapped memory Vulkan validation error when buffer sizes are not multiple of
  VkPhysicalDeviceLimits::nonCoherentAtomSize. (#3957) [@AgentX1994]
- Backends: WebGPU: Update to latest specs (Chrome Canary 92 and Emscripten 2.0.20). (#4116, #3632) [@bfierz, @Kangz]
- Backends: OpenGL3: Don't try to read GL_CLIP_ORIGIN unless we're OpenGL 4.5. (#3998, #2366, #2186) [@s7jones]
- Examples: OpenGL: Add OpenGL ES 2.0 support to modern GL examples. (#2837, #3951) [@lethal-guitar, @hinxx]
- Examples: Vulkan: Rebuild swapchain on VK_SUBOPTIMAL_KHR. (#3881)
- Examples: Vulkan: Prefer using discrete GPU if there are more than one available. (#4012) [@rokups]
- Examples: SDL2: Link with shell32.lib required by SDL2main.lib since SDL 2.0.12. [#3988]
- Examples: Android: Make Android example build compatible with Gradle 7.0. (#3446)
- Docs: Improvements to description of using colored glyphs/emojis. (#4169, #3369)
- Docs: Improvements to minor mistakes in documentation comments (#3923) [@ANF-Studios]


-----------------------------------------------------------------------
 VERSION 1.82 (Released 2021-02-15)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.82

Breaking Changes:

- Removed redirecting functions/enums names that were marked obsolete in 1.66 (September 2018):
    - ImGui::SetScrollHere() --> use ImGui::SetScrollHereY()
- ImDrawList: upgraded AddPolyline()/PathStroke()'s "bool closed" parameter to use "ImDrawFlags flags".
    - bool closed = false    --> use ImDrawFlags_None, or 0
    - bool closed = true     --> use ImDrawFlags_Closed
  The matching ImDrawFlags_Closed value is guaranteed to always stay == 1 in the future.
  Difference may not be noticeable for most but zealous type-checking tools may report a need to change.
- ImDrawList: upgraded AddRect(), AddRectFilled(), PathRect() to use ImDrawFlags instead of ImDrawCornersFlags.
    - ImDrawCornerFlags_TopLeft  --> use ImDrawFlags_RoundCornersTopLeft
    - ImDrawCornerFlags_BotRight --> use ImDrawFlags_RoundCornersBottomRight
    - ImDrawCornerFlags_None     --> use ImDrawFlags_RoundCornersNone etc.
  Flags now sanely defaults to 0 instead of 0x0F, consistent with all other flags in the API.
  IMPORTANT: The default with rounding > 0.0f is now "round all corners" vs old implicit "round no corners":
    - rounding == 0.0f + flags == 0 --> meant no rounding  --> unchanged (common use)
    - rounding  > 0.0f + flags != 0 --> meant rounding     --> unchanged (common use)
    - rounding == 0.0f + flags != 0 --> meant no rounding  --> unchanged (unlikely use)
    - rounding  > 0.0f + flags == 0 --> meant no rounding  --> BREAKING (unlikely use)!
       - this ONLY matters for hardcoded use of 0 with rounding > 0.0f.
       - fix by using named ImDrawFlags_RoundCornersNone or rounding == 0.0f!
       - this is technically the only real breaking change which we can't solve automatically (it's also uncommon).
  The old ImDrawCornersFlags used awkward default values of ~0 or 0xF (4 lower bits set) to signify "round all corners"
  and we sometimes encouraged using them as shortcuts. As a result the legacy path still support use of hardcoded ~0
  or any value from 0x1 or 0xF. They will behave the same with legacy paths enabled (will assert otherwise).
  Courtesy of legacy untangling commity: [@rokups, @ocornut, @thedmd]
- ImDrawList: clarified that PathArcTo()/PathArcToFast() won't render with radius < 0.0f. Previously it sorts
  of accidentally worked but would lead to counter-clockwise paths which and have an effect on anti-aliasing.
- InputText: renamed ImGuiInputTextFlags_AlwaysInsertMode to ImGuiInputTextFlags_AlwaysOverwrite, old name was an
  incorrect description of behavior. Was ostly used by memory editor. Kept inline redirection function. (#2863)
- Moved 'misc/natvis/imgui.natvis' to 'misc/debuggers/imgui.natvis' as we will provide scripts for other debuggers.
- Style: renamed rarely used style.CircleSegmentMaxError (old default = 1.60f)
  to style.CircleTessellationMaxError (new default = 0.30f) as its meaning changed. (#3808) [@thedmd]
- Win32+MinGW: Re-enabled IME functions by default even under MinGW. In July 2016, issue #738 had me incorrectly
  disable those default functions for MinGW. MinGW users should: either link with -limm32, either set their
  imconfig file with '#define IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS'. (#2590, #738) [@actboy168]
  *EDIT* Undid in 1.84.
- Backends: Win32: Pragma linking with dwmapi.lib (Vista-era, ~9 kb). MinGW users will need to link with -ldwmapi.

Other Changes:

- Window, Nav: Fixed crash when calling SetWindowFocus(NULL) at the time a new window appears. (#3865) [@nem0]
- Window: Shrink close button hit-testing region when it covers an abnormally high portion of the window visible
  area (e.g. when window is collapsed + moved in a corner) to facilitate moving the window away. (#3825)
- Nav: Various fixes for losing gamepad/keyboard navigation reference point when a window reappears or
  when it appears while gamepad/keyboard are not being used. (#787)
- Drags: Fixed crash when using DragScalar() directly (not via common wrapper like DragFloat() etc.)
  with ImGuiSliderFlags_AlwaysClamp + only one of either p_min or p_max set. (#3824) [@harry75369]
- Drags, Sliders: Fixed a bug where editing value would use wrong number if there were digits right after
  format specifier (e.g. using "%f123" as a format string). [@rokups]
- Drags, Sliders: Fixed a bug where using custom formatting flags (',$,_) supported by stb_sprintf.h
  would cause incorrect value to be displayed. (#3604) [@rokups]
- Drags, Sliders: Support ImGuiSliderFlags_Logarithmic flag with integers. Because why not? (#3786)
- Tables: Fixed unaligned accesses when using TableSetBgColor(ImGuiTableBgTarget_CellBg). (#3872)
- IsItemHovered(): fixed return value false positive when used after EndChild(), EndGroup() or widgets using
  either of them, when the hovered location is located within a child window, e.g. InputTextMultiline().
  This is intended to have no side effects, but brace yourself for the possible comeback.. (#3851, #1370)
- Drag and Drop: can use BeginDragDropSource() for other than the left mouse button as long as the item
  has an ID (for ID-less items will add new functionalities later). (#1637, #3885)
- ImFontAtlas: Added 'bool TexPixelsUseColors' output to help backend decide of underlying texture format. (#3369)
  This can currently only ever be set by the Freetype renderer.
- imgui_freetype: Added ImGuiFreeTypeBuilderFlags_Bitmap flag to request Freetype loading bitmap data.
  This may have an effect on size and must be called with correct size values. (#3879) [@metarutaiga]
- ImDrawList: PathArcTo() now supports "int num_segments = 0" (new default) and adaptively tessellate.
  The adaptive tessellation uses look up tables, tends to be faster than old PathArcTo() while maintaining
  quality for large arcs (tessellation quality derived from "style.CircleTessellationMaxError") (#3491) [@thedmd]
- ImDrawList: PathArcToFast() also adaptively tessellate efficiently. This means that large rounded corners
  in e.g. hi-dpi settings will generally look better. (#3491) [@thedmd]
- ImDrawList: AddCircle, AddCircleFilled(): Tweaked default segment count calculation to honor MaxError
  with more accuracy. Made default segment count always even for better looking result. (#3808) [@thedmd]
- Misc: Added GetAllocatorFunctions() to facilitate sharing allocators across DLL boundaries. (#3836)
- Misc: Added 'debuggers/imgui.gdb' and 'debuggers/imgui.natstepfilter' (along with existing 'imgui.natvis')
  scripts to configure popular debuggers into skipping trivial functions when using StepInto. [@rokups]
- Backends: Android: Added native Android backend. (#3446) [@duddel]
- Backends: Win32: Added ImGui_ImplWin32_EnableAlphaCompositing() to facilitate experimenting with
  alpha compositing and transparent windows. (#2766, #3447 etc.).
- Backends: OpenGL, Vulkan, DX9, DX10, DX11, DX12, Metal, WebGPU, Allegro: Rework blending equation to
  preserve alpha in output buffer (using SrcBlendAlpha = ONE, DstBlendAlpha = ONE_MINUS_SRC_ALPHA consistently
  across all backends), facilitating compositing of the output buffer with another buffer.
  (#2693, #2764, #2766, #2873, #3447, #3813, #3816) [@ocornut, @thedmd, @ShawnM427, @Ubpa, @aiekick]
- Backends: DX9: Fix to support IMGUI_USE_BGRA_PACKED_COLOR. (#3844) [@Xiliusha]
- Backends: DX9: Fix to support colored glyphs, using newly introduced 'TexPixelsUseColors' info. (#3844)
- Examples: Android: Added Android + GL ES3 example. (#3446) [@duddel]
- Examples: Reworked setup of clear color to be compatible with transparent values.
- CI: Use a dedicated "scheduled" workflow to trigger scheduled builds. Forks may disable this workflow if
  scheduled builds builds are not required. [@rokups]
- Log/Capture: Added LogTextV, a va_list variant of LogText. [@PathogenDavid]


-----------------------------------------------------------------------
 VERSION 1.81 (Released 2021-02-10)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.81

Breaking Changes:

- ListBox helpers:
  - Renamed ListBoxHeader(const char* label, ImVec2 size) to BeginListBox().
  - Renamed ListBoxFooter() to EndListBox().
  - Removed ListBoxHeader(const char* label, int items_count, int height_in_items = -1) in favor of specifying size.
    In the redirection function, made vertical padding consistent regardless of (items_count <= height_in_items) or not.
  - Kept inline redirection function for all threes (will obsolete).
- imgui_freetype:
  - Removed ImGuiFreeType::BuildFontAtlas(). Kept inline redirection function.
    Prefer using '#define IMGUI_ENABLE_FREETYPE', but there's a runtime selection path available too.
  - The shared extra flags parameters (very rarely used) are now stored in ImFontAtlas::FontBuilderFlags.
  - Renamed ImFontConfig::RasterizerFlags (used by FreeType) to ImFontConfig::FontBuilderFlags.
  - Renamed ImGuiFreeType::XXX flags to ImGuiFreeTypeBuilderFlags_XXX for consistency with other API.

Other Changes:

- Viewports Added ImGui::GetMainViewport() as a way to get the bounds and work area of the host display. (#3789, #1542)
  - In 'master' branch or without multi-viewports feature enabled:
    - GetMainViewport()->Pos is always == (0,0)
    - GetMainViewport()->Size is always == io.DisplaySize
  - In 'docking' branch and with the multi-viewports feature enabled:
    - GetMainViewport() will return information from your host Platform Window.
    - In the future, we will support a "no main viewport" mode and this may return bounds of your main monitor.
  - For forward compatibility with multi-viewports/multi-monitors:
     - Code using (0,0) as a way to signify "upper-left of the host window" should use GetMainViewport()->Pos.
     - Code using io.DisplaySize as a way to signify "size of the host window" should use GetMainViewport()->Size.
  - We are also exposing a work area in ImGuiViewport ('WorkPos', 'WorkSize' vs 'Pos', 'Size' for full area):
     - For a Platform Window, the work area is generally the full area minus space used by menu-bars.
     - For a Platform Monitor, the work area is generally the full area minus space used by task-bars.
  - All of this has been the case in 'docking' branch for a long time. What we've done is merely merging
    a small chunk of the multi-viewport logic into 'master' to standardize some concepts ahead of time.
- Tables: Fixed PopItemWidth() or multi-components items not restoring per-colum ItemWidth correctly. (#3760)
- Window: Fixed minor title bar text clipping issue when FramePadding is small/zero and there are no
  close button in the window. (#3731)
- SliderInt: Fixed click/drag when v_min==v_max from setting the value to zero. (#3774) [@erwincoumans]
  Would also repro with DragFloat() when using ImGuiSliderFlags_Logarithmic with v_min==v_max.
- Menus: Fixed an issue with child-menu auto sizing (issue introduced in 1.80 on 2021/01/25) (#3779)
- InputText: Fixed slightly off ScrollX tracking, noticeable with large values of FramePadding.x. (#3781)
- InputText: Multiline: Fixed padding/cliprect not precisely matching single-line version. (#3781)
- InputText: Multiline: Fixed FramePadding.y worth of vertical offset when aiming with mouse.
- ListBox: Tweaked default height calculation.
- Fonts: imgui_freetype: Facilitated using FreeType integration: [@Xipiryon, @ocornut]
  - Use '#define IMGUI_ENABLE_FREETYPE' in imconfig.h should make it work with no other modifications
    other than compiling misc/freetype/imgui_freetype.cpp and linking with FreeType.
  - Use '#define IMGUI_ENABLE_STB_TRUETYPE' if you somehow need the stb_truetype rasterizer to be
    compiled in along with the FreeType one, otherwise it is enabled by default.
- Fonts: imgui_freetype: Added support for colored glyphs as supported by Freetype 2.10+ (for .ttf using CPAL/COLR
  tables only). Enable the ImGuiFreeTypeBuilderFlags_LoadColor on a given font. Atlas always output directly
  as RGBA8 in this situation. Likely to make sense with IMGUI_USE_WCHAR32. (#3369) [@pshurgal]
- Fonts: Fixed CalcTextSize() width rounding so it behaves more like a ceil. This is in order for text wrapping
  to have enough space when provided width precisely calculated with CalcTextSize().x. (#3776)
  Note that the rounding of either positions and widths are technically undesirable (e.g. #3437, #791) but
  variety of code is currently on it so we are first fixing current behavior before we'll eventually change it.
- Log/Capture: Fix various new line/spacing issue when logging widgets. [@Xipiryon, @ocornut]
- Log/Capture: Improved the ASCII look of various widgets, making large dumps more easily human readable.
- ImDrawList: Fixed AddCircle()/AddCircleFilled() with (rad > 0.0f && rad < 1.0f && num_segments == 0). (#3738)
  Would lead to a buffer read overflow.
- ImDrawList: Clarified PathArcTo() need for a_min <= a_max with an assert.
- ImDrawList: Fixed PathArcToFast() handling of a_min > a_max.
- Metrics: Back-ported "Viewports" debug visualizer from 'docking' branch.
- Demo: Added 'Examples->Fullscreen Window' demo using GetMainViewport() values. (#3789)
- Demo: 'Simple Overlay' demo now moves under main menu-bar (if any) using GetMainViewport()'s work area.
- Backends: Win32: Dynamically loading XInput DLL instead of linking with it, facilitate compiling with
  old WindowSDK versions or running on Windows 7. (#3646, #3645, #3248, #2716) [@Demonese]
- Backends: Vulkan: Add support for custom Vulkan function loader and VK_NO_PROTOTYPES. (#3759, #3227) [@Hossein-Noroozpour]
  User needs to call ImGui_ImplVulkan_LoadFunctions() with their custom loader prior to other functions.
- Backends: Metal: Fixed texture storage mode when building on Mac Catalyst. (#3748) [@Belinsky-L-V]
- Backends: OSX: Fixed mouse position not being reported when mouse buttons other than left one are down. (#3762) [@rokups]
- Backends: WebGPU: Added enderer backend for WebGPU support (imgui_impl_wgpu.cpp) (#3632) [@bfierz]
  Please note that WebGPU is currently experimental, will not run on non-beta browsers, and may break.
- Examples: WebGPU: Added Emscripten+WebGPU example. (#3632) [@bfierz]
- Backends: GLFW: Added ImGui_ImplGlfw_InitForOther() initialization call to use with non OpenGL API. (#3632)


-----------------------------------------------------------------------
 VERSION 1.80 (Released 2021-01-21)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.80

Breaking Changes:

- Added imgui_tables.cpp file! Manually constructed project files will need the new file added! (#3740)
- Backends: moved all backends files (imgui_impl_XXXX.cpp, imgui_impl_XXXX.h) from examples/ to backends/. (#3513)
- Renamed ImDrawList::AddBezierCurve() to ImDrawList::AddBezierCubic(). Kept inline redirection function (will obsolete).
- Renamed ImDrawList::PathBezierCurveTo() to ImDrawList::PathBezierCubicCurveTo(). Kept inline redirection function (will obsolete).
- Removed redirecting functions/enums names that were marked obsolete in 1.60 (April 2018):
  - io.RenderDrawListsFn pointer                -> use ImGui::GetDrawData() value and call the render function of your backend
  - ImGui::IsAnyWindowFocused()                 -> use ImGui::IsWindowFocused(ImGuiFocusedFlags_AnyWindow)
  - ImGui::IsAnyWindowHovered()                 -> use ImGui::IsWindowHovered(ImGuiHoveredFlags_AnyWindow)
  - ImGuiStyleVar_Count_                        -> use ImGuiStyleVar_COUNT
  - ImGuiMouseCursor_Count_                     -> use ImGuiMouseCursor_COUNT
- Removed redirecting functions/enums names that were marked obsolete in 1.61 (May 2018):
  - InputFloat (... int decimal_precision ...)  -> use InputFloat (... const char* format ...) with format = "%.Xf" where X was value for decimal_precision.
  - same for InputFloat2()/InputFloat3()/InputFloat4() variants taking a `int decimal_precision` parameter.
- Removed redirecting functions/enums names that were marked obsolete in 1.63 (August 2018):
  - ImGui::IsItemDeactivatedAfterChange()       -> use ImGui::IsItemDeactivatedAfterEdit().
  - ImGuiCol_ModalWindowDarkening               -> use ImGuiCol_ModalWindowDimBg
  - ImGuiInputTextCallback                      -> use ImGuiTextEditCallback
  - ImGuiInputTextCallbackData                  -> use ImGuiTextEditCallbackData
- If you were still using the old names, while you are cleaning up, considering enabling
  IMGUI_DISABLE_OBSOLETE_FUNCTIONS in imconfig.h even temporarily to have a pass at finding
  and removing up old API calls, if any remaining.
- Internals: Columns: renamed undocumented/internals ImGuiColumnsFlags_* to ImGuiOldColumnFlags_* to reduce
  confusion with Tables API. Keep redirection enums (will obsolete). (#125, #513, #913, #1204, #1444, #2142, #2707)
- Renamed io.ConfigWindowsMemoryCompactTimer to io.ConfigMemoryCompactTimer as the feature now applies
  to other data structures. (#2636)

Other Changes:

- Tables: added new Tables Beta API as a replacement for old Columns. (#3740, #2957, #125)
  Check out 'Demo->Tables' for many demos.
  Read API comments in imgui.h for details. Read extra commentary in imgui_tables.cpp.
  - Added 16 functions:
     - BeginTable(), EndTable()
     - TableNextRow(), TableNextColumn(), TableSetColumnIndex()
     - TableSetupColumn(), TableSetupScrollFreeze()
     - TableHeadersRow(), TableHeader()
     - TableGetRowIndex(), TableGetColumnCount(), TableGetColumnIndex(), TableGetColumnName(), TableGetColumnFlags()
     - TableGetSortSpecs(), TableSetBgColor()
  - Added 3 flags sets:
    - ImGuiTableFlags (29 flags for: features, decorations, sizing policies, padding, clipping, scrolling, sorting etc.)
    - ImGuiTableColumnFlags (24 flags for: width policies, default settings, sorting options, indentation options etc.)
    - ImGuiTableRowFlags (1 flag for: header row)
  - Added 2 structures: ImGuiTableSortSpecs, ImGuiTableColumnSortSpecs
  - Added 2 enums: ImGuiSortDirection, ImGuiTableBgTarget
  - Added 1 style variable: ImGuiStyleVar_CellPadding
  - Added 5 style colors: ImGuiCol_TableHeaderBg, ImGuiCol_TableBorderStrong, ImGuiCol_TableBorderLight, ImGuiCol_TableRowBg, ImGuiCol_TableRowBgAlt.
- Tabs: Made it possible to append to an existing tab bar by calling BeginTabBar()/EndTabBar() again.
- Tabs: Fixed using more than 128 tabs in a tab bar (scrolling policy recommended).
- Tabs: Do not display a tooltip if the name already fits over a given tab. (#3521)
- Tabs: Fixed minor/unlikely bug skipping over a button when scrolling left with arrows.
- Tabs: Requested ideal content size (for auto-fit) doesn't affect horizontal scrolling. (#3414)
- Drag and Drop: Fix losing drop source ActiveID (and often source tooltip) when opening a TreeNode()
  or CollapsingHeader() while dragging. (#1738)
- Drag and Drop: Fix drag and drop to tie same-size drop targets by chosen the later one. Fixes dragging
  into a full-window-sized dockspace inside a zero-padded window. (#3519, #2717) [@Black-Cat]
- Checkbox: Added CheckboxFlags() helper with int* type (internals have a template version, not exposed).
- Clipper: Fixed incorrect end-list positioning when using ImGuiListClipper with 1 item (bug in 1.79). (#3663) [@nyorain]
- InputText: Fixed updating cursor/selection position when a callback altered the buffer in a way
  where the byte count is unchanged but the decoded character count changes. (#3587) [@gqw]
- InputText: Fixed switching from single to multi-line while preserving same ID.
- Combo: Fixed using IsItemEdited() after Combo() not matching the return value from Combo(). (#2034)
- DragFloat, DragInt: very slightly increased mouse drag threshold + expressing it as a factor of default value.
- DragFloat, DragInt: added experimental io.ConfigDragClickToInputText feature to enable turning DragXXX widgets
  into text input with a simple mouse click-release (without moving). (#3737)
- Nav: Fixed IsItemFocused() from returning false when Nav highlight is hidden because mouse has moved.
  It's essentially been always the case but it doesn't make much sense. Instead we will aim at exposing
  feedback and control of keyboard/gamepad navigation highlight and mouse hover disable flag. (#787, #2048)
- Metrics: Fixed mishandling of ImDrawCmd::VtxOffset in wireframe mesh renderer.
- Metrics: Rebranded as "Dear ImGui Metrics/Debugger" to clarify its purpose.
- ImDrawList: Added ImDrawList::AddQuadBezierCurve(), ImDrawList::PathQuadBezierCurveTo() quadratic bezier
  helpers. (#3127, #3664, #3665) [@aiekick]
- Fonts: Updated GetGlyphRangesJapanese() to include a larger 2999 ideograms selection of Joyo/Jinmeiyo
  kanjis, from the previous 1946 ideograms selection. This will consume a some more memory but be generally
  much more fitting for Japanese display, until we switch to a more dynamic atlas. (#3627) [@vaiorabbit]
- Log/Capture: fix capture to work on clipped child windows.
- Misc: Made the ItemFlags stack shared, so effectively the ButtonRepeat/AllowKeyboardFocus states
  (and others exposed in internals such as PushItemFlag) are inherited by stacked Begin/End pairs,
  vs previously a non-child stacked Begin() would reset those flags back to zero for the stacked window.
- Misc: Replaced UTF-8 decoder with one based on branchless one by Christopher Wellons. [@rokups]
  Super minor fix handling incomplete UTF-8 contents: if input does not contain enough bytes, decoder
  returns IM_UNICODE_CODEPOINT_INVALID and consume remaining bytes (vs old decoded consumed only 1 byte).
- Misc: Fix format warnings when using gnu printf extensions in a setup that supports them (gcc/mingw). (#3592)
- Misc: Made EndFrame() assertion for key modifiers being unchanged during the frame (added in 1.76) more
  lenient, allowing full mid-frame releases. This is to accommodate the use of mid-frame modal native
  windows calls, which leads backends such as GLFW to send key clearing events on focus loss. (#3575)
- Style: Changed default style.WindowRounding value to 0.0f (matches default for multi-viewports).
- Style: Reduced the size of the resizing grip, made alpha less prominent.
- Style: Classic: Increase the default alpha value of WindowBg to be closer to other styles.
- Demo: Clarify usage of right-aligned items in Demo>Layout>Widgets Width.
- Backends: OpenGL3: Use glGetString(GL_VERSION) query instead of glGetIntegerv(GL_MAJOR_VERSION, ...)
  when the later returns zero (e.g. Desktop GL 2.x). (#3530) [@xndcn]
- Backends: OpenGL2: Backup and restore GL_SHADE_MODEL and disable GL_NORMAL_ARRAY state to increase
  compatibility with legacy code. (#3671)
- Backends: OpenGL3: Backup and restore GL_PRIMITIVE_RESTART state. (#3544) [@Xipiryon]
- Backends: OpenGL2, OpenGL3: Backup and restore GL_STENCIL_TEST enable state. (#3668)
- Backends: Vulkan: Added support for specifying which sub-pass to reference during VkPipeline creation. (@3579) [@bdero]
- Backends: DX12: Improve Windows 7 compatibility (for D3D12On7) by loading d3d12.dll dynamically. (#3696) [@Mattiwatti]
- Backends: Win32: Fix setting of io.DisplaySize to invalid/uninitialized data after hwnd has been closed.
- Backends: OSX: Fix keypad-enter key not working on MacOS. (#3554) [@rokups, @lfnoise]
- Examples: Apple+Metal: Consolidated/simplified to get closer to other examples. (#3543) [@warrenm]
- Examples: Apple+Metal: Forward events down so OS key combination like Cmd+Q can work. (#3554) [@rokups]
- Examples: Emscripten: Renamed example_emscripten/ to example_emscripten_opengl3/. (#3632)
- Examples: Emscripten: Added 'make serve' helper to spawn a web-server on localhost. (#3705) [@Horki]
- Examples: DirectX12: Move ImGui::Render() call above the first barrier to clarify its lack of effect on the graphics pipe.
- CI: Fix testing for Windows DLL builds. (#3603, #3601) [@iboB]
- Docs: Improved the wiki and added a https://github.com/ocornut/imgui/wiki/Useful-Widgets page. [@Xipiryon]
  [2021/05/20: moved to https://github.com/ocornut/imgui/wiki/Useful-Extensions]
- Docs: Split examples/README.txt into docs/BACKENDS.md and docs/EXAMPLES.md, and improved them.
- Docs: Consistently renamed all occurrences of "binding" and "back-end" to "backend" in comments and docs.


-----------------------------------------------------------------------
 VERSION 1.79 (Released 2020-10-08)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.79

Breaking Changes:

- Fonts: Removed ImFont::DisplayOffset in favor of ImFontConfig::GlyphOffset. DisplayOffset was applied
  after scaling and not very meaningful/useful outside of being needed by the default ProggyClean font.
  It was also getting in the way of better font scaling, so let's get rid of it now!
  If you used DisplayOffset it was probably in association to rasterizing a font at a specific size,
  in which case the corresponding offset may be reported into GlyphOffset. (#1619)
  If you scaled this value after calling AddFontDefault(), this is now done automatically.
- ImGuiListClipper: Renamed constructor parameters which created an ambiguous alternative to using
  the ImGuiListClipper::Begin() function, with misleading edge cases. Always use ImGuiListClipper::Begin()!
  Kept inline redirection function (will obsolete).
  (note: imgui_memory_editor <0.40 from imgui_club/ used this old clipper API. Update your copy if needed).
- Style: Renamed style.TabMinWidthForUnselectedCloseButton to style.TabMinWidthForCloseButton.
- Renamed ImGuiSliderFlags_ClampOnInput to ImGuiSliderFlags_AlwaysClamp. Kept redirection enum (will obsolete).
- Renamed OpenPopupContextItem() back to OpenPopupOnItemClick(), REVERTED CHANGE FROM 1.77.
  For variety of reason this is more self-explanatory and less error-prone. Kept inline redirection function.
- Removed return value from OpenPopupOnItemClick() - returned true on mouse release on an item - because it
  is inconsistent with other popups API and makes others misleading. It's also and unnecessary: you can
  use IsWindowAppearing() after BeginPopup() for a similar result.

Other Changes:

- Window: Fixed using non-zero pivot in SetNextWindowPos() when the window is collapsed. (#3433)
- Nav: Fixed navigation resuming on first visible item when using gamepad. [@rokups]
- Nav: Fixed using Alt to toggle the Menu layer when inside a Modal window. (#787)
- Scrolling: Fixed SetScrollHere(0) functions edge snapping when called during a frame where
  ContentSize is changing (issue introduced in 1.78). (#3452).
- InputText: Added support for Page Up/Down in InputTextMultiline(). (#3430) [@Xipiryon]
- InputText: Added selection helpers in ImGuiInputTextCallbackData().
- InputText: Added ImGuiInputTextFlags_CallbackEdit to modify internally owned buffer after an edit.
  (note that InputText() already returns true on edit, the callback is useful mainly to manipulate the
  underlying buffer while focus is active).
- InputText: Fixed using ImGuiInputTextFlags_Password with InputTextMultiline(). (#3427, #3428)
  It is a rather unusual or useless combination of features but no reason it shouldn't work!
- InputText: Fixed minor scrolling glitch when erasing trailing lines in InputTextMultiline().
- InputText: Fixed cursor being partially covered after using Ctrl+End key.
- InputText: Fixed callback's helper DeleteChars() function when cursor is inside the deleted block. (#3454)
- InputText: Made pressing Down arrow on the last line when it doesn't have a carriage return not move to
  the end of the line (so it is consistent with Up arrow, and behave same as Notepad and Visual Studio.
  Note that some other text editors instead would move the cursor to the end of the line). [@Xipiryon]
- DragFloat, DragScalar: Fixed ImGuiSliderFlags_ClampOnInput not being honored in the special case
  where v_min == v_max. (#3361)
- SliderInt, SliderScalar: Fixed reaching of maximum value with inverted integer min/max ranges, both
  with signed and unsigned types. Added reverse Sliders to Demo. (#3432, #3449) [@rokups]
- Text: Bypass unnecessary formatting when using the TextColored()/TextWrapped()/TextDisabled() helpers
  with a "%s" format string. (#3466)
- CheckboxFlags: Display mixed-value/tristate marker when passed flags that have multiple bits set and
  stored value matches neither zero neither the full set.
- BeginMenuBar: Fixed minor bug where CursorPosMax gets pushed to CursorPos prior to calling BeginMenuBar(),
  so e.g. calling the function at the end of a window would often add +ItemSpacing.y to scrolling range.
- TreeNode, CollapsingHeader: Made clicking on arrow toggle toggle the open state on the Mouse Down event
  rather than the Mouse Down+Up sequence, even if the _OpenOnArrow flag isn't set. This is standard behavior
  and amends the change done in 1.76 which only affected cases were _OpenOnArrow flag was set.
  (This is also necessary to support full multi/range-select/drag and drop operations.)
- Tabs: Added TabItemButton() to submit tab that behave like a button. (#3291) [@Xipiryon]
- Tabs: Added ImGuiTabItemFlags_Leading and ImGuiTabItemFlags_Trailing flags to position tabs or button
  at either end of the tab bar. Those tabs won't be part of the scrolling region, and when reordering cannot
  be moving outside of their section. Most often used with TabItemButton(). (#3291) [@Xipiryon]
- Tabs: Added ImGuiTabItemFlags_NoReorder flag to disable reordering a given tab.
- Tabs: Keep tab item close button visible while dragging a tab (independent of hovering state).
- Tabs: Fixed a small bug where closing a tab that is not selected would leave a tab hole for a frame.
- Tabs: Fixed a small bug where scrolling buttons (with ImGuiTabBarFlags_FittingPolicyScroll) would
  generate an unnecessary extra draw call.
- Tabs: Fixed a small bug where toggling a tab bar from Reorderable to not Reorderable would leave
  tabs reordered in the tab list popup. [@Xipiryon]
- Columns: Fix inverted ClipRect being passed to renderer when using certain primitives inside of
  a fully clipped column. (#3475) [@szreder]
- Popups, Tooltips: Fix edge cases issues with positioning popups and tooltips when they are larger than
  viewport on either or both axises. [@Rokups]
- Fonts: AddFontDefault() adjust its vertical offset based on floor(size/13) instead of always +1.
  Was previously done by altering DisplayOffset.y but wouldn't work for DPI scaled font.
- Metrics: Various tweaks, listing windows front-to-back, greying inactive items when possible.
- Demo: Add simple InputText() callbacks demo (aside from the more elaborate ones in 'Examples->Console').
- Backends: OpenGL3: Fix to avoid compiling/calling glBindSampler() on ES or pre 3.3 contexts which have
  the defines set by a loader. (#3467, #1985) [@jjwebb]
- Backends: Vulkan: Some internal refactor aimed at allowing multi-viewport feature to create their
  own render pass. (#3455, #3459) [@FunMiles]
- Backends: DX12: Clarified that imgui_impl_dx12 can be compiled on 32-bit systems by redefining
  the ImTextureID to be 64-bit (e.g. '#define ImTextureID ImU64' in imconfig.h). (#301)
- Backends: DX12: Fix debug layer warning when scissor rect is zero-sized. (#3472, #3462) [@StoneWolf]
- Examples: Vulkan: Reworked buffer resize handling, fix for Linux/X11. (#3390, #2626) [@RoryO]
- Examples: Vulkan: Switch validation layer to use "VK_LAYER_KHRONOS_validation" instead of
  "VK_LAYER_LUNARG_standard_validation" which is deprecated (#3459) [@FunMiles]
- Examples: DX12: Enable breaking on any warning/error when debug interface is enabled.
- Examples: DX12: Added '#define ImTextureID ImU64' in project and build files to also allow building
  on 32-bit systems. Added project to default Visual Studio solution file. (#301)


-----------------------------------------------------------------------
 VERSION 1.78 (Released 2020-08-18)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.78

Breaking Changes:

- Obsoleted use of the trailing 'float power=1.0f' parameter for those functions: [@Shironekoben, @ocornut]
  - DragFloat(), DragFloat2(), DragFloat3(), DragFloat4(), DragFloatRange2(), DragScalar(), DragScalarN()
  - SliderFloat(), SliderFloat2(), SliderFloat3(), SliderFloat4(), SliderScalar(), SliderScalarN()
  - VSliderFloat(), VSliderScalar()
  Replaced the final 'float power=1.0f' argument with ImGuiSliderFlags defaulting to 0 (as with all our flags).
  Worked out a backward-compatibility scheme so hopefully most C++ codebase should not be affected.
  In short, when calling those functions:
  - If you omitted the 'power' parameter (likely!), you are not affected.
  - If you set the 'power' parameter to 1.0f (same as previous default value):
    - Your compiler may warn on float>int conversion.
    - Everything else will work (but will assert if IMGUI_DISABLE_OBSOLETE_FUNCTIONS is defined).
    - You can replace the 1.0f value with 0 to fix the warning, and be technically correct.
  - If you set the 'power' parameter to >1.0f (to enable non-linear editing):
    - Your compiler may warn on float>int conversion.
    - Code will assert at runtime for IM_ASSERT(power == 1.0f) with the following assert description:
      "Call Drag function with ImGuiSliderFlags_Logarithmic instead of using the old 'float power' function!".
    - In case asserts are disabled, the code will not crash and enable the _Logarithmic flag.
    - You can replace the >1.0f value with ImGuiSliderFlags_Logarithmic to fix the warning/assert
      and get a _similar_ effect as previous uses of power >1.0f.
  See https://github.com/ocornut/imgui/issues/3361 for all details.
  For shared code, you can version check at compile-time with `#if IMGUI_VERSION_NUM >= 17704`.
  Kept inline redirection functions (will obsolete) apart for: DragFloatRange2(), VSliderFloat(), VSliderScalar().
  For those three the 'float power=1.0f' version was removed directly as they were most unlikely ever used.
- DragInt, DragFloat, DragScalar: Obsoleted use of v_min > v_max to lock edits (introduced in 1.73, this was not
  demoed nor documented much, will be replaced a more generic ReadOnly feature).

Other Changes:

- Nav: Fixed clicking on void (behind any windows) from not clearing the focused window.
  This would be problematic e.g. in situation where the application relies on io.WantCaptureKeyboard
  flag being cleared accordingly. (bug introduced in 1.77 WIP on 2020/06/16) (#3344, #2880)
- Window: Fixed clicking over an item which hovering has been disabled (e.g inhibited by a popup)
  from marking the window as moved.
- Drag, Slider: Added ImGuiSliderFlags parameters.
  - For float functions they replace the old trailing 'float power=1.0' parameter.
    (See #3361 and the "Breaking Changes" block above for all details).
  - Added ImGuiSliderFlags_Logarithmic flag to enable logarithmic editing
    (generally more precision around zero), as a replacement to the old 'float power' parameter
    which was obsoleted. (#1823, #1316, #642) [@Shironekoben, @AndrewBelt]
  - Added ImGuiSliderFlags_ClampOnInput flag to force clamping value when using
    CTRL+Click to type in a value manually. (#1829, #3209, #946, #413).
    [note: RENAMED to ImGuiSliderFlags_AlwaysClamp in 1.79].
  - Added ImGuiSliderFlags_NoRoundToFormat flag to disable rounding underlying
    value to match precision of the display format string. (#642)
  - Added ImGuiSliderFlags_NoInput flag to disable turning widget into a text input
    with CTRL+Click or Nav Enter.
- Nav, Slider: Fix using keyboard/gamepad controls with certain logarithmic sliders where
  pushing a direction near zero values would be cancelled out. [@Shironekoben]
- DragFloatRange2, DragIntRange2: Fixed an issue allowing to drag out of bounds when both
  min and max value are on the same value. (#1441)
- InputText, ImDrawList: Fixed assert triggering when drawing single line of text with more
  than ~16 KB characters. (Note that current code is going to show corrupted display if after
  clipping, more than 16 KB characters are visible in the same low-level ImDrawList::RenderText()
  call. ImGui-level functions such as TextUnformatted() are not affected. This is quite rare
  but it will be addressed later). (#3349)
- Selectable: Fixed highlight/hit extent when used with horizontal scrolling (in or outside columns).
  Also fixed related text clipping when used in a column after the first one. (#3187, #3386)
- Scrolling: Avoid SetScroll, SetScrollFromPos functions from snapping on the edge of scroll
  limits when close-enough by (WindowPadding - ItemPadding), which was a tweak with too many
  side-effects. The behavior is still present in SetScrollHere functions as they are more explicitly
  aiming at making widgets visible. May later be moved to a flag.
- Tabs: Allow calling SetTabItemClosed() after a tab has been submitted (will process next frame).
- InvisibleButton: Made public a small selection of ImGuiButtonFlags (previously in imgui_internal.h)
  and allowed to pass them to InvisibleButton(): ImGuiButtonFlags_MouseButtonLeft/Right/Middle.
  This is a small but rather important change because lots of multi-button behaviors could previously
  only be achieved using lower-level/internal API. Now also available via high-level InvisibleButton()
  with is a de-facto versatile building block to creating custom widgets with the public API.
- Fonts: Fixed ImFontConfig::GlyphExtraSpacing and ImFontConfig::PixelSnapH settings being pulled
  from the merged/target font settings when merging fonts, instead of being pulled from the source
  font settings.
- ImDrawList: Thick anti-aliased strokes (> 1.0f) with integer thickness now use a texture-based
  path, reducing the amount of vertices/indices and CPU/GPU usage. (#3245) [@Shironekoben]
  - This change will facilitate the wider use of thick borders in future style changes.
  - Requires an extra bit of texture space (~64x64 by default), relies on GPU bilinear filtering.
  - Set `io.AntiAliasedLinesUseTex = false` to disable rendering using this method.
  - Clear `ImFontAtlasFlags_NoBakedLines` in ImFontAtlas::Flags to disable baking data in texture.
- ImDrawList: changed AddCircle(), AddCircleFilled() default num_segments from 12 to 0, effectively
  enabling auto-tessellation by default. Tweak tessellation in Style Editor->Rendering section, or
  by modifying the 'style.CircleSegmentMaxError' value. [@ShironekoBen]
- ImDrawList: Fixed minor bug introduced in 1.75 where AddCircle() with 12 segments would generate
  an extra vertex. (This bug was mistakenly marked as fixed in earlier 1.77 release). [@ShironekoBen]
- Demo: Improved "Custom Rendering"->"Canvas" demo with a grid, scrolling and context menu.
  Also showcase using InvisibleButton() with multiple mouse buttons flags.
- Demo: Improved "Layout & Scrolling" -> "Clipping" section.
- Demo: Improved "Layout & Scrolling" -> "Child Windows" section.
- Style Editor: Added preview of circle auto-tessellation when editing the corresponding value.
- Backends: OpenGL3: Added support for glad2 loader. (#3330) [@moritz-h]
- Backends: Allegro 5: Fixed horizontal scrolling direction with mouse wheel / touch pads (it seems
  like Allegro 5 reports it differently from GLFW and SDL). (#3394, #2424, #1463) [@nobody-special666]
- Examples: Vulkan: Fixed GLFW+Vulkan and SDL+Vulkan clear color not being set. (#3390) [@RoryO]
- CI: Emscripten has stopped their support for their fastcomp backend, switching to latest sdk [@Xipiryon]


-----------------------------------------------------------------------
 VERSION 1.77 (Released 2020-06-29)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.77

Breaking Changes:

- Removed unnecessary ID (first arg) of ImFontAtlas::AddCustomRectRegular() function. Please
  note that this is a Beta api and will likely be reworked in order to support multi-DPI across
  multiple monitors.
- Renamed OpenPopupOnItemClick() to OpenPopupContextItem(). Kept inline redirection function (will obsolete).
  [NOTE: THIS WAS REVERTED IN 1.79]
- Removed BeginPopupContextWindow(const char*, int mouse_button, bool also_over_items) in favor
  of BeginPopupContextWindow(const char*, ImGuiPopupFlags flags) with ImGuiPopupFlags_NoOverItems.
  Kept inline redirection function (will obsolete).
- Removed obsoleted CalcItemRectClosestPoint() entry point (has been asserting since December 2017).

Other Changes:

- TreeNode: Fixed bug where BeginDragDropSource() failed when the _OpenOnDoubleClick flag is
  enabled (bug introduced in 1.76, but pre-1.76 it would also fail unless the _OpenOnArrow
  flag was also set, and _OpenOnArrow is frequently set along with _OpenOnDoubleClick).
- TreeNode: Fixed bug where dragging a payload over a TreeNode() with either _OpenOnDoubleClick
  or _OpenOnArrow would open the node. (#143)
- Windows: Fix unintended feedback loops when resizing windows close to main viewport edges. [@rokups]
- Tabs: Added style.TabMinWidthForUnselectedCloseButton settings:
  - Set to 0.0f (default) to always make a close button appear on hover (same as Chrome, VS).
  - Set to FLT_MAX to only display a close button when selected (merely hovering is not enough).
  - Set to an intermediary value to toggle behavior based on width (same as Firefox).
- Tabs: Added a ImGuiTabItemFlags_NoTooltip flag to disable the tooltip for individual tab item
  (vs ImGuiTabBarFlags_NoTooltip for entire tab bar). [@Xipiryon]
- Popups: All functions capable of opening popups (OpenPopup*, BeginPopupContext*) now take a new
  ImGuiPopupFlags sets of flags instead of a mouse button index. The API is automatically backward
  compatible as ImGuiPopupFlags is guaranteed to hold mouse button index in the lower bits.
- Popups: Added ImGuiPopupFlags_NoOpenOverExistingPopup for OpenPopup*/BeginPopupContext* functions
  to first test for the presence of another popup at the same level.
- Popups: Added ImGuiPopupFlags_NoOpenOverItems for BeginPopupContextWindow() - similar to testing
  for !IsAnyItemHovered() prior to doing an OpenPopup().
- Popups: Added ImGuiPopupFlags_AnyPopupId and ImGuiPopupFlags_AnyPopupLevel flags for IsPopupOpen(),
  allowing to check if any popup is open at the current level, if a given popup is open at any popup
  level, if any popup is open at all.
- Popups: Fix an edge case where programmatically closing a popup while clicking on its empty space
  would attempt to focus it and close other popups. (#2880)
- Popups: Fix BeginPopupContextVoid() when clicking over the area made unavailable by a modal. (#1636)
- Popups: Clarified some of the comments and function prototypes.
- Modals: BeginPopupModal() doesn't set the ImGuiWindowFlags_NoSavedSettings flag anymore, and will
  not always be auto-centered. Note that modals are more similar to regular windows than they are to
  popups, so api and behavior may evolve further toward embracing this. (#915, #3091)
  Enforce centering using e.g. SetNextWindowPos(io.DisplaySize * 0.5f, ImGuiCond_Appearing, ImVec2(0.5f,0.5f)).
- Metrics: Added a "Settings" section with some details about persistent ini settings.
- Nav, Menus: Fix vertical wrap-around in menus or popups created with multiple appending calls to
  BeginMenu()/EndMenu() or BeginPopup(0/EndPopup(). (#3223, #1207) [@rokups]
- Drag and Drop: Fixed unintended fallback "..." tooltip display during drag operation when
  drag source uses _SourceNoPreviewTooltip flags. (#3160) [@rokups]
- Columns: Lower overhead on column switches and switching to background channel.
  Benefits Columns but was primarily made with Tables in mind!
- Fonts: Fix GetGlyphRangesKorean() end-range to end at 0xD7A3 (instead of 0xD79D). (#348, #3217) [@marukrap]
- ImDrawList: Fixed an issue where draw command merging or primitive unreserve while crossing the
  VtxOffset boundary would lead to draw commands with wrong VtxOffset. (#3129, #3163, #3232, #2591)
  [@thedmd, @Shironekoben, @sergeyn, @ocornut]
- ImDrawList, ImDrawListSplitter, Columns: Fixed an issue where changing channels with different
  TextureId, VtxOffset would incorrectly apply new settings to draw channels. (#3129, #3163)
  [@ocornut, @thedmd, @Shironekoben]
- ImDrawList, ImDrawListSplitter, Columns: Fixed an issue where starting a split when current
  VtxOffset was not zero would lead to draw commands with wrong VtxOffset. (#2591)
- ImDrawList, ImDrawListSplitter, Columns: Fixed an issue where starting a split right after
  a callback draw command would incorrectly override the callback draw command.
- Misc, Freetype: Fix for rare case where FT_Get_Char_Index() succeeds but FT_Load_Glyph() fails.
- Docs: Improved and moved font documentation to docs/FONTS.md so it can be readable on the web.
  Updated various links/wiki accordingly. Added FAQ entry about DPI. (#2861) [@ButternCream, @ocornut]
- CI: Added CI test to verify we're never accidentally dragging libstdc++ (on some compiler setups,
  static constructors for non-pod data seems to drag in libstdc++ due to thread-safety concerns).
  Fixed a static constructor which led to this dependency on some compiler setups. [@rokups]
- Backends: Win32: Support for #define NOGDI, won't try to call GetDeviceCaps(). (#3137, #2327)
- Backends: Win32: Fix _WIN32_WINNT < 0x0600 (MinGW defaults to 0x502 == Windows 2003). (#3183)
- Backends: SDL: Report a zero display-size when window is minimized, consistent with other backends,
  making more render/clipping code use an early out path.
- Backends: OpenGL: Fixed handling of GL 4.5+ glClipControl(GL_UPPER_LEFT) by inverting the
  projection matrix top and bottom values. (#3143, #3146) [@u3shit]
- Backends: OpenGL: On OSX, if unspecified by app, made default GLSL version 150. (#3199) [@albertvaka]
- Backends: OpenGL: Fixed loader auto-detection to not interfere with ES2/ES3 defines. (#3246) [@funchal]
- Backends: Vulkan: Fixed error in if initial frame has no vertices. (#3177)
- Backends: Vulkan: Fixed edge case where render callbacks wouldn't be called if the ImDrawData
  structure didn't have any vertices. (#2697) [@kudaba]
- Backends: OSX: Added workaround to avoid fast mouse clicks. (#3261, #1992, #2525) [@nburrus]
- Examples: GLFW+Vulkan, SDL+Vulkan: Fix for handling of minimized windows. (#3259)
- Examples: Apple: Fixed example_apple_metal and example_apple_opengl2 using imgui_impl_osx.mm
  not forwarding right and center mouse clicks. (#3260) [@nburrus]


-----------------------------------------------------------------------
 VERSION 1.76 (Released 2020-04-12)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.76

Other Changes:

- Drag and Drop, Nav: Disabling navigation arrow keys when drag and drop is active. In the docking
  branch pressing arrow keys while dragging a window from a tab could trigger an assert. (#3025)
- BeginMenu: Using same ID multiple times appends content to a menu. (#1207) [@rokups]
- BeginMenu: Fixed a bug where SetNextWindowXXX data before a BeginMenu() would not be cleared
  when the menu is not open. (#3030)
- InputText: Fixed password fields displaying ASCII spaces as blanks instead of using the '*'
  glyph. (#2149, #515)
- Selectable: Fixed honoring style.SelectableTextAlign with unspecified size. (#2347, #2601)
- Selectable: Allow using ImGuiSelectableFlags_SpanAllColumns in other columns than first. (#125)
- TreeNode: Made clicking on arrow with _OpenOnArrow toggle the open state on the Mouse Down
  event rather than the Mouse Down+Up sequence (this is rather standard behavior).
- ColorButton: Added ImGuiColorEditFlags_NoBorder flag to remove the border normally enforced
  by default for standalone ColorButton.
- Nav: Fixed interactions with ImGuiListClipper, so e.g. Home/End result would not clip the
  landing item on the landing frame. (#787)
- Nav: Fixed currently focused item from ever being clipped by ItemAdd(). (#787)
- Scrolling: Fixed scrolling centering API leading to non-integer scrolling values and initial
  cursor position. This would often get fixed after the fix item submission, but using the
  ImGuiListClipper as the first thing after Begin() could largely break size calculations. (#3073)
- Added optional support for Unicode plane 1-16 (#2538, #2541, #2815) [@cloudwu, @samhocevar]
  - Compile-time enable with '#define IMGUI_USE_WCHAR32' in imconfig.h.
  - More onsistent handling of unsupported code points (0xFFFD).
  - Surrogate pairs are supported when submitting UTF-16 data via io.AddInputCharacterUTF16(),
    allowing for more complete CJK input.
  - sizeof(ImWchar) goes from 2 to 4. IM_UNICODE_CODEPOINT_MAX goes from 0xFFFF to 0x10FFFF.
  - Various structures such as ImFont, ImFontGlyphRangesBuilder will use more memory, this
    is currently not particularly efficient.
- Columns: undid the change in 1.75 were Columns()/BeginColumns() were preemptively limited
  to 64 columns with an assert. (#3037, #125)
- Window: Fixed a bug with child window inheriting ItemFlags from their parent when the child
  window also manipulate the ItemFlags stack. (#3024) [@Stanbroek]
- Font: Fixed non-ASCII space occasionally creating unnecessary empty looking polygons.
- Misc: Added an explicit compile-time test for non-scoped IM_ASSERT() macros to redirect users
  to a solution rather than encourage people to add braces in the codebase.
- Misc: Added additional checks in EndFrame() to verify that io.KeyXXX values have not been
  tampered with between NewFrame() and EndFrame().
- Misc: Made default clipboard handlers for Win32 and OSX use a buffer inside the main context
  instead of a static buffer, so it can be freed properly on Shutdown. (#3110)
- Misc, Freetype: Fixed support for IMGUI_STB_RECT_PACK_FILENAME compile time directive
  in imgui_freetype.cpp (matching support in the regular code path). (#3062) [@DonKult]
- Metrics: Made Tools section more prominent. Showing wire-frame mesh directly hovering the ImDrawCmd
  instead of requiring to open it. Added options to disable bounding box and mesh display.
  Added notes on inactive/gc-ed windows.
- Demo: Added black and white and color gradients to Demo>Examples>Custom Rendering.
- CI: Added more tests on the continuous-integration server: extra warnings for Clang/GCC, building
  SDL+Metal example, building imgui_freetype.cpp, more compile-time imconfig.h settings: disabling
  obsolete functions, enabling 32-bit ImDrawIdx, enabling 32-bit ImWchar, disabling demo. [@rokups]
- Backends: OpenGL3: Fixed version check mistakenly testing for GL 4.0+ instead of 3.2+ to enable
  ImGuiBackendFlags_RendererHasVtxOffset, leaving 3.2 contexts without it. (#3119, #2866) [@wolfpld]
- Backends: OpenGL3: Added include support for older glbinding 2.x loader. (#3061) [@DonKult]
- Backends: Win32: Added ImGui_ImplWin32_EnableDpiAwareness(), ImGui_ImplWin32_GetDpiScaleForHwnd(),
  ImGui_ImplWin32_GetDpiScaleForMonitor() helpers functions (backported from the docking branch).
  Those functions makes it easier for example apps to support hi-dpi features without setting up
  a manifest.
- Backends: Win32: Calling AddInputCharacterUTF16() from WM_CHAR message handler in order to support
  high-plane surrogate pairs. (#2815) [@cloudwu, @samhocevar]
- Backends: SDL: Added ImGui_ImplSDL2_InitForMetal() for API consistency (even though the function
  currently does nothing).
- Backends: SDL: Fixed mapping for ImGuiKey_KeyPadEnter. (#3031) [@Davido71]
- Examples: Win32+DX12: Fixed resizing main window, enabled debug layer. (#3087, #3115) [@sergeyn]
- Examples: SDL+DX11: Fixed resizing main window. (#3057) [@joeslay]
- Examples: Added SDL+Metal example application. (#3017) [@coding-jackalope]


-----------------------------------------------------------------------
 VERSION 1.75 (Released 2020-02-10)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.75

Breaking Changes:

- Removed redirecting functions/enums names that were marked obsolete in 1.53 (December 2017):
  - ShowTestWindow()                    -> use ShowDemoWindow()
  - IsRootWindowFocused()               -> use IsWindowFocused(ImGuiFocusedFlags_RootWindow)
  - IsRootWindowOrAnyChildFocused()     -> use IsWindowFocused(ImGuiFocusedFlags_RootAndChildWindows)
  - SetNextWindowContentWidth(w)        -> use SetNextWindowContentSize(ImVec2(w, 0.0f)
  - GetItemsLineHeightWithSpacing()     -> use GetFrameHeightWithSpacing()
  - ImGuiCol_ChildWindowBg              -> use ImGuiCol_ChildBg
  - ImGuiStyleVar_ChildWindowRounding   -> use ImGuiStyleVar_ChildRounding
  - ImGuiTreeNodeFlags_AllowOverlapMode -> use ImGuiTreeNodeFlags_AllowItemOverlap
  - IMGUI_DISABLE_TEST_WINDOWS          -> use IMGUI_DISABLE_DEMO_WINDOWS
  If you were still using the old names, while you are cleaning up, considering enabling
  IMGUI_DISABLE_OBSOLETE_FUNCTIONS in imconfig.h even temporarily to have a pass at finding
  and removing up old API calls, if any remaining.
- Removed implicit default parameter to IsMouseDragging(int button = 0) to be consistent
  with other mouse functions (none of the other functions have it).
- Obsoleted calling ImDrawList::PrimReserve() with a negative count (which was vaguely
  documented and rarely if ever used). Instead we added an explicit PrimUnreserve() API
  which can be implemented faster. Also clarified pre-existing constraints which weren't
  documented (can only unreserve from the last reserve call). If you suspect you ever
  used that feature before (very unlikely, but grep for call to PrimReserve in your code),
  you can #define IMGUI_DEBUG_PARANOID in imconfig.h to catch existing calls. [@ShironekoBen]
- ImDrawList::AddCircle()/AddCircleFilled() functions don't accept negative radius.
- Limiting Columns()/BeginColumns() api to 64 columns with an assert. While the current code
  technically supports it, future code may not so we're putting the restriction ahead.
  [Undid that change in 1.76]
- imgui_internal.h: changed ImRect() default constructor initializes all fields to 0.0f instead
  of (FLT_MAX,FLT_MAX,-FLT_MAX,-FLT_MAX). If you used ImRect::Add() to create bounding boxes by
  adding points into it without explicit initialization, you may need to fix your initial value.

Other Changes:

- Inputs: Added ImGuiMouseButton enum for convenience (e.g. ImGuiMouseButton_Right=1).
  We forever guarantee that the existing value will not changes so existing code is free to use 0/1/2.
- Nav: Fixed a bug where the initial CTRL-Tab press while in a child window sometimes selected
  the current root window instead of always selecting the previous root window. (#787)
- ColorEdit: Fix label alignment when using ImGuiColorEditFlags_NoInputs. (#2955) [@rokups]
- ColorEdit: In HSV display of a RGB stored value, attempt to locally preserve Saturation
  when Value==0.0 (similar to changes done in 1.73 for Hue). Removed Hue editing lock since
  those improvements in 1.73 makes them unnecessary. (#2722, #2770). [@rokups]
- ColorEdit: "Copy As" context-menu tool shows hex values with a '#' prefix instead of '0x'.
- ColorEdit: "Copy As" content-menu tool shows hex values both with/without alpha when available.
- InputText: Fix corruption or crash when executing undo after clearing input with ESC, as a
  byproduct we are allowing to later undo the revert with a CTRL+Z. (#3008).
- InputText: Fix using a combination of _CallbackResize (e.g. for std::string binding), along with the
  _EnterReturnsTrue flag along with the rarely used property of using an InputText without persisting
  user-side storage. Previously if you had e.g. a local unsaved std::string and reading result back
  from the widget, the user string object wouldn't be resized when Enter key was pressed. (#3009)
- MenuBar: Fix minor clipping issue where occasionally a menu text can overlap the right-most border.
- Window: Fix SetNextWindowBgAlpha(1.0f) failing to override alpha component. (#3007) [@Albog]
- Window: When testing for the presence of the ImGuiWindowFlags_NoBringToFrontOnFocus flag we
  test both the focused/clicked window (which could be a child window) and the root window.
- ImDrawList: AddCircle(), AddCircleFilled() API can now auto-tessellate when provided a segment
  count of zero. Alter tessellation quality with 'style.CircleSegmentMaxError'. [@ShironekoBen]
- ImDrawList: Add AddNgon(), AddNgonFilled() API with a guarantee on the explicit segment count.
  In the current branch they are essentially the same as AddCircle(), AddCircleFilled() but as
  we will rework the circle rendering functions to use textures and automatic segment count
  selection, those new api can fill a gap. [@ShironekoBen]
- Columns: ImDrawList::Channels* functions now work inside columns. Added extra comments to
  suggest using user-owned ImDrawListSplitter instead of ImDrawList functions. [@rokups]
- Misc: Added ImGuiMouseCursor_NotAllowed enum so it can be used by more shared widgets. [@rokups]
- Misc: Added IMGUI_DISABLE compile-time definition to make all headers and sources empty.
- Misc: Disable format checks when using stb_printf, to allow using extra formats.
  Made IMGUI_USE_STB_SPRINTF a properly documented imconfig.h flag. (#2954) [@loicmolinari]
- Misc: Added misc/single_file/imgui_single_file.h, We use this to validate compiling all *.cpp
  files in a same compilation unit. Actual users of that technique (also called "Unity builds")
  can generally provide this themselves, so we don't really recommend you use this. [@rokups]
- CI: Added PVS-Studio static analysis on the continuous-integration server. [@rokups]
- Backends: GLFW, SDL, Win32, OSX, Allegro: Added support for ImGuiMouseCursor_NotAllowed. [@rokups]
- Backends: GLFW: Added support for the missing mouse cursors newly added in GLFW 3.4+. [@rokups]
- Backends: SDL: Wayland: use SDL_GetMouseState (because there is no global mouse state available
  on Wayland). (#2800, #2802) [@NeroBurner]
- Backends: GLFW, SDL: report Windows key (io.KeySuper) as always released. Neither GLFW nor SDL can
  correctly report the key release in every cases (e.g. when using Win+V) causing problems with some
  widgets. The next release of GLFW (3.4+) will have a fix for it. However since it is both difficult
  and discouraged to make use of this key for Windows application anyway, we just hide it. (#2976)
- Backends: Win32: Added support for #define IMGUI_IMPL_WIN32_DISABLE_GAMEPAD to disable all
  XInput using code, and IMGUI_IMPL_WIN32_DISABLE_LINKING_XINPUT to disable linking with XInput,
  the later may be problematic if compiling with recent Windows SDK and you want your app to run
  on Windows 7. You can instead try linking with Xinput9_1_0.lib instead. (#2716)
- Backends: Glut: Improved FreeGLUT support for MinGW. (#3004) [@podsvirov]
- Backends: Emscripten: Avoid forcefully setting IMGUI_DISABLE_FILE_FUNCTIONS. (#3005) [@podsvirov]
- Examples: OpenGL: Explicitly adding -DIMGUI_IMPL_OPENGL_LOADER_GL3W to Makefile to match linking
  settings (otherwise if another loader such as Glew is accessible, the OpenGL3 backend might
  automatically use it). (#2919, #2798)
- Examples: OpenGL: Added support for glbinding OpenGL loader. (#2870) [@rokups]
- Examples: Emscripten: Demonstrating embedding fonts in Makefile and code. (#2953) [@Oipo]
- Examples: Metal: Wrapped main loop in @autoreleasepool block to ensure allocations get freed
  even if underlying system event loop gets paused due to app nap. (#2910, #2917) [@bear24rw]


-----------------------------------------------------------------------
 VERSION 1.74 (Released 2019-11-25)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.74

Breaking Changes:

- Removed redirecting functions/enums names that were marked obsolete in 1.52 (October 2017):
  - Begin() [old 5 args version]     -> use Begin() [3 args], use SetNextWindowSize() SetNextWindowBgAlpha() if needed
  - IsRootWindowOrAnyChildHovered()  -> use IsWindowHovered(ImGuiHoveredFlags_RootAndChildWindows)
  - AlignFirstTextHeightToWidgets()  -> use AlignTextToFramePadding()
  - SetNextWindowPosCenter()         -> use SetNextWindowPos() with a pivot of (0.5f, 0.5f)
  - ImFont::Glyph                    -> use ImFontGlyph
  If you were still using the old names, read "API Breaking Changes" section of imgui.cpp to find out
  the new names or equivalent features, or see how they were implemented until 1.73.
- Inputs: Fixed a miscalculation in the keyboard/mouse "typematic" repeat delay/rate calculation, used
  by keys and e.g. repeating mouse buttons as well as the GetKeyPressedAmount() function.
  If you were using a non-default value for io.KeyRepeatRate (previous default was 0.250), you can
  add +io.KeyRepeatDelay to it to compensate for the fix.
  The function was triggering on: 0.0 and (delay+rate*N) where (N>=1). Fixed formula responds to (N>=0).
  Effectively it made io.KeyRepeatRate behave like it was set to (io.KeyRepeatRate + io.KeyRepeatDelay).
  Fixed the code and altered default io.KeyRepeatRate,Delay from 0.250,0.050 to 0.300,0.050 to compensate.
  If you never altered io.KeyRepeatRate nor used GetKeyPressedAmount() this won't affect you.
- Misc: Renamed IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS to IMGUI_DISABLE_DEFAULT_FORMAT_FUNCTIONS. (#1038)
- Misc: Renamed IMGUI_DISABLE_MATH_FUNCTIONS to IMGUI_DISABLE_DEFAULT_MATH_FUNCTIONS.
- Fonts: ImFontAtlas::AddCustomRectRegular() now requires an ID larger than 0x110000 (instead of 0x10000) to
  conform with supporting Unicode planes 1-16 in a future update. ID below 0x110000 will now assert.
- Backends: DX12: Added extra ID3D12DescriptorHeap parameter to ImGui_ImplDX12_Init() function.
  The value is unused in master branch but will be used by the multi-viewport feature. (#2851) [@obfuscate]

Other Changes:

- InputText, Nav: Fixed Home/End key broken when activating Keyboard Navigation. (#787)
- InputText: Filter out ASCII 127 (DEL) emitted by low-level OSX layer, as we are using the Key value. (#2578)
- Layout: Fixed a couple of subtle bounding box vertical positioning issues relating to the handling of text
  baseline alignment. The issue would generally manifest when laying out multiple items on a same line,
  with varying heights and text baseline offsets.
  Some specific examples, e.g. a button with regular frame padding followed by another item with a
  multi-line label and no frame padding, such as: multi-line text, small button, tree node item, etc.
  The second item was correctly offset to match text baseline, and would interact/display correctly,
  but it wouldn't push the contents area boundary low enough.
- Scrollbar: Fixed an issue where scrollbars wouldn't display on the frame following a frame where
  all child window contents would be culled.
- ColorPicker: Fixed SV triangle gradient to block (broken in 1.73). (#2864, #2711). [@lewa-j]
- TreeNode: Fixed combination of ImGuiTreeNodeFlags_SpanFullWidth and ImGuiTreeNodeFlags_OpenOnArrow
  incorrectly locating the arrow hit position to the left of the frame. (#2451, #2438, #1897)
- TreeNode: The collapsing arrow accepts click even if modifier keys are being held, facilitating
  interactions with custom multi-selections patterns. (#2886, #1896, #1861)
- TreeNode: Added IsItemToggledOpen() to explicitly query if item was just open/closed, facilitating
  interactions with custom multi-selections patterns. (#1896, #1861)
- DragScalar, SliderScalar, InputScalar: Added p_ prefix to parameter that are pointers to the data
  to clarify how they are used, and more comments redirecting to the demo code. (#2844)
- Error handling: Assert if user mistakenly calls End() instead of EndChild() on a child window. (#1651)
- Misc: Optimized storage of window settings data (reducing allocation count).
- Misc: Windows: Do not use _wfopen() if IMGUI_DISABLE_WIN32_FUNCTIONS is defined. (#2815)
- Misc: Windows: Disabled win32 function by default when building with UWP. (#2892, #2895)
- Misc: Using static_assert() when using C++11, instead of our own construct (avoid zealous Clang warnings).
- Misc: Added IMGUI_DISABLE_FILE_FUNCTIONS/IMGUI_DISABLE_DEFAULT_FILE_FUNCTION to nullify or disable
  default implementation of ImFileXXX functions linking with fopen/fclose/fread/fwrite. (#2734)
- Docs: Improved and moved FAQ to docs/FAQ.md so it can be readable on the web. [@ButternCream, @ocornut]
- Docs: Moved misc/fonts/README.txt to docs/FONTS.txt.
- Docs: Added permanent redirect from https://www.dearimgui.com/faq to FAQ page.
- Demo: Added simple item reordering demo in Widgets -> Drag and Drop section. (#2823, #143) [@rokups]
- Metrics: Show wire-frame mesh and approximate surface area when hovering ImDrawCmd. [@ShironekoBen]
- Metrics: Expose basic details of each window key/value state storage.
- Examples: DX12: Using IDXGIDebug1::ReportLiveObjects() when DX12_ENABLE_DEBUG_LAYER is enabled.
- Examples: Emscripten: Removed BINARYEN_TRAP_MODE=clamp from Makefile which was removed in Emscripten 1.39.0
  but required prior to 1.39.0, making life easier for absolutely no-one. (#2877, #2878) [@podsvirov]
- Backends: OpenGL2: Explicitly backup, setup and restore GL_TEXTURE_ENV to increase compatibility with
  legacy OpenGL applications. (#3000)
- Backends: OpenGL3: Fix building with pre-3.2 GL loaders which do not expose glDrawElementsBaseVertex(),
  using runtime GL version to decide if we set ImGuiBackendFlags_RendererHasVtxOffset. (#2866, #2852) [@dpilawa]
- Backends: OSX: Fix using Backspace key. (#2578, #2817, #2818) [@DiligentGraphics]
- Backends: GLFW: Previously installed user callbacks are now restored on shutdown. (#2836) [@malte-v]
- CI: Set up a bunch of continuous-integration tests using GitHub Actions. We now compile many of the example
  applications on Windows, Linux, MacOS, iOS, Emscripten. Removed Travis integration. (#2865) [@rokups]


-----------------------------------------------------------------------
 VERSION 1.73 (Released 2019-09-24)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.73

Other Changes:

- Nav, Scrolling: Added support for Home/End key. (#787)
- ColorEdit: Disable Hue edit when Saturation==0 instead of letting Hue values jump around.
- ColorEdit, ColorPicker: In HSV display of a RGB stored value, attempt to locally preserve Hue
  when Saturation==0, which reduces accidentally lossy interactions. (#2722, #2770) [@rokups]
- ColorPicker: Made rendering aware of global style alpha of the picker can be faded out. (#2711)
  Note that some elements won't accurately fade down with the same intensity, and the color wheel
  when enabled will have small overlap glitches with (style.Alpha < 1.0).
- Tabs: Fixed single-tab not shrinking their width down.
- Tabs: Fixed clicking on a tab larger than tab-bar width creating a bouncing feedback loop.
- Tabs: Feed desired width (sum of unclipped tabs width) into layout system to allow for auto-resize. (#2768)
  (before 1.71 tab bars fed the sum of current width which created feedback loops in certain situations).
- Tabs: Improved shrinking for large number of tabs to avoid leaving extraneous space on the right side.
  Individuals tabs are given integer-rounded width and remainder is spread between tabs left-to-right.
- Columns, Separator: Fixed a bug where non-visible separators within columns would alter the next row position
  differently than visible ones.
- SliderScalar: Improved assert when using U32 or U64 types with a large v_max value. (#2765) [@loicmouton]
- DragInt, DragFloat, DragScalar: Using (v_min > v_max) allows locking any edits to the value.
- DragScalar: Fixed dragging of unsigned values on ARM cpu (float to uint cast is undefined). (#2780) [@dBagrat]
- TreeNode: Added ImGuiTreeNodeFlags_SpanAvailWidth flag. (#2451, #2438, #1897) [@Melix19, @PathogenDavid]
  This extends the hit-box to the right-most edge, even if the node is not framed.
  (Note: this is not the default in order to allow adding other items on the same line. In the future we will
  aim toward refactoring the hit-system to be front-to-back, allowing more natural overlapping of items,
  and then we will be able to make this the default.)
- TreeNode: Added ImGuiTreeNodeFlags_SpanFullWidth flag. This extends the hit-box to both the left-most and
  right-most edge of the working area, bypassing indentation.
- CollapsingHeader: Added support for ImGuiTreeNodeFlags_Bullet and ImGuiTreeNodeFlags_Leaf on framed nodes,
  mostly for consistency. (#2159, #2160) [@goran-w]
- Selectable: Added ImGuiSelectableFlags_AllowItemOverlap flag in public api (was previously internal only).
- Style: Allow style.WindowMenuButtonPosition to be set to ImGuiDir_None to hide the collapse button. (#2634, #2639)
- Font: Better ellipsis ("...") drawing implementation. Instead of drawing three pixel-ey dots (which was glaringly
  unfitting with many types of fonts) we first attempt to find a standard ellipsis glyphs within the loaded set.
  Otherwise we render ellipsis using '.' from the font from where we trim excessive spacing to make it as narrow
  as possible. (#2775) [@rokups]
- ImDrawList: Clarified the name of many parameters so reading the code is a little easier. (#2740)
- ImDrawListSplitter: Fixed merging channels if the last submitted draw command used a different texture. (#2506)
- Using offsetof() when available in C++11. Avoids Clang sanitizer complaining about old-style macros. (#94)
- ImVector: Added find(), find_erase(), find_erase_unsorted() helpers.
- Added a mechanism to compact/free the larger allocations of unused windows (buffers are compacted when
  a window is unused for 60 seconds, as per io.ConfigWindowsMemoryCompactTimer = 60.0f). Note that memory
  usage has never been reported as a problem, so this is merely a touch of overzealous luxury. (#2636)
- Documentation: Various tweaks and improvements to the README page. [@ker0chan]
- Backends: OpenGL3: Tweaked initialization code allow application calling ImGui_ImplOpenGL3_CreateFontsTexture()
  before ImGui_ImplOpenGL3_NewFrame(), which sometimes can be convenient.
- Backends: OpenGL3: Attempt to automatically detect default GL loader by using __has_include. (#2798) [@o-micron]
- Backends: DX11: Fixed GSGetShader() call not passing an initialized instance count, which would
  generally make the DX11 debug layer complain (bug added in 1.72).
- Backends: Vulkan: Added support for specifying multisample count. Set 'ImGui_ImplVulkan_InitInfo::MSAASamples' to
   one of the VkSampleCountFlagBits values to use, default is non-multisampled as before. (#2705, #2706) [@vilya]
- Examples: OSX: Fix example_apple_opengl2/main.mm not forwarding mouse clicks and drags correctly. (#1961, #2710)
  [@intonarumori, @ElectricMagic]
- Misc: Updated stb_rect_pack.h from 0.99 to 1.00 (fixes by @rygorous: off-by-1 bug in best-fit heuristic,
  fix handling of rectangles too large to fit inside texture). (#2762) [@tido64]


-----------------------------------------------------------------------
 VERSION 1.72b (Released 2019-07-31)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.72b

Other Changes:

- Nav, Scrolling: Fixed programmatic scroll leading to a slightly incorrect scroll offset when
  the window has decorations or a menu-bar (broken in 1.71). This was mostly noticeable when
  a keyboard/gamepad movement led to scrolling the view, or using e.g. SetScrollHereY() function.
- Nav: Made hovering non-MenuItem Selectable not re-assign the source item for keyboard navigation.
- Nav: Fixed an issue with NavFlattened window flag (beta) where widgets not entirely fitting
  in child window (often selectables because of their protruding sides) would be not considered
  as entry points to to navigate toward the child window. (#787)


-----------------------------------------------------------------------
 VERSION 1.72 (Released 2019-07-27)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.72

Breaking Changes:

- Removed redirecting functions/enums names that were marked obsolete in 1.51 (June 2017):
  - ImGuiCol_Column*, ImGuiSetCond_* enums.
  - IsItemHoveredRect(), IsPosHoveringAnyWindow(), IsMouseHoveringAnyWindow(), IsMouseHoveringWindow() functions.
  - IMGUI_ONCE_UPON_A_FRAME macro.
  If you were still using the old names, read "API Breaking Changes" section of imgui.cpp to find out
  the new names or equivalent features.
- Renamed ImFontAtlas::CustomRect to ImFontAtlasCustomRect. Kept redirection typedef (will obsolete).
- Removed TreeAdvanceToLabelPos() which is rarely used and only does SetCursorPosX(GetCursorPosX() + GetTreeNodeToLabelSpacing()).
  Kept redirection function (will obsolete). (#581, #324)

Other Changes:

- Scrolling: Made mouse-wheel scrolling lock the underlying window until the mouse is moved again or
  until a short delay expires (~2 seconds). This allow uninterrupted scroll even if child windows are
  passing under the mouse cursor. (#2604)
- Scrolling: Made it possible for mouse wheel and navigation-triggered scrolling to override a call to
  SetScrollX()/SetScrollY(), making it possible to use a simpler stateless pattern for auto-scrolling:
     // (Submit items..)
     if (ImGui::GetScrollY() >= ImGui::GetScrollMaxY())  // If scrolling at the already at the bottom..
         ImGui::SetScrollHereY(1.0f);                    // ..make last item fully visible
- Scrolling: Added SetScrollHereX(), SetScrollFromPosX() for completeness. (#1580) [@kevreco]
- Scrolling: Mouse wheel scrolling while hovering a child window is automatically forwarded to parent window
  if ScrollMax is zero on the scrolling axis.
  Also still the case if ImGuiWindowFlags_NoScrollWithMouse is set (not new), but previously the forwarding
  would be disabled if ImGuiWindowFlags_NoScrollbar was set on the child window, which is not the case
  any more. Forwarding can still be disabled by setting ImGuiWindowFlags_NoInputs. (amend #1502, #1380).
- Window: Fixed InnerClipRect right-most coordinates using wrong padding setting (introduced in 1.71).
- Window: Fixed old SetWindowFontScale() api value from not being inherited by child window. Added
  comments about the right way to scale your UI (load a font at the right side, rebuild atlas, scale style).
- Scrollbar: Avoid overlapping the opposite side when window (often a child window) is forcibly too small.
- Combo: Hide arrow when there's not enough space even for the square button.
- InputText: Testing for newly added ImGuiKey_KeyPadEnter key. (#2677, #2005) [@amc522]
- Tabs: Fixed unfocused tab bar separator color (was using ImGuiCol_Tab, should use ImGuiCol_TabUnfocusedActive).
- Columns: Fixed a regression from 1.71 where the right-side of the contents rectangle within each column
  would wrongly use a WindowPadding.x instead of ItemSpacing.x like it always did. (#125, #2666)
- Columns: Made the right-most edge reaches up to the clipping rectangle (removing half of WindowPadding.x
  worth of asymmetrical/extraneous padding, note that there's another half that conservatively has to offset
  the right-most column, otherwise it's clipping width won't match the other columns). (#125, #2666)
- Columns: Improved honoring alignment with various values of ItemSpacing.x and WindowPadding.x. (#125, #2666)
- Columns: Made GetColumnOffset() and GetColumnWidth() behave when there's no column set, consistently with
  other column functions. (#2683)
- InputTextMultiline: Fixed vertical scrolling tracking glitch.
- Word-wrapping: Fixed overzealous word-wrapping when glyph edge lands exactly on the limit. Because
  of this, auto-fitting exactly unwrapped text would make it wrap. (fixes initial 1.15 commit, 78645a7d).
- Style: Attenuated default opacity of ImGuiCol_Separator in Classic and Light styles.
- Style: Added style.ColorButtonPosition (left/right, defaults to ImGuiDir_Right) to move the color button
  of ColorEdit3/ColorEdit4 functions to either side of the inputs.
- IO: Added ImGuiKey_KeyPadEnter and support in various backends (previously backends would need to
  specifically redirect key-pad keys to their regular counterpart). This is a temporary attenuating measure
  until we actually refactor and add whole sets of keys into the ImGuiKey enum. (#2677, #2005) [@amc522]
- Misc: Made Button(), ColorButton() not trigger an "edited" event leading to IsItemDeactivatedAfterEdit()
  returning true. This also effectively make ColorEdit4() not incorrect trigger IsItemDeactivatedAfterEdit()
  when clicking the color button to open the picker popup. (#1875)
- Misc: Added IMGUI_DISABLE_METRICS_WINDOW imconfig.h setting to explicitly compile out ShowMetricsWindow().
- Debug Tools: Added "Metrics->Tools->Item Picker" tool which allow clicking on a widget to break in the
  debugger within the item code. The tool calls IM_DEBUG_BREAK() which can be redefined in imconfig.h.
- ImDrawList: Fixed CloneOutput() helper crashing. (#1860) [@gviot]
- ImDrawList::ChannelsSplit(), ImDrawListSplitter: Fixed an issue with merging draw commands between
  channel 0 and 1. (#2624)
- ImDrawListSplitter: Fixed memory leak when using low-level split api (was not affecting ImDrawList api,
  also this type was added in 1.71 and not advertised as a public-facing feature).
- Fonts: binary_to_compressed_c.cpp: Display an error message if failing to open/read the input font file.
- Demo: Log, Console: Using a simpler stateless pattern for auto-scrolling.
- Demo: Widgets: Showing how to use the format parameter of Slider/Drag functions to display the name
  of an enum value instead of the underlying integer value.
- Demo: Renamed the "Help" menu to "Tools" (more accurate).
- Backends: DX10/DX11: Backup, clear and restore Geometry Shader is any is bound when calling renderer.
- Backends: DX11: Clear Hull Shader, Domain Shader, Compute Shader before rendering. Not backing/restoring them.
- Backends: OSX: Disabled default native Mac clipboard copy/paste implementation in core library (added in 1.71),
  because it needs application to be linked with '-framework ApplicationServices'. It can be explicitly
  enabled back by using '#define IMGUI_ENABLE_OSX_DEFAULT_CLIPBOARD_FUNCTIONS' in imconfig.h. Re-added
  equivalent using NSPasteboard api in the imgui_impl_osx.mm experimental backend. (#2546)
- Backends: SDL2: Added ImGui_ImplSDL2_InitForD3D() function to make D3D support more visible.
  (#2482, #2632) [@josiahmanson]
- Examples: Added SDL2+DirectX11 example application. (#2632, #2612, #2482) [@vincenthamm]


-----------------------------------------------------------------------
 VERSION 1.71 (Released 2019-06-12)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.71

Breaking Changes:

- IO: changed AddInputCharacter(unsigned short c) signature to AddInputCharacter(unsigned int c).
- Renamed SetNextTreeNodeOpen() to SetNextItemOpen(). Kept inline redirection function (will obsolete).
- Window: rendering of child windows outer decorations (e.g. bg color, border, scrollbars) is now
  performed as part of their parent window, avoiding the creation of an extraneous draw commands.
  If you have overlapping child windows with decorations, and relied on their relative z-order to be
  mapped to submission their order, this will affect your rendering. The optimization is disabled
  if the parent window has no visual output because it appears to be the most common situation leading
  to the creation of overlapping child windows. Please reach out if you are affected by this change!

Other Changes:

- Window: clarified behavior of SetNextWindowContentSize(). Content size is defined as the size available
  after removal of WindowPadding on each sides. So SetNextWindowContentSize(ImVec2(100,100)) + auto-resize
  will always allow submitting a 100x100 item without creating a scrollbar, regarding of WindowPadding.
  The exact meaning of ContentSize for decorated windows was previously ill-defined.
- Window: Fixed auto-resize with AlwaysVerticalScrollbar or AlwaysHorizontalScrollbar flags.
- Window: Fixed one case where auto-resize by double-clicking the resize grip would make either scrollbar
  appear for a single frame after the resize.
- Separator: Revert 1.70 "Declare its thickness (1.0f) to the layout" change. It's not incorrect
  but it breaks existing some layout patterns. Will return back to it when we expose Separator flags.
- Fixed InputScalar, InputScalarN, SliderScalarN, DragScalarN with non-visible label from inserting
  style.ItemInnerSpacing.x worth of trailing spacing.
- Fixed InputFloatX, SliderFloatX, DragFloatX functions erroneously reporting IsItemEdited() multiple
  times when the text input doesn't match the formatted output value (e.g. input "1" shows "1.000").
  It wasn't much of a problem because we typically use the return value instead of IsItemEdited() here.
- Fixed uses of IsItemDeactivated(), IsItemDeactivatedAfterEdit() on multi-components widgets and
  after EndGroup(). (#2550, #1875)
- Fixed crash when appending with BeginMainMenuBar() more than once and no other window are showing. (#2567)
- ColorEdit: Fixed the color picker popup only displaying inputs as HSV instead of showing multiple
  options. (#2587, broken in 1.69 by #2384).
- CollapsingHeader: Better clipping when a close button is enabled and it overlaps the label. (#600)
- Scrollbar: Minor bounding box adjustment to cope with various border size.
- Scrollbar, Style: Changed default style.ScrollbarSize from 16 to 14.
- Combo: Fixed rounding not applying with the ImGuiComboFlags_NoArrowButton flag. (#2607) [@DucaRii]
- Nav: Fixed gamepad/keyboard moving of window affecting contents size incorrectly, sometimes leading
  to scrollbars appearing during the movement.
- Nav: Fixed rare crash when e.g. releasing Alt-key while focusing a window with a menu at the same
  frame as clearing the focus. This was in most noticeable in backends such as Glfw and SDL which
  emits key release events when focusing another viewport, leading to Alt+clicking on void on another
  viewport triggering the issue. (#2609)
- TreeNode, CollapsingHeader: Fixed highlight frame not covering horizontal area fully when using
  horizontal scrolling. (#2211, #2579)
- Tabs: Fixed BeginTabBar() within a window with horizontal scrolling from creating a feedback
  loop with the horizontal contents size.
- Columns: Fixed Columns() within a window with horizontal scrolling from not covering the full
  horizontal area (previously only worked with an explicit contents size). (#125)
- Columns: Fixed Separator from creating an extraneous draw command. (#125)
- Columns: Fixed Selectable with SpanAllColumns flag from creating an extraneous draw command. (#125)
- Style: Added style.WindowMenuButtonPosition (left/right, defaults to ImGuiDir_Left) to move the
  collapsing/docking button to the other side of the title bar.
- Style: Made window close button cross slightly smaller.
- Log/Capture: Fixed BeginTabItem() label not being included in a text log/capture.
- ImDrawList: Added ImDrawCmd::VtxOffset value to support large meshes (64k+ vertices) using 16-bit indices.
  The renderer backend needs to set 'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset' to enable
  this, and honor the ImDrawCmd::VtxOffset field. Otherwise the value will always be zero. (#2591)
  This has the advantage of preserving smaller index buffers and allowing to execute on hardware that do not
  support 32-bit indices. Most examples backends have been modified to support the VtxOffset field.
- ImDrawList: Added ImDrawCmd::IdxOffset value, equivalent to summing element count for each draw command.
  This is provided for convenience and consistency with VtxOffset. (#2591)
- ImDrawCallback: Allow to override the signature of ImDrawCallback by #define-ing it. This is meant to
  facilitate custom rendering backends passing local render-specific data to the draw callback.
- ImFontAtlas: FreeType: Added RasterizerFlags::Monochrome flag to disable font anti-aliasing. Combine
  with RasterizerFlags::MonoHinting for best results. (#2545) [@HolyBlackCat]
- ImFontGlyphRangesBuilder: Fixed unnecessarily over-sized buffer, which incidentally was also not
  fully cleared. Fixed edge-case overflow when adding character 0xFFFF. (#2568). [@NIKE3500]
- Demo: Added full "Dear ImGui" prefix to the title of "Dear ImGui Demo" and "Dear ImGui Metrics" windows.
- Backends: Add native Mac clipboard copy/paste default implementation in core library to match what we are
  dealing with Win32, and to facilitate integration in custom engines. (#2546) [@andrewwillmott]
- Backends: OSX: imgui_impl_osx: Added mouse cursor support. (#2585, #1873) [@actboy168]
- Examples/Backends: DirectX9/10/11/12, Metal, Vulkan, OpenGL3 (Desktop GL only): Added support for large meshes
  (64k+ vertices) with 16-bit indices, enable 'ImGuiBackendFlags_RendererHasVtxOffset' in those backends. (#2591)
- Examples/Backends: Don't filter characters under 0x10000 before calling io.AddInputCharacter(),
  the filtering is done in io.AddInputCharacter() itself. This is in prevision for fuller Unicode
  support. (#2538, #2541)


-----------------------------------------------------------------------
 VERSION 1.70 (Released 2019-05-06)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.70

Breaking Changes:

- ImDrawList: Improved algorithm for mitre joints on thick lines, preserving correct thickness
  up to 90 degrees angles (e.g. rectangles). If you have custom rendering using thick lines,
  they will appear a little thicker now. (#2518) [@rmitton]
- Obsoleted GetContentRegionAvailWidth(), use GetContentRegionAvail().x instead.
  Kept inline redirection function.
- Examples: Vulkan: Added MinImageCount/ImageCount fields in ImGui_ImplVulkan_InitInfo, required
  during initialization to specify the number of in-flight image requested by swap chains.
  (was previously a hard #define IMGUI_VK_QUEUED_FRAMES 2). (#2071, #1677) [@nathanvoglsam]
- Examples: Vulkan: Tidying up the demo/internals helpers (most engine/app should not rely
  on them but it is possible you have!).

Other Changes:

- ImDrawList: Added ImDrawCallback_ResetRenderState, a special ImDrawList::AddCallback() value
  to request the renderer backend to reset its render state. (#2037, #1639, #2452)
  Examples: Added support for ImDrawCallback_ResetRenderState in all renderer backends. Each
  renderer code setting up initial render state has been moved to a function so it could be
  called at the start of rendering and when a ResetRenderState is requested. [@ocornut, @bear24rw]
- InputText: Fixed selection background rendering one frame after the cursor movement when
  first transitioning from no-selection to has-selection. (Bug in 1.69) (#2436) [@Nazg-Gul]
- InputText: Work-around for buggy standard libraries where isprint('\t') returns true. (#2467, #1336)
- InputText: Fixed ImGuiInputTextFlags_AllowTabInput leading to two tabs characters being inserted
  if the backend provided both Key and Character input. (#2467, #1336)
- Layout: Added SetNextItemWidth() helper to avoid using PushItemWidth/PopItemWidth() for single items.
  Note that SetNextItemWidth() currently only affect the same subset of items as PushItemWidth(),
  generally referred to as the large framed+labeled items. Because the new SetNextItemWidth()
  function is explicit we may later extend its effect to more items.
- Layout: Fixed PushItemWidth(-width) for right-side alignment laying out some items (button, listbox, etc.)
  with negative sizes if the 'width' argument was smaller than the available width at the time of item
  submission.
- Window: Fixed window with the AlwaysAutoResize flag unnecessarily extending their hovering boundaries
  by a few pixels (this is used to facilitate resizing from borders when available for a given window).
  One of the noticeable minor side effect was that navigating menus would have had a tendency to disable
  highlight from parent menu items earlier than necessary while approaching the child menu.
- Window: Close button is horizontally aligned with style.FramePadding.x.
- Window: Fixed contents region being off by WindowBorderSize amount on the right when scrollbar is active.
- Window: Fixed SetNextWindowSizeConstraints() with non-rounded positions making windows drift. (#2067, #2530)
- Popups: Closing a popup restores the focused/nav window in place at the time of the popup opening,
  instead of restoring the window that was in the window stack at the time of the OpenPopup call. (#2517)
  Among other things, this allows opening a popup while no window are focused, and pressing Escape to
  clear the focus again.
- Popups: Fixed right-click from closing all popups instead of aiming at the hovered popup level
  (regression in 1.67).
- Selectable: With ImGuiSelectableFlags_AllowDoubleClick doesn't return true on the mouse button release
  following the double-click. Only first mouse release + second mouse down (double-click) returns true.
  Likewise for internal ButtonBehavior() with both _PressedOnClickRelease | _PressedOnDoubleClick. (#2503)
- GetMouseDragDelta(): also returns the delta on the mouse button released frame. (#2419)
- GetMouseDragDelta(): verify that mouse positions are valid otherwise returns zero.
- Inputs: Also add support for horizontal scroll with Shift+Mouse Wheel. (#2424, #1463) [@LucaRood]
- PlotLines, PlotHistogram: Ignore NaN values when calculating min/max bounds. (#2485)
- Columns: Fixed boundary of clipping being off by 1 pixel within the left column. (#125)
- Separator: Declare its thickness (1.0f) to the layout, making items around separator more symmetrical.
- Combo, Slider, Scrollbar: Improve rendering in situation when there's only a few pixels available (<3 pixels).
- Nav: Fixed Drag/Slider functions going into text input mode when keyboard CTRL is held while pressing NavActivate.
- Drag and Drop: Fixed drag source with ImGuiDragDropFlags_SourceAllowNullID and null ID from receiving click
  regardless of being covered by another window (it didn't honor correct hovering rules). (#2521)
- ImDrawList: Improved algorithm for mitre joints on thick lines, preserving correct thickness up to 90 degrees
  angles, also faster to output. (#2518) [@rmitton]
- Misc: Added IM_MALLOC/IM_FREE macros mimicking IM_NEW/IM_DELETE so user doesn't need to revert
  to using the ImGui::MemAlloc()/MemFree() calls directly.
- Misc: Made IMGUI_CHECKVERSION() macro also check for matching size of ImDrawIdx.
- Metrics: Added "Show windows rectangles" tool to visualize the different rectangles.
- Demo: Improved trees in columns demo.
- Examples: OpenGL: Added a test GL call + comments in ImGui_ImplOpenGL3_Init() to detect uninitialized
  GL function loaders early, and help users understand what they are missing. (#2421)
- Examples: SDL: Added support for SDL_GameController gamepads (enable with ImGuiConfigFlags_NavEnableGamepad). (#2509) [@DJLink]
- Examples: Emscripten: Added Emscripten+SDL+GLES2 example. (#2494, #2492, #2351, #336) [@nicolasnoble, @redblobgames]
- Examples: Metal: Added Glfw+Metal example. (#2527) [@bear24rw]
- Examples: OpenGL3: Minor tweaks + not calling glBindBuffer more than necessary in the render loop.
- Examples: Vulkan: Fixed in-flight buffers issues when using multi-viewports. (#2461, #2348, #2378, #2097)
- Examples: Vulkan: Added missing support for 32-bit indices (#define ImDrawIdx unsigned int).
- Examples: Vulkan: Avoid passing negative coordinates to vkCmdSetScissor, which debug validation layers do not like.
- Examples: Vulkan: Added ImGui_ImplVulkan_SetMinImageCount() to change min image count at runtime. (#2071) [@nathanvoglsam]
- Examples: DirectX9: Fixed erroneous assert in ImGui_ImplDX9_InvalidateDeviceObjects(). (#2454)
- Examples: DirectX10/11/12, Allegro, Marmalade: Render functions early out when display size is zero (minimized). (#2496)
- Examples: GLUT: Fixed existing FreeGLUT example to work with regular GLUT. (#2465) [@andrewwillmott]
- Examples: GLUT: Renamed imgui_impl_freeglut.cpp/.h to imgui_impl_glut.cpp/.h. (#2465) [@andrewwillmott]
- Examples: GLUT: Made io.DeltaTime always > 0. (#2430)
- Examples: Visual Studio: Updated default platform toolset+sdk in vcproj files from v100+sdk7 (vs2010)
  to v110+sdk8 (vs2012). This is mostly so we can remove reliance on DXSDK_DIR for the DX10/DX11 example,
  which if existing and when switching to recent SDK ends up conflicting and creating warnings.


-----------------------------------------------------------------------
 VERSION 1.69 (Released 2019-03-13)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.69

Breaking Changes:

- Renamed ColorEdit/ColorPicker's ImGuiColorEditFlags_RGB/_HSV/_HEX flags to respectively
  ImGuiColorEditFlags_DisplayRGB/_DisplayHSV/_DisplayHex. This is because the addition of
  new flag ImGuiColorEditFlags_InputHSV makes the earlier one ambiguous.
  Kept redirection enum values (will obsolete). (#2384) [@haldean]
- Renamed GetOverlayDrawList() to GetForegroundDrawList(). Kept redirection function (will obsolete). (#2391)

Other Changes:

- Added GetBackgroundDrawList() helper to quickly get access to a ImDrawList that will be rendered
  behind every other windows. (#2391, #545)
- DragScalar, InputScalar, SliderScalar: Added support for u8/s8/u16/s16 data types (ImGuiDataType_S8, etc.)
  We are reusing function instances of larger types to reduce code size. (#643, #320, #708, #1011)
- Added InputTextWithHint() to display a description/hint in the text box when no text
  has been entered. (#2400) [@Organic-Code, @ocornut]
- Nav: Fixed a tap on AltGR (e.g. German keyboard) from navigating to the menu layer.
- Nav: Fixed Ctrl+Tab keeping active InputText() of a previous window active after the switch. (#2380)
- Fixed IsItemDeactivated()/IsItemDeactivatedAfterEdit() from not correctly returning true
  when tabbing out of a focusable widget (Input/Slider/Drag) in most situations. (#2215, #1875)
- InputInt, InputFloat, InputScalar: Fix to keep the label of the +/- buttons centered when
  style.FramePadding.x is abnormally larger than style.FramePadding.y. Since the buttons are
  meant to be square (to align with e.g. color button) we always use FramePadding.y. (#2367)
- InputInt, InputScalar: +/- buttons now respects the natural type limits instead of
  overflowing or underflowing the value.
- InputText: Fixed an edge case crash that would happen if another widget sharing the same ID
  is being swapped with an InputText that has yet to be activated.
- InputText: Fixed various display corruption related to swapping the underlying buffer while
  a input widget is active (both for writable and read-only paths). Often they would manifest
  when manipulating the scrollbar of a multi-line input text.
- ColorEdit, ColorPicker, ColorButton: Added ImGuiColorEditFlags_InputHSV to manipulate color
  values encoded as HSV (in order to avoid HSV<>RGB round trips and associated singularities).
  (#2383, #2384) [@haldean]
- ColorPicker: Fixed a bug/assertion when displaying a color picker in a collapsed window
  while dragging its title bar. (#2389)
- ColorEdit: Fixed tooltip not honoring the ImGuiColorEditFlags_NoAlpha contract of never
  reading the 4th float in the array (value was read and discarded). (#2384) [@haldean]
- MenuItem, Selectable: Fixed disabled widget interfering with navigation (fix c2db7f63 in 1.67).
- Tabs: Fixed a crash when using many BeginTabBar() recursively (didn't affect docking). (#2371)
- Tabs: Added extra mis-usage error recovery. Past the assert, common mis-usage don't lead to
  hard crashes any more, facilitating integration with scripting languages. (#1651)
- Tabs: Fixed ImGuiTabItemFlags_SetSelected being ignored if the tab is not visible (with
  scrolling policy enabled) or if is currently appearing.
- Tabs: Fixed Tab tooltip code making drag and drop tooltip disappear during the frame where
  the drag payload activate a tab.
- Tabs: Reworked scrolling policy (when ImGuiTabBarFlags_FittingPolicyScroll is set) to
  teleport the view when aiming at a tab far away the visible section, and otherwise accelerate
  the scrolling speed to cap the scrolling time to 0.3 seconds.
- Text: Fixed large Text/TextUnformatted calls not feeding their size into layout when starting
  below the lower point of the current clipping rectangle. This bug has been there since v1.0!
  It was hardly noticeable but would affect the scrolling range, which in turn would affect
  some scrolling request functions when called during the appearing frame of a window.
- Plot: Fixed divide-by-zero in PlotLines() when passing a count of 1. (#2387) [@Lectem]
- Log/Capture: Fixed LogXXX functions emitting extraneous leading carriage return.
- Log/Capture: Fixed an issue when empty string on a new line would not emit a carriage return.
- Log/Capture: Fixed LogXXX functions 'auto_open_depth' parameter being treated as an absolute
  tree depth instead of a relative one.
- Log/Capture: Fixed CollapsingHeader trailing ascii representation being "#" instead of "##".
- ImFont: Added GetGlyphRangesVietnamese() helper. (#2403)
- Misc: Asserting in NewFrame() if style.WindowMinSize is zero or smaller than (1.0f,1.0f).
- Demo: Using GetBackgroundDrawList() and GetForegroundDrawList() in "Custom Rendering" demo.
- Demo: InputText: Demonstrating use of ImGuiInputTextFlags_CallbackResize. (#2006, #1443, #1008).
- Examples: GLFW, SDL: Preserve DisplayFramebufferScale when main viewport is minimized.
  (This is particularly useful for the viewport branch because we are not supporting per-viewport
  frame-buffer scale. It fixes windows not refreshing when main viewport is minimized.) (#2416)
- Examples: OpenGL: Fix to be able to run on ES 2.0 / WebGL 1.0. [@rmitton, @gabrielcuvillier]
- Examples: OpenGL: Fix for OSX not supporting OpenGL 4.5, we don't try to read GL_CLIP_ORIGIN
  even if the OpenGL headers/loader happens to define the value. (#2366, #2186)
- Examples: Allegro: Added support for touch events (emulating mouse). (#2219) [@dos1]
- Examples: DirectX9: Minor changes to match the other DirectX examples more closely. (#2394)


-----------------------------------------------------------------------
 VERSION 1.68 (Released 2019-02-19)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.68

Breaking Changes:

- Removed io.DisplayVisibleMin/DisplayVisibleMax (which were marked obsolete and removed from viewport/docking branch already).
- Made it illegal/assert when io.DisplayTime == 0.0f (with an exception for the first frame).
  If for some reason your time step calculation gives you a zero value, replace it with a arbitrarily small value!

Other Changes:

- Added .editorconfig file for text editors to standardize using spaces. (#2038) [@kudaba]
- ImDrawData: Added FramebufferScale field (currently a copy of the value from io.DisplayFramebufferScale).
  This is to allow render functions being written without pulling any data from ImGuiIO, allowing incoming
  multi-viewport feature to behave on Retina display and with multiple displays.
  If you are not using a custom backend, please update your render function code ahead of time,
  and use draw_data->FramebufferScale instead of io.DisplayFramebufferScale. (#2306, #1676)
- Added IsItemActivated() as an extension to the IsItemDeactivated/IsItemDeactivatedAfterEdit functions
  which are useful to implement variety of undo patterns. (#820, #956, #1875)
- InputText: Fixed a bug where ESCAPE would not restore the initial value in all situations. (#2321) [@relick]
- InputText: Fixed a bug where ESCAPE would be first captured by the Keyboard Navigation code. (#2321, #787)
- InputText: Fixed redo buffer exhaustion handling (rare) which could corrupt the undo character buffer. (#2333)
  The way the redo/undo buffers work would have made it generally unnoticeable to the user.
- Fixed range-version of PushID() and GetID() not honoring the ### operator to restart from the seed value.
- Fixed CloseCurrentPopup() on a child-menu of a modal incorrectly closing the modal. (#2308)
- Tabs: Added ImGuiTabBarFlags_TabListPopupButton flag to show a popup button on manual tab bars. (#261, #351)
- Tabs: Removed ImGuiTabBarFlags_NoTabListPopupButton which was available in 1.67 but actually had zero use.
- Tabs: Fixed a minor clipping glitch when changing style's FramePadding from frame to frame.
- Tabs: Fixed border (when enabled) so it is aligned correctly mid-pixel and appears as bright as other borders.
- Style, Selectable: Added ImGuiStyle::SelectableTextAlign and ImGuiStyleVar_SelectableTextAlign. (#2347) [@haldean]
- Menus: Tweaked horizontal overlap between parent and child menu (to help convey relative depth)
  from using style.ItemSpacing.x to style.ItemInnerSpacing.x, the later being expected to be smaller. (#1086)
- RadioButton: Fixed label horizontal alignment to precisely match Checkbox().
- Window: When resizing from an edge, the border is more visible and better follow the rounded corners.
- Window: Fixed initial width of collapsed windows not taking account of contents width (broken in 1.67). (#2336, #176)
- Scrollbar: Fade out and disable interaction when too small, in order to facilitate using the resize grab on very
  small window, as well as reducing visual noise/overlap.
- ListBox: Better optimized when clipped / non-visible.
- InputTextMultiline: Better optimized when clipped / non-visible.
- Font: Fixed high-level ImGui::CalcTextSize() used by most widgets from erroneously subtracting 1.0f*scale to
  calculated text width. Among noticeable side-effects, it would make sequences of repeated Text/SameLine calls
  not align the same as a single call, and create mismatch between high-level size calculation and those performed
  with the lower-level ImDrawList api. (#792) [@SlNPacifist]
- Font: Fixed building atlas when specifying duplicate/overlapping ranges within a same font. (#2353, #2233)
- ImDrawList: Fixed AddCircle(), AddCircleFilled() angle step being off, which was visible when drawing a "circle"
  with a small number of segments (e.g. an hexagon). (#2287) [@baktery]
- ImGuiTextBuffer: Added append() function (unformatted).
- ImFontAtlas: Added 0x2000-0x206F general punctuation range to default ChineseFull/ChineseSimplifiedCommon ranges. (#2093)
- ImFontAtlas: FreeType: Added support for imgui allocators + custom FreeType only SetAllocatorFunctions. (#2285) [@Vuhdo]
- ImFontAtlas: FreeType: Fixed using imgui_freetype.cpp in unity builds. (#2302)
- Demo: Fixed "Log" demo not initializing properly, leading to the first line not showing before a Clear. (#2318) [@bluescan]
- Demo: Added "Auto-scroll" option in Log/Console demos. (#2300) [@nicolasnoble, @ocornut]
- Examples: Metal, OpenGL2, OpenGL3, Vulkan: Fixed offsetting of clipping rectangle with ImDrawData::DisplayPos != (0,0)
  when the display frame-buffer scale scale is not (1,1). While this doesn't make a difference when using master branch,
  this is effectively fixing support for multi-viewport with Mac Retina Displays on those examples. (#2306) [@rasky, @ocornut]
  Also using ImDrawData::FramebufferScale instead of io.DisplayFramebufferScale.
- Examples: Clarified the use the ImDrawData::DisplayPos to offset clipping rectangles.
- Examples: Win32: Using GetForegroundWindow()+IsChild() instead of GetActiveWindow() to be compatible with windows created
  in a different thread or parent. (#1951, #2087, #2156, #2232) [many people]
- Examples: SDL: Using the SDL_WINDOW_ALLOW_HIGHDPI flag. (#2306, #1676) [@rasky]
- Examples: Win32: Added support for XInput gamepads (if ImGuiConfigFlags_NavEnableGamepad is enabled).
- Examples: Win32: Added support for mouse buttons 4 and 5 via WM_XBUTTON* messages. (#2264)
- Examples: DirectX9: Explicitly disable fog (D3DRS_FOGENABLE) before drawing in case user state has it set. (#2288, #2230)
- Examples: OpenGL2: Added #define GL_SILENCE_DEPRECATION to cope with newer XCode warnings.
- Examples: OpenGL3: Using GLSL 4.10 shaders for any GLSL version over 410 (e.g. 430, 450). (#2329) [@BrutPitt]


-----------------------------------------------------------------------
 VERSION 1.67 (Released 2019-01-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.67

Breaking Changes:

- Made it illegal to call Begin("") with an empty string. This somehow half-worked before but had various undesirable
  side-effect because the window would have ID zero. In particular it is causing problems in viewport/docking branches.
- Renamed io.ConfigResizeWindowsFromEdges to io.ConfigWindowsResizeFromEdges and removed its [Beta] mark.
  The addition of new configuration options in the Docking branch is pushing for a little reorganization of those names.
- Renamed ImFontAtlas::GlyphRangesBuilder to ImFontGlyphRangesBuilder. Kept redirection typedef (will obsolete).

Other Changes:
- Added BETA api for Tab Bar/Tabs widgets: (#261, #351)
  - Added BeginTabBar(), EndTabBar(), BeginTabItem(), EndTabItem(), SetTabItemClosed() API.
  - Added ImGuiTabBarFlags flags for BeginTabBar().
  - Added ImGuiTabItemFlags flags for BeginTabItem().
  - Style: Added ImGuiCol_Tab, ImGuiCol_TabHovered, ImGuiCol_TabActive, ImGuiCol_TabUnfocused, ImGuiCol_TabUnfocusedActive colors.
  - Demo: Added Layout->Tabs demo code.
  - Demo: Added "Documents" example app showcasing possible use for tabs.
  This feature was merged from the Docking branch in order to allow the use of regular tabs in your code.
  (It does not provide the docking/splitting/merging of windows available in the Docking branch)
- Added ImGuiWindowFlags_UnsavedDocument window flag to append '*' to title without altering the ID, as a convenience
  to avoid using the ### operator. In the Docking branch this also has an effect on tab closing behavior.
- Window, Focus, Popup: Fixed an issue where closing a popup by clicking another window with the _NoMove flag would refocus
  the parent window of the popup instead of the newly clicked window.
- Window: Contents size is preserved while a window collapsed. Fix auto-resizing window losing their size for one frame when uncollapsed.
- Window: Contents size is preserved while a window contents is hidden (unless it is hidden for resizing purpose).
- Window: Resizing windows from edge is now enabled by default (io.ConfigWindowsResizeFromEdges=true). Note that
  it only works _if_ the backend sets ImGuiBackendFlags_HasMouseCursors, which the standard backends do.
- Window: Added io.ConfigWindowsMoveFromTitleBarOnly option. This is ignored by window with no title bars (often popups).
  This affects clamping window within the visible area: with this option enabled title bars need to be visible. (#899)
- Window: Fixed using SetNextWindowPos() on a child window (which wasn't really documented) position the cursor as expected
  in the parent window, so there is no mismatch between the layout in parent and the position of the child window.
- InputFloat: When using ImGuiInputTextFlags_ReadOnly the step buttons are disabled. (#2257)
- DragFloat: Fixed broken mouse direction change with power!=1.0. (#2174, #2206) [@Joshhua5]
- Nav: Fixed an keyboard issue where holding Activate/Space for longer than two frames on a button would unnecessary
  keep the focus on the parent window, which could steal it from newly appearing windows. (#787)
- Nav: Fixed animated window titles from being updated when displayed in the CTRL+Tab list. (#787)
- Error recovery: Extraneous/undesired calls to End() are now being caught by an assert in the End() function closer
  to the user call site (instead of being reported in EndFrame). Past the assert, they don't lead to crashes any more. (#1651)
  Missing calls to End(), past the assert, should not lead to crashes or to the fallback Debug window appearing on screen.
  Those changes makes it easier to integrate dear imgui with a scripting language allowing, given asserts are redirected
  into e.g. an error log and stopping the script execution.
- ImFontAtlas: Stb and FreeType: Atlas width is now properly based on total surface rather than glyph count (unless overridden with TexDesiredWidth).
- ImFontAtlas: Stb and FreeType: Fixed atlas builder so missing glyphs won't influence the atlas texture width. (#2233)
- ImFontAtlas: Stb and FreeType: Fixed atlas builder so duplicate glyphs (when merging fonts) won't be included in the rasterized atlas.
- ImFontAtlas: FreeType: Fixed abnormally high atlas height.
- ImFontAtlas: FreeType: Fixed support for any values of TexGlyphPadding (not just only 1).
- ImDrawList: Optimized some of the functions for performance of debug builds where non-inline function call cost are non-negligible.
  (Our test UI scene on VS2015 Debug Win64 with /RTC1 went ~5.9 ms -> ~4.9 ms. In Release same scene stays at ~0.3 ms.)
- IO: Added BackendPlatformUserData, BackendRendererUserData, BackendLanguageUserData void* for storage use by backends.
- IO: Renamed InputCharacters[], marked internal as was always intended. Please don't access directly, and use AddInputCharacter() instead!
- IO: AddInputCharacter() goes into a queue which can receive as many characters as needed during the frame. This is useful
  for automation to not have an upper limit on typing speed. Will later transition key/mouse to use the event queue later.
- Style: Tweaked default value of style.DisplayWindowPadding from (20,20) to (19,19) so the default style as a value
  which is the same as the title bar height.
- Demo: "Simple Layout" and "Style Editor" are now using tabs.
- Demo: Added a few more things under "Child windows" (changing ImGuiCol_ChildBg, positioning child, using IsItemHovered after a child).
- Examples: DirectX10/11/12: Made imgui_impl_dx10/dx11/dx12.cpp link d3dcompiler.lib from the .cpp file to ease integration.
- Examples: Allegro 5: Properly destroy globals on shutdown to allow for restart. (#2262) [@DomRe]


-----------------------------------------------------------------------
 VERSION 1.66b (Released 2018-12-01)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.66b

Other Changes:

- Fixed a text rendering/clipping bug introduced in 1.66 (on 2018-10-12, commit ede3a3b9) that affect single ImDrawList::AddText()
  calls with single strings larger than 10k. Text/TextUnformatted() calls were not affected, but e.g. InputText() was. [@pdoane]
- When the focused window become inactive don't restore focus to a window with the ImGuiWindowFlags_NoInputs flag. (#2213) [@zzzyap]
- Separator: Fixed Separator() outputting an extraneous empty line when captured into clipboard/text/file.
- Demo: Added ShowAboutWindow() call, previously was only accessible from the demo window.
- Demo: ShowAboutWindow() now display various Build/Config Information (compiler, os, etc.) that can easily be copied into bug reports.
- Fixed build issue with osxcross and macOS. (#2218) [@dos1]
- Examples: Setting up 'io.BackendPlatformName'/'io.BackendRendererName' fields to the current backend can be displayed in the About window.
- Examples: SDL: changed the signature of ImGui_ImplSDL2_ProcessEvent() to use a const SDL_Event*. (#2187)


-----------------------------------------------------------------------
 VERSION 1.66 (Released 2018-11-22)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.66

Breaking Changes:

- Renamed SetScrollHere() to SetScrollHereY(). Kept redirection function (will obsolete).
- Renamed misc/stl/imgui_stl.* to misc/cpp/imgui_stdlib.* in prevision for other C++ helper files. (#2035, #2096)

Other Changes:

- Fixed calling SetNextWindowSize()/SetWindowSize() with non-integer values leading to
  accidental alteration of window position. We now round the provided size. (#2067)
- Fixed calling DestroyContext() always saving .ini data with the current context instead
  of the supplied context pointer. (#2066)
- Nav, Focus: Fixed ImGuiWindowFlags_NoBringToFrontOnFocus windows not being restoring focus
  properly after the main menu bar or last focused window is deactivated.
- Nav: Fixed an assert in certain circumstance (mostly when using popups) when mouse positions stop being valid. (#2168)
- Nav: Fixed explicit directional input not re-highlighting current nav item if there is a single item in the window
  and highlight has been previously disabled by the mouse. (#787)
- DragFloat: Fixed a situation where dragging with value rounding enabled or with a power curve
  erroneously wrapped the value to one of the min/max edge. (#2024, #708, #320, #2075).
- DragFloat: Disabled using power curve when one edge is FLT_MAX (broken in 1.61). (#2024)
- DragFloat: Disabled setting a default drag speed when one edge is FLT_MAX. (#2024)
- SliderAngle: Added optional format argument to alter precision or localize the string. (#2150) [@podsvirov]
- Window: Resizing from edges (with io.ConfigResizeWindowsFromEdges Beta flag) extends the hit region
  of root floating windows outside the window, making it easier to resize windows. Resize grips are also
  extended accordingly so there are no discontinuity when hovering between borders and corners. (#1495, #822)
- Window: Added ImGuiWindowFlags_NoBackground flag to avoid rendering window background. This is mostly to allow
  the creation of new flag combinations, as we could already use SetNextWindowBgAlpha(0.0f). (#1660) [@biojppm, @ocornut]
- Window: Added ImGuiWindowFlags_NoDecoration helper flag which is essentially NoTitleBar+NoResize+NoScrollbar+NoCollapse.
- Window: Added ImGuiWindowFlags_NoMouseInputs which is basically the old ImGuiWindowFlags_NoInputs (essentially
  we have renamed ImGuiWindowFlags_NoInputs to ImGuiWindowFlags_NoMouseInputs). Made the new ImGuiWindowFlags_NoInputs
  encompass both NoMouseInputs+NoNav, which is consistent with its description. (#1660, #787)
- Window, Inputs: Fixed resizing from edges when io.MousePos is not pixel-rounded by rounding mouse position input. (#2110)
- BeginChild(): Fixed BeginChild(const char*, ...) variation erroneously not applying the ID stack
  to the provided string to uniquely identify the child window. This was undoing an intentional change
  introduced in 1.50 and broken in 1.60. (#1698, #894, #713).
- TextUnformatted(): Fixed a case where large-text path would read bytes past the text_end marker depending
  on the position of new lines in the buffer (it wasn't affecting the output but still not the right thing to do!)
- ListBox(): Fixed frame sizing when items_count==1 unnecessarily showing a scrollbar. (#2173) [@luk1337, @ocornut]
- ListBox(): Tweaked frame sizing so list boxes will look more consistent when FramePadding is far from ItemSpacing.
- RenderText(): Some optimization for very large text buffers, useful for non-optimized builds.
- BeginMenu(): Fixed menu popup horizontal offset being off the item in the menu bar when WindowPadding=0.0f.
- ArrowButton(): Fixed arrow shape being horizontally misaligned by (FramePadding.y-FramePadding.x) if they are different.
- Demo: Split the contents of ShowDemoWindow() into smaller functions as it appears to speed up link time with VS. (#2152)
- Drag and Drop: Added GetDragDropPayload() to peek directly into the payload (if any) from anywhere. (#143)
- ImGuiTextBuffer: Avoid heap allocation when empty.
- ImDrawList: Fixed AddConvexPolyFilled() undefined behavior when passing points_count smaller than 3,
  in particular, points_count==0 could lead to a memory stomp if the draw list was previously empty.
- Examples: DirectX10, DirectX11: Removed seemingly unnecessary calls to invalidate and recreate device objects
  in the WM_SIZE handler. (#2088) [@ice1000]
- Examples: GLFW: User previously installed GLFW callbacks are now saved and chain-called by the default callbacks. (#1759)
- Examples: OpenGL3: Added support for GL 4.5's glClipControl(GL_UPPER_LEFT). (#2186)
- Examples: OpenGL3+GLFW: Fixed error condition when using the GLAD loader. (#2157) [@blackball]
- Examples: OpenGL3+GLFW/SDL: Made main.cpp compile with IMGUI_IMPL_OPENGL_LOADER_CUSTOM (may be missing init). (#2178) [@doug-moen]
- Examples: SDL2+Vulkan: Fixed application shutdown which could deadlock on Linux + Xorg. (#2181) [@eRabbit0]


-----------------------------------------------------------------------
 VERSION 1.65 (Released 2018-09-06)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.65

Breaking Changes:

- Renamed stb_truetype.h to imstb_truetype.h, stb_textedit.h to imstb_textedit.h, and
  stb_rect_pack.h to imstb_rectpack.h. If you were conveniently using the imgui copy of those
  STB headers in your project, you will have to update your include paths. (#1718, #2036)
  The reason for this change is to avoid conflicts for projects that may also be importing
  their own copy of the STB libraries. Note that imgui's copy of stb_textedit.h is modified.
- Renamed io.ConfigCursorBlink to io.ConfigInputTextCursorBlink. (#1427)

Other Changes:

- This is a minor release following the 1.64 refactor, with a little more shuffling of code.
- Clarified and improved the source code sectioning in all files (easier to search or browse sections).
- Nav: Removed the [Beta] tag from various descriptions of the gamepad/keyboard navigation system.
  Although it is not perfect and will keep being improved, it is fairly functional and used by many. (#787)
- Fixed a build issue with non-Cygwin GCC under Windows.
- Demo: Added a "Configuration" block to make io.ConfigFlags/io.BackendFlags more prominent.
- Examples: OpenGL3+SDL2: Fixed error condition when using the GLAD loader. (#2059, #2002) [@jiri]


-----------------------------------------------------------------------
 VERSION 1.64 (Released 2018-08-31)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.64

Changes:

- Moved README, CHANGELOG and TODO files to the docs/ folder.
  If you are updating dear imgui by copying files, take the chance to delete the old files.
- Added imgui_widgets.cpp file, extracted and moved widgets code out of imgui.cpp into imgui_widgets.cpp.
  Re-ordered some of the code remaining in imgui.cpp.
  NONE OF THE FUNCTIONS HAVE CHANGED. THE CODE IS SEMANTICALLY 100% IDENTICAL, BUT _EVERY_ FUNCTIONS HAS BEEN MOVED.
  Because of this, any local modifications to imgui.cpp will likely conflict when you update.
  If you have any modifications to imgui.cpp, it is suggested that you first update to 1.63, then
  isolate your patches. You can peak at imgui_widgets.cpp from 1.64 to get a sense of what is included in it,
  then separate your changes into several patches that can more easily be applied to 1.64 on a per-file basis.
  What I found worked nicely for me, was to open the diff of the old patches in an interactive merge/diff tool,
  search for the corresponding function in the new code and apply the chunks manually.
- As a reminder, if you have any change to imgui.cpp it is a good habit to discuss them on the github,
  so a solution applicable on the Master branch can be found. If your company has changes that you cannot
  disclose you may also contact me privately.


-----------------------------------------------------------------------
 VERSION 1.63 (Released 2018-08-29)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.63

Breaking Changes:

- Style: Renamed ImGuiCol_ModalWindowDarkening to ImGuiCol_ModalWindowDimBg for consistency with other features.
  Kept redirection enum (will obsolete).
- Changed ImGui::GetTime() return value from float to double to avoid accumulating floating point imprecision over time.
- Removed per-window ImGuiWindowFlags_ResizeFromAnySide Beta flag in favor `io.ConfigResizeWindowsFromEdges=true` to
  enable the feature globally. (#1495)
  The feature is not currently enabled by default because it is not satisfying enough, but will eventually be.
- InputText: Renamed ImGuiTextEditCallback to ImGuiInputTextCallback, ImGuiTextEditCallbackData to ImGuiInputTextCallbackData
  for consistency. Kept redirection types (will obsolete).
- InputText: Removed ImGuiTextEditCallbackData::ReadOnly because it is a duplication of (::Flags & ImGuiInputTextFlags_ReadOnly).
- Renamed IsItemDeactivatedAfterChange() to IsItemDeactivatedAfterEdit() for consistency with new IsItemEdited() API.
  Kept redirection function (will obsolete soonish as IsItemDeactivatedAfterChange() is very recent).
- Renamed io.OptCursorBlink to io.ConfigCursorBlink [-> io.ConfigInputTextCursorBlink in 1.65], io.OptMacOSXBehaviors to
  io.ConfigMacOSXBehaviors for consistency. (#1427, #473)
- Removed obsolete redirection functions: CollapsingHeader() variation with 2 bools - marked obsolete in v1.49, May 2016.

Other Changes:

- ArrowButton: Fixed to honor PushButtonRepeat() setting (and internals' ImGuiItemFlags_ButtonRepeat).
- ArrowButton: Setup current line text baseline so that ArrowButton() + SameLine() + Text() are aligned properly.
- Nav: Added a CTRL+TAB window list and changed the highlight system accordingly. The change is motivated by upcoming
  Docking features. (#787)
- Nav: Made CTRL+TAB skip menus + skip the current navigation window if is has the ImGuiWindow_NoNavFocus set. (#787)
  While it was previously possible, you won't be able to CTRL-TAB out and immediately back in a window with the
  ImGuiWindow_NoNavFocus flag.
- Window: Allow menu and popups windows from ignoring the style.WindowMinSize values so short menus/popups are not padded. (#1909)
- Window: Added global io.ConfigResizeWindowsFromEdges option to enable resizing windows from their edges and from
  the lower-left corner. (#1495)
- Window: Collapse button shows hovering highlight + clicking and dragging on it allows to drag the window as well.
- Added IsItemEdited() to query if the last item modified its value (or was pressed). This is equivalent to the bool
  returned by most widgets.
  It is useful in some situation e.g. using InputText() with ImGuiInputTextFlags_EnterReturnsTrue. (#2034)
- InputText: Added support for buffer size/capacity changes via the ImGuiInputTextFlags_CallbackResize flag. (#2006, #1443, #1008).
- InputText: Fixed not tracking the cursor horizontally when modifying the text buffer through a callback.
- InputText: Fixed minor off-by-one issue when submitting a buffer size smaller than the initial zero-terminated buffer contents.
- InputText: Fixed a few pathological crash cases on single-line InputText widget with multiple millions characters worth of contents.
  Because the current text drawing function reserve for a worst-case amount of vertices and how we handle horizontal clipping,
  we currently just avoid displaying those single-line widgets when they are over a threshold of 2 millions characters,
  until a better solution is found.
- Drag and Drop: Fixed an incorrect assert when dropping a source that is submitted after the target (bug introduced with 1.62 changes
  related to the addition of IsItemDeactivated()). (#1875, #143)
- Drag and Drop: Fixed ImGuiDragDropFlags_SourceNoDisableHover to affect hovering state prior to calling IsItemHovered() + fixed description. (#143)
- Drag and Drop: Calling BeginTooltip() between a BeginDragSource()/EndDragSource() or BeginDropTarget()/EndDropTarget() uses adjusted tooltip
  settings matching the one created when calling BeginDragSource() without the ImGuiDragDropFlags_SourceNoPreviewTooltip flag. (#143)
- Drag and Drop: Payload stays available and under the mouse if the source stops being submitted, however the tooltip is replaced by "...". (#1725)
- Drag and Drop: Added ImGuiDragDropFlags_SourceAutoExpirePayload flag to force payload to expire if the source stops being submitted. (#1725, #143).
- IsItemHovered(): Added ImGuiHoveredFlags_AllowWhenDisabled flag to query hovered status on disabled items. (#1940, #211)
- Selectable: Added ImGuiSelectableFlags_Disabled flag in the public API. (#211)
- ColorEdit4: Fixed a bug when text input or drag and drop leading to unsaturated HSV values would erroneously alter the resulting color. (#2050)
- Misc: Added optional misc/stl/imgui_stl.h wrapper to use with STL types (e.g. InputText with std::string). (#2006, #1443, #1008)
  [*EDIT* renamed to misc/std/imgui_stdlib.h in 1.66]
- Misc: Added IMGUI_VERSION_NUM for easy compile-time testing. (#2025)
- Misc: Added ImGuiMouseCursor_Hand cursor enum + corresponding software cursor. (#1913, 1914) [@aiekick, @ocornut]
- Misc: Tweaked software mouse cursor offset to match the offset of the corresponding Windows 10 cursors.
- Made assertion more clear when trying to call Begin() outside of the NewFrame()..EndFrame() scope. (#1987)
- Fixed assertion when transitioning from an active ID to another within a group, affecting ColorPicker (broken in 1.62). (#2023, #820, #956, #1875).
- Fixed PushID() from keeping alive the new ID Stack top value (if a previously active widget shared the ID it would be erroneously kept alive).
- Fixed horizontal mouse wheel not forwarding the request to the parent window if ImGuiWindowFlags_NoScrollWithMouse is set. (#1463, #1380, #1502)
- Fixed a include build issue for Cygwin in non-POSIX (Win32) mode. (#1917, #1319, #276)
- ImDrawList: Improved handling for worst-case vertices reservation policy when large amount of text (e.g. 1+ million character strings)
  are being submitted in a single call. It would typically have crashed InputTextMultiline(). (#200)
- OS/Windows: Fixed missing ImmReleaseContext() call in the default Win32 IME handler. (#1932) [@vby]
- Metrics: Changed io.MetricsActiveWindows to reflect the number of active windows (!= from visible windows), which is useful
  for lazy/idle render mechanisms as new windows are typically not visible for one frame.
- Metrics: Added io.MetricsRenderWindow to reflect the number of visible windows.
- Metrics: Added io.MetricsActiveAllocations, moving away from the cross-context global counters than we previously used. (#1565, #1599, #586)
- Demo: Added basic Drag and Drop demo. (#143)
- Demo: Modified the Console example to use InsertChars() in the input text callback instead of poking directly into the buffer.
  Although this won't make a difference in the example itself, using InsertChars() will honor the resizing callback properly. (#2006, #1443, #1008).
- Demo: Clarified the use of IsItemHovered()/IsItemActive() right after being in the "Active, Focused, Hovered & Focused Tests" section.
- Examples: Tweaked the main.cpp of each example.
- Examples: Metal: Added Metal rendering backend. (#1929, #1873) [@warrenm]
- Examples: OSX: Added early raw OSX platform backend. (#1873) [@pagghiu, @itamago, @ocornut]
- Examples: Added mac OSX & iOS + Metal example in example_apple_metal/. (#1929, #1873) [@warrenm]
- Examples: Added mac OSX + OpenGL2 example in example_apple_opengl2/. (#1873)
- Examples: OpenGL3: Added shaders more versions of GLSL. (#1938, #1941, #1900, #1513, #1466, etc.)
- Examples: OpenGL3: Tweaked the imgui_impl_opengl3.cpp to work as-is with Emscripten + WebGL 2.0. (#1941). [@o-micron]
- Examples: OpenGL3: Made the example app default to GL 3.0 + GLSL 130 (instead of GL 3.2 + GLSL 150) unless on Mac.
- Examples: OpenGL3: Added error output when shaders fail to compile/link.
- Examples: OpenGL3: Added support for glew and glad OpenGL loaders out of the box. (#2001, #2002) [@jdumas]
- Examples: OpenGL2: Disabling/restoring GL_LIGHTING and GL_COLOR_MATERIAL to increase compatibility with legacy OpenGL applications. (#1996)
- Examples: DirectX10, DirectX11: Fixed unreleased resources in Init and Shutdown functions. (#1944)
- Examples: DirectX11: Querying for IDXGIFactory instead of IDXGIFactory1 to increase compatibility. (#1989) [@matt77hias]
- Examples: Vulkan: Fixed handling of VkSurfaceCapabilitiesKHR::maxImageCount = 0 case. Tweaked present mode selections.
- Examples: Win32, Glfw, SDL: Added support for the ImGuiMouseCursor_Hand cursor.


-----------------------------------------------------------------------
 VERSION 1.62 (Released 2018-06-22)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.62

Breaking Changes:

- TreeNodeEx(): The helper ImGuiTreeNodeFlags_CollapsingHeader flag now include ImGuiTreeNodeFlags_NoTreePushOnOpen.
  The flag was already set by CollapsingHeader().
  The only difference is if you were using TreeNodeEx() manually with ImGuiTreeNodeFlags_CollapsingHeader and without
  ImGuiTreeNodeFlags_NoTreePushOnOpen. In this case you can remove the ImGuiTreeNodeFlags_NoTreePushOnOpen flag from
  your call (ImGuiTreeNodeFlags_CollapsingHeader & ~ImGuiTreeNodeFlags_NoTreePushOnOpen). (#1864)
  This also apply if you were using internal's TreeNodeBehavior() with the ImGuiTreeNodeFlags_CollapsingHeader flag directly.
- ImFontAtlas: Renamed GetGlyphRangesChinese() to GetGlyphRangesChineseFull() to distinguish new smaller variants and
  discourage using the full set. (#1859)

Other Changes:

- Examples backends have been refactored to separate the platform code (e.g. Win32, Glfw, SDL2) from the renderer code (e.g. DirectX11, OpenGL3, Vulkan).
  The "Platform" backends are in charge of: mouse/keyboard/gamepad inputs, cursor shape, timing, etc.
  The "Renderer" backends are in charge of: creating the main font texture, rendering imgui draw data.
      before: imgui_impl_dx11.cpp        --> after: imgui_impl_win32.cpp + imgui_impl_dx11.cpp
      before: imgui_impl_dx12.cpp        --> after: imgui_impl_win32.cpp + imgui_impl_dx12.cpp
      before: imgui_impl_glfw_gl3.cpp    --> after: imgui_impl_glfw.cpp + imgui_impl_opengl2.cpp
      before: imgui_impl_glfw_vulkan.cpp --> after: imgui_impl_glfw.cpp + imgui_impl_vulkan.cpp
      before: imgui_impl_sdl_gl3.cpp     --> after: imgui_impl_sdl2.cpp + imgui_impl_opengl2.cpp
      before: imgui_impl_sdl_gl3.cpp     --> after: imgui_impl_sdl2.cpp + imgui_impl_opengl3.cpp etc.
  - The idea is what we can now easily combine and maintain backends and reduce code redundancy. Individual files are
    smaller and more reusable. Integration of imgui into a new/custom engine may also be easier as there is less overlap
    between "windowing / inputs" and "rendering" code, so you may study or grab one half of the code and not the other.
  - This change was motivated by the fact that adding support for the upcoming multi-viewport feature requires more work
    from the Platform and Renderer backends, and the amount of redundancy across files was becoming too difficult to
    maintain. If you use default backends, you'll benefit from an easy update path to support multi-viewports later
    (for future ImGui 1.7x).
  - This is not strictly a breaking change if you keep your old backends, but when you'll want to fully update your backends,
    expect to have to reshuffle a few things.
  - Each example still has its own main.cpp which you may refer you to understand how to initialize and glue everything together.
  - Some frameworks (such as the Allegro, Marmalade) handle both the "platform" and "rendering" part, and your custom engine may as well.
  - Read examples/README.txt for details.
- Added IsItemDeactivated() to query if the last item was active previously and isn't anymore. Useful for Undo/Redo patterns. (#820, #956, #1875)
- Added IsItemDeactivatedAfterChange() [*EDIT* renamed to IsItemDeactivatedAfterEdit() in 1.63] if the last item was active previously,
  is not anymore, and during its active state modified a value. Note that you may still get false positive (e.g. drag value and while
  holding return on the same value). (#820, #956, #1875)
- Nav: Added support for PageUp/PageDown (explorer-style: first aim at bottom/top most item, when scroll a page worth of contents). (#787)
- Nav: To keep the navigated item in view we also attempt to scroll the parent window as well as the current window. (#787)
- ColorEdit3, ColorEdit4, ColorButton: Added ImGuiColorEditFlags_NoDragDrop flag to disable ColorEditX as drag target and ColorButton as drag source. (#1826)
- BeginDragDropSource(): Offset tooltip position so it is off the mouse cursor, but also closer to it than regular tooltips,
  and not clamped by viewport. (#1739)
- BeginDragDropTarget(): Added ImGuiDragDropFlags_AcceptNoPreviewTooltip flag to request hiding the drag source tooltip
  from the target site. (#143)
- BeginCombo(), BeginMainMenuBar(), BeginChildFrame(): Temporary style modification are restored at the end of BeginXXX
  instead of EndXXX, to not affect tooltips and child windows.
- Popup: Improved handling of (erroneously) repeating calls to OpenPopup() to not close the popup's child popups. (#1497, #1533, #1865).
- InputTextMultiline(): Fixed double navigation highlight when scrollbar is active. (#787)
- InputText(): Fixed Undo corruption after pasting large amount of text (Redo will still fail when undo buffers are exhausted,
  but text won't be corrupted).
- SliderFloat(): When using keyboard/gamepad and a zero precision format string (e.g. "%.0f"), always step in integer units. (#1866)
- ImFontConfig: Added GlyphMinAdvanceX/GlyphMaxAdvanceX settings useful to make a font appears monospaced, particularly useful
  for icon fonts. (#1869)
- ImFontAtlas: Added GetGlyphRangesChineseSimplifiedCommon() helper that returns a list of ~2500 most common Simplified Chinese
  characters. (#1859) [@JX-Master, @ocornut]
- Examples: OSX: Added imgui_impl_osx.mm backend to be used along with e.g. imgui_impl_opengl2.cpp. (#281, #1870) [@pagghiu, @itamago, @ocornut]
- Examples: GLFW: Made it possible to Shutdown/Init the backend again (by resetting the time storage properly). (#1827) [@ice1000]
- Examples: Win32: Fixed handling of mouse wheel messages to support sub-unit scrolling messages (typically sent by track-pads). (#1874) [@zx64]
- Examples: SDL+Vulkan: Added SDL+Vulkan example.
- Examples: Allegro5: Added support for ImGuiConfigFlags_NoMouseCursorChange flag. Added clipboard support.
- Examples: Allegro5: Unindexing buffers ourselves as Allegro indexed drawing primitives are buggy in the DirectX9 backend
  (will be fixed in Allegro 5.2.5+).
- Examples: DirectX12: Moved the ID3D12GraphicsCommandList* parameter from ImGui_ImplDX12_NewFrame() to ImGui_ImplDX12_RenderDrawData() which makes a lots more sense. (#301)
- Examples: Vulkan: Reordered parameters ImGui_ImplVulkan_RenderDrawData() to be consistent with other backends,
  a good occasion since we refactored the code.
- Examples: FreeGLUT: Added FreeGLUT backends. Added FreeGLUT+OpenGL2 example. (#801)
- Examples: The functions in imgui_impl_xxx.cpp are prefixed with IMGUI_IMPL_API (which defaults to IMGUI_API) to facilitate
  some uses. (#1888)
- Examples: Fixed backends to use ImGuiMouseCursor_COUNT instead of old name ImGuiMouseCursor_Count_ so they can compile
  with IMGUI_DISABLE_OBSOLETE_FUNCTIONS. (#1887)
- Misc: Updated stb_textedit from 1.09 + patches to 1.12 + minor patches.
- Internals: PushItemFlag() flags are inherited by BeginChild().


-----------------------------------------------------------------------
 VERSION 1.61 (Released 2018-05-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.61

Breaking Changes:

- DragInt(): The default compile-time format string has been changed from "%.0f" to "%d", as we are not using integers internally
  any more. If you used DragInt() with custom format strings, make sure you change them to use %d or an integer-compatible format.
  To honor backward-compatibility, the DragInt() code will currently parse and modify format strings to replace %*f with %d,
  giving time to users to upgrade their code.
  If you have IMGUI_DISABLE_OBSOLETE_FUNCTIONS enabled, the code will instead assert! You may run a reg-exp search on your
  codebase for e.g. "DragInt.*%f" to you find them.
- InputFloat(): Obsoleted InputFloat() functions taking an optional "int decimal_precision" in favor of an equivalent and more
  flexible "const char* format", consistent with other functions. Kept redirection functions (will obsolete).
- Misc: IM_DELETE() helper function added in 1.60 doesn't set the input pointer to NULL, more consistent with standard
  expectation and allows passing r-values.

Other Changes:

- Added DragScalar, DragScalarN: supports signed/unsigned, 32/64 bits, float/double data types. (#643, #320, #708, #1011)
- Added InputScalar, InputScalarN: supports signed/unsigned, 32/64 bits, float/double data types. (#643, #320, #708, #1011)
- Added SliderScalar, SliderScalarN: supports signed/unsigned, 32/64 bits, float/double data types. (#643, #320, #708, #1011)
- Window: Fixed pop-ups/tooltips/menus not honoring style.DisplaySafeAreaPadding as well as it should have (part of menus
  displayed outside the safe area, etc.).
- Window: Fixed windows using the ImGuiWindowFlags_NoSavedSettings flag from not using the same default position as other windows. (#1760)
- Window: Relaxed the internal stack size checker to allow Push/Begin/Pop/.../End patterns to be used with PushStyleColor, PushStyleVar, PushFont without causing a false positive assert. (#1767)
- Window: Fixed the default proportional item width lagging by one frame on resize.
- Columns: Fixed a bug introduced in 1.51 where columns would affect the contents size of their container, often creating
  feedback loops when ImGuiWindowFlags_AlwaysAutoResize was used. (#1760)
- Settings: Fixed saving an empty .ini file if CreateContext/DestroyContext are called without a single call to NewFrame(). (#1741)
- Settings: Added LoadIniSettingsFromDisk(), LoadIniSettingsFromMemory(), SaveIniSettingsToDisk(), SaveIniSettingsToMemory()
  to manually load/save .ini settings. (#923, #993)
- Settings: Added io.WantSaveIniSettings flag, which is set to notify the application that e.g. SaveIniSettingsToMemory()
  should be called. (#923, #993)
- Scrolling: Fixed a case where using SetScrollHere(1.0f) at the bottom of a window on the same frame the window height
  has been growing would have the scroll clamped using the previous height. (#1804)
- MenuBar: Made BeginMainMenuBar() honor style.DisplaySafeAreaPadding so the text can be made visible on TV settings that
  don't display all pixels. (#1439) [@dougbinks]
- InputText: On Mac OS X, filter out characters when the CMD modifier is held. (#1747) [@sivu]
- InputText: On Mac OS X, support CMD+SHIFT+Z for Redo. CMD+Y is also supported as major apps seems to default to support both. (#1765) [@lfnoise]
- InputText: Fixed returning true when edition is cancelled with ESC and the current buffer matches the initial value.
- InputFloat,InputFloat2,InputFloat3,InputFloat4: Added variations taking a more flexible and consistent optional
  "const char* format" parameter instead of "int decimal_precision". This allow using custom formats to display values
  in scientific notation, and is generally more consistent with other API.
  Obsoleted functions using the optional "int decimal_precision" parameter. (#648, #712)
- DragFloat, DragInt: Cancel mouse tweak when current value is initially past the min/max boundaries and mouse is pushing
  in the same direction (keyboard/gamepad version already did this).
- DragFloat, DragInt: Honor natural type limits (e.g. INT_MAX, FLT_MAX) instead of wrapping around. (#708, #320)
- DragFloat, SliderFloat: Fixes to allow input of scientific notation numbers when using CTRL+Click to input the value. (~#648, #1011)
- DragFloat, SliderFloat: Rounding-on-write uses the provided format string instead of parsing the precision from the string,
  which allows for finer uses of %e %g etc. (#648, #642)
- DragFloat: Improved computation when using the power curve. Improved lost of input precision with very small steps.
  Added an assert than power-curve requires a min/max range. (~#642)
- DragFloat: The 'power' parameter is only honored if the min/max parameter are also setup.
- DragInt, SliderInt: Fixed handling of large integers (we previously passed data around internally as float, which reduced
  the range of valid integers).
- ColorEdit: Fixed not being able to pass the ImGuiColorEditFlags_NoAlpha or ImGuiColorEditFlags_HDR flags to SetColorEditOptions().
- Nav: Fixed hovering a Selectable() with the mouse so that it update the navigation cursor (as it happened in the pre-1.60 navigation branch). (#787)
- Style: Changed default style.DisplaySafeAreaPadding values from (4,4) to (3,3) so it is smaller than FramePadding and has no effect on main menu bar on a computer. (#1439)
- Fonts: When building font atlas, glyphs that are missing in the fonts are not using the glyph slot to render the default glyph. Saves space and allow merging fonts with
  overlapping font ranges such as FontAwesome5 which split out the Brands separately from the Solid fonts. (#1703, #1671)
- Misc: Added IMGUI_CHECKVERSION() macro to compare version string and data structure sizes in order to catch issues with mismatching compilation unit settings. (#1695, #1769)
- Misc: Added IMGUI_DISABLE_MATH_FUNCTIONS in imconfig.h to make it easier to redefine wrappers for std/crt math functions.
- Misc: Fix to allow compiling in unity builds where stb_rectpack/stb_truetype may be already included in the same compilation unit.
- Demo: Simple Overlay: Added a context menu item to enable freely moving the window.
- Demo: Added demo for DragScalar(), InputScalar(), SliderScalar(). (#643)
- Examples: Calling IMGUI_CHECKVERSION() in the main.cpp of every example application.
- Examples: Allegro 5: Added support for 32-bit indices setup via defining ImDrawIdx, to avoid an unnecessary conversion (Allegro 5 doesn't support 16-bit indices).
- Examples: Allegro 5: Renamed backend from imgui_impl_a5.cpp to imgui_impl_allegro5.cpp.
- Examples: DirectX 9: Saving/restoring Transform because they don't seem to be included in the StateBlock. Setting shading mode to Gouraud. (#1790, #1687) [@sr-tream]
- Examples: SDL: Fixed clipboard paste memory leak in the SDL backend code. (#1803) [@eliasdaler]
- Various minor fixes, tweaks, refactoring, comments.


-----------------------------------------------------------------------
 VERSION 1.60 (Released 2018-04-07)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.60

The gamepad/keyboard navigation branch (which has been in the work since July 2016) has been merged.
Gamepad/keyboard navigation is still marked as Beta and has to be enabled explicitly.
Various internal refactoring have also been done, as part of the navigation work and as part of the upcoming viewport/docking work.

Breaking Changes:

- Obsoleted the io.RenderDrawListsFn callback, you can call your graphics engine render function after ImGui::Render().
  e.g. with example backends, call ImDrawData* draw_data = ImGui::GetDrawData(); ImGui_ImplXXXX_RenderDrawData(draw_data).
- Reorganized context handling to be more explicit: (#1599)
  - YOU NOW NEED TO CALL ImGui::CreateContext() AT THE BEGINNING OF YOUR APP, AND CALL ImGui::DestroyContext() AT THE END.
  - removed Shutdown() function, as DestroyContext() serve this purpose. If you are using an old backend from the examples/ folder, remove the line that calls Shutdown().
  - you may pass a ImFontAtlas* pointer to CreateContext() to share a font atlas between contexts. Otherwise CreateContext() will create its own font atlas instance.
  - removed allocator parameters from CreateContext(), they are now setup with SetAllocatorFunctions(), and shared by all contexts.
  - removed the default global context and font atlas instance, which were confusing for users of DLL reloading and users of multiple contexts.
- Renamed ImGuiStyleVar_Count_ to ImGuiStyleVar_COUNT and ImGuiMouseCursor_Count_ to ImGuiMouseCursor_COUNT for consistency with other public enums.
- Fonts: Moved sample TTF files from extra_fonts/ to misc/fonts/. If you loaded files directly from the imgui repo you may need to update your paths.
- Fonts: Changed ImFont::DisplayOffset.y to defaults to 0 instead of +1. Fixed vertical rounding of Ascent/Descent to match TrueType renderer.
  If you were adding or subtracting (not assigning) to ImFont::DisplayOffset check if your fonts are correctly aligned vertically. (#1619)
- BeginDragDropSource(): temporarily removed the optional mouse_button=0 parameter because it is not really usable in many situations at the moment.
- Obsoleted IsAnyWindowHovered() in favor of IsWindowHovered(ImGuiHoveredFlags_AnyWindow). Kept redirection function (will obsolete).
- Obsoleted IsAnyWindowFocused() in favor of IsWindowFocused(ImGuiFocusedFlags_AnyWindow). Kept redirection function (will obsolete).
- Renamed io.WantMoveMouse to io.WantSetMousePos for consistency and ease of understanding (was added in 1.52, not used by core, and honored by some backend ahead of merging the Nav branch).
- Removed ImGuiCol_CloseButton, ImGuiCol_CloseButtonActive, ImGuiCol_CloseButtonHovered style colors as the closing cross uses regular button colors now.
- Renamed ImGuiSizeConstraintCallback to ImGuiSizeCallback, ImGuiSizeConstraintCallbackData to ImGuiSizeCallbackData.
- Removed CalcItemRectClosestPoint() which was weird and not really used by anyone except demo code. If you need it should be easy to replicate on your side (you can find the code in 1.53).
- [EDITED] Window: BeginChild() with an explicit name doesn't include the hash within the internal window name. (#1698)
  This change was erroneously introduced, undoing the change done for #894, #713, and not documented properly in the original
  1.60 release Changelog. It was fixed on 2018-09-28 (1.66) and I wrote this paragraph the same day.

Other Changes:

- Doc: Added a Changelog file in the repository to ease comparing versions (it goes back to dear imgui 1.48), until now it was only on GitHub.
- Navigation: merged in the gamepad/keyboard navigation (about a million changes!). (#787, #323)
  The initial focus was to support game controllers, but keyboard is becoming increasingly and decently usable.
- To use Gamepad Navigation:
  - Set io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad to enable.
  - Backend: Set io.BackendFlags |= ImGuiBackendFlags_HasGamepad + fill the io.NavInputs[] fields before calling NewFrame(). Read imgui.cpp for more details.
  - See https://github.com/ocornut/imgui/issues/1599 for recommended gamepad mapping or download PNG/PSD at http://goo.gl/9LgVZW
  - See 'enum ImGuiNavInput_' in imgui.h for a description of inputs. Read imgui.cpp for more details.
- To use Keyboard Navigation:
  - Set io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard to enable. NewFrame() will automatically
    fill io.NavInputs[] based on your io.KeysDown[] + io.KeyMap[] arrays.
  - Basic controls: arrows to navigate, Alt to enter menus, Space to activate item, Enter to edit text,
    Escape to cancel/close, Ctrl-Tab to focus windows, etc.
  - When keyboard navigation is active (io.NavActive + ImGuiConfigFlags_NavEnableKeyboard),
    the io.WantCaptureKeyboard flag will be set.
  - For more advanced uses, you may want to read from io.NavActive or io.NavVisible. Read imgui.cpp for more details.
- Navigation: SetItemDefaultFocus() sets the navigation position in addition to scrolling. (#787)
- Navigation: Added IsItemFocused(), added IsAnyItemFocused(). (#787)
- Navigation: Added window flags: ImGuiWindowFlags_NoNav (== ImGuiWindowFlags_NoNavInputs | ImGuiWindowFlags_NoNavFocus).
- Navigation: Style: Added ImGuiCol_NavHighlight, ImGuiCol_NavWindowingHighlight colors. (#787)
- Navigation: TreeNode: Added ImGuiTreeNodeFlags_NavLeftJumpsBackHere flag to allow Nav Left direction to jump back to parent tree node from any of its child. (#1079)
- Navigation: IO: Added io.ConfigFlags (input), io.NavActive (output), io.NavVisible (output). (#787)
- Context: Removed the default global context and font atlas instances, which caused various
  problems to users of multiple contexts and DLL users. (#1565, #1599) YOU NOW NEED TO CALL
  ImGui::CreateContext() AT THE BEGINNING OF YOUR APP, AND CALL ImGui::DestroyContext() AT THE END.
  Existing apps will assert/crash without it.
- Context: Added SetAllocatorFunctions() to rewire memory allocators (as a replacement to previous
  parameters to CreateContext()). Allocators are shared by all contexts and imgui helpers. (#1565, #586, #992, #1007, #1558)
- Context: You may pass a ImFontAtlas to CreateContext() to specify a font atlas to share.
  Shared font atlas are not owned by the context and not destroyed along with it. (#1599)
- Context: Added IMGUI_DISABLE_DEFAULT_ALLOCATORS to disable linking with malloc/free. (#1565, #586, #992, #1007, #1558)
- IO: Added io.ConfigFlags for user application to store settings for imgui and for the backend:
  - ImGuiConfigFlags_NavEnableKeyboard: Enable keyboard navigation.
  - ImGuiConfigFlags_NavEnableGamepad: Enable gamepad navigation (provided ImGuiBackendFlags_HasGamepad is also set by backend).
  - ImGuiConfigFlags_NavEnableSetMousePos: Instruct navigation to move the mouse cursor. May be useful on TV/console systems where moving a virtual mouse is awkward.
  - ImGuiConfigFlags_NoMouseCursorChange: Instruct backend to not alter mouse cursor shape and visibility (by default the example backend use mouse cursor API of the platform when available)
  - ImGuiConfigFlags_NoMouse: Instruct imgui to clear mouse position/buttons in NewFrame(). This allows ignoring the mouse information passed by the backend.
  - ImGuiConfigFlags_IsSRGB, ImGuiConfigFlags_IsTouchScreen: Flags for general application use.
- IO: Added io.BackendFlags for backend to store its capabilities (currently: _HasGamepad,
  _HasMouseCursors, _HasSetMousePos). This will be used more in the next version.
- IO: Added ImGuiKey_Insert, ImGuiKey_Space keys. Setup in all example backends. (#1541)
- IO: Added Horizontal Mouse Wheel support for horizontal scrolling. (#1463) [@tseeker]
- IO: Added IsAnyMouseDown() helper which is helpful for backends to handle mouse capturing.
- Window: Clicking on a window with the ImGuiWIndowFlags_NoMove flags takes an ActiveId so
  we can't hover something else when dragging afterwards. (#1381, #1337)
- Window: IsWindowHovered(): Added ImGuiHoveredFlags_AnyWindow, ImGuiFocusedFlags_AnyWindow flags
  (See Breaking Changes). Added to demo. (#1382)
- Window: Added SetNextWindowBgAlpha() helper. Particularly helpful since the legacy 5-parameters
  version of Begin() has been marked as obsolete in 1.53. (#1567)
- Window: Fixed SetNextWindowContentSize() with 0.0f on Y axis (or SetNextWindowContentWidth())
  overwriting the contents size. Got broken on Dec 10 (1.53). (#1363)
- ArrowButton: Added ArrowButton() given a cardinal direction (e.g. ImGuiDir_Left).
- InputText: Added alternative clipboard shortcuts: Shift+Delete (cut), CTRL+Insert (copy), Shift+Insert (paste). (#1541)
- InputText: Fixed losing Cursor X position when clicking outside on an item that's submitted
  after the InputText(). It was only noticeable when restoring focus programmatically. (#1418, #1554)
- InputText: Added ImGuiInputTextFlags_CharsScientific flag to also allow 'e'/'E' for input of values
  using scientific notation. Automatically used by InputFloat.
- Style: Default style is now StyleColorsDark(), instead of the old StyleColorsClassic(). (#707)
- Style: Enable window border by default. (#707)
- Style: Exposed ImGuiStyleVar_WindowTitleAlign, ImGuiStyleVar_ScrollbarSize, ImGuiStyleVar_ScrollbarRounding,
  ImGuiStyleVar_GrabRounding + added an assert to reduce accidental breakage. (#1181)
- Style: Added style.MouseCursorScale help when using the software mouse cursor facility. (#939).
- Style: Close button nows display a cross before hovering. Fixed cross positioning being a little off. Uses button colors for highlight when hovering. (#707)
- Popup: OpenPopup() Always reopen existing pop-ups. (Removed imgui_internal.h's OpenPopupEx() which was used for this.) (#1497, #1533).
- Popup: BeginPopupContextItem(), BeginPopupContextWindow(), BeginPopupContextVoid(), OpenPopupOnItemClick() all react on mouse release instead of mouse press. (~#439)
- Popup: Better handling of user mistakenly calling OpenPopup() every frame (with the 'reopen_existing' option).
  The error will now be more visible and easier to understand. (#1497)
- Popup: BeginPopup(): Exposed extra_flags parameter that are passed through to Begin(). (#1533)
- Popup: BeginPopupModal: fixed the conditional test for SetNextWindowPos() which was polling
  the wrong window, which in practice made the test succeed all the time.
- Tooltip: BeginTooltip() sets ImGuiWindowFlags_NoInputs flag.
- Scrollbar: Fixed ScrollbarY enable test after ScrollbarX has been enabled being a little
  off (small regression from Nov 2017). (#1574)
- Scrollbar: Fixed ScrollbarX enable test subtracting WindowPadding.x (this has been there
  since the addition of horizontal scroll bar!).
- Columns: Clear offsets data when columns count changed. (#1525)
- Columns: Fixed a memory leak of ImGuiColumnsSet's Columns vector. (#1529) [@unprompted]
- Columns: Fixed resizing a window very small breaking some columns positioning (broken in 1.53).
- Columns: The available column extent takes consideration of the right-most clipped pixel,
  so the right-most column may look a little wider but will contain the same amount of visible contents.
- MenuBar: Fixed menu bar pushing a clipping rect outside of its allocated bound (usually unnoticeable).
- TreeNode: nodes with the ImGuiTreeNodeFlags_Leaf flag correctly disable highlight when DragDrop is active. (#143, #581)
- Drag and Drop: Increased payload type string to 32 characters instead of 8. (#143)
- Drag and Drop: TreeNode as drop target displays rectangle over full frame. (#1597, #143)
- DragFloat: Fix/workaround for backends which do not preserve a valid mouse position when dragged out of bounds. (#1559)
- InputFloat: Allow inputing value using scientific notation e.g. "1e+10".
- InputDouble: Added InputDouble() function. We use a format string instead of a 'decimal_precision'
  parameter to also for "%e" and variants. (#1011)
- Slider, Combo: Use ImGuiCol_FrameBgHovered color when hovered. (#1456) [@stfx]
- Combo: BeginCombo(): Added ImGuiComboFlags_NoArrowButton to disable the arrow button and
  only display the wide value preview box.
- Combo: BeginCombo(): Added ImGuiComboFlags_NoPreview to disable the preview and only
  display a square arrow button.
- Combo: Arrow button isn't displayed over frame background so its blended color matches other buttons. Left side of the button isn't rounded.
- PlotLines: plot a flat line if scale_min==scale_max. (#1621)
- Fonts: Changed DisplayOffset.y to defaults to 0 instead of +1. Fixed rounding of Ascent/Descent
  to match TrueType renderer. If you were adding or subtracting (not assigning) to ImFont::DisplayOffset
  check if your fonts are correctly aligned vertically. (#1619)
- Fonts: Updated stb_truetype from 1.14 to stb_truetype 1.19. (w/ include fix from some platforms #1622)
- Fonts: Added optional FreeType rasterizer in misc/freetype. Moved from imgui_club repo. (#618) [@Vuhdo, @mikesart, @ocornut]
- Fonts: Moved extra_fonts/ to misc/fonts/.
- ImFontAtlas: Fixed cfg.MergeMode not reusing existing glyphs if available (always overwrote).
- ImFontAtlas: Handle stb_truetype stbtt_InitFont() and stbtt_PackBegin() possible failures
  more gracefully, GetTexDataAsRGBA32() won't crash during conversion. (#1527)
- ImFontAtlas: Moved mouse cursor data out of ImGuiContext, fix drawing them with multiple contexts.
  Also remove the last remaining undesirable dependency on ImGui in imgui_draw.cpp. (#939)
- ImFontAtlas: Added ImFontAtlasFlags_NoPowerOfTwoHeight flag to disable padding font height
  to nearest power of two. (#1613)
- ImFontAtlas: Added ImFontAtlasFlags_NoMouseCursors flag to disable baking software mouse cursors,
  mostly to save texture memory on very low end hardware. (#1613)
- ImDrawList: Fixed AddRect() with anti-aliasing disabled (lower-right corner pixel was often
  missing, rounding looks a little better.) (#1646)
- ImDrawList: Added CloneOutput() helper to facilitate the cloning of ImDrawData or ImDrawList for multi-threaded rendering.
- Misc: Functions passed to libc qsort are explicitly marked cdecl to support compiling with
  vectorcall as the default calling convention. (#1230, #1611) [@RandyGaul]
- Misc: ImVec2: added [] operator. This is becoming desirable for some code working of either
  axes independently. Better adding it sooner than later.
- Misc: NewFrame(): Added an assert to detect incorrect filling of the io.KeyMap[] array earlier. (#1555)
- Misc: Added IM_OFFSETOF() helper in imgui.h (previously was in imgui_internal.h)
- Misc: Added IM_NEW(), IM_DELETE() helpers in imgui.h (previously were in imgui_internal.h)
- Misc: Added obsolete redirection function GetItemsLineHeightWithSpacing() (which redirects to GetFrameHeightWithSpacing()), as intended and stated in docs of 1.53.
- Misc: Added misc/natvis/imgui.natvis for visual studio debugger users to easily visualize imgui internal types. Added to examples projects.
- Misc: Added IMGUI_USER_CONFIG to define a custom configuration filename. (#255, #1573, #1144, #41)
- Misc: Added IMGUI_STB_TRUETYPE_FILENAME and IMGUI_STB_RECT_PACK_FILENAME compile time directives to use another version of the stb_ files.
- Misc: Updated stb_rect_pack from 0.10 to 0.11 (minor changes).
  (Those flags are not used by ImGui itself, they only exists to make it easy for the engine/backend to pass information to the application in a standard manner.)
- Metrics: Added display of Columns state.
- Demo: Improved Selectable() examples. (#1528)
- Demo: Tweaked the Child demos, added a menu bar to the second child to test some navigation functions.
- Demo: Console: Using ImGuiCol_Text to be more friendly to color changes.
- Demo: Using IM_COL32() instead of ImColor() in ImDrawList centric contexts. Trying to phase out use of the ImColor helper whenever possible.
- Examples: Files in examples/ now include their own changelog so it is easier to occasionally update your backends if needed.
- Examples: Using Dark theme by default. (#707). Tweaked demo code.
- Examples: Added support for horizontal mouse wheel for API that allows it. (#1463) [@tseeker]
- Examples: All examples now setup the io.BackendFlags to signify they can honor mouse cursors, gamepad, etc.
- Examples: DirectX10: Fixed erroneous call to io.Fonts->ClearInputData() + ClearTexData() that
  was left in DX10 example but removed in 1.47 (Nov 2015) in every other backends. (#1733)
- Examples: DirectX12: Added DirectX 12 example. (#301) [@jdm3]
- Examples: OpenGL3+GLFW,SDL: Changed GLSL shader version from 330 to 150. (#1466, #1504)
- Examples: OpenGL3+GLFW,SDL: Added a way to override the GLSL version string in the Init function. (#1466, #1504).
- Examples: OpenGL3+GLFW,SDL: Creating VAO in the render function so it can be more easily used by multiple shared OpenGL contexts. (#1217)
- Examples: OpenGL3+GLFW: Using 3.2 context instead of 3.3. (#1466)
- Examples: OpenGL: Setting up glPixelStorei() explicitly before uploading texture.
- Examples: OpenGL: Calls to glPolygonMode() are casting parameters as GLEnum to not fail with more strict backends. (#1628) [@ilia-glushchenko]
- Examples: Win32 (DirectX9,10,11,12): Added support for mouse cursor shapes. (#1495)
- Examples: Win32 (DirectX9,10,11,12: Support for windows using the CS_DBLCLKS class flag by handling the double-click messages (WM_LBUTTONDBLCLK etc.). (#1538, #754) [@ndandoulakis]
- Examples: Win32 (DirectX9,10,11,12): Made the Win32 proc handlers not assert if there is no active context yet, to be more flexible with creation order. (#1565)
- Examples: GLFW: Added support for mouse cursor shapes (the diagonal resize cursors are unfortunately not supported by GLFW at the moment. (#1495)
- Examples: GLFW: Don't attempt to change the mouse cursor input mode if it is set to GLFW_CURSOR_DISABLED by the application. (#1202) [@PhilCK]
- Examples: SDL: Added support for mouse cursor shapes. (#1626) [@olls]
- Examples: SDL: Using SDL_CaptureMouse() to retrieve coordinates outside of client area when dragging
  (SDL 2.0.4+ only, otherwise using SDL_WINDOW_INPUT_FOCUS instead of previously SDL_WINDOW_MOUSE_FOCUS). (#1559)
- Examples: SDL: Enabled vsync by default so people don't come at us when the examples are running at 2000 FPS and burning a CPU core.
- Examples: SDL: Using SDL_GetPerformanceCounter() / SDL_GetPerformanceFrequency() to handle frame-rate over 1000 FPS properly. (#996)
- Examples: SDL: Using scan-code exclusively instead of a confusing mixture of scan-codes and key-codes.
- Examples: SDL: Visual Studio: Added .vcxproj file. Using %SDL2_DIR% in the default .vcxproj
  and build files instead of %SDL_DIR%, the earlier being more standard.
- Examples: Vulkan: Visual Studio: Added .vcxproj file.
- Examples: Apple: Fixed filenames in OSX xcode project. Various other Mac friendly fixes. [@gerryhernandez etc.]
- Examples: Visual Studio: Disabled extraneous function-level check in Release build.
- Various fixes, tweaks, internal refactoring, optimizations, comments.


-----------------------------------------------------------------------
 VERSION 1.53 (Released 2017-12-25)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.53

Breaking Changes:

- Renamed the emblematic `ShowTestWindow()` function to `ShowDemoWindow()`. Kept redirection function (will obsolete).
- Renamed `GetItemsLineHeightWithSpacing()` to `GetFrameHeightWithSpacing()` for consistency. Kept redirection function (will obsolete).
- Renamed `ImGuiTreeNodeFlags_AllowOverlapMode` flag to `ImGuiTreeNodeFlags_AllowItemOverlap`. Kept redirection enum (will obsolete).
- Obsoleted `IsRootWindowFocused()` in favor of using `IsWindowFocused(ImGuiFocusedFlags_RootWindow)`. Kept redirection function (will obsolete). (#1382)
- Obsoleted `IsRootWindowOrAnyChildFocused()` in favor of using `IsWindowFocused(ImGuiFocusedFlags_RootAndChildWindows)`. Kept redirection function (will obsolete). (#1382)
- Obsoleted `IsRootWindowOrAnyChildHovered()` in favor of using `IsWindowHovered(ImGuiHoveredFlags_RootAndChildWindows)`. Kept redirection function (will obsolete). (#1382)
- Obsoleted `SetNextWindowContentWidth() in favor of using `SetNextWindowContentSize()`. Kept redirection function (will obsolete).
- Renamed `ImGuiTextBuffer::append()` helper to `appendf()`, and `appendv()` to `appendfv()` for consistency. If you copied the 'Log' demo in your code, it uses appendv() so that needs to be renamed.
- ImDrawList: Removed 'bool anti_aliased = true' final parameter of `ImDrawList::AddPolyline()` and `ImDrawList::AddConvexPolyFilled()`. Prefer manipulating ImDrawList::Flags if you need to toggle them during the frame.
- Style, ImDrawList: Renamed `style.AntiAliasedShapes` to `style.AntiAliasedFill` for consistency and as a way to explicitly break code that manipulate those flag at runtime. You can now manipulate ImDrawList::Flags.
- Style, Begin: Removed `ImGuiWindowFlags_ShowBorders` window flag. Borders are now fully set up in the ImGuiStyle structure (see e.g. `style.FrameBorderSize`, `style.WindowBorderSize`, `style.PopupBorderSize`).
  Use `ImGui::ShowStyleEditor()` to look them up.
  Please note that the style system will keep evolving (hopefully stabilizing in Q1 2018), and so custom styles will probably subtly break over time.
  It is recommended that you use the `StyleColorsClassic()`, `StyleColorsDark()`, `StyleColorsLight()` functions. Also see `ShowStyleSelector()`.
- Style: Removed `ImGuiCol_ComboBg` in favor of combo boxes using `ImGuiCol_PopupBg` for consistency. Combo are normal pop-ups.
- Style: Renamed `ImGuiCol_ChildWindowBg` to `ImGuiCol_ChildBg`.
- Style: Renamed `style.ChildWindowRounding` to `style.ChildRounding`, `ImGuiStyleVar_ChildWindowRounding` to `ImGuiStyleVar_ChildRounding`.
- Removed obsolete redirection functions: SetScrollPosHere() - marked obsolete in v1.42, July 2015.
- Removed obsolete redirection functions: GetWindowFont(), GetWindowFontSize() - marked obsolete in v1.48, March 2016.

Other Changes:

- Added `io.OptCursorBlink` option to allow disabling cursor blinking. (#1427) [renamed to io.ConfigCursorBlink in 1.63]
- Added `GetOverlayDrawList()` helper to quickly get access to a ImDrawList that will be rendered in front of every windows.
- Added `GetFrameHeight()` helper which returns `(FontSize + style.FramePadding.y * 2)`.
- Drag and Drop: Added Beta API to easily use drag and drop patterns between imgui widgets.
  - Setup a source on a widget with `BeginDragDropSource()`, `SetDragDropPayload()`, `EndDragDropSource()` functions.
  - Receive data with `BeginDragDropTarget()`, `AcceptDragDropPayload()`, `EndDragDropTarget()`.
  - See ImGuiDragDropFlags for various options.
  - The ColorEdit4() and ColorButton() widgets now support Drag and Drop.
  - The API is tagged as Beta as it still may be subject to small changes.
- Drag and Drop: When drag and drop is active, tree nodes and collapsing header can be opened
  by hovering on them for 0.7 seconds.
- Renamed io.OSXBehaviors to io.OptMacOSXBehaviors. Should not affect users as the compile-time
  default is usually enough. (#473, #650)
- Style: Added StyleColorsDark() style. (#707) [@dougbinks]
- Style: Added StyleColorsLight() style. Best used with frame borders + thicker font than the default font. (#707)
- Style: Added style.PopupRounding setting. (#1112)
- Style: Added style.FrameBorderSize, style.WindowBorderSize, style.PopupBorderSize.
  Removed ImGuiWindowFlags_ShowBorders window flag!
  Borders are now fully set up in the ImGuiStyle structure. Use ImGui::ShowStyleEditor() to look them up. (#707, fix #819, #1031)
- Style: Various small changes to the classic style (most noticeably, buttons are now using blue shades). (#707)
- Style: Renamed ImGuiCol_ChildWindowBg to ImGuiCol_ChildBg.
- Style: Renamed style.ChildWindowRounding to style.ChildRounding, ImGuiStyleVar_ChildWindowRounding to ImGuiStyleVar_ChildRounding.
- Style: Removed ImGuiCol_ComboBg in favor of combo boxes using ImGuiCol_PopupBg for consistency. (#707)
- Style: Made the ScaleAllSizes() helper rounds down every values so they are aligned on integers.
- Focus: Added SetItemDefaultFocus(), which in the current (master) branch behave the same
  as doing `if (IsWindowAppearing()) SetScrollHere()`. In the navigation branch this will also
  set the default focus. Prefer using this when creating combo boxes with `BeginCombo()` so your
  code will be forward-compatible with gamepad/keyboard navigation features. (#787)
- Combo: Pop-up grows horizontally to accommodate for contents that is larger then the parent
  combo button.
- Combo: Added BeginCombo()/EndCombo() API which allows use to submit content of any form and
  manage your selection state without relying on indices.
- Combo: Added ImGuiComboFlags_PopupAlignLeft flag to BeginCombo() to prioritize keeping the
  pop-up on the left side (for small-button-looking combos).
- Combo: Added ImGuiComboFlags_HeightSmall, ImGuiComboFlags_HeightLarge, ImGuiComboFlags_HeightLargest
  to easily provide desired pop-up height.
- Combo: You can use SetNextWindowSizeConstraints() before BeginCombo() to specify specific
  pop-up width/height constraints.
- Combo: Offset popup position by border size so that a double border isn't so visible. (#707)
- Combo: Recycling windows by using a stack number instead of a unique id, wasting less memory (like menus do).
- InputText: Added ImGuiInputTextFlags_NoUndoRedo flag. (#1506, #1508) [@ibachar]
- Window: Fixed auto-resize allocating too much space for scrollbar when SizeContents is
  bigger than maximum window size (fixes c0547d3). (#1417)
- Window: Child windows with MenuBar use regular WindowPadding.y so layout look consistent as
  child or as a regular window.
- Window: Begin(): Fixed appending into a child window with a second Begin() from a different
  window stack querying the wrong window for the window->Collapsed test.
- Window: Calling IsItemActive(), IsItemHovered() etc. after a call to Begin() provides item
  data for the title bar, so you can easily test if the title bar is being hovered, etc. (#823)
- Window: Made it possible to use SetNextWindowPos() on a child window.
- Window: Fixed a one frame glitch. When an appearing window claimed the focus themselves, the
  title bar wouldn't use the focused color for one frame.
- Window: Added ImGuiWindowFlags_ResizeFromAnySide flag to resize from any borders or from the
  lower-left corner of a window. This requires your backend to honor GetMouseCursor() requests
  for full usability. (#822)
- Window: Sizing fixes when using SetNextWindowSize() on individual axises.
- Window: Hide new window for one frame until they calculate their size.
  Also fixes SetNextWindowPos() given a non-zero pivot. (#1694)
- Window: Made mouse wheel scrolling accommodate better to windows that are smaller than the scroll step.
- Window: SetNextWindowContentSize() adjust for the size of decorations (title bar/menu bar),
  but _not_ for borders are we consistently make borders not affect layout.
  If you need a non-child window of an exact size with border enabled but zero window padding,
  you'll need to accommodate for the border size yourself.
- Window: Using the ImGuiWindowFlags_NoScrollWithMouse flag on a child window forwards the mouse wheel
  event to the parent window, unless either ImGuiWindowFlags_NoInputs or ImGuiWindowFlags_NoScrollbar
  are also set. (#1380, #1502)
- Window: Active Modal window always set the WantCaptureKeyboard flag. (#744)
- Window: Moving window doesn't use accumulating MouseDelta so straying out of imgui boundaries keeps moved imgui window at the same cursor-relative position.
- IsWindowFocused(): Added ImGuiFocusedFlags_ChildWindows flag to include child windows in the focused test. (#1382).
- IsWindowFocused(): Added ImGuiFocusedFlags_RootWindow flag to start focused test from the root (top-most) window. Obsolete IsRootWindowFocused(). (#1382)
- IsWindowHovered(): Added ImGuiHoveredFlags_ChildWindows flag to include child windows in the hovered test. (#1382).
- IsWindowHovered(): Added ImGuiHoveredFlags_RootWindow flag to start hovered test from the root (top-most) window. The combination of both flags obsoletes IsRootWindowOrAnyChildHovered(). (#1382)
- IsWindowHovered(): Fixed return value when an item is active to use the same logic as IsItemHovered(). (#1382, #1404)
- IsWindowHovered(): Always return true when current window is being moved. (#1382)
- Scrollbar: Fixed issues with vertical scrollbar flickering/appearing, typically when manually
  resizing and using a pattern of filling available height (e.g. full sized BeginChild).
- Scrollbar: Minor graphical fix for when scrollbar don't have enough visible space to display the full grab.
- Scrolling: Fixed padding and scrolling asymmetry where lower/right sides of a window wouldn't
  use WindowPadding properly + causing minor scrolling glitches.
- Tree: TreePush with zero arguments was ambiguous. Resolved by making it call TreePush(const void*). [@JasonWilkins]
- Tree: Renamed ImGuiTreeNodeFlags_AllowOverlapMode to ImGuiTreeNodeFlags_AllowItemOverlap. (#600, #1330)
- MenuBar: Fixed minor rendering issues on the right size when resizing a window very small and using rounded window corners.
- MenuBar: better software clipping to handle small windows, in particular child window don't have
  minimum constraints so we need to render clipped menus better.
- BeginMenu(): Tweaked the Arrow/Triangle displayed on child menu items.
- Columns: Clipping columns borders on Y axis on CPU because some Linux GPU drivers appears to
  be unhappy with triangle spanning large regions. (#125)
- Columns: Added ImGuiColumnsFlags_GrowParentContentsSize to internal API to restore old content
  sizes behavior (may be obsolete). (#1444, #125)
- Columns: Columns width is no longer lost when dragging a column to the right side of the window,
  until releasing the mouse button you have a chance to save them. (#1499, #125). [@ggtucker]
- Columns: Fixed dragging when using a same of columns multiple times in the frame. (#125)
- Indent(), Unindent(): Allow passing negative values.
- ColorEdit4(): Made IsItemActive() return true when picker pop-up is active. (#1489)
- ColorEdit4(): Tweaked tooltip so that the color button aligns more correctly with text.
- ColorEdit4(): Support drag and drop. Color buttons can be used as drag sources, and ColorEdit
  widgets as drag targets. (#143)
- ColorPicker4(): Fixed continuously returning true when holding mouse button on the sat/value/alpha
  locations. We only return true on value change. (#1489)
- NewFrame(): using literal strings in the most-frequently firing IM_ASSERT expressions to
  increase the odd of programmers seeing them (especially those who don't use a debugger).
- NewFrame() now asserts if neither Render or EndFrame have been called. Exposed EndFrame().
  Made it legal to call EndFrame() more than one. (#1423)
- ImGuiStorage: Added BuildSortByKey() helper to rebuild storage from scratch.
- ImFont: Added GetDebugName() helper.
- ImFontAtlas: Added missing Thai punctuation in the GetGlyphRangesThai() ranges. (#1396) [@nProtect]
- ImDrawList: Removed 'bool anti_aliased = true' final parameter of ImDrawList::AddPolyline() and ImDrawList::AddConvexPolyFilled(). Anti-aliasing is controlled via the regular style.AntiAliased flags.
- ImDrawList: Added ImDrawList::AddImageRounded() helper. (#845) [@thedmd]
- ImDrawList: Refactored to make ImDrawList independent of ImGui. Removed static variable in PathArcToFast() which caused linking issues to some.
- ImDrawList: Exposed ImDrawCornerFlags, replaced occurrences of ~0 with an explicit ImDrawCornerFlags_All.
  NB: Inversed BotLeft (prev 1<<3, now 1<<2) and BotRight (prev 1<<2, now 1<<3).
- ImVector: Added ImVector::push_front() helper.
- ImVector: Added ImVector::contains() helper.
- ImVector: insert() uses grow_capacity() instead of using grow policy inconsistent with push_back().
- Internals: Remove requirement to define IMGUI_DEFINE_PLACEMENT_NEW to use the IM_PLACEMENT_NEW macro. (#1103)
- Internals: ButtonBehavior: Fixed ImGuiButtonFlags_NoHoldingActiveID flag from incorrectly
  setting the ActiveIdClickOffset field. This had no known effect within imgui code but could have
  affected custom drag and drop patterns. And it is more correct this way! (#1418)
- Internals: ButtonBehavior: Fixed ImGuiButtonFlags_AllowOverlapMode to avoid temporarily activating
widgets on click before they have been correctly double-hovered. (#319, #600)
- Internals: Added SplitterBehavior() helper. (#319)
- Internals: Added IM_NEW(), IM_DELETE() helpers. (#484, #504, #1517)
- Internals: Basic refactor of the settings API which now allows external elements to be loaded/saved.
- Demo: Added ShowFontSelector() showing loaded fonts.
- Demo: Added ShowStyleSelector() to select among default styles. (#707)
- Demo: Renamed the emblematic ShowTestWindow() function to ShowDemoWindow().
- Demo: Style Editor: Added a "Simplified settings" sections with check-boxes for border size and frame rounding. (#707, #1019)
- Demo: Style Editor: Added combo box to select stock styles and select current font when multiple are loaded. (#707)
- Demo: Style Editor: Using local storage so Save/Revert button makes more sense without code passing
  its storage. Added horizontal scroll bar. Fixed Save/Revert button to be always accessible. (#1211)
- Demo: Console: Fixed context menu issue. (#1404)
- Demo: Console: Fixed incorrect positioning which was hidden by a minor scroll issue (this would
  affect people who copied the Console code as is).
- Demo: Constrained Resize: Added more test cases. (#1417)
- Demo: Custom Rendering: Fixed clipping rectangle extruding out of parent window.
- Demo: Layout: Removed unnecessary and misleading BeginChild/EndChild calls.
- Demo: The "Color Picker with Palette" demo supports drag and drop. (#143)
- Demo: Display better mouse cursor info for debugging backends.
- Demo: Stopped using rand() function in demo code.
- Examples: Added a handful of extra comments (about fonts, third-party libraries used in the examples, etc.).
- Examples: DirectX9: Handle loss of D3D9 device (D3DERR_DEVICELOST). (#1464)
- Examples: Added null_example/ which is helpful for quick testing on multiple compilers/settings without relying on graphics library.
- Fix for using alloca() in "Clang with Microsoft Codechain" mode.
- Various fixes, optimizations, comments.


-----------------------------------------------------------------------
 VERSION 1.52 (2017-10-27)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.52

Breaking Changes:

- IO: `io.MousePos` needs to be set to ImVec2(-FLT_MAX,-FLT_MAX) when mouse is unavailable/missing,
  instead of ImVec2(-1,-1) as previously) This is needed so we can clear `io.MouseDelta` field when
  the mouse is made available again.
- Renamed `AlignFirstTextHeightToWidgets()` to `AlignTextToFramePadding()`.
  Kept inline redirection function (will obsolete).
- Obsoleted the legacy 5 parameters version of Begin(). Please avoid using it. If you need a
  transparent window background, uses `PushStyleColor()`. The old size parameter there was also
  misleading and equivalent to calling `SetNextWindowSize(size, ImGuiCond_FirstTimeEver)`.
  Kept inline redirection function (will obsolete).
- Obsoleted `IsItemHoveredRect()`, `IsMouseHoveringWindow()` in favor of using the newly introduced
  flags of `IsItemHovered()` and `IsWindowHovered()`. Kept inline redirection function (will obsolete). (#1382)
- Obsoleted 'SetNextWindowPosCenter()' in favor of using 1SetNextWindowPos()` with a pivot value which
  allows to do the same and more. Keep inline redirection function.
- Removed `IsItemRectHovered()`, `IsWindowRectHovered()` recently introduced in 1.51 which were merely
  the more consistent/correct names for the above functions which are now obsolete anyway. (#1382)
- Changed `IsWindowHovered()` default parameters behavior to return false if an item is active in
  another window (e.g. click-dragging item from another window to this window). You can use the newly
  introduced IsWindowHovered() flags to requests this specific behavior if you need it. (#1382)
- Renamed imconfig.h's `IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCS`/`IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCS`
  to `IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS`/`IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS` for consistency.
- Renamed ImFont::Glyph to ImFontGlyph. Kept redirection typedef (will obsolete).

Other Changes:

- ProgressBar: fixed rendering when straddling rounded area. (#1296)
- SliderFloat, DragFloat: Using scientific notation e.g. "%.1e" in the displayed format string doesn't
  mistakenly trigger rounding of the value. [@MomentsInGraphics]
- Combo, InputFloat, InputInt: Made the small button on the right side align properly with the
  equivalent colored button of ColorEdit4().
- IO: Tweaked logic for `io.WantCaptureMouse` so it now outputs false when e.g. hovering over void
  while an InputText() is active. (#621) [@pdoane]
- IO: Fixed `io.WantTextInput` from mistakenly outputting true when an activated Drag or Slider was
  previously turned into an InputText(). (#1317)
- Misc: Added flags to `IsItemHovered()`, `IsWindowHovered()` to access advanced hovering-test behavior.
  Generally useful for pop-ups and drag and drop behaviors: (relates to ~#439, #1013, #143, #925)
  - `ImGuiHoveredFlags_AllowWhenBlockedByPopup`
  - `ImGuiHoveredFlags_AllowWhenBlockedByActiveItem`
  - `ImGuiHoveredFlags_AllowWhenOverlapped`
  - `ImGuiHoveredFlags_RectOnly`
- Input: Added `IsMousePosValid()` helper.
- Input: Added `GetKeyPressedAmount()` to easily measure press count when the repeat rate is faster than the frame rate.
- Input/Focus: Disabled TAB and Shift+TAB when CTRL key is held.
- CheckBox: Now rendering a tick mark instead of a full square.
- ColorEdit4: Added "Copy as..." option in context menu. (#346)
- ColorPicker: Improved ColorPicker hue wheel color interpolation. (#1313) [@thevaber]
- ColorButton: Reduced bordering artifact that would be particularly visible with an opaque
  Col_FrameBg and FrameRounding enabled.
- ColorButton: Fixed rendering color button with a checkerboard if the transparency comes from the global
  style.Alpha and not from the actual source color.
- TreeNode: Added `ImGuiTreeNodeFlags_FramePadding` flag to conveniently create a tree node with full
  padding at the beginning of a line, without having to call `AlignTextToFramePadding()`.
- Trees: Fixed calling `SetNextTreeNodeOpen()` on a collapsed window leaking to the first tree node item of the next frame.
- Layout: Horizontal layout is automatically enforced in a menu bar, so you can use non-MenuItem elements
  without calling SameLine().
- Separator: Output a vertical separator when used inside a menu bar (or in general when horizontal layout
  is active, but that isn't exposed yet!).
- Window: Added `IsWindowAppearing()` helper (helpful e.g. as a condition before initializing some of your own things.).
- Window: Added pivot parameter to `SetNextWindowPos()`, making it possible to center or right align a window. Obsoleted `SetNextWindowPosCenter()`.
- Window: Fixed title bar color of top-most window under a modal window.
- Window: Fixed not being able to move a window by clicking on one of its child window. (#1337, #635)
- Window: Fixed `Begin()` auto-fit calculation code that predict the presence of a scrollbar so it works
  better when window size constraints are used.
- Window: Fixed calling `Begin()` more than once per frame setting `window_just_activated_by_user` which
  in turn would set enable the Appearing condition for that frame.
- Window: The implicit "Debug" window now uses a "Debug##Default" identifier instead of "Debug" to allow
  user creating a window called "Debug" without losing their custom flags.
- Window: Made the `ImGuiWindowFlags_NoMove` flag properly inherited from parent to child. In a setup
  with ParentWindow (no flag) -> Child (NoMove) -> SubChild (no flag), the user won't be able to move
  the parent window by clicking on SubChild. (#1381)
- Popups: Pop-ups can be closed with a right-click anywhere, without altering focus under the pop-up. (~#439)
- Popups: `BeginPopupContextItem()`, `BeginPopupContextWindow()` are now setup to allow reopening
  a context menu by right-clicking again. (~#439)
- Popups: `BeginPopupContextItem()` now supports a NULL string identifier and uses the last item ID if available.
- Popups: Added `OpenPopupOnItemClick()` helper which mimic `BeginPopupContextItem()` but doesn't do the BeginPopup().
- MenuItem: Only activating on mouse release. [@Urmeli0815] (was already fixed in nav branch).
- MenuItem: Made tick mark thicker (thick mark?).
- MenuItem: Tweaks to be usable inside a menu bar (nb: it looks like a regular menu and thus is misleading,
  prefer using Button() and regular widgets in menu bar if you need to). (#1387)
- ImDrawList: Fixed a rare draw call merging bug which could lead to undisplayed triangles. (#1172, #1368)
- ImDrawList: Fixed a rare bug in `ChannelsMerge()` when all contents has been clipped, leading to
  an extraneous draw call being created. (#1172, #1368)
- ImFont: Added `AddGlyph()` building helper for use by custom atlas builders.
- ImFontAtlas: Added support for CustomRect API to submit custom rectangles to be packed into the atlas.
  You can map them as font glyphs, or use them for custom purposes.
  After the atlas is built you can query the position of your rectangles in the texture and then copy
  your data there. You can use this features to create e.g. full color font-mapped icons.
- ImFontAtlas: Fixed fall-back handling when merging fonts, if a glyph was missing from the second font
  input it could have used a glyph from the first one. (#1349) [@inolen]
- ImFontAtlas: Fixed memory leak on build failure case when stbtt_InitFont failed (generally due to
  incorrect or supported font type). (#1391) (@Moka42)
- ImFontConfig: Added `RasterizerMultiply` option to alter the brightness of individual fonts at
  rasterization time, which may help increasing readability for some.
- ImFontConfig: Added `RasterizerFlags` to pass options to custom rasterizer (e.g. the
  [imgui_freetype](https://github.com/ocornut/imgui_club/tree/master/imgui_freetype) rasterizer in imgui_club has such options).
- ImVector: added resize() variant with initialization value.
- Misc: Changed the internal name formatting of child windows identifier to use slashes
  (instead of dots) as separator, more readable.
- Misc: Fixed compilation with `IMGUI_DISABLE_OBSOLETE_FUNCTIONS` defined.
- Misc: Marked all format+va_list functions with format attribute so GCC/Clang can warn about misuses.
- Misc: Fixed compilation on NetBSD due to missing alloca.h (#1319) [@RyuKojiro]
- Misc: Improved warnings compilation for newer versions of Clang. (#1324) (@waywardmonkeys)
- Misc: Added `io.WantMoveMouse flags` (from Nav branch) and honored in Examples applications.
  Currently unused but trying to spread Examples applications code that supports it.
- Misc: Added `IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS` support in imconfig.h to allow user
  reimplementing the `ImFormatString()` functions e.g. to use stb_printf(). (#1038)
- Misc: [Windows] Fixed default Win32 `SetClipboardText()` handler leaving the Win32 clipboard
  handler unclosed on failure. [@pdoane]
- Style: Added `ImGuiStyle::ScaleAllSizes(float)` helper to make it easier to have application
  transition e.g. from low to high DPI with a matching style.
- Metrics: Draw window bounding boxes when hovering Pos/Size; List all draw layers; Trimming empty commands like Render() does.
- Examples: OpenGL3: Save and restore sampler state. (#1145) [@nlguillemot]
- Examples: OpenGL2, OpenGL3: Save and restore polygon mode. (#1307) [@JJscott]
- Examples: DirectX11: Allow creating device with feature level 10 since we don't really need much for that example. (#1333)
- Examples: DirectX9/10/12: Using the Win32 SetCapture/ReleaseCapture API to read mouse coordinates
  when they are out of bounds. (#1375) [@Gargaj, @ocornut]
- Tools: Fixed binary_to_compressed_c tool to return 0 when successful. (#1350) [@benvanik]
- Internals: Exposed more helpers and unfinished features in imgui_internal.h. (use at your own risk!).
- Internals: A bunch of internal refactoring, hopefully haven't broken anything!
  Merged a bunch of internal changes from the upcoming Navigation branch.
- Various tweaks, fixes and documentation changes.

Beta Navigation Branch:
(Lots of work has been done toward merging the Beta Gamepad/Keyboard Navigation branch (#787) in master.)
(Please note that this branch is always kept up to date with master. If you are using the navigation branch, some of the changes include:)
- Nav: Added `#define IMGUI_HAS_NAV` in imgui.h to ease sharing code between both branches. (#787)
- Nav: MainMenuBar now releases focus when user gets out of the menu layer. (#787)
- Nav: When applying focus to a window with only menus, the menu layer is automatically activated. (#787)
- Nav: Added `ImGuiNavInput_KeyMenu` (~Alt key) aside from ImGuiNavInput_PadMenu input as it is
  one differentiator of pad vs keyboard that was detrimental to the keyboard experience.
  Although isn't officially supported, it makes the current experience better. (#787)
- Nav: Move requests now wrap vertically inside Menus and Pop-ups. (#787)
- Nav: Allow to collapse tree nodes with NavLeft and open them with NavRight. (#787, #1079).
- Nav: It's now possible to navigate sibling of a menu-bar while navigating inside one of their child.
  If a Left<>Right navigation request fails to find a match we forward the request to the root menu. (#787, #126)
- Nav: Fixed `SetItemDefaultFocus` from stealing default focus when we are initializing default focus for a menu bar layer. (#787)
- Nav: Support for fall-back horizontal scrolling with PadLeft/PadRight (nb: fall-back scrolling
  is only used to navigate windows that have no interactive items). (#787)
- Nav: Fixed tool-tip from being selectable in the window selection list. (#787)
- Nav: `CollapsingHeader(bool*)` variant: fixed for `IsItemHovered()` not working properly in the nav branch. (#600, #787)
- Nav: InputText: Fixed using Up/Down history callback feature when Nav is enabled. (#787)
- Nav: InputTextMultiline: Fixed navigation/selection. Disabled selecting all when activating a multi-line text editor. (#787)
- Nav: More consistently drawing a (thin) navigation rectangle hover filled frames such as tree nodes, collapsing header, menus. (#787)
- Nav: Various internal refactoring.


-----------------------------------------------------------------------
 VERSION 1.51 (2017-08-24)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.51

Breaking Changes:

Work on dear imgui has been gradually resuming. It means that fixes and new features should be tackled at
a faster rate than last year. However, in order to move forward with the library and get rid of some cruft,
I have taken the liberty to be a little bit more aggressive than usual with API breaking changes.
Read the details below and search for those names in your code! In the grand scheme of things,
those changes are small and should not affect everyone, but this is technically our most aggressive
release so far in term of API breakage.
If you want to be extra forward-facing, you can enable `#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS` in
your imconfig.h to disable the obsolete names/redirection.

- Renamed `IsItemHoveredRect()` to `IsItemRectHovered()`. Kept inline redirection function (will obsolete).
- Renamed `IsMouseHoveringWindow()` to `IsWindowRectHovered()` for consistency. Kept inline redirection function (will obsolete).
- Renamed `IsMouseHoveringAnyWindow()` to `IsAnyWindowHovered()` for consistency. Kept inline redirection function (will obsolete).
- Renamed `ImGuiCol_Columns***` enums to `ImGuiCol_Separator***`. Kept redirection enums (will obsolete).
- Renamed `ImGuiSetCond***` types and enums to `ImGuiCond***`. Kept redirection enums (will obsolete).
- Renamed `GetStyleColName()` to `GetStyleColorName()` for consistency. Unlikely to be used by end-user!
- Added `PushStyleColor(ImGuiCol idx, ImU32 col)` overload, which _might_ cause an "ambiguous call"
  compilation error if you are using ImColor() with implicit cast. Cast to ImU32 or ImVec4 explicitly to fix.
- Marked the weird `IMGUI_ONCE_UPON_A_FRAME` helper macro as obsolete. Prefer using the more explicit `ImGuiOnceUponAFrame`.
- Changed `ColorEdit4(const char* label, float col[4], bool show_alpha = true)` signature to
  `ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0)`, where flags 0x01 is a safe no-op
  (hello dodgy backward compatibility!). The new `ColorEdit4`/`ColorPicker4` functions have lots of available flags!
  Check and run the demo window, under "Color/Picker Widgets", to understand the various new options.
- Changed signature of `ColorButton(ImVec4 col, bool small_height = false, bool outline_border = true)`
  to `ColorButton(const char* desc_id, ImVec4 col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0))`.
  This function was rarely used and was very dodgy (no explicit ID!).
- Changed `BeginPopupContextWindow(bool also_over_items=true, const char* str_id=NULL, int mouse_button=1)`
  signature to `(const char* str_id=NULL, int mouse_button=1, bool also_over_items=true)`.
  This is perhaps the most aggressive change in this update, but note that the majority of users relied
  on default parameters completely, so this will affect only a fraction of users of this already rarely
  used function.
- Removed `IsPosHoveringAnyWindow()`, which was partly broken and misleading. In the vast majority of cases,
  people using that function wanted to use `io.WantCaptureMouse` flag. Replaced with IM_ASSERT + a comment
  redirecting user to `io.WantCaptureMouse`. (#1237)
- Removed the old `ValueColor()` helpers, they are equivalent to calling `Text(label)` + `SameLine()` + `ColorButton()`.
- Removed `ColorEditMode()` and `ImGuiColorEditMode` type in favor of `ImGuiColorEditFlags` and
  parameters to the various Color*() functions. The `SetColorEditOptions()` function allows to
  initialize default but the user can still change them with right-click context menu.
  Commenting out your old call to `ColorEditMode()` may just be fine!

Other Changes:

- Added flags to `ColorEdit3()`, `ColorEdit4()`. The color edit widget now has a context-menu
  and access to the color picker. (#346)
- Added flags to `ColorButton()`. (#346)
- Added `ColorPicker3()`, `ColorPicker4()`. (#346) [@r-lyeh, @nem0, @thennequin, @dariomanesku and @ocornut]
  The API along with those of the updated `ColorEdit4()` was designed so you may use them in various
  situation and hopefully compose your own picker if required. There are a bunch of available flags,
  check the Demo window and comment for `ImGuiColorEditFlags_`.
  Some of the options it supports are: two color picker types (hue bar + sat/val rectangle,
  hue wheel + rotating sat/val triangle), display as u8 or float, lifting 0.0..1.0 constraints
  (currently rgba only),  context menus, alpha bar, background checkerboard options, preview tooltip,
  basic revert. For simple use, calling the existing `ColorEdit4()` function as you did before
  will be enough, as you can now open the color picker from there.
- Added `SetColorEditOptions()` to set default color options (e.g. if you want HSV over RGBA,
  float over u8, select a default picker mode etc. at startup time without a user intervention.
  Note that the user can still change options with the context menu unless disabled with
  `ImGuiColorFlags_NoOptions` or explicitly enforcing a display type/picker mode etc.).
- Added user-facing `IsPopupOpen()` function. (#891) [@mkeeter]
- Added `GetColorU32(u32)` variant that perform the style alpha multiply without a floating-point
  round trip, and helps makes code more consistent when using ImDrawList APIs.
- Added `PushStyleColor(ImGuiCol idx, ImU32 col)` overload.
- Added `GetStyleColorVec4(ImGuiCol idx)` which is equivalent to accessing `ImGui::GetStyle().Colors[idx]`
  (aka return the raw style color without alpha alteration).
- ImFontAtlas: Added `GlyphRangesBuilder` helper class, which makes it easier to build custom glyph ranges
  from your app/game localization data, or add into existing glyph ranges.
- ImFontAtlas: Added `TexGlyphPadding` option. (#1282) [@jadwallis]
- ImFontAtlas: Made it possible to override size of AddFontDefault() (even if it isn't really recommended!).
- ImDrawList: Added `GetClipRectMin()`, `GetClipRectMax()` helpers.
- Fixed Ini saving crash if the ImGuiWindowFlags_NoSavedSettings gets removed from a window after its creation (unlikely!). (#1000)
- Fixed `PushID()`/`PopID()` from marking parent window as Accessed (which needlessly woke up the
  root "Debug" window when used outside of a regular window). (#747)
- Fixed an assert when calling `CloseCurrentPopup()` twice in a row. [@nem0]
- Window size can be loaded from .ini data even if ImGuiWindowFlags_NoResize flag is set. (#1048, #1056)
- Columns: Added `SetColumnWidth()`. (#913) [@ggtucker]
- Columns: Dragging a column preserve its width by default. (#913) [@ggtucker]
- Columns: Fixed first column appearing wider than others. (#1266)
- Columns: Fixed allocating space on the right-most side with the assumption of a vertical scrollbar.
  The space is only allocated when needed. (#125, #913, #893, #1138)
- Columns: Fixed the right-most column from registering its content width to the parent window,
  which led to various issues when using auto-resizing window or e.g. horizontal scrolling. (#519, #125, #913)
- Columns: Refactored some of the columns code internally toward a better API (not yet exposed) + minor optimizations. (#913) [@ggtucker, @ocornut]
- Popups: Most pop-ups windows can be moved by the user after appearing (if they don't have explicit
  positions provided by caller, or e.g. sub-menu pop-up). The previous restriction was totally arbitrary. (#1252)
- Tooltip: `SetTooltip()` is expanded immediately into a window, honoring current font / styling setting.
  Add internal mechanism to override tooltips. (#862)
- PlotHistogram: bars are drawn based on zero-line, so negative values are going under. (#828)
- Scrolling: Fixed return values of `GetScrollMaxX()`, `GetScrollMaxY()` when both scrollbars were enabled.
  Tweak demo to display more data. (#1271) [@degracode]
- Scrolling: Fixes for Vertical Scrollbar not automatically getting enabled if enabled Horizontal Scrollbar straddle the vertical limit. (#1271, #246)
- Scrolling: `SetScrollHere()`, `SetScrollFromPosY()`: Fixed Y scroll aiming when Horizontal Scrollbar is enabled. (#665).
- [Windows] Clipboard: Fixed not closing Win32 clipboard on early open failure path. (#1264)
- Removed an unnecessary dependency on int64_t which failed on some older compilers.
- Demo: Rearranged everything under Widgets in a more consistent way.
- Demo: Columns: Added Horizontal Scrolling demo. Tweaked another Columns demo. (#519, #125, #913)
- Examples: OpenGL: Various makefiles for MINGW, Linux. (#1209, #1229, #1209) [@fr500, @acda]
- Examples: Enabled vsync by default in example applications, so it doesn't confuse people that
  the sample run at 2000+ fps and waste an entire CPU. (#1213, #1151).
- Various other small fixes, tweaks, comments, optimizations.


-----------------------------------------------------------------------
 VERSION 1.50 (2017-06-02)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.50

Breaking Changes:

- Added a void* user_data parameter to Clipboard function handlers. (#875)
- SameLine(x) with x>0.0f is now relative to left of column/group if any, and not always to left of window.
  This was sort of always the intent and hopefully breakage should be minimal.
- Renamed ImDrawList::PathFill() - rarely used directly - to ImDrawList::PathFillConvex() for clarity and consistency.
- Removed ImFontConfig::MergeGlyphCenterV in favor of a more multipurpose ImFontConfig::GlyphOffset.
- Style: style.WindowTitleAlign is now a ImVec2 (ImGuiAlign enum was removed). set to (0.5f,0.5f)
  for horizontal+vertical centering, (0.0f,0.0f) for upper-left, etc.
- BeginChild(const char*) now applies the stack id to the provided label, consistently with other functions
  as it should always have been. It shouldn't affect you unless (extremely unlikely) you were appending multiple
  times to a same child from different locations of the stack id. If that's the case, generate an id with GetId()
  and use it instead of passing string to BeginChild().

Other Changes:

- InputText(): Added support for CTRL+Backspace (delete word).
- InputText(): OSX uses Super+Arrows for home/end. Add Shortcut+Backspace support. (#650) [@michaelbartnett]
- InputText(): Got rid of individual OSX-specific options in ImGuiIO, added a single io.OSXBehaviors flag. (#473, #650)
- InputText(): Fixed pressing home key on last character when it isn't a trailing \n (#588, #815)
- InputText(): Fixed state corruption/crash bug in stb_textedit.h redo logic when exhausting undo/redo char buffer. (#715. #681)
- InputTextMultiline(): Fixed CTRL+DownArrow moving scrolling out of bounds.
- InputTextMultiline(): Scrollbar fix for when input and latched internal buffers differs in
  a way that affects vertical scrollbar existence. (#725)
- ImFormatString(): Fixed an overflow handling bug with implementation of vsnprintf() that do not return -1. (#793)
- BeginChild(const char*) now applies stack id to provided label, consistent with other widgets. (#894, #713)
- SameLine() with explicit X position is relative to left of group/columns. (ref #746, #125, #630)
- SliderInt(), SliderFloat() supports reverse direction (where v_min > v_max). (#854)
- SliderInt(), SliderFloat() better support for when v_min==v_max. (#919)
- SliderInt(), SliderFloat() enforces writing back value when interacting, to be consistent with other widgets. (#919)
- SliderInt, SliderFloat(): Fixed edge case where style.GrabMinSize being bigger than slider width can lead to a division by zero. (#919)
- Added IsRectVisible() variation with explicit start-end positions. (#768) [@thedmd]
- Fixed TextUnformatted() clipping bug in the large-text path when horizontal scroll has been applied. (#692, #246)
- Fixed minor text clipping issue in window title when using font straying above usual line. (#699)
- Fixed SetCursorScreenPos() fixed not adjusting CursorMaxPos as well.
- Fixed scrolling offset when using SetScrollY(), SetScrollFromPosY(), SetScrollHere() with menu bar.
- Fixed using IsItemActive() after EndGroup() or any widget using groups. (#840, #479)
- Fixed IsItemActive() lagging by one frame on initial widget activation. (#840)
- Fixed Separator() zero-height bounding box resulting in clipping when laying exactly on top line of clipping rectangle (#860)
- Fixed PlotLines() PlotHistogram() calling with values_count == 0.
- Fixed clicking on a window's void while staying still overzealously marking .ini settings as dirty. (#923)
- Fixed assert triggering when a window has zero rendering but has a callback. (#810)
- Scrollbar: Fixed rendering when sizes are negative to reduce glitches (which can happen with
  certain style settings and zero WindowMinSize).
- EndGroup(): Made IsItemHovered() work when an item was activated within the group. (#849)
- BulletText(): Fixed stopping to display formatted string after the '##' mark.
- Closing the focused window restore focus to the first active root window in descending z-order .(part of #727)
- Word-wrapping: Fixed a bug where we never wrapped after a 1 character word. [@sronsse]
- Word-wrapping: Fixed TextWrapped() overriding wrap position if one is already set. (#690)
- Word-wrapping: Fixed incorrect testing for negative wrap coordinates, they are perfectly legal. (#706)
- ImGuiListClipper: Fixed automatic-height calc path dumbly having user display element 0 twice. (#661, #716)
- ImGuiListClipper: Fix to behave within column. (#661, #662, #716)
- ImDrawList: Renamed ImDrawList::PathFill() to ImDrawList::PathFillConvex() for clarity. (BREAKING API)
- Columns: End() avoid calling Columns(1) if no columns set is open, not sure why it wasn't the
  case already (pros: faster, cons: exercise less code).
- ColorButton(): Fix ColorButton showing wrong hex value for alpha. (#1068) [@codecat]
- ColorEdit4(): better preserve inputting value out of 0..255 range, display then clamped in Hexadecimal form.
- Shutdown() clear out some remaining pointers for sanity. (#836)
- Added IMGUI_USE_BGRA_PACKED_COLOR option in imconfig.h (#767, #844) [@thedmd]
- Style: Removed the inconsistent shadow under RenderCollapseTriangle() (~#707)
- Style: Added ButtonTextAlign, ImGuiStyleVar_ButtonTextAlign. (#842)
- ImFont: Allowing to use up to 0xFFFE glyphs in same font (increased from previous 0x8000).
- ImFont: Added GetGlyphRangesThai() helper. [@nProtect]
- ImFont: CalcWordWrapPositionA() fixed font scaling with fallback character.
- ImFont: Calculate and store the approximate texture surface to get an idea of how costly each source font is.
- ImFontConfig: Added GlyphOffset to explicitly offset glyphs at font build time, useful for merged fonts.
  Removed MergeGlyphCenterV. (BREAKING API)
- Clarified asserts in CheckStacksSize() when there is a stack mismatch.
- Context: Support for #define-ing GImGui and IMGUI_SET_CURRENT_CONTEXT_FUNC to enable custom thread-based hackery (#586)
- Updated stb_truetype.h to 1.14 (added OTF support, removed warnings). (#883, #976)
- Updated stb_rect_pack.h to 0.10 (removed warnings). (#883)
- Added ImGuiMouseCursor_None enum value for convenient usage by app/backends.
- Clipboard: Added a void* user_data parameter to Clipboard function handlers. (#875) (BREAKING API)
- Internals: Refactor internal text alignment options to use ImVec2, removed ImGuiAlign. (#842, #222)
- Internals: Renamed ImLoadFileToMemory to ImFileLoadToMemory to be consistent with ImFileOpen + fix mismatching .h name. (#917)
- OS/Windows: Fixed Windows default clipboard handler leaving its buffer unfreed on application's exit. (#714)
- OS/Windows: No default IME handler when compiling for Windows using GCC. (#738)
- OS/Windows: Now using _wfopen() instead of fopen() to allow passing in paths/filenames with UTF-8 characters. (#917)
- Tools: binary_to_compressed_c: Avoid ?? trigraphs sequences in string outputs which break some older compilers. (#839)
- Demo: Added an extra 3-way columns demo.
- Demo: ShowStyleEditor: show font character map / grid in more details.
- Demo: Console: Fixed a completion bug when multiple candidates are equals and match until the end.
- Demo: Fixed 1-byte off overflow in the ShowStyleEditor() combo usage. (#783) [@bear24rw]
- Examples: Accessing ImVector fields directly, feel less stl-ey. (#810)
- Examples: OpenGL*: Saving/restoring existing scissor rectangle for completeness. (#807)
- Examples: OpenGL*: Saving/restoring active texture number (the value modified by glActiveTexture). (#1087, #1088, #1116)
- Examples: OpenGL*: Saving/restoring separate color/alpha blend functions correctly. (#1120) [@greggman]
- Examples: OpenGL2: Uploading font texture as RGBA32 to increase compatibility with users shaders for beginners. (#824)
- Examples: Vulkan: Countless fixes and improvements. (#785, #804, #910, #1017, #1039, #1041,
  #1042, #1043, #1080) [@martty, @Loftilus, @ParticlePeter, @SaschaWillems]
- Examples: DirectX9/10/10: Only call SetCursor(NULL) is io.MouseDrawCursor is set. (#585, #909)
- Examples: DirectX9: Explicitly setting viewport to match that other examples are doing. (#937)
- Examples: GLFW+OpenGL3: Fixed Shutdown() calling GL functions with NULL parameters if NewFrame was never called. (#800)
- Examples: GLFW+OpenGL2: Renaming opengl_example/ to opengl2_example/ for clarity.
- Examples: SDL+OpenGL: explicitly setting GL_UNPACK_ROW_LENGTH to reduce issues because SDL changes it. (#752)
- Examples: SDL2: Added build .bat files for Win32.
- Added various links to language/engine bindings.
- Various other minor fixes, tweaks, comments, optimizations.


-----------------------------------------------------------------------
 VERSION 1.49 (2016-05-09)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.49

Breaking Changes:

- Renamed `SetNextTreeNodeOpened()` to `SetNextTreeNodeOpen()` for consistency, no redirection.
- Removed confusing set of `GetInternalState()`, `GetInternalStateSize()`, `SetInternalState()` functions.
  Now using `CreateContext()`, `DestroyContext()`, `GetCurrentContext()`, `SetCurrentContext()`.
  If you were using multiple contexts the change should be obvious and trivial.
- Obsoleted old signature of `CollapsingHeader(const char* label, const char* str_id = NULL, bool display_frame = true, bool default_open = false)`,
  as extra parameters were badly designed and rarely used. Most uses were using 1 parameter and shouldn't affect you.
  You can replace the "default_open = true" flag in new API with `CollapsingHeader(label, ImGuiTreeNodeFlags_DefaultOpen)`.
- Changed `ImDrawList::PushClipRect(ImVec4 rect)` to `ImDraw::PushClipRect(ImVec2 min,ImVec2 max,bool intersect_with_current_clip_rect=false)`.
  Note that higher-level `ImGui::PushClipRect()` is preferable because it will clip at logic/widget level, whereas `ImDrawList::PushClipRect()` only affect your renderer.
- Title bar (using ImGuiCol_TitleBg/ImGuiCol_TitleBgActive colors) isn't rendered over a window background
  (ImGuiCol_WindowBg color) anymore (see #655). If your TitleBg/TitleBgActive alpha was 1.0f or you are using
  the default theme it will not affect you. However if your TitleBg/TitleBgActive alpha was <1.0f you need to
  tweak your custom theme to readjust for the fact that we don't draw a WindowBg background behind the title bar.
  This helper function will convert an old TitleBg/TitleBgActive color into a new one with the same visual output,
  given the OLD color and the OLD WindowBg color. (Or If this is confusing, just pick the RGB value from
  title bar from an old screenshot and apply this as TitleBg/TitleBgActive. Or you may just create
  TitleBgActive from a tweaked TitleBg color.)

    ImVec4 ConvertTitleBgCol(const ImVec4& win_bg_col, const ImVec4& title_bg_col)
    {
       float new_a = 1.0f - ((1.0f - win_bg_col.w) * (1.0f - title_bg_col.w));
       float k = title_bg_col.w / new_a;
       return ImVec4((win_bg_col.x * win_bg_col.w + title_bg_col.x) * k, (win_bg_col.y * win_bg_col.w + title_bg_col.y) * k, (win_bg_col.z * win_bg_col.w + title_bg_col.z) * k, new_a);
    }

Other changes:

- New version of ImGuiListClipper helper calculates item height automatically.
  See comments and demo code. (#662, #661, #660)
- Added SetNextWindowSizeConstraints() to enable basic min/max and programmatic size constraints on window. Added demo. (#668)
- Added PushClipRect()/PopClipRect() (previously part of imgui_internal.h).
  Changed ImDrawList::PushClipRect() prototype. (#610)
- Added IsRootWindowOrAnyChildHovered() helper. (#615)
- Added TreeNodeEx() functions. (#581, #600, #190)
- Added ImGuiTreeNodeFlags_Selected flag to display TreeNode as "selected". (#581, #190)
- Added ImGuiTreeNodeFlags_AllowOverlapMode flag. (#600)
- Added ImGuiTreeNodeFlags_NoTreePushOnOpen flag (#590).
- Added ImGuiTreeNodeFlags_NoAutoOpenOnLog flag (previously private).
- Added ImGuiTreeNodeFlags_DefaultOpen flag (previously private).
- Added ImGuiTreeNodeFlags_OpenOnDoubleClick flag.
- Added ImGuiTreeNodeFlags_OpenOnArrow flag.
- Added ImGuiTreeNodeFlags_Leaf flag, always opened, no arrow, for convenience.
  For simple use case prefer using TreeAdvanceToLabelPos()+Text().
- Added ImGuiTreeNodeFlags_Bullet flag, to add a bullet to Leaf node or replace Arrow with a bullet.
- Added TreeAdvanceToLabelPos(), GetTreeNodeToLabelSpacing() helpers. (#581, #324)
- Added CreateContext()/DestroyContext()/GetCurrentContext()/SetCurrentContext().
  Obsoleted nearly identical GetInternalState()/SetInternalState() functions. (#586, #269)
- Added NewLine() to undo a SameLine() and as a shy reminder that horizontal layout support hasn't been implemented yet.
- Added IsItemClicked() helper. (#581)
- Added CollapsingHeader() variant with close button. (#600)
- Fixed MenuBar missing lower border when borders are enabled.
- InputText(): Fixed clipping of cursor rendering in case it gets out of the box (which can be forced w/ ImGuiInputTextFlags_NoHorizontalScroll. (#601)
- Style: Changed default IndentSpacing from 22 to 21. (#581, #324)
- Style: Fixed TitleBg/TitleBgActive color being rendered above WindowBg color, which was
  inconsistent and causing visual artifact. (#655)
  This broke the meaning of TitleBg and TitleBgActive. Only affect values where Alpha<1.0f.
  Fixed default theme. Read comments in "API BREAKING CHANGES" section to convert.
- Relative rendering of order of Child windows creation is preserved, to allow more control with overlapping children. (#595)
- Fixed GetWindowContentRegionMax() being off by ScrollbarSize amount when explicit SizeContents is set.
- Indent(), Unindent(): optional non-default indenting width. (#324, #581)
- Bullet(), BulletText(): Slightly bigger. Less polygons.
- ButtonBehavior(): fixed subtle old bug when a repeating button would also return true on mouse
  release (barely noticeable unless RepeatRate is set to be very slow). (#656)
- BeginMenu(): a menu that becomes disabled while open gets closed down, facilitate user's code. (#126)
- BeginGroup(): fixed using within Columns set. (#630)
- Fixed a lag in reading the currently hovered window when dragging a window. (#635)
- Obsoleted 4 parameters version of CollapsingHeader(). Refactored code into TreeNodeBehavior. (#600, #579)
- Scrollbar: minor fix for top-right rounding of scrollbar background when window has menu bar but no title bar.
- MenuItem(): the check mark renders in disabled color when menu item is disabled.
- Fixed clipping rectangle floating point representation to ensure renderer-side floating-point
  operations yield correct results in typical DirectX/GL settings. (#582, 597)
- Fixed GetFrontMostModalRootWindow(), fixing missing fade-out when a combo pop was used stacked
  over a modal window. (#604)
- ImDrawList: Added AddQuad(), AddQuadFilled() helpers.
- ImDrawList: AddText() refactor, moving some code to ImFont, reserving less unused vertices when large vertical clipping occurs.
- ImFont: Added RenderChar() helper.
- ImFont: Added AddRemapChar() helper. (#609)
- ImFontConfig: Clarified persistence requirement of GlyphRanges array. (#651)
- ImGuiStorage: Added bool helper functions for completeness.
- AddFontFromMemoryCompressedTTF(): Fix ImFontConfig propagation. (#587)
- Renamed majority of use of the word "opened" to "open" for clarity. Renamed SetNextTreeNodeOpened() to SetNextTreeNodeOpen(). (#625, #579)
- Examples: OpenGL3: Saving/restoring glActiveTexture() state. (#602)
- Examples: DirectX9: save/restore all device state.
- Examples: DirectX9: Removed dependency on d3dx9.h, d3dx9.lib, dxguid.lib so it can be used in
  a DirectXMath.h only environment. (#611)
- Examples: DirectX10/X11: Apply depth-stencil state (no use of depth buffer). (#640, #636)
- Examples: DirectX11/X11: Added comments on removing dependency on D3DCompiler. (#638)
- Examples: SDL: Initialize video+timer subsystem only.
- Examples: Apple/iOS: lowered XCode project deployment target from 10.7 to 10.11. (#598, #575)


-----------------------------------------------------------------------
 VERSION 1.48 (2016-04-09)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.48

Breaking Changes:

- Consistently honoring exact width passed to PushItemWidth() (when positive), previously it would
  add extra FramePadding.x*2 over that width. Some hand-tuned layout may be affected slightly. (#346)
- Style: removed `style.WindowFillAlphaDefault` which was confusing and redundant, baked alpha into
  `ImGuiCol_WindowBg` color. If you had a custom WindowBg color but didn't change WindowFillAlphaDefault,
  multiply WindowBg alpha component by 0.7. Renamed `ImGuiCol_TooltipBg` to `ImGuiCol_PopupBG`,
  applies to other types of pop-ups. `bg_alpha` parameter of 5-parameters version of Begin() is an override. (#337)
- InputText(): Added BufTextLen field in ImGuiTextEditCallbackData. Requesting user to update it
  if the buffer is modified in the callback. Added a temporary length-check assert to minimize panic
  for the 3 people using the callback. (#541)
- Renamed GetWindowFont() to GetFont(), GetWindowFontSize() to GetFontSize().
  Kept inline redirection function (will obsolete). (#340)

Other Changes:

- Consistently honoring exact width passed to PushItemWidth(), previously it would add extra
  FramePadding.x*2 over that width. Some hand-tuned layout may be affected slightly. (#346)
- Fixed clipping of child windows within parent not taking account of child outer clipping
  boundaries (including scrollbar, etc.). (#506)
- TextUnformatted(): Fixed rare crash bug with large blurb of text (2k+) not finished with
  a '\n' and fully above the clipping Y line. (#535)
- IO: Added 'KeySuper' field to hold CMD keyboard modifiers for OS X. Updated all examples accordingly. (#473)
- Added ImGuiWindowFlags_ForceVerticalScrollbar, ImGuiWindowFlags_ForceHorizontalScrollbar flags. (#476)
- Added IM_COL32 macros to generate a U32 packed color, convenient for direct use of ImDrawList api. (#346)
- Added GetFontTexUvWhitePixel() helper, convenient for direct use of ImDrawList api.
- Selectable(): Added ImGuiSelectableFlags_AllowDoubleClick flag to allow user reacting
  on double-click. (@zapolnov) (#516)
- Begin(): made the close button explicitly set the boolean to false instead of toggling it. (#499)
- BeginChild()/EndChild(): fixed incorrect layout to allow widgets submitted after an auto-fitted child window. (#540)
- BeginChild(): Added ImGuiWindowFlags_AlwaysUseWindowPadding flag to ensure non-bordered child window
  uses window padding. (#462)
- Fixed InputTextMultiLine(), ListBox(), BeginChildFrame(), ProgressBar(): outer frame not
  honoring bordering. (#462, #503)
- Fixed Image(), ImageButtion() rendering a rectangle 1 px too large on each axis. (#457)
- SetItemAllowOverlap(): Promoted from imgui_internal.h to public imgui.h api. (#517)
- Combo(): Right-most button stays highlighted when pop-up is open.
- Combo(): Display pop-up above if there's isn't enough space below / or select largest side. (#505)
- DragFloat(), SliderFloat(), InputFloat(): fixed cases of erroneously returning true repeatedly
  after a text input modification (e.g. "0.0" --> "0.000" would keep returning true). (#564)
- DragFloat(): Always apply value when mouse is held/widget active, so that an always-resetting
  variable (e.g. non saved local) can be passed.
- InputText(): OS X friendly behaviors:  (@zhiayang), (#473)
  - Word movement uses ALT key;
  - Shortcuts uses CMD key;
  - Double-clicking text select a single word;
  - Jumping to next word sets cursor to end of current word instead of beginning of current word.
- InputText(): Added BufTextLen in ImGuiTextEditCallbackData. Requesting user to maintain it
  if buffer is modified. Zero-ing structure properly before use. (#541)
- CheckboxFlags(): Added support for testing/setting multiple flags at the same time. (@DMartinek) (#555)
- TreeNode(), CollapsingHeader() fixed not being able to use "##" sequence in a formatted label.
- ColorEdit4(): Empty label doesn't add InnerSpacing.x, matching behavior of other widgets. (#346)
- ColorEdit4(): Removed unnecessary calls to scanf() when idle in hexadecimal edit mode.
- BeginPopupContextItem(), BeginPopupContextWindow(): added early out optimization.
- CaptureKeyboardFromApp() / CaptureMouseFromApp(): added argument to allow clearing the capture flag. (#533)
- ImDrawList: Fixed index-overflow check broken by AddText() casting current index back to ImDrawIdx. (#514)
- ImDrawList: Fixed incorrect removal of trailing draw command if it is a callback command.
- ImDrawList: Allow windows with only a callback only to be functional. (#524)
- ImDrawList: Fixed ImDrawList::AddRect() which used to render a rectangle 1 px too large on each axis. (#457)
- ImDrawList: Fixed ImDrawList::AddCircle() to fit precisely within bounding box like AddCircleFilled() and AddRectFilled(). (#457)
- ImDrawList: AddCircle(), AddRect() takes optional thickness parameter.
- ImDrawList: Added AddTriangle().
- ImDrawList: Added PrimQuadUV() helper to ease custom rendering of textured quads (require primitive reserve).
- ImDrawList: Allow AddText(ImFont\* font, float font_size, ...) variant to take NULL/0.0f as default.
- ImFontAtlas: heuristic increase default texture width up for large number of glyphs. (#491)
- ImTextBuffer: Fixed empty() helper which was utterly broken.
- Metrics: allow to inspect individual triangles in draw calls.
- Demo: added more draw primitives in the Custom Rendering example. (#457)
- Demo: extra comments and example for PushItemWidth(-1) patterns.
- Demo: InputText password demo filters out blanks. (#515)
- Demo: Fixed malloc/free mismatch and leak when destructing demo console, if it has been used. (@fungos) (#536)
- Demo: plot code doesn't use ImVector to avoid heap allocation and be more friendly to custom allocator users. (#538)
- Fixed compilation on DragonFly BSD (@mneumann) (#563)
- Examples: Vulkan: Added a Vulkan example (@Loftilus) (#549)
- Examples: DX10, DX11: Saving/restoring most device state so dropping render function in your
  codebase shouldn't have DX device side-effects. (#570)
- Examples: DX10, DX11: Fixed ImGui_ImplDX??_NewFrame() from recreating device objects if render isn't called (g_pVB not set).
- Examples: OpenGL3: Fix BindVertexArray/BindBuffer order. (@nlguillemot) (#527)
- Examples: OpenGL: skip rendering and calling glViewport() if we have zero-fixed buffer. (#486)
- Examples: SDL2+OpenGL3: Fix context creation options. Made ImGui_ImplSdlGL3_NewFrame() signature
  match GL2 one. (#468, #463)
- Examples: SDL2+OpenGL2/3: Fix for high-dpi displays. (@nickgravelyn)
- Various extra comments and clarification in the code.
- Various other fixes and optimizations.


-----------------------------------------------------------------------
 VERSION 1.47 (2015-12-25)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.47

Changes:

- Rebranding "ImGui" -> "dear imgui" as an optional first name to reduce ambiguity with IMGUI term. (#21)
- Added ProgressBar(). (#333)
- InputText(): Added ImGuiInputTextFlags_Password mode: hide display, disable logging/copying to clipboard. (#237, #363, #374)
- Added GetColorU32() helper to retrieve color given enum with global alpha and extra applied.
- Added ImGuiIO::ClearInputCharacters() superfluous helper.
- Fixed ImDrawList draw command merging bug where using PopClipRect() along with PushTextureID()/PopTextureID() functions
  would occasionally restore an incorrect clipping rectangle.
- Fixed ImDrawList draw command merging so PushTextureID(XXX)/PopTextureID()/PushTextureID(XXX) sequence are now properly merged.
- Fixed large popups positioning issues when their contents on either axis is larger than DisplaySize,
  and WindowPadding < DisplaySafeAreaPadding.
- Fixed border rendering in various situations when using non-pixel aligned glyphs.
- Fixed border rendering of windows to always contain the border within the window.
- Fixed Shutdown() leaking font atlas data if NewFrame() was never called. (#396, #303)
- Fixed int>void\* warnings for 64-bit architectures with fancy warnings enabled.
- Renamed the dubious Color() helpers to ValueColor() - dangerously named, rarely used and probably to be made obsolete.
- InputText(): Fixed and better handling of using keyboard while mouse button if being held and dragging. (#429)
- InputText(): Replace OS IME (Input Method Editor) cursor on top-left when we are not text editing.
- TreeNode(), CollapsingHeader(), Bullet(), BulletText(): various sizing and layout fixes to better support laying out
  multiple item with different height on same line. (#414, #282)
- Begin(): Initial window creation with ImGuiWindowFlags_NoBringToFrontOnFocus flag pushes it at the front of global window list.
- BeginPopupContextWindow() and BeginPopupContextVoid() reopen window on subsequent click. (#439)
- ColorEdit4(): Fixed broken tooltip on hovering the color button. (actually fixes #373, #380)
- ImageButton(): uses FrameRounding up to a maximum of available framing size. (#394)
- Columns: Fixed bug with indentation within columns, also making code a bit shorter/faster. (#414, #125)
- Columns: Columns set with no implicit id include the columns count within the id to reduce collisions. (#125)
- Columns: Removed one unnecessary allocation when columns are not used by a window. (#125)
- ImFontAtlas: Tweaked GetGlyphRangesJapanese() so it is easier to modify.
- ImFontAtlas: Updated stb_rect_pack.h to 0.08.
- Metrics: Fixed computing ImDrawCmd bounding box when the draw buffer have been unindexed.
- Demo: Added a simple "Property Editor" demo applet. (#125, #414)
- Demo: Fixed assertion in "Custom Rendering" demo when holding both mouse buttons. (#393)
- Demo: Lots of extra comments, fixes.
- Demo: Tweaks to Style Editor.
- Examples: Not clearing input data/tex data in atlas (will be required for dynamic atlas anyway).
- Examples: Added /Zi (output debug information) to Win32 batch files.
- Examples: Various fixes for resizing window and recreating graphic context.
- Examples: OpenGL2/3: Save/restore viewport as part of default render function. (#392, #441).
- Examples; OpenGL3: Fixed gl3w.c for Linux when compiled with a C++ compiler. (#411)
- Examples: DirectX: Removed assumption about Unicode build in example main.cpp. (#399)
- Examples: DirectX10: Added DirectX10 example. (#424)
- Examples: DirectX11: Downgraded requirement from shader model 5.0 to 4.0. (#420)
- Examples: DirectX11: Removed Debug flag from graphics context. (#415)
- Examples: Added SDL+OpenGL3 example. (#356)


-----------------------------------------------------------------------
 VERSION 1.46 (2015-10-18)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.46

Changes:

- Begin*(): added ImGuiWindowFlags_NoFocusOnAppearing flag. (#314)
- Begin*(): added ImGuiWindowFlags_NoBringToFrontOnFocus flag.
- Added GetDrawData() alternative to setting a Render function pointer in ImGuiIO structure.
- Added SetClipboardText(), GetClipboardText() helper shortcuts that user code can call directly without reading
  from the ImGuiIO structure (to match MemAlloc/MemFree)
- Fixed handling of malformed UTF-8 at the end of a non-zero terminated string range.
- Fixed mouse click detection when passing DeltaTime 0.0. (#338)
- Fixed IsKeyReleased() and IsMouseReleased() returning true on the first frame.
- Fixed using SetNextWindow\* functions on Modal windows with a ImGuiSetCond_Appearing condition. (#377)
- IsMouseHoveringRect(): Added 'bool clip' parameter to disable clipping provided rectangle. (#316)
- InputText(): added ImGuiInputTextFlags_ReadOnly flag. (#211)
- InputText(): lose cursor/undo-stack when reactivating focus is buffer has changed size.
- InputText(): fixed ignoring text inputs when ALT or ALTGR are pressed. (#334)
- InputText(): fixed mouse-dragging not tracking the cursor when text doesn't fit. (#339)
- InputText(): fixed cursor pixel-perfect alignment when horizontally scrolling.
- InputText(): fixed crash when passing a buf_size==0 (which can be of use for read-only selectable text boxes). (#360)
- InputFloat() fixed explicit precision modifier, both display and input were broken.
- PlotHistogram(): improved rendering of histogram with a lot of values.
- Dummy(): creates an item so functions such as IsItemHovered() can be used.
- BeginChildFrame() helper: added the extra_flags parameter.
- Scrollbar: fixed rounding of background + child window consistenly have ChildWindowBg color under ScrollbarBg fill. (#355).
- Scrollbar: background color less translucent in default style so it works better when changing background color.
- Scrollbar: fixed minor rendering offset when borders are enabled. (#365)
- ImDrawList: fixed 1 leak per ImDrawList using the ChannelsSplit() API (via Columns). (#318)
- ImDrawList: fixed rectangle rendering glitches with width/height <= 1/2 and rounding enabled.
- ImDrawList: AddImage() uv parameters default to (0,0) and (1,1).
- ImFontAtlas: Added TexDesiredWidth and tweaked default cheapo best-width choice. (#327)
- ImFontAtlas: Added GetGlyphRangesKorean() helper to retrieve unicode ranges for Korean. (#348)
- ImGuiTextFilter::Draw() helper return bool and build when filter is modified.
- ImGuiTextBuffer: added c_str() helper.
- ColorEdit4(): fixed hovering the color button always showing 1.0 alpha. (#373)
- ColorConvertFloat4ToU32() round the floats instead of truncating them.
- Window: Fixed window lower-right clipping limit so it plays more friendly with both OpenGL and DirectX coordinates.
- Internal: Extracted a EndFrame() function out of Render() but kept it internal/private + clarified some asserts. (#335)
- Internal: Added missing IMGUI_API definitions in imgui_internal.h (#326)
- Internal: ImLoadFileToMemory() return void\* instead of taking void*\* + allow optional int\* file_size.
- Demo: Horizontal scrollbar demo allows to enable simultanaeous scrollbars on both axises.
- Tools: binary_to_compressed_c.cpp: added -nocompress option.
- Examples: Added example for the Marmalade platform.
- Examples: Added batch files to build Windows examples with VS.
- Examples: OpenGL3: Saving/restoring more GL state correctly. (#347)
- Examples: OpenGL2/3: Added msys2/mingw64 target to Makefiles.


-----------------------------------------------------------------------
 VERSION 1.45 (2015-09-01)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.45

Breaking Changes:

- With the addition of better horizontal scrolling primitives I had to make some consistency fixes.
  `GetCursorPos()` `SetCursorPos()` `GetContentRegionMax()` `GetWindowContentRegionMin()` `GetWindowContentRegionMax()`
  are now incorporating the scrolling amount. They were incorrectly not incorporating this amount previously.
  It PROBABLY shouldn't break anything, but that depends on how you used them. Namely:
  - If you always used SetCursorPos() with values relative to GetCursorPos() there shouldn't be a problem.
    However if you used absolute coordinates, note that SetCursorPosY(100.0f) will put you at +100 from the
    initial Y position (which may be scrolled out of the view), NOT at +100 from the window top border.
    Since there wasn't any official scrolling value on X axis (past just manually moving the cursor) this can
    only affect you if you used to set absolute coordinates on the Y axis which is hopefully rare/unlikely,
    and trivial to fix.
  - The value of GetWindowContentRegionMax() isn't necessarily close to GetWindowWidth() if horizontally scrolling.
    Previously they were roughly interchangeable (roughly because the content region exclude window padding).

Other Changes:

- Added Horizontal Scrollbar via ImGuiWindowFlags_HorizontalScroll (#246).
- Added GetScrollX(), GetScrollX(), GetScrollMaxX() apis (#246).
- Added SetNextWindowContentSize(), SetNextWindowContentWidth() to explicitly set the content size of a window, which
  define the range of scrollbar. When set explicitly it also define the base value from which widget width are derived.
- Added IO.WantTextInput telling when ImGui is expecting text input, so that e.g. OS on-screen keyboard can be enabled.
- Added printf attribute to printf-like text formatting functions (Clang/GCC).
- Added GetMousePosOnOpeningCurrentPopup() helper.
- Added GetContentRegionAvailWidth() helper.
- Malformed UTF-8 data don't terminate string, output 0xFFFD instead (#307).
- ImDrawList: Added AddBezierCurve(), PathBezierCurveTo() API for cubic bezier curves (#311).
- ImDrawList: Allow to override ImDrawIdx type (#292).
- ImDrawList: Added an assert on overflowing index value (#292).
- ImDrawList: Fixed issues with channels split/merge. Now functional without manually adding a draw cmd. Added comments.
- ImDrawData: Added ScaleClipRects() helper useful when rendering scaled. (#287).
- Fixed Bullet() inconsistent layout behaviour when clipped.
- Fixed IsWindowHovered() not taking account of window hoverability (may be disabled because of a popup).
- Fixed InvisibleButton() not honoring negative size consistently with other widgets that do so.
- Fixed OpenPopup() accessing current window, effectively opening "Debug" when called from an empty window stack.
- TreeNode(): Fixed IsItemHovered() result being inconsistent with interaction visuals (#282).
- TreeNode(): Fixed mouse interaction padding past the node label being accounted for in layout (#282).
- BeginChild(): Passing a ImGuiWindowFlags_NoMove inhibits moving parent window from this child.
- BeginChild() fixed missing rounding for child sizes which leaked into layout and have items misaligned.
- Begin(): Removed default name = "Debug" parameter. We already have a "Debug" window pushed to the stack in
  the first place so it's not really a useful default.
- Begin(): Minor fixes with windows main clipping rectangle (e.g. child window with border).
- Begin(): Window flags are only read on the first call of the frame. Subsequent calls ignore flags, which allows
  appending to a window without worryin about flags.
- InputText(): ignore character input when ctrl/alt are held. (Normally those text input are ignored by most wrappers.) (#279).
- Demo: Fixed incorrectly formed string passed to Combo (#298).
- Demo: Added simple Log demo.
- Demo: Added horizontal scrolling example + enabled in console, log and child examples (#246).
- Style: made scrollbars rounded by default. Because nice. Minor menu bar background alpha tweak. (#246)
- Metrics: display indices along with triangles count (#299) and some internal state.
- ImGuiTextFilter::PassFilter() supports string range. Added [] helper to ImGuiTextBuffer.
- ImGuiTextFilter::Draw() default parameter width=0.0f for no override, allow override with negative values.
- Examples: OpenGL2/OpenGL3: fix for retina displays. Default font current lack crispness.
- Examples: OpenGL2/OpenGL3: save/restore more GL state correctly.
- Examples: DirectX9/DirectX11: resizing buffers dynamically (#299).
- Examples: DirectX9/DirectX11: added missing middle mouse button to Windows event handler.
- Examples: DirectX11: fix for Visual Studio 2015 presumably shipping with an updated version of DX11.
- Examples: iOS: fixed missing files in project.


-----------------------------------------------------------------------
 VERSION 1.44 (2015-08-08)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.44

Breaking Changes:

- imgui.cpp has been split intro extra files: imgui_demo.cpp, imgui_draw.cpp, imgui_internal.h.
  Add the two extra .cpp to your project or #include them from another .cpp file. (#219)

Other Changes:

- Internal data structure and several useful functions are now exposed in imgui_internal.h. This should make it easier
  and more natural to extend ImGui. However please note that none of the content in imgui_internal.h is guaranteed
  for forward-compatibility and code using those types/functions may occasionally break. (#219)
- All sample code is in imgui_demo.cpp. Please keep this file in your project and consider allowing your code to call
  the ShowTestWindow() function as de-facto guide to ImGui features. It will be stripped out by the linker when unused.
- Added GetContentRegionAvail() helper (basically GetContentRegionMax() - GetCursorPos()).
- Added ImGuiWindowFlags_NoInputs for totally input-passthru window.
- Button(): honor negative size consistently with other widgets that do so (width -100 to align the button 100 pixels
  before the right-most position of the contents region).
- InputTextMultiline(): honor negative size consistently with other widgets that do so.
- Combo() clamp popup to lower edge of visible area.
- InputInt(): value doesn't pass through an int>float>int casting chain, fix handling lost of precision with "large" integer.
- InputInt() allow hexadecimal input (awkwardly via ImGuiInputTextFlags_CharsHexadecimal but we will allow format
  string in InputInt* later).
- Checkbox(), RadioButton(): fixed scaling of checkbox and radio button for the filling of "active" visual.
- Columns: never assume horizontal space for scrollbar if NoScrollbar flag is explicitly set.
- Slider: fixed using FramePadding between frame and grab visual. Scaling that spacing would look odd.
- Fixed lower-right resize grip hit box not scaling along with its rendered size (#287)
- ImDrawList: Fixed angles in ImDrawList::PathArcTo(), PathArcToFast() (v1.43) being off by an extra PI for no reason.
- ImDrawList: Added ImDrawList::AddText() shorthand helper.
- ImDrawList: Add missing support for anti-aliased thick-lines (#133, also ref #288)
- ImFontAtlas: Added AddFontFromMemoryCompressedBase85TTF() to load base85 encoded font string. Default font encoded
  as base85 saves ~100 lines / 26 KB of source code. Added base85 output to the binary_to_compressed_c tool.
- Build fix for MinGW (#276).
- Examples: OpenGL3: Fixed running on script core profiles for OSX (#277).
- Examples: OpenGL3: Simplified code using glBufferData for vertices as well (#277, #278)
- Examples: DirectX11: Clear font texture view to ensure Release() doesn't get called twice (#290).
- Updated to stb_truetype 1.07 (back to vanilla version as our minor changes are now in master & fix unlikely assert
  with odd fonts (#280)


-----------------------------------------------------------------------
 VERSION 1.43 (2015-07-17)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.43

Breaking Changes:

- This is a rather important release and we unfortunately had to break the rendering API.
  ImGui now requires you to render indexed vertices instead of non-indexed ones. The fix should be very easy.
  Sorry for that! This change is saving a fair amount of CPU/GPU and enables us to get anti-aliasing for a marginal cost.
  Each ImDrawList now contains both a vertex buffer and an index buffer. For each command, render ElemCount/3 triangles
  using indices from the index buffer.
- If you are using a vanilla copy of one of the imgui_impl_XXXX.cpp provided in the example, you just need to update
  your copy and you can ignore the rest.
- The signature of the io.RenderDrawListsFn handler has changed
  From:  ImGui_XXXX_RenderDrawLists(ImDrawList** const cmd_lists, int cmd_lists_count)
  To:    ImGui_XXXX_RenderDrawLists(ImDrawData* draw_data)
  With:  argument   'cmd_lists'        -> 'draw_data->CmdLists'
         argument   'cmd_lists_count'  -> 'draw_data->CmdListsCount'
         ImDrawList 'commands'         -> 'CmdBuffer'
         ImDrawList 'vtx_buffer'       -> 'VtxBuffer'
         ImDrawList  n/a               -> 'IdxBuffer' (new)
         ImDrawCmd  'vtx_count'        -> 'ElemCount'
         ImDrawCmd  'clip_rect'        -> 'ClipRect'
         ImDrawCmd  'user_callback'    -> 'UserCallback'
         ImDrawCmd  'texture_id'       -> 'TextureId'
- If you REALLY cannot render indexed primitives, you can call the draw_data->DeIndexAllBuffers() method to de-index
  the buffers. This is slow and a waste of CPU/GPU. Prefer using indexed rendering!
  Refer to code in the examples/ folder or ask on the GitHub if you are unsure of how to upgrade. Please upgrade!

Other Changes:

- Added anti-aliasing on lines and shapes based on primitives by @MikkoMononen (#133).
  Between the use of indexed-rendering and the fact that the entire rendering codebase has been optimized and massaged
  enough, with anti-aliasing enabled ImGui 1.43 is now running FASTER than 1.41.
  Made some extra effort in making the code run faster in your typical Debug build.
- Anti-aliasing can be disabled in the ImGuiStyle structure via the AntiAliasedLines/AntiAliasedShapes fields for further gains.
- ImDrawList: Added AddPolyline(), AddConvexPolyFilled() with optional anti-aliasing.
- ImDrawList: Added stateful path building and stroking API. PathLineTo(), PathArcTo(), PathRect(), PathFill(), PathStroke()
  with optional anti-aliasing.
- ImDrawList: Added AddRectFilledMultiColor() helper.
- ImDrawList: Added multi-channel rendering so out of order elements can be rendered in separate channels and then merged
  back together (used by columns).
- ImDrawList: Fixed merging draw commands when equal clip rectangles are in the two first commands.
- ImDrawList: Fixed window draw lists not destructed properly on Shutdown().
- ImDrawData: Added DeIndexAllBuffers() helper.
- Added lots of new font options ImFontAtlas::AddFont() and the new ImFontConfig structure.
  - Added support for oversampling (ImFontConfig: OversampleH, OversampleV) and sub-pixel positioning (ImFontConfig: PixelSnapH).
    Oversampling allows sub-pixel positioning but can also be used as a way to get some leeway with scaling fonts without re-rasterizing.
  - Added GlyphExtraSpacing option to add extra horizontal spacing between characters (#242).
  - Added MergeMode option to merge glyphs from different font inputs into a same font (#182, #232).
  - Added FontDataOwnedByAtlas option to keep ownership from the TTF data buffer and request the atlas to make a copy (#220).
- Updated to stb_truetype 1.06 (+ minor mods) with better font rasterization.
- InputText: Added ImGuiInputTextFlags_NoHorizontalScroll flag.
- InputText: Added ImGuiInputTextFlags_AlwaysInsertMode flag.
- InputText: Added HasSelection() helper in ImGuiTextEditCallbackData as a clarification.
- InputText: Fix for using END key on a multi-line text editor (#275)
- Columns: Dispatch render of each column in a sub-draw list and merge on closure, saving a lot of draw calls! (#125)
- Popups: Fixed Combo boxes inside menus. (#272)
- Style: Added GrabRounding setting to make the sliders etc. grabs rounded.
- Changed SameLine() parameters from int to float.
- Fixed incorrect assert triggering when code stole ActiveID from user moving a window by calling e.g. SetKeyboardFocusHere().
- Fixed CollapsingHeader() label rendering outside its frame in columns context where ClipRect max isn't aligned with the
  right-side of the header.
- Metrics window: calculate bounding box of actual vertices when hovering a draw list.
- Examples: Showing more information in the Fonts section.
- Examples: Added a gratuitous About window.
- Examples: Updated all examples code (OpenGL/DX9/DX11/SDL/Allegro/iOS) to use indexed rendering.
- Examples: Fixed the SDL2 example to support Unicode text input (#274).


-----------------------------------------------------------------------
 VERSION 1.42 (2015-07-08)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.42

Breaking Changes:

- Renamed SetScrollPosHere() to SetScrollHere(). Kept inline redirection function (will obsolete).
- Renamed GetScrollPosY() to GetScrollY(). Necessary to reduce confusion and make scrolling API consistent,
  because positions (e.g. cursor position) are not equivalent to scrolling amount.
- Removed obsolete GetDefaultFontData() function that would assert anyway.
  If you are updating from <1.30 you'll get a compile error instead of an assertion. (obsoleted 2015/01/11)

Other Changes:

- Added SDL2 example application (courtesy of @CedricGuillemet)
- Added iOS example application (courtesy of @joeld42)
- Added Allegro 5 example application (courtesy of @bggd)
- Added TitleBgActive color in style so focused window is made visible. (#253)
- Added CaptureKeyboardFromApp() / CaptureMouseFromApp() to manually enforce inputs capturing.
- Added DragFloatRange2() DragIntRange2() helpers. (#76)
- Added a Y centering ratio to SetScrollFromCursorPos() which can be used to aim the top
  or bottom of the window. (#150)
- Added SetScrollY(), SetScrollFromPos(), GetCursorStartPos() for manual scrolling manipulations. (#150).
- Added GetKeyIndex() helper for converting from ImGuiKey_\* enum to user's keycodes.
  Basically pulls from io.KeysMap[].
- Added missing ImGuiKey_PageUp, ImGuiKey_PageDown so more UI code can be written without
  referring to implementation-side keycodes.
- MenuItem() can be activated on release. (#245)
- Allowing NewFrame() with DeltaTime==0.0f to not assert.
- Fixed IsMouseDragging(). (#260)
- Fixed PlotLines(), PlotHistogram() using incorrect hovering test so they would show their tooltip even when there is
  a popup between mouse and the graph.
- Fixed window padding being reported incorrectly for child windows with borders when parent have no borders.
- Fixed a bug with TextUnformatted() clipping of long text blob when clipping y1 line sits on the first line of text. (#257)
- Fixed text baseline alignment of small button (no padding) after regular buttons.
- Fixed ListBoxHeader() not honoring negative sizes the same way as BeginChild() or BeginChildFrame(). (#263)
- Fixed warnings for more pedantic compiler settings (#258).
- ImVector<> cannot be re-defined anymore, cannot be replaced with std::vector<>.
  Allowed us to clean up and optimize lots of code. Yeah! (#262)
- ImDrawList: store pointer to their owner name for easier auditing/debugging.
- Examples: added scroll tracking example with SetScrollFromCursorPos().
- Examples: metrics windows render clip rectangle when hovering over a draw call.
- Lots of small optimization (particularly to run faster on unoptimized builds) and tidying up.
- Added font links in extra_fonts/ + instructions for using compressed fonts in C array.


-----------------------------------------------------------------------
 VERSION 1.41 (2015-06-26)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.41

Breaking Changes:

- Changed ImageButton() default bg_col parameter from (0,0,0,1) (black) to (0,0,0,0) (transparent).
  Only makes a difference when texture have transparency.
- Changed Selectable() API from (label, selected, size) to (label, selected, flags, size).
  Size override should be used very rarely so hopefully it doesn't affect many people. Sorry!

Other Changes:

- Added InputTextMultiline() multi-line text editor, vertical scrolling, selection, optimized
  enough to handle rather big chunks of text in stateless context (thousands of lines are ok),
  option for allowing Tab to be input, option for validating with Return or Ctrl+Return (#200).
- Added modal window API, BeginPopupModal(), follows the popup api scheme. Modal windows can be closed
  by clicking outside. By default the rest of the screen is dimmed (using ImGuiCol_ModalWindowDarkening).
  Modal windows can be stacked.
- Added GetGlyphRangesCyrillic() helper (#237).
- Added SetNextWindowPosCenter() to center a window prior to knowing its size. (#249)
- Added IsWindowHovered() helper.
- Added IsMouseReleased(), IsKeyReleased() helpers to allow to user to avoid tracking them. (#248)
- Allow Set*WindowSize() calls to be used with popups.
- Window: AutoFit can be triggered on each axis separately via SetNextWindowSize(), etc.
- Window: fixed scrolling with mouse wheel while window was collapsed.
- Window: fixed mouse wheel scroll issues.
- DragFloat(), SliderFloat(): Fixed rounding of negative numbers which sometime made the negative lower bound unreachable.
- InputText(): lifted character count limit.
- InputText(): fixes in case of using per-window font scaling.
- Selectable(), MenuItem(): do not use frame rounding for hovering/selection.
- Selectable(): Added flag ImGuiSelectableFlags_DontClosePopups.
- Selectable(): Added flag ImGuiSelectableFlags_SpanAllColumns (#125).
- Combo(): Fixed issue with activating a Combo() not taking active id (#241).
- ColorButton(), ColorEdit4(): fix to ensure that the colored square stays square when
  non-default padding settings are used.
- BeginChildFrame(): returns bool like BeginChild() for clipping.
- SetScrollPosHere(): takes account of item height + more accurate centering + fixed precision issue.
- ImFont: ignoring '\r'.
- ImFont: added GetCharAdvance() helper. Exposed font Ascent and font Descent.
- ImFont: additional rendering optimizations.
- Metrics windows display storage size.


-----------------------------------------------------------------------
 VERSION 1.40 (2015-05-31)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.40

Breaking Changes:

- The BeginPopup() API (introduced in 1.37) had to be changed to allow for stacked popups and menus.
  Use OpenPopup() to toggle the opened state and BeginPopup() to append.**
- The third parameter of Button(), 'repeat_if_held' has been removed. While it's been very rarely used,
  some code will possibly break if you didn't rely on the default parameter.
  Use PushButtonRepeat()/PopButtonRepeat() to configure repeat.
- Renamed IsRectClipped() to !IsRectVisible() for consistency (opposite return value!).
  Kept inline redirection function (will obsolete)
- Renamed GetWindowCollapsed() to IsWindowCollapsed() for consistency.
  Kept inline indirection function (will obsolete).

Other Changes:

- Menus: Added a menu system! Menus are typically populated with menu items and sub-menus,
  but you can add any sort of widgets in them (buttons, text inputs, sliders, etc.). (#126)
- Menus: Added MenuItem() to append a menu item. Optional shortcut display, acts a button & toggle
  with checked/unchecked state, disabled mode. Menu items can be used in any window.
- Menus: Added BeginMenu() to append a sub-menu. Note that you generally want to add sub-menu inside a popup or a menu-bar.
  They will work inside a normal window but it will be a bit unusual.
- Menus: Added BeginMenuBar() to append to window menu-bar (set ImGuiWindowFlags_MenuBar to enable).
- Menus: Added BeginMainMenuBar() helper to append to a fullscreen main menu-bar.
- Popups: Support for stacked popups. Each popup level inhibit inputs to lower levels. The menus system is based on this. (#126).
- Popups: Added BeginPopupContextItem(), BeginPopupContextWindow(), BeginPopupContextVoid() to
  create a popup window on mouse-click.
- Popups: Popups have borders by default (#197), attenuated border alpha in default theme.
- Popups & Tooltip: Fit within display. Handling various positioning/sizing/scrolling edge
  cases. Better hysteresis when moving in corners. Tooltip always tries to stay away from mouse-cursor.
- Added ImGuiStorage::GetVoidPtrRef() for manipulating stored void*.
- Added IsKeyDown() IsMouseDown() as convenience and for consistency with existing functions
  (instead of reading them from IO structures).
- Added Dummy() helper to advance layout by a given size. Unlike InvisibleButton() this doesn't catch any click.
- Added configurable io.KeyRepeatDelay, io.KeyRepeatRate keyboard and mouse repeat rate.
- Added PushButtonRepeat() / PopButtonRepeat() to enable hold-button-to-repeat press on any button.
- Removed the third 'repeat' parameter of Button().
- Added IsAnyItemHovered() helper.
- Added GetItemsLineHeightWithSpacing() helper.
- Added ImGuiListClipper helper for clipping large list of evenly sized items, to avoid using CalcListClipping() directly.
- Separator: within group start on group horizontal offset. (#205)
- InputText: Fixed incorrect edit state after text buffer is appended to by user via the callback. (#206)
- InputText: CTRL+letter-key shortcuts (e.g. CTRL+C/V/X) makes sure only CTRL is pressed. (#214)
- InputText: Fixed cursor generating a zero-width wire-frame rectangle turning into a division by zero (would go unnoticed
  unless you trapped exceptions).
- InputFloatN/InputIntN: Flags parameter added to match scalar versions. (#218)
- Selectable: Horizontal filling not declared to ItemSize() so Selectable(),SameLine() works and we can better auto-fit the window.
- Selectable: Handling text baseline alignment for line that aren't of text height.
- Combo: Empty label doesn't add ItemInnerSpacing alignment, matching other widgets.
- EndGroup: Carries the text base offset from the last line of the group (sort of incorrect but better than nothing,
  should use the first line of the group, will implement in the future).
- Columns: distinguish columns-set ID from other widgets as a convenience, added asserts and sailors.
- ListBox: ListBox() function only use public API to encourage creating custom versions. ListBoxHeader() can return false.
- ListBox: Uses ImGuiListClipper and assume items of matching height, so large lists can be handled.
- Plot: overlay label clipped within frame when not fitting.
- Window: Added ImGuiSetCond_Appearing to test the hidden->visible transition in SetWindow***/SetNextWindow*** functions.
- Window: Auto-fitting cancel out one worth of vertical spacing for vertical symmetry (like what group and tooltip do).
- Window: Default item width for auto-resizing windows expressed as a factor of font height, scales better with different font.
- Window: Fixed auto-fit calculation mismatch of whether a scrollbar will be added by maximum height
  clamping. Also honor NoScrollBar in the case of height clamping, not adding extra horizontal space.
- Window: Hovering require to hover same child window. Reverted 860cf57 (December 3). Might break something if you have
  child overlapping items in parent window.
- Window: Fixed appending multiple times to an existing child via multiple BeginChild/EndChild calls to same child name.
  Allows a simple form of out-of-order appending.
- Window: Fixed auto-filling child window using WindowMinSize at their minimum size, irrelevant.
- Metrics: Added io.MetricsActiveWindows counter. (#213.
- Metrics: Added io.MetricsAllocs counter (number of active memory allocations).
- Metrics: ShowMetricsWindow() shows popups stack, allocations.
- Style: Added style.DisplayWindowPadding to prevent windows from reaching edges of display
  (similar to style.DisplaySafeAreaPadding which is still in effect and also affect popups/tooltips).
- Style: Removed style.AutoFitPadding, using style.WindowPadding makes more sense (the default values were already the same).
- Style: Added style.ScrollbarRounding. (#212)
- Style: Added ImGuiCol_TextDisabled for disabled text. Added TextDisabled() helper.
- Style: Added style.WindowTitleAlign alignment options, to e.g. center title on windows. (#222)
- ImVector: tweak growth strategy, matches vector from VS2010.
- ImFontAtlas: Added ClearFonts(), making the different clear funcs more explicit. (#224)
- ImFontAtlas: Fixed appending new fonts without clearing existing fonts. Clearing input data left to application. (#224)
- ImDrawList: Merge draw command better, cases of multiple Begin/End gets merged properly.
- Store common stacked settings contiguously in memory to avoid heap allocation for unused features, and reduce cache misses.
- Shutdown() tests for g.IO.Fonts not being NULL to ease use of multiple ImGui contexts. (#207)
- Added IMGUI_DISABLE_OBSOLETE_FUNCTIONS define to disable the functions that are meant to be removed.
- Examples: Added ? marks with tooltips next to various widgets. Added more comments in the demo window.
- Examples: Added Menu-bar example.
- Examples: Added Simple Layout example.
- Examples: AutoResize demo doesn't use TextWrapped().
- Examples: Console example uses standard malloc/free, makes more sense as a copy & pastable example.
- Examples: DirectX9/11: Fixed key mapping for down arrow.
- Examples: DirectX9/11: hide OS cursor if ImGui is drawing it. (#155)
- Examples: DirectX11: explicitly set rasterizer state.
- Examples: OpenGL3: Add conditional compilation of forward compat as required by glfw on OSX. (#229)
- Fixed build with Visual Studio 2008 (possibly earlier versions as well).
- Other fixes, comments, tweaks.


-----------------------------------------------------------------------
 VERSION 1.38 (2015-04-20)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.38

Breaking Changes:

- Renamed IsClipped() to IsRectClipped(). Kept inline redirection function (will obsolete).
- Renamed ImDrawList::AddArc() to ImDrawList::AddArcFast().

Other Changes:

- Added DragFloat(), DragInt() widget, click and drag to adjust value with given step.
  Hold SHIFT/ALT to speed-up/slow-down. Double-click or CTRL+click to input text.
  Passing min >= max makes the widget unbounded.
- Added DragFloat2(), DragFloat3(), DragFloat4(), DragInt2(), DragInt3(), DragInt4() helper variants.
- Added ShowMetricsWindow() which is mainly useful to debug ImGui internals.
- Added IO.MetricsRenderVertices counter.
- Added ResetMouseDragDelta() for iterative dragging operations.
- Added ImFontAtlas::AddFontFromCompressedTTF() helper + binary_to_compressed_c.cpp tool to
  compress a file and create a .c array from it.
- Added PushId() GetId() variants that takes string range to avoid user making unnecessary copies.
- Added IsItemVisible().
- Fixed IsRectClipped() incorrectly returning false when log is enabled.
- Slider: visual fix in the unlikely that style.GrabMinSize is larger than a slider.
- SliderFloat: removed support for unbound slider (using FLT_MAX), caused various inconsistency. Use InputFloat()/DragFloat().
- ColorEdit4: hide components prefix if there's no space for them.
- Combo: adding frame padding inside the combo box.
- Columns: mouse dragging uses absolute mouse coordinates.Fixed dragging left-most column of an auto-resizable window. #125
- Selectable: render highlight into AutoFitPadding region but do not extend it, fixing visual gap.
- Focus: Allow SetWindowFocus(NULL) to remove focus.
- Focus: Clicking on void (outside an ImGui windows) loses keyboard-focus so application can use TAB.
- Popup: Fixed hovering over a popup's child (popups disable hovering on other windows but not their childs) #197
- Fixed active widget not releasing its active state while being clipped.
- Fixed user-facing version of IsItemHovered() ignoring overlapping windows.
- Fixed label vertical alignment for InputInt2(), InputInt3(), InputInt4().
- Fixed new collapsed auto-resizing window with saved .ini settings not calculating their initial width #176
- Fixed Begin() returning true on collapsed windows that had loaded settings #176
- Fixed style.DisplaySafeAreaPadding handling from being applied on window prior to them auto-fitting.
- ShowTestWindow(): added examples for DragFloat, DragInt and only custom label embedded in format strings.
- ShowTestWindow(): fixed "manipulating titles" example not doing the right thing, broken in ff35d24
- Examples: OpenGL/GLFW: Fixed modifier key state setting in GLFW callbacks.
- Examples: OpenGL/GLFW: Added glBindTexture(0) in OpenGL fixed pipeline examples.
  Save restore current program and texture in the OpenGL3 example.
- Examples: DirectX11: Removed unnecessary vertices conversion and CUSTOMVERTEX types.
- Comments, fixes, tweaks.


-----------------------------------------------------------------------
 VERSION 1.37 (2015-03-26)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.37

Other Changes:

- Added a more convenient three parameters version of Begin() which covers the common uses better.
- Added mouse cursor types handling (resize, move, text input cursors, etc.) that user
  can query with GetMouseCursor(). Added demo and instructions in ShowTestWindow().
- Added embedded mouse cursor data for MouseDrawCursor software cursor rendering, for consoles/tablets/etc. (#155).
- Added first version of BeginPopup/EndPopup() helper API to create popup menus. Popups automatically
  lock their position to the mouse cursor when first appearing. They close automatically when clicking
  outside, and inhibit hovering items from other windows when active (to allow for clicking outside). (#126)
- Added thickness parameter to ImDrawList::AddLine().
- Added ImDrawList::PushClipRectFullScreen() helper.
- Added style.DisplaySafeAreaPadding which was previously hard-coded.
   (useful if you can't see the edges of your display, e.g. TV screens).
- Added CalcItemRectClosestPoint() helper.
- Added GetMouseDragDelta(), IsMouseDragging() helpers, given a mouse button and an optional
  "unlock" threshold. Added io.MouseDragThreshold setting. (#167)
- IsItemHovered() return false if another widget is active, aka we can't use what we are hovering now.
- Added IsItemHoveredRect() if old behavior of IsItemHovered() is needed (e.g. for implementing
  the drop side of a drag'n drop operation).
- IsItemhovered() include space taken by label and behave consistently for all widgets (#145)
- Auto-filling child window feed their content size to parent (#170)
- InputText() removed the odd ~ characters when clipping.
- InputText() update its width in case of resize initiated programmatically while the widget is active.
- InputText() last active preserve scrolling position. Reset scroll if widget size becomes bigger than contents.
- Selectable(): not specifying a width defaults to using max of label width and remaining width.
- Selectable(const char*, bool) version has bool defaulting to false.
- Selectable(): fixed misusage of GetContentRegionMax().x leaking into auto-fitting.
- Windows starting Collapsed runs initial auto-fit to retrieve a width for their title bar (#175)
- Fixed new window from having an incorrect content size on their first frame, if queried by user.
  Fixed SetWindowPos/SetNextWindowPos having a side-effect size computation (#175)
- InputFloat(): fixed label alignment if total widget width forcefully bigger than space available.
- Auto contents size aware of enforced vertical scrollbar if window is larger than display size.
- Fixed new windows auto-fitting bigger than their .ini saved size.
  This was a bug but it may be a desirable effect sometimes, may reconsider it.
- Fixed negative clipping rectangle when collapsing windows that could affect manual
  submission to ImDrawList and end-user rendering function if unhandled (#177)
- Fixed bounding measurement of empty groups (fix #162)
- Fixed assignment order in Begin() making auto-fit size effectively lag by one frame. Also disabling
  "clamp into view" while windows are auto-fitting so that auto-fitting window in corners don't get pushed away.
- Fixed MouseClickedPos not updated on double-click update (#167)
- Fixed MouseDrawCursor feature submitting an empty trailing command in the draw list.
 Fixed unmerged draw calls for software mouse cursor.
- Fixed double-clicking on resize grip keeping the grip active if mouse button is kept held.
- Bounding box tests exclude higher bound, so touching items (zero spacing) don't report double hover when cursor is on edge.
- Setting io.LogFilename to NULL disable default LogToFile() (part of #175)
- Tweak stb_textedit integration to be lenient if another piece of code are leaking their STB_TEXTEDIT definitions/symbols.
- Shutdown() freeing a few extra vectors so they don't have to freed by destruction (#169)
- Examples: OpenGL2/3 examples automatically hide the OS mouse cursor if software cursor rendering is used.
- ShowTestWindow: Added Widgets Alignment demo under Layout section
- ShowTestWindow: Added simple dragging widget example.
- ShowTestWindow: Graph has checkbox under the label, also demo using BeginGroup/EndGroup().
- ShowTestWindow: Using SetNextWindowSize() in examples to encourage its use.
- Fixes, tweaks, comments.


-----------------------------------------------------------------------
 VERSION 1.36 (2015-03-18)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.36

Other Changes:

- Added ImGui::GetVersion(), IMGUI_VERSION (#127)
- Added BeginGroup()/EndGroup() layout tools (#160).
- Added Indent() / Unindent().
- Added InputInt2(), InputInt3(), InputInt4() for completeness.
- Added GetItemRectSize().
- Added VSliderFloat(), VSliderInt(), vertical sliders.
- Added IsRootWindowFocused(), IsRootWindowOrAnyChildFocused().
- Added io.KeyAlt + support in examples apps, in prevision for future usage of Alt modifier (was missing).
- Added ImGuiStyleVar_GrabMinSize enum value for PushStyleVar().
- Various fixes related to vertical alignment of text after widget of varied sizes.
  Allow for multiple blocks of multiple lines text on the same "line". Added demos.
- Explicit size passed to Plot*(), Button() includes the frame padding.
- Style: Changed default Border and Column border colors to be most subtle.
- Renamed style.TreeNodeSpacing to style.IndentSpacing, ImGuiStyleVar_TreeNodeSpacing to ImGuiStyleVar_IndentSpacing.
- Renamed GetWindowIsFocused() to IsWindowFocused(), kept inline redirection with old name (will obsolete).
- Renamed GetItemRectMin()/GetItemRectMax() to GetItemRectMin()/GetItemRectMax(), kept inline redirection with old name (will obsolete).
- Sliders: Fast-path when power=1.0f, also makes code easier to read.
- Sliders: Fixed parsing of decimal precision back from format string when using %%.
- Sliders: Fixed hovering bounding test excluding padding between outer frame and grab (there was a few pixels dead-zone).
- Separator() logs itself as text when passing through text log.
- Optimisation: TreeNodeV() early out if SkipItems is set without formatting.
- Moved various static buffers into state. Increase the formatted string buffer from 1K to 3K.
- Examples: Example console keeps focus on input box at all times.
- Examples: Updated to GLFW 3.1. Moved to examples/libs/ folder.
- Examples: Added 64-bit projects for MSVC.
- Examples: Increase warning level from /W3 to /W4 for MSVC.
- Examples: DirectX9: fixed duplicate creation of vertex buffer.
- Renamed internal type ImGuiAabb to ImRect. Changed mentions of 'box' or 'aabb' to say 'rect'.
- Tweaks, minor fixes and comments.


-----------------------------------------------------------------------
 VERSION 1.35 (2015-03-09)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.35

Other Changes:

- Examples: refactored all examples application to make it easier to isolate and grab the
  code you need for OpenGL 2/3, DirectX 9/11, and toward a more sensible format for samples.
- Scrollbar grab have a minimum size (style.GrabSizeMin), always visible even with huge
  scroll amount. (#150).
- Scrollbar: Clicking inside the grab box doesn't modify scroll value. Subsequent movement always relative.
- Added "###" labelling syntax to pass a label that isn't part of the hashed ID (#107), e.g. ("%d###static_id",rand()).
- Added GetColumnIndex(), GetColumnsCount() (#154)
- Added GetScrollPosY(), GetScrollMaxY().
- Fixed the Chinese/Japanese glyph ranges; include missing punctuations (#156)
- Fixed Combo() and ListBox() labels not included in declared size, for use with SameLine(), etc. (fix #149, #151).
- Fixed ListBoxHeader() incorrect handling of SkipItems early out when window is collapsed.
- Fixed using IsItemHovered() after EndChild() (#151)
- Fixed malformed UTF-8 decoding errors leading to infinite loops (#158)
- InputText() handles buffer limit correctly for multi-byte UTF-8 characters, won't insert
  an incomplete UTF-8 character when reaching buffer limit (fix #158)
- Handle double-width space (0x3000) in various places the same as single-width spaces,
  for Chinese/Japanese users.
- Collapse triangle uses text color (not border color).
- Fixed font fallback glyph width.
- Renamed style.ScrollBarWidth to style.ScrollbarWidth to be consistent with other casing.
- Windows: setup a default handler for ImeSetInputScreenPosFn so the IME dialog
  (for Japanese/Chinese, etc.) is positioned correctly as you input text.
- Windows: default clipboard handlers for Windows handle UTF-8.
- Examples: Fixed DirectX 9/11 examples applications handling of Microsoft IME.
- Examples: Allow DirectX 9/11 examples applications to resize the window.
- ShowTestWindow: Fixed "undo" button of custom rendering applet.
- ShowTestWindow: Added "Manipulating Window Title" example.


-----------------------------------------------------------------------
 VERSION 1.34 (2015-03-02)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.34

Other Changes:

- Added Bullet() helper - equivalent to BulletText(""), SameLine().
- Added SetWindowFocus(), SetWindowFocus(const char*), SetNextWindowFocus() (#146)
- Added SetWindowPos(), SetWindowSize(), SetWindowCollaposed() given a window name.
- Added SetNextTreeNodeOpened() with optional condition flag in replacement of OpenNextNode()
  and consistent with other API.
- Renamed ImGuiSetCondition_* to ImGuiSetCond_* and ImGuiCondition_FirstUseThisSession to ImGuiCond_Once.
- Added missing definition for ImGui::GetWindowCollapsed().
- Fixed GetGlyphRangesJapanese() actually missing katakana ranges and a few useful extensions.
- Fixed clicking on a widget in a child window not focusing the parent window (#147).
- Fixed clicking on empty space of child window not setting keyboard focus for the child window (#147).
- Fixed IsItemHovered() behaving differently on Combo() (#145)
- Fixed ColumnOffsets storage not honoring SetStateStorage() (not very useful but consistent).
- Examples: Removed dependency on Glew for OpenGL examples. Removed Glew binaries for Windows.
- Examples: Fixed link warning for OpenGL windows examples.
- Comments, tweaks.

-----------------------------------------------------------------------
 VERSION 1.33b (2015-02-23)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.33b

Other Changes:

- Fixed resizing columns.


-----------------------------------------------------------------------
 VERSION 1.33 (2015-02-22)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.33

Other Changes:

- InputText: having a InputText widget active doesn't steal mouse inputs from clicking on
  a button before losing focus (relate to #134)
- InputText: cursor/selection/undo stack persist when using other widgets and getting back to same (#134).
- InputText: fix effective buffer size being smaller than necessary by 1 byte (so if you give
  3 bytes you can input 2 ascii chars + zero terminator, which is correct).
- Added IsAnyItemActive().
- Child window explicitly inherit collapse state from parent (so if user keeps submitting items
  even thought Begin has returned 'false' the child items will be clipped faster).
- BeginChild() return a bool the same way Begin() does. if true you can skip submitting content.
- Removed extraneous (1,1) padding on child window (pointed out in #125)
- Columns: doesn't bail out when SkipItems is set (fix #136)
- Columns: Separator() within column correctly vertical offset all cells (pointed out in #125)
- GetColumnOffset() / SetColumnOffset() handles padding values more correctly so matching columns
  can be lined up between a parent and a child window (cf. #125)
- Fix ImFont::BuildLookupTable() potential dangling pointer dereference (fix #131)
- Fix hovering of child window extending past their parent not taking account of parent clipping
  rectangle (fix #137)
- Sliders: value text is clipped inside the frame when resizing sliders to be small.
- ImGuITextFilter::Draw() use regular width call rather than computing its own arbitrary width.
- ImGuiTextFilter: can take a default filter string during construction.


-----------------------------------------------------------------------
 VERSION 1.32 (2015-02-11)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.32

Other Changes:

- Added Selectable() building block for various list boxes, combo boxes, etc.
- Added ListBox() (#129).
- Added ListBoxHeader(), ListBoxFooter() for customized list traversal and creating multi-selection boxes.
- Fixed title bar text clipping issue (fix #128).
- InputText: added ImGuiInputTextFlags_CallbackCharFilter system for filtering/replacement (#130).
  Callback now passed an "EventFlag" parameter.
- InputText: Added ImGuiInputTextFlags_CharsUppercase and ImGuiInputTextFlags_CharsNoBlank stock filters.
- PushItemWidth() can take negative value to right-align items.
- Optimisation: Columns offsets cached to avoid unnecessary binary search.
- Optimisation: Optimized CalcTextSize() function by about 25% (they are often the bottleneck when
  submitting thousands of clipped items).
- Added ImGuiCol_ChildWindowBg, ImGuiStyleVar_ChildWindowRounding for completeness and flexibility.
- Added BeginChild() variant that takes an ImGuiID.
- Tweak default ImGuiCol_HeaderActive color to be less bright.
- Calculate framerate for the user (IO.Framerate), as a purely luxurious feature and to reduce sample code size a little.


-----------------------------------------------------------------------
 VERSION 1.31 (2015-02-08)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.31

Other Changes:

- Added ImGuiWindowFlags_NoCollapse flag.
- Added a way to replace the internal state pointer so that we can optionally share it between
  modules (e.g. multiple DLLs).
- Added tint_col parameter to ImageButton().
- Added CalcListClipping() helper to perform faster/coarse clipping on user side
  (when manipulating lists with thousands of items).
- Added GetCursorPosX() / GetCursorPosY() shortcuts.
- Renamed GetTextLineSpacing() to GetTextLineHeightWithSpacing().
- Combo box always appears above other child windows of a same parent.
- Combo/Label: label is properly clipped inside the frame (#23).
- Added cpu-side text clipping functions which are used in some instances to avoid extra draw calls.
- InputText: Filtering private Unicode range 0xE000-0xF8FF.
- Fixed holding button over scrollbar creating a small feedback loop with calculation of contents size.
- Calling SetCursorPos() automatically extends the contents size.
- Track ownership of mouse clicks. Avoid requesting IO.WantCaptureMouse if initial click was outside of ImGui.
- Removed the dependency on realloc().
- Other fixes, tweaks and comments.


-----------------------------------------------------------------------
 VERSION 1.30 (2015-02-01)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.30

Breaking Changes:

- Big update! Initialisation had to be changed. You don't need to load PNG data anymore. Th
  new system gives you uncompressed texture data.
  - This sequence:
      const void* png_data;
      unsigned int png_size;
      ImGui::GetDefaultFontData(NULL, NULL, &png_data, &png_size);
      // <Copy to GPU>
  - Became:
      unsigned char* pixels;
      int width, height;
      // io.Fonts->AddFontFromFileTTF("myfontfile.ttf", 24.0f);  // Optionally load another font
      io.Fonts->GetTexDataAsRGBA32(&pixels, &width, &height);
      // <Copy to GPU>
      io.Fonts->TexID = (your_texture_identifier);
  - PixelCenterOffset has been removed and isn't a necessary setting anymore. Offset your
    projection matrix by 0.5 if you have rendering problems.

Other Changes:

- Loading TTF files with stb_truetype.h.
- We still embed a compressed pixel-perfect TTF version of ProggyClean for convenience.
- Runtime font rendering is a little faster than previously.
- You can load multiple fonts with multiple size inside the font atlas. Rendering with multiple
  fonts are still merged into a single draw call whenever possible.
- The system handles UTF-8 and provide ranges to easily load e.g. characters for Japanese display.
- Added PushFont() / PopFont().
- Added Image() and ImageButton() to display your own texture data.
- Added callback system in command-list. This can be used if you want to do your own rendering
  (e.g. render a 3D scene) inside ImGui widgets.
- Added IsItemActive() to tell if last widget is being held / modified (as opposed to just
  being hovered). Useful for custom dragging behaviors.
- Style: Added FrameRounding setting for a more rounded look (default to 0 for now).
- Window: Fixed using multiple Begin/End pair on the same wnidow.
- Window: Fixed style.WindowMinSize not being honored properly.
- Window: Added SetCursorScreenPos() helper (WindowPos+CursorPos = ScreenPos).
- ColorEdit3: clicking on color square change the edition. The toggle button is hidden by default.
- Clipboard: Fixed logging to clipboard on architectures where va_list are passed by reference to vsnprintf.
- Clipboard: Improve memory reserve policy for Clipboard / ImGuiTextBuffer.
- Tooltip: Always auto-resize.
- Tooltip: Fixed TooltigBg color not being honored properly.
- Tooltip: Allow SetNextWindowPos() to be used on tooltips.
- Added io.DisplayVisibleMin / io.DisplayVisibleMax to ease integration of virtual / scrolling display.
- Added Set/GetVoidPtr in ImGuiStorage.
- Added ColorConvertHSVtoRGB, ColorConvertRGBtoHSV, ColorConvertFloat4ToU32 helpers.
- Added ImColor() inline helper to easily convert colors to packed 4x1 byte or 4x1 float formats.
- Added io.MouseDrawCursor option to draw a mouse cursor for now (on systems that don't have one)
- Examples: Added custom drawing app example for using ImDrawList api.
- Lots of others fixes, tweaks and comments!


-----------------------------------------------------------------------
 VERSION 1.20 (2015-01-07)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.20

- Fixed InputInt() InputFloat() label not declaring their width, breaking usage of SameLine().
- Fixed hovering of combo boxes that extend beyond the parent window limits.
- Fixed text input of Unicode character in the 128-255 range.
- Fixed clipboard pasting into an InputText box not filtering the characters according to contents semantic.
- Dragging outside area of a widget while it is active doesn't trigger hover on other widgets.
- Activating widget bring parent window to front if not already.
- Checkbox and Radio buttons activate on click-release to be consistent with other widgets and most UI.
- InputText() nows consume input characters immediately so they cannot be reused if
  ImGui::Update is called again with a call to ImGui::Render(). (fixes #105)
- Examples: Console: added support for History callbacks + some cleanup.
- Various small optimisations.
- Cleanup and other fixes.


-----------------------------------------------------------------------
 VERSION 1.19 (2014-12-30)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.19

- Tightening default style a little.
- Added ImGuiStyleVar_WindowRounding enum for PushStyleVar() API.
- Added SliderInt2(), SliderInt3(), SliderInt4() for consistency.
- Widgets more consistently handle empty labels (starting with ## mark) for their size calculation.
- Fixed crashing with zero sized frame-buffer.
- Fixed ImGui::Combo() not registering its size properly when clipped out of screen.
- Renamed second parameter to Begin() to 'bool* p_opened' to be a little more self-explanatory.
  Added more comments on the use of Begin().
- Logging: Added LogText() to pass text straight to the log output (tty/clipboard/file) without rendering it.
- Logging: Added LogFinish() to stop logging at an arbitrary point.
- Logging: Log depth padding relative to start depth.
- Logging: Tree nodes and headers looking better when logged to text.
- Logging: Log outputs \r\n under Windows to play it nicely with \n unaware tools such as Notepad.
- Style editor: added a button to output colors to clipboard/tty.
- OpenGL3 example: fix growing of VBO.
- Cleanup and other minor fixes.


-----------------------------------------------------------------------
 VERSION 1.18 (2014-12-11)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.18

- Added ImGuiWindowFlags_NoScrollWithMouse, disable mouse wheel scrolling on a window.
- Added ImGuiWindowFlags_NoSavedSettings, disable loading/saving window state to .ini file.
- Added SetNextWindowPos(), SetNextWindowSize(), SetNextWindowCollapsed() API along
  with SetWindowPos(), SetWindowSize(), SetWindowCollapsed(). All functions include an
  optional second parameter to easily set current value vs session default value vs.
  persistent default value.
- Removed rarely useful SetNewWindowDefaultPos() in favor of new API.
- Fixed hovering of lower-right resize grip when it is above a child window.
- Fixed InputInt() writing to output when it doesn't need to.
- Added IMGUI_INCLUDE_IMGUI_USER_H define to include user file at the bottom of imgui.h without modifying the vanilla distribution.
- ImGuiStorage helper can store float + added helpers to get pointer to stored data.
- Setup Travis CI integration. Builds the OpenGL examples on Linux with GCC and Clang.
- Examples: Added a "Fixed overlay" example in ShowTestWindow().
- Examples: Re-added OpenGL 3 programmable-pipeline example (along with the existing fixed pipeline example).
- Examples: OpenGL examples can now resize the application window.
- Other minor fixes and comments.


-----------------------------------------------------------------------
 VERSION 1.17 (2014-12-03)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.17

- Added ImGuiWindowFlags_AlwaysAutoResize + example app.
- Calling ImGui::SetWindowSize(0,0) force an autofit without zero-sizing first.
- ImGui::InputText() support for completion/history/custom callback + added fancy completion example in the console demo app.
- Not word-wrapping on apostrophes.
- Increased visibility of check box and radio button with smaller size.
- Smooth mouse scrolling on OSX (uses floating point scroll/wheel input).
- New version of IMGUI_ONCE_UPON_A_FRAME helper macro that works with all compilers.
- Moved IO.Font*** options to inside the IO.Font-> structure.
- Added IO.FontGlobalScale setting (in addition to Font->Scale per individual font).
- Fixed more Clang -Weverything warnings.
- Examples: Added DirectX11 example application.
- Examples: Created single .sln solution for all example projects.
- Examples: Fixed DirectX9 example window initially showing an hourglass cursor.
- Examples: Removed Microsoft IME handler in examples, too niche/confusing. Moved equivalent code to imgui.cpp instruction block.


-----------------------------------------------------------------------
 VERSION 1.16b (2014-11-21)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.16b

- Fix broken PopStyleVar() crashing.


-----------------------------------------------------------------------
 VERSION 1.16 (2014-11-21)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.16

- General fixing of Columns API to allow filling a cell with multiple widgets before switching to the next column.
- Added documentation INDEX to top of imgui.cpp.
- Fixed unaligned memory access for Emscripten compatibility.
- Various pedantic warning fixes (now testing with Clang).
- Added extra asserts to catch incorrect usage.
- PushStyleColor() / PushStyleVar() can be used outside the scope of a window (namely to change
  variables that are used within the Begin() call).
- PushTextWrapPos() defaults to 0.0 (right-end of current drawing region).
- Fixed compatibility with std::vector if user decide to #define ImVector.
- MouseWheel input is now normalized.
- Added IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT compile-time option to redefine the vertex layout.
- Style editor: colors listed inside a scrolling region.
- Examples: tweaks and fixes.


-----------------------------------------------------------------------
 VERSION 1.15 (2014-11-07)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.15

- Renamed IsHovered() to IsItemHovered().
- Added word-wrapping API: TextWrapped(), PushTextWrapPos(), PopTextWrapPos().
- Added IsItemFocused() to tell if last widget is being focused for keyboard input.
- Added overloads of ImGui::PlotLines() and ImGui::PlotHistogram() taking a function pointer to get values.
- Added SetWindowSize().
- Added GetContentRegionMax() supporting columns. Some bug fixes with using columns.
- Added PushStyleVar(),PopStyleVar() helpers to modify style from user code.
- Added dummy IMGUI_API definition in front of all entry-points for silly DLL action.
- Allowing BeginChild() allows to specify negative sizes to specify "use remaining minus xx".
- Windows with the NoResize flag can still use auto-fitting.
- Added a simple example console into the demo window.
- Comments and fixes.


-----------------------------------------------------------------------
 VERSION 1.14 (2014-10-25)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.14

- Comments and fixes.
- Added SetKeyboardFocusHere() to set input focus from code.
- Added GetWindowFont(), GetWindowFontSize() for users of the low-level ImDrawList API.
- Added a UserData void *pointer so that the callback functions can access user state
  "Just in case a project has adverse reactions to adding globals or statics in their own code."
- Renamed IMGUI_INCLUDE_IMGUI_USER_CPP to IMGUI_INCLUDE_IMGUI_USER_INL


----------------------------------------------------------------------
 VERSION 1.13 (2014-09-30)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.13

- Added support for UTF-8 for international text display and text edition/input (if the font supports it).
- Added sample "M+ font" by Coji Morishita in extra_fonts/ to display Japanese text.
- Added IO.ImeSetInputScreenPosFn callback for positioning OS IME input.
- Added IO.FontFallbackGlyph (default to '?').
- OpenGL example: added commented code to load custom font from file-system.
- OpenGL example: shared makefile for Linux and MacOSX.


----------------------------------------------------------------------
 VERSION 1.12 (2014-09-24)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.12

- Added IO.FontBaseScale value for easy scaling of all windows.
- Added IsMouseHoveringWindow(), IsMouseHoveringAnyWindow(), IsPosHoveringAnyWindow() helpers.
- Added va_list variations of all functions taking ellipsis (...) parameters.
- Added section in documentation to explicitly document cases of API breaking changes (e.g. renamed IM_MALLOC below).
- Moved IM_MALLOC / IM_FREE defines. to IO structure members that can be set at runtime
  (also allowing precompiled ImGui to cover more use cases).
- Fixed OpenGL samples for Retina display.
- Comments and minor fixes.


----------------------------------------------------------------------
 VERSION 1.11 (2014-09-10)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.11

- Added more comments in the code.
- Made radio buttons render ascii when logged into tty/file/clipboard.
- Added ImGuiInputTextFlags_EnterReturnsTrue flag to InputText() and variants.
- Added #define IMGUI_INCLUDE_IMGUI_USER_CPP to optionally include imgui_user.cpp from the end of imgui.cpp
- Fixed file-descriptor leak if ImBitmapFont::LoadFromFile() calls to fseek/ftell fails.


----------------------------------------------------------------------
 VERSION 1.10 (2014-08-31)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.10

- User can override memory allocators by #define-ing IM_MALLOC, IM_FREE, IM_REALLOC,
- Added SetCursorPosX(), SetCursorPosY() shortcuts.
- Checkbox() returns true when pressed.
- Added optional external fonts data in extra_fonts/ for reference.
- Removed the need to setup IO.FontHeight when using a custom font.
- Added comments on external fonts usage.


----------------------------------------------------------------------
 VERSION 1.09 (2014-08-28)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.09

Breaking Changes:

- The behaviour of PixelCenterOffset changed! You may need to change your value if you had set
  it to non-default in your code and/or offset your projection matrix by 0.5 pixels. It is
  likely that the default PixelCenterOffset value of 0.0 is now suitable unless your rendering
  uses some form of multisampling.

Other Changes:

- Various minor render tweaks and fixes. Better support for renderers using multisampling.
- Moved IMGUI_FONT_TEX_UV_FOR_WHITE #define to a variable in the IO structure so font can be changed at runtime.
- Minor other fixes, tweaks, comments.


----------------------------------------------------------------------
 VERSION 1.08 (2014-08-25)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.08

- Fixed ImGuiTextFilter trimming of leading/trailing blanks.
- Fixed file descriptor leak on LoadSettings() failure.
- Fix type conversion compiler warnings.
- Added basic sizes edition in the style editor.
- Added CalcTextSize(), GetCursorScreenPos() functions.
- Disable client state in OpenGL example after rendering.
- Converted all Tabs to Spaces in sources.


----------------------------------------------------------------------
 VERSION 1.07 (2014-08-18)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.07

- Added InputFloat4(), SliderFloat4() helpers.
- Added global Alpha in ImGuiStyle structure. When Alpha=0.0, ImGui skips most of logic
  and all rendering processing.
- Fix clipping of title bar text.
- Fix to allow the user to call NewFrame() multiple times without calling Render().
- Reduce inner window clipping to take account for the extend of CollapsingHeader() - share
  same clipping rectangle.
- Fix for child windows with inverted clip rectangles (when scrolled and out of screen, Etc.).
- Minor fixes, tweaks, comments.


----------------------------------------------------------------------
 VERSION 1.06 (2014-08-15)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.06

- Added BeginTooltip()/EndTooltip() helpers to create tooltips with custom contents.
- Added TextColored() helper.
- Added a 'stride' parameter to PlotLines() / PlotHistogram().
- Fixed PlotLines() / PlotHistogram() from occasionally wrapping back to the most-left value.
- TreeNode() / CollapsingHeader() ignore clicks when CTRL or SHIFT are held.
- Slowed down mouse wheel scrolling inside combo boxes.
- Minor tweaks.
- Fixed trailing '\n' in text strings reporting extra line height.
- Fixed tooltip position needlessly leaking into .ini file.
- Fixed invalid .ini file data persistently being saved back into the file.


----------------------------------------------------------------------
 VERSION 1.05 (2014-08-14)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.05

- Added default clipboard functions for Windows + "private" clipboard on other systems (user can still override).
- Fixed logarithmic sliders and HSV conversions on Mac/Linux.
- Tidying up example applications so it looks easier to just grab code.
- Added GetItemBoxMin(), GetItemBoxMax().
- Tweaks, more consistent #define names.
- Fix for doing multiple Begin()/End() during the same frame.


----------------------------------------------------------------------
 VERSION 1.04 (2014-08-13)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.04

- Fixes (v1.03 introduced a bug with combo box & scissoring bug OpenGL sample).
- Added ImGui::InputFloat2() and ImGui::SliderFloat2() functions.


----------------------------------------------------------------------
 VERSION 1.03 (2014-08-13)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.03

- OpenGL example now use the fixed function-pipeline + cleanups, down by 150 lines.
- Added quick & dirty Makefiles for MacOSX and Linux.
- Simplified the DrawList system, ImDrawCmd include the clipping rectangle + some optimisations.
- Fixed warnings for more stringent compilation settings.


----------------------------------------------------------------------
 VERSION 1.02 (2014-08-12)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.02

- Comments.
- Portability fixes.
- Fixing and tidying up sample applications.
- Checkboxes and radio buttons can be clicked on their labels as well as their icon.
- Checkboxes and radio buttons display in a different color when hovered.


----------------------------------------------------------------------
 VERSION 1.01 (2014-08-11)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.01

- Added PixelCenterOffset for OpenGL/DirectX compatibility.
- Commented and tweaked samples.
- Added Git ignore list.


----------------------------------------------------------------------
 VERSION 1.00 (2014-08-10)
-----------------------------------------------------------------------

Decorated log and release notes: https://github.com/ocornut/imgui/releases/tag/v1.00

- Initial release.

```
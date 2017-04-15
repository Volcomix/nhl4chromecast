/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "BundleURLProvider.h"

#import <React/RCTRootView.h>
#import <React/RCTLog.h>

@implementation AppDelegate

static const BOOL kDebugLoggingEnabled = YES;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *kReceiverAppID = [NSString stringWithFormat:@"%08X", 140601722 ^ 152633930];
  GCKCastOptions *options =
    [[GCKCastOptions alloc] initWithReceiverApplicationID:kReceiverAppID];
  [GCKCastContext setSharedInstanceWithOptions:options];

  [GCKLogger sharedInstance].delegate = self;
  
  [GCKCastContext sharedInstance].useDefaultExpandedMediaControls = YES;
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeRewind30Seconds
                                                                                    atIndex:0];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeForward30Seconds
                                                                                    atIndex:1];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeCustom
                                                                                    atIndex:2];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeCustom
                                                                                    atIndex:3];

  UIButton *forward2Minutes = [UIButton buttonWithType:UIButtonTypeCustom];
  [forward2Minutes setTitle:@"+2"
                   forState:UIControlStateNormal];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setCustomButton:forward2Minutes
                                                                                      atIndex:2];

  UIButton *forward15Minutes = [UIButton buttonWithType:UIButtonTypeCustom];
  [forward15Minutes setTitle:@"+15"
                    forState:UIControlStateNormal];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setCustomButton:forward15Minutes
                                                                                      atIndex:3];
  
  GCKLoggerFilter *logFilter = [[GCKLoggerFilter alloc] init];
  [logFilter setLoggingLevel:GCKLoggerLevelVerbose
    forClasses:@[
    @"GCKUIMediaController"
  ]];
  [GCKLogger sharedInstance].filter = logFilter;

  NSURL *jsCodeLocation;

  jsCodeLocation = [[BundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"nhl4chromecast"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

#pragma mark - GCKLoggerDelegate

- (void)logMessage:(NSString *)message fromFunction:(NSString *)function {
  if (kDebugLoggingEnabled) {
    RCTLogInfo(@"%@  %@", function, message);
  }
}

@end

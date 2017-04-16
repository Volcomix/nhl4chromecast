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
  GCKCastOptions *options = [[GCKCastOptions alloc] initWithReceiverApplicationID:kReceiverAppID];
  [GCKCastContext setSharedInstanceWithOptions:options];

  [GCKLogger sharedInstance].delegate = self;
  
  [self initExpandedMediaControls];
  [self initLogger];

  NSURL *jsCodeLocation = [[BundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios"
                                                                      fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"nhl4chromecast"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f
                                                    green:1.0f
                                                     blue:1.0f
                                                    alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)initExpandedMediaControls
{
  [GCKCastContext sharedInstance].useDefaultExpandedMediaControls = YES;
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeRewind30Seconds
                                                                                    atIndex:0];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeForward30Seconds
                                                                                    atIndex:1];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeCustom
                                                                                    atIndex:2];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setButtonType:GCKUIMediaButtonTypeCustom
                                                                                    atIndex:3];

  UIButton *forward2MinutesButton = [UIButton buttonWithType:UIButtonTypeCustom];
  [forward2MinutesButton setTitle:@"+2"
                         forState:UIControlStateNormal];
  [forward2MinutesButton addTarget:self
                            action:@selector(forward2Minutes)
                  forControlEvents:UIControlEventTouchUpInside];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setCustomButton:forward2MinutesButton
                                                                                      atIndex:2];

  UIButton *forward18MinutesButton = [UIButton buttonWithType:UIButtonTypeCustom];
  [forward18MinutesButton setTitle:@"+18"
                          forState:UIControlStateNormal];
  [forward18MinutesButton addTarget:self
                             action:@selector(forward18Minutes)
                   forControlEvents:UIControlEventTouchUpInside];
  [[GCKCastContext sharedInstance].defaultExpandedMediaControlsViewController setCustomButton:forward18MinutesButton
                                                                                      atIndex:3];
}

- (IBAction)forward2Minutes
{
  [self forwardMinutes:2];
}

- (IBAction)forward18Minutes
{
  [self forwardMinutes:18];
}

- (void)forwardMinutes:(NSTimeInterval) minutes
{
  GCKCastSession *session = [GCKCastContext sharedInstance].sessionManager.currentCastSession;
  if (session)
  {
    NSTimeInterval position = [session.remoteMediaClient approximateStreamPosition];
    [session.remoteMediaClient seekToTimeInterval:position + minutes * 60];
  }
}

- (void)initLogger
{
  GCKLoggerFilter *logFilter = [[GCKLoggerFilter alloc] init];
  [logFilter setLoggingLevel:GCKLoggerLevelVerbose
                  forClasses:@[@"GCKUIMediaController"]];
  [GCKLogger sharedInstance].filter = logFilter;
}

#pragma mark - GCKLoggerDelegate

- (void)logMessage:(NSString *)message fromFunction:(NSString *)function
{
  if (kDebugLoggingEnabled) {
    RCTLogInfo(@"%@  %@", function, message);
  }
}

@end

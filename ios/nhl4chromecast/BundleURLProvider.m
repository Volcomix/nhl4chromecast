#import "BundleURLProvider.h"

@implementation BundleURLProvider

- (NSString *)guessPackagerHost
{
  return @"192.168.1.13";
}

+ (instancetype)sharedSettings
{
  static BundleURLProvider *sharedInstance;
  static dispatch_once_t once_token;
  dispatch_once(&once_token, ^{
    sharedInstance = [BundleURLProvider new];
  });
  return sharedInstance;
}

@end

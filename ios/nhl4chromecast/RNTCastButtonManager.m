#import "RNTCastButtonManager.h"

#import <GoogleCast/Googlecast.h>

@implementation RNTCastButtonManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[GCKUICastButton alloc] init];
}

@end
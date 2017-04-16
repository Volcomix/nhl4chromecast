#import <React/RCTBridgeModule.h>
#import <GoogleCast/Googlecast.h>

@interface GoogleCastManager : NSObject <RCTBridgeModule, GCKRequestDelegate>
@end
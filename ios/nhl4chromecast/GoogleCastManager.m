#import "GoogleCastManager.h"

#import <React/RCTConvert.h>
#import <GoogleCast/Googlecast.h>

@implementation GoogleCastManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadMedia:(NSDictionary *)info)
{
  GCKMediaMetadata *metadata =
    [[GCKMediaMetadata alloc] initWithMetadataType:GCKMediaMetadataTypeMovie];
  [metadata setString:[RCTConvert NSString:info[@"title"]] forKey:kGCKMetadataKeyTitle];
  [metadata setString:[RCTConvert NSString:info[@"subtitle"]] forKey:kGCKMetadataKeySubtitle];

  /*[metadata addImage:[[GCKImage alloc] initWithURL:[RCTConvert NSString:info[@"awayImage"]]
                                            width:480
                                            height:720]];
  [metadata addImage:[[GCKImage alloc] initWithURL:[RCTConvert NSString:info[@"HomeImage"]]
                                            width:480
                                            height:720]];*/
  GCKMediaInformation *mediaInfo = [[GCKMediaInformation alloc]
    initWithContentID:[RCTConvert NSString:info[@"url"]]
           streamType:GCKMediaStreamTypeBuffered
          contentType:[RCTConvert NSString:info[@"contentType"]]
             metadata:metadata
       streamDuration:[RCTConvert NSInteger:info[@"duration"]]
          mediaTracks:nil
       textTrackStyle:nil
           customData:nil];

  GCKCastSession *session =
    [GCKCastContext sharedInstance].sessionManager.currentCastSession;
  if (session)
  {
    [session.remoteMediaClient loadMedia:mediaInfo autoplay:YES];
  }
}

@end

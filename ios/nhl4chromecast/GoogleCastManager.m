#import "GoogleCastManager.h"

#import <React/RCTConvert.h>
#import <GoogleCast/Googlecast.h>

@implementation GoogleCastManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadMedia:(NSDictionary *)info)
{
  GCKMediaMetadata *metadata = [[GCKMediaMetadata alloc] initWithMetadataType:GCKMediaMetadataTypeMovie];
  [metadata setString:[RCTConvert NSString:info[@"title"]]
                                    forKey:kGCKMetadataKeyTitle];

  [metadata addImage:[[GCKImage alloc] initWithURL:[NSURL URLWithString:[RCTConvert NSString:info[@"thumbnailImageUrl"]]]
                                             width:0
                                            height:0]];
  [metadata addImage:[[GCKImage alloc] initWithURL:[NSURL URLWithString:[RCTConvert NSString:info[@"largeImageUrl"]]]
                                             width:0
                                            height:0]];
  
  GCKMediaInformation *mediaInfo = [[GCKMediaInformation alloc]
    initWithContentID:[RCTConvert NSString:info[@"url"]]
           streamType:GCKMediaStreamTypeBuffered
          contentType:[RCTConvert NSString:info[@"contentType"]]
             metadata:metadata
       streamDuration:[RCTConvert NSInteger:info[@"duration"]]
          mediaTracks:nil
       textTrackStyle:nil
           customData:info[@"customData"]];

  GCKCastSession *session = [GCKCastContext sharedInstance].sessionManager.currentCastSession;
  if (session)
  {
    [session.remoteMediaClient loadMedia:mediaInfo
                                autoplay:YES];
  }
}

@end

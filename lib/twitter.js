/*
 * Twitter client app
 * Från : https://github.com/BoyCook/TwitterJSClient/blob/master/lib/Twitter.js
 * av : Craig Cook, http://craigcook.com/
 * Modifierad av mig
 */

var OAuth = require('oauth').OAuth;
var qs = require('qs');

module.exports = Twitter; 

function Twitter(config) {
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.accessToken = config.accessToken;
    this.accessTokenSecret = config.accessTokenSecret;
    this.callBackUrl = config.callBackUrl;
    this.baseUrl = 'https://api.twitter.com/1.1';

    this.oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        this.consumerKey,
        this.consumerSecret,
        '1.0',
        this.callBackUrl,
        'HMAC-SHA1'
    );
}

Twitter.prototype.getOAuthRequestToken = function (next) {
    this.oauth.getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
        if (error) {
            console.log('ERROR: ' + error);
            next();
        }
        else {
            var oauth = {};
            oauth.token = oauth_token;
            oauth.token_secret = oauth_token_secret;
            console.log('oauth.token: ' + oauth.token);
            console.log('oauth.token_secret: ' + oauth.token_secret);
            next(oauth);
        }
    });
};

Twitter.prototype.getOAuthAccessToken = function (oauth, next) {
    this.oauth.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier,
        function (error, oauth_access_token, oauth_access_token_secret, results) {
            if (error) {
                console.log('ERROR: ' + error);
                next();
            } else {
                oauth.access_token = oauth_access_token;
                oauth.access_token_secret = oauth_access_token_secret;

                console.log('oauth.token: ' + oauth.token);
                console.log('oauth.token_secret: ' + oauth.token_secret);
                console.log('oauth.access_token: ' + access_token.token);
                console.log('oauth.access_token_secret: ' + oauth.access_token_secret);
                next(oauth);
            }
        }
    );
}

Twitter.prototype.postTweet = function (params, error, success) {
    var path = '/statuses/update.json';
    var url = this.baseUrl + path;
    this.doPost(url, params, error, success);
};

Twitter.prototype.getUserTimeline = function (params, error, success) {
    var path = '/statuses/user_timeline.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.getMentionsTimeline = function (params, error, success) {
    var path = '/statuses/mentions_timeline.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.getHomeTimeline = function (params, error, success) {
    var path = '/statuses/home_timeline.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.getReTweetsOfMe = function (params, error, success) {
    var path = '/statuses/retweets_of_me.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.getTweet = function (params, error, success) {
    var path = '/statuses/show.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

//molina code
Twitter.prototype.getUser = function (params, error, success) {
    var path = '/users/show.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.doRequest = function (url, error, success) {
    this.oauth.get(url, this.accessToken, this.accessTokenSecret, function (err, body, response) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            success(body);
        } else {
            error(err, response, body);
        }
    });
};

Twitter.prototype.doPost = function (url, post_body, error, success) {
    //(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback 
    this.oauth.post(url, this.accessToken, this.accessTokenSecret, post_body, "application/x-www-form-urlencoded", function (err, body, response) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            success(body);
        } else {
            error(err, response, body);
        }
    });
};

Twitter.prototype.buildQS = function (params) {
    if (params && Object.keys(params).length > 0) {
        return '?' + qs.stringify(params);
    }
    return '';
};

if (!(typeof exports === 'undefined')) {
    exports.Twitter = Twitter;
}
/*mina metoder*/
Twitter.prototype.getAvailableTrends = function(params, error, success) {
    var path = '/trends/available.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

Twitter.prototype.getTrendsFromPlace = function(params, error, success) {
    var path = '/trends/place.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
}

Twitter.prototype.getTweets = function(params, error, success){
    var path = '/statuses/user_timeline.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
}; 

Twitter.prototype.searchTweets = function(params, error, success){
    var path = '/search/tweets.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
}; 

Twitter.prototype.getTrendsClosest = function(params, error, success){
    var path = '/trends/closest.json' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
}; 

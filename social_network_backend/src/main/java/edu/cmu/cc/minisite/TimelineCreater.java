package edu.cmu.cc.minisite;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.hbase.BigtableHelper;
import edu.cmu.cc.minisite.json.JSONUtil;
import edu.cmu.cc.minisite.mongo.MongoManager;
import edu.cmu.cc.minisite.mysql.MysqlManager;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class TimelineCreater {

    public static JsonObject creteTimeline(String userName) throws IOException {
        //Getting the user profile photo from Mysql
        Map<String, String> userProfile = MysqlManager.getProfilePhotos(Arrays.asList(userName));

        //Getting the list of followers :
        JsonArray followers = JSONUtil.getFollowerJSONArray(BigtableHelper.getFollowersMap(userName));
        List<String> followees = BigtableHelper.getFollowees(userName);
        JsonObject finalobj = JSONUtil.getCommentJson(MongoManager.getComments(followees));
        finalobj.add("followers",followers);
        finalobj.addProperty("name",userName);
        finalobj.addProperty("profile",userProfile.get(userName));
        System.out.println(finalobj);

        return finalobj;
    }
}

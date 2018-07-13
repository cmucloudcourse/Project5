package edu.cmu.cc.minisite.json;

import edu.cmu.cc.minisite.mongo.MongoManager;
import edu.cmu.cc.minisite.pojo.Comment;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

public class JSONUtilTest {

    @Test
    public void getEmptyFollowerList() {
        System.out.println(JSONUtil.getEmptyFollowerList().toString());
    }

    @Test
    public void getFollowerList() {
        Map<String,String> testMap = new HashMap<>();
        testMap.put("testUser","testProfile");
        testMap.put("testUser2","testProfile2");
        System.out.println(JSONUtil.getFollowerJSON(testMap).toString());
    }

    @Test
    public void convertToJSONArray() {
    }

    @Test
    public void getEmptyFollowerList1() {
    }

    @Test
    public void getFollowerJSON() {
    }

    @Test
    public void convertListToJSONArray_Empty() {
        Comment comment = new Comment();
        List<Comment> str = new ArrayList<>();
        str.add(comment);
        JSONUtil.getCommentJson(str);
    }
    @Test
    public void convertListToJSONArray_Value() {
        List<String> followee = new ArrayList<>();
        followee.add("waltaaaaaaaaaaaaaaaa");
        followee.add("krico");
        followee.add("StraightToVideo");

        JSONUtil.getCommentJson(MongoManager.getComments(followee));
    }


}
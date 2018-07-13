package edu.cmu.cc.minisite.hbase;

import com.google.cloud.bigtable.hbase.BigtableConfiguration;

import java.io.IOException;

import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.json.JSONUtil;
import edu.cmu.cc.minisite.mysql.MysqlManager;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;

import java.util.*;

public class BigtableHelper {
    private static final String PROJECT_ID = "cmu-project5";
    private static final String INSTANCE_ID = "bigtable-instance";

    private static TableName tableName_follower = TableName.valueOf("followers");
    private static TableName tableName_followee = TableName.valueOf("followees");
    /**
     * HTable handler.
     */
    private static Table followerTable;
    private static Table followeeTable;

    private static Connection connection = null;

    public static void connect() throws IOException {
        Configuration config = BigtableConfiguration.configure(PROJECT_ID, INSTANCE_ID);
        // Include the following line if you are using app profiles.
        // If you do not include the following line, the connection uses the
        // default app profile.
//        config.set(BigtableOptionsFactory.APP_PROFILE_ID_KEY, APP_PROFILE_ID);

        connection = BigtableConfiguration.connect(config);
        System.out.println("Established connection"+connection);
        followerTable = connection.getTable(tableName_follower);
        followeeTable = connection.getTable(tableName_followee);

    }

    public static List<String> getFollowers(String name) throws IOException {
        List<String> followers = new ArrayList<>();
        Get get = new Get(Bytes.toBytes(name));
        Result  result = followerTable.get(get);
        NavigableMap<byte[], byte[]> familyMap = result.getFamilyMap( Bytes.toBytes("data"));
        if(null == familyMap || familyMap.isEmpty()){
            return followers;
        }
        for (Map.Entry<byte[], byte[]> entry : familyMap.entrySet()) {
            followers.add(new String(entry.getKey()));
        }

        return followers;
    }


    public static Map<String, String> getFollowersMap(String name) throws IOException {
        List<String> followers = BigtableHelper.getFollowers(name);
        if(followers.isEmpty()){
            return new HashMap<>();
        }else {
            System.out.println("List of followers from HBASE " + String.join(", ", followers));
            Collections.sort(followers, String.CASE_INSENSITIVE_ORDER);
            Map<String, String> followerMap;
            followerMap = MysqlManager.getProfilePhotos(followers);
            return followerMap;
        }
    }


    public static List<String> getFollowees(String name) throws IOException {
        List<String> followers = new ArrayList<>();
        Get get = new Get(Bytes.toBytes(name));
        Result  result = followeeTable.get(get);
        NavigableMap<byte[], byte[]> familyMap = result.getFamilyMap( Bytes.toBytes("data"));
        if(null == familyMap || familyMap.isEmpty()){
            return followers;
        }
        for (Map.Entry<byte[], byte[]> entry : familyMap.entrySet()) {
            followers.add(new String(entry.getKey()));
        }

        return followers;
    }
}
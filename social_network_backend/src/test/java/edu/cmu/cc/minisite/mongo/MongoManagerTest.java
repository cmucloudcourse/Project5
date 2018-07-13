package edu.cmu.cc.minisite.mongo;

import org.junit.Test;

import static org.junit.Assert.*;

public class MongoManagerTest {

    @Test
    public void getMongoClient() {
        MongoManager.getMongoClient();
    }

    @Test
    public void getComments() {
//        MongoManager.getComments("zylo_");
    }
}
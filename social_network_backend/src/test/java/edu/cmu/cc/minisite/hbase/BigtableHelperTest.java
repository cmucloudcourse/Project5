package edu.cmu.cc.minisite.hbase;

import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

public class BigtableHelperTest {
    @Before
    public void setUp() throws Exception {
        BigtableHelper.connect();

    }

    @Test
    public void connect() {
    }

    @Test
    public void getFollowers() throws IOException {
        System.out.println(String.join(",",BigtableHelper.getFollowers("LeadHands")));
    }

    @Test
    public void getFollowersMap() throws IOException {

    }

    @Test
    public void getFollowees() throws IOException {
        System.out.println(String.join(",",BigtableHelper.getFollowees("LeadHands")));
    }
}
package edu.cmu.cc.minisite;

import edu.cmu.cc.minisite.hbase.BigtableHelper;
import edu.cmu.cc.minisite.mysql.MysqlManager;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

public class TimelineCreaterTest {

    @Before
    public void setUp() throws Exception {
        MysqlManager.initializeConnection();
        BigtableHelper.connect();

    }

    @Test
    public void creteTimeline() throws IOException {
        TimelineCreater.creteTimeline("LeadHands");
    }
}
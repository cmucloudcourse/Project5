package edu.cmu.cc.minisite.mysql;

import org.junit.Test;

import static org.junit.Assert.*;

public class MysqlManagerTest {

    @Test
    public void createInQuery() {
        MysqlManager mysqlManager = new MysqlManager();
        mysqlManager.createInQuery(10);
    }
}
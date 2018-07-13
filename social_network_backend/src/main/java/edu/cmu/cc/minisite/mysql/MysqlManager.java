package edu.cmu.cc.minisite.mysql;

import java.sql.*;
import java.util.*;

public class MysqlManager {


    /**
     * Username and password.
     */
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String DB_USER = System.getenv("MYSQL_USER");
    private static final String DB_PWD = System.getenv("MYSQL_PWD");
    private static final String DB_HOST = System.getenv("MYSQL_HOST");
    private static final String DB_NAME = "reddit_db";
    private static final String URL = "jdbc:mysql://"+DB_HOST+"/" + DB_NAME + "?useSSL=false";

    /**
     * The connection (session) with the database.
     */
    private static Connection conn;

    /**
     * Initialize the database connection.
     profile_photo_url*
     * @throws ClassNotFoundException if JDBC_DRIVER not found.
     * @throws SQLException           with incorrect SQL execution.
     */
    public static void initializeConnection() throws ClassNotFoundException,
            SQLException {
        if(null == conn ){
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(URL, DB_USER, DB_PWD);
        }

    }

    public static Map<String,String> getUserQuery(final String sql, String username, String password) {
        // retain the first query
        String query = sql.split(";")[0];
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Map<String, String> resultMap = new HashMap<>();
        try {
            int i = 0;
            stmt = conn.prepareStatement(sql);
            stmt.setString(1,username);
            stmt.setString(2,password);
            rs = stmt.executeQuery();
            if(rs.next()){
                resultMap.put("name",rs.getString("username"));
                resultMap.put("profile", rs.getString("profile_photo_url"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

        }
        return resultMap;
    }

    public static Map<String,String> getProfilePhotos(List<String> names){
        Map<String, String > photoMap = new TreeMap<>();
        String query = createInQuery(names.size());
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Map<String, String> resultMap = new HashMap<>();
        try {
            stmt = conn.prepareStatement(query);
            for (int i = 1; i <= names.size(); i++) {
                stmt.setString(i,names.get(i-1));
            }
            rs = stmt.executeQuery();
            while(rs.next()){
                photoMap.put(rs.getString("username"),rs.getString("profile_photo_url"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

        }
        return photoMap;
    }

    public static String createInQuery(int length){
        //To be implemented later
        String query = "SELECT username, profile_photo_url FROM users WHERE username IN (";
        StringBuilder queryBuilder = new StringBuilder(query);
        for( int i = 0; i< length; i++){
            queryBuilder.append(" ?");
            if(i != length -1) queryBuilder.append(",");
        }
        queryBuilder.append(") ORDER BY username DESC");
        System.out.println("PSTMT Query is "+queryBuilder.toString());
        return queryBuilder.toString();
    }


}

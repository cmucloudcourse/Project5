package edu.cmu.cc.minisite;

import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.mysql.MysqlManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Map;

/**
 * Task 1:
 * This query simulates the login process of a user
 * and tests whether your backend system is functioning properly.
 * Your web application will receive a pair of UserName and Password,
 * and you need to check your backend database to see if the
 * UserName and Password is a valid pair.
 * You should construct your response accordingly:
 *
 * If YES, send back the userName and Profile Image URL.
 * If NOT, set userName as "Unauthorized" and Profile Image URL as "#".
 *
 * PreparedStatement leads to fast execution and helps prevent
 * malicious code injection. In this task, you are required to
 * use PreparedStatement for SQL queries. You can review the Files
 * v/s/ Databases module for more details.
 */
public class ProfileServlet extends HttpServlet {


    /**
     * Your initialization code goes here.
     */
    public ProfileServlet() throws SQLException, ClassNotFoundException {
        MysqlManager.initializeConnection();
        System.out.println("Connection initialised.");
    }


    /**
     * Implement this method.
     *
     * @param request  the request object that is passed to the servlet
     * @param response the response object that the servlet
     *                 uses to return the headers to the client
     * @throws IOException      if an input or output error occurs
     * @throws ServletException if the request for the HEAD
     *                          could not be handled
     */
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("id");
        String pwd = request.getParameter("pwd");
        JsonObject result = new JsonObject();
        String query = "SELECT username, profile_photo_url FROM users WHERE username = ?  AND pwd = ? ";
        // TODO: To be implemented
        // it is mandatory to use PreparedStatement
        Map<String, String> queryresult = MysqlManager.getUserQuery(query, name, pwd);
        if(queryresult.isEmpty()){
            System.out.println("No Authorised User found");
            queryresult.put("name","Unauthorized");
            queryresult.put("profile","#");

        }
        queryresult.keySet().parallelStream().forEach(i -> {
            System.out.println("Values received after execution of user query Key : "+i+" Value : "+queryresult.get(i));
            result.addProperty(i,queryresult.get(i));
        });

        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        System.out.println("Response JSON is "+result.toString());
        writer.write(result.toString());
        writer.close();
    }




}

package edu.cmu.cc.minisite.mongo;

import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;
import edu.cmu.cc.minisite.json.JSONUtil;
import edu.cmu.cc.minisite.pojo.Comment;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;

public class MongoManager{




        private static final String DB_HOST = System.getenv("MONGO_HOST");
        private static final int DB_PORT = 27017;

        private static final String DB_NAME = "reddit_db";
        private static final String COLLECTION_NAME = "posts";
        private static  MongoClient client = null;


        public static MongoClient getMongoClient(){
            if(null == client){
                client = new MongoClient(DB_HOST,DB_PORT);
            }
            return client;
        }


        public static MongoDatabase getDatabase(String dbName){
                return getMongoClient().getDatabase(DB_NAME);
        }

        public static MongoCollection<Document> getCollection(String dbName ,String collectionName){
                return getDatabase(dbName).getCollection(collectionName);
        }


        public static List<Comment> getComments(List<String> userNames){
            List<Comment> commentsList = new ArrayList<>();

            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(Document document) {
                    Comment comment = new Comment(
                            document.get("cid").toString(),
                            document.get("parent_id").toString(),
                            document.get("uid").toString(),
                            document.get("timestamp").toString(),
                            document.get("content").toString(),
                            document.get("subreddit").toString(),
                            Integer.parseInt(document.get("ups").toString()),
                            Integer.parseInt(document.get("downs").toString())
                            );
                    List<Comment> parent = getParent(comment.getParent_id());
                    if(!parent.isEmpty()){
                        comment.setParent(parent.get(0));
                        List<Comment> grandParent = getParent(parent.get(0).getParent_id());
                        if(!grandParent.isEmpty()){
                            comment.setGrandParent(grandParent.get(0));
                        }
                    }
                    commentsList.add(comment);
                }
            };

                MongoCollection<Document> collection = getCollection(DB_NAME, COLLECTION_NAME);
                BasicDBObject inQuery = new BasicDBObject();
                inQuery.put("uid", new BasicDBObject("$in", userNames));
                collection.find(inQuery).sort(Sorts.descending("ups", "timestamp"))
                        .projection(fields(excludeId())).limit(30).forEach(printBlock);

            System.out.println("*************************PRINTING FROM LIST ***************************");
            commentsList.stream().forEach(i-> System.out.println(i));
            return commentsList;
        }

        public static List<Comment> getParent(String id){
            final List<Comment> comment = new ArrayList<>();
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(Document document) {
                    comment.add( new Comment(
                            document.get("cid").toString(),
                            document.get("parent_id").toString(),
                            document.get("uid").toString(),
                            document.get("timestamp").toString(),
                            document.get("content").toString(),
                            document.get("subreddit").toString(),
                            Integer.parseInt(document.get("ups").toString()),
                            Integer.parseInt(document.get("downs").toString())
                    ));
                }
            };

            MongoCollection<Document> collection = getCollection(DB_NAME,COLLECTION_NAME);
            collection.find(eq("cid",id))
                    .projection(fields(excludeId())).forEach(printBlock);

            return comment;

        }



}

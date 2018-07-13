package edu.cmu.cc.minisite.pojo;

public class Comment {

    private String cid;
    private String parent_id;
    private String uid;
    private String timestamp;
    private String content;
    private String subreddit;
    private int ups;
    private int downs;
    private Comment grandParent;
    private Comment parent;

    public Comment getGrandParent() {
        return grandParent;
    }

    public void setGrandParent(Comment grandParent) {
        this.grandParent = grandParent;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public Comment(){}

    public Comment(String cid, String parent_id, String uid, String timestamp, String content, String subreddit, int ups, int downs) {
        this.cid = cid;
        this.parent_id = parent_id;
        this.uid = uid;
        this.timestamp = timestamp;
        this.content = content;
        this.subreddit = subreddit;
        this.ups = ups;
        this.downs = downs;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getParent_id() {
        return parent_id;
    }

    public void setParent_id(String parent_id) {
        this.parent_id = parent_id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSubreddit() {
        return subreddit;
    }

    public void setSubreddit(String subreddit) {
        this.subreddit = subreddit;
    }

    public int getUps() {
        return ups;
    }

    public void setUps(int ups) {
        this.ups = ups;
    }

    public int getDowns() {
        return downs;
    }

    public void setDowns(int downs) {
        this.downs = downs;
    }

//    @Override
//    public String toString() {
//        return "{" +
//                "cid=" + cid +
//                ", parent_id=" + parent_id +
//                ", uid='" + uid +
//                ", timestamp=" + timestamp +
//                ", content=" + content +
//                ", subreddit=" + subreddit +
//                ", ups=" + ups +
//                ", downs=" + downs +
//                '}';
//    }
}

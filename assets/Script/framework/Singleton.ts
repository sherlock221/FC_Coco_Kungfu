class Singleton<T> extends cc.Component {

    private static _instance = null;

    public static getInstance(){
        if (Singleton._instance == null){
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }


}
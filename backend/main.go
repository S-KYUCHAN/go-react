package main

import (
	"fmt"
	"net/http"
	"log"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"

	"github.com/S-KYUCHAN/backend/db"
)

type Article struct {
	Id			string `json:"Id"`
	Title 	string `json:"Title"`
	Desc 		string `json:"description"`
	Content string `json:"content"`
}

func returnAllArticles(w http.ResponseWriter, r *http.Request) {

	var query string = "select * from article_db"

	rows := db.DbQuery(query)
	col, _ := rows.Columns()
	typeVal, _ := rows.ColumnTypes()

	results := make([]map[string]interface{}, 0)
	for rows.Next() {
		colVar := make([]interface{}, len(col))
		for i := 0; i < len(col); i++ {
			typeName := typeVal[i].DatabaseTypeName()
			db.SetColVarType(&colVar, i, typeName)
		}
		
		result := make(map[string]interface{})
		rows.Scan(colVar...)
		for i := 0; i < len(col); i++ {
			typeName := typeVal[i].DatabaseTypeName()
			db.SetResultValue(&result, col[i], colVar[i], typeName)
		}

		results = append(results, result)
	}
	
	json.NewEncoder(w).Encode(results)
	fmt.Println("Endpoint Hit: returnAllArticles")
}

func returnSingleArticles(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]
	
	query := fmt.Sprintf("select * from article_db where `id`=%s", key)
	
	rows := db.DbQuery(query)
	col, _ := rows.Columns()
	typeVal, _ := rows.ColumnTypes()

	results := make([]map[string]interface{}, 0)
	for rows.Next() {
		colVar := make([]interface{}, len(col))
		for i := 0; i < len(col); i++ {
			typeName := typeVal[i].DatabaseTypeName()
			db.SetColVarType(&colVar, i, typeName)
		}
		
		result := make(map[string]interface{})
		rows.Scan(colVar...)
		for i := 0; i < len(col); i++ {
			typeName := typeVal[i].DatabaseTypeName()
			db.SetResultValue(&result, col[i], colVar[i], typeName)
		}

		results = append(results, result)
	}
	
	json.NewEncoder(w).Encode(results)
	
	fmt.Println("Endpoint Hit: returnSingleArticles")
}

func createNewArticle(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)

	var article Article
	json.Unmarshal(reqBody, &article)

	query := fmt.Sprintf("insert into article_db(title,description,content)values('%s','%s','%s')",
												article.Title, article.Desc, article.Content)

	result := db.DbExec(query)
	
	fmt.Println(result)
	fmt.Println("Endpoint Hit: createNewArticle")
}

// func updateArticle(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	id := vars["id"]

// 	for index, article := range Articles {
// 		if article.Id == id {
// 			fmt.Fprintf(w, "This article!!")
// 		}
// 	}
// }

func deleteArticle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	query := fmt.Sprintf("delete from article_db where `id`=%s", key)

	result := db.DbExec(query)
	
	fmt.Println(result)
}

func welcomePage(w http.ResponseWriter, h *http.Request) {
	fmt.Fprintf(w, "Welcome to my page")
	fmt.Println("Endpoint Hit: welcomePage")
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers:", "*")
		w.Header().Set("Access-Control-Allow-Origin:", "*")
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Methods:", "*")
		
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
		return
	})
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.Use(CORS)

	myRouter.HandleFunc("/", welcomePage)
	myRouter.HandleFunc("/articles", returnAllArticles)
	myRouter.HandleFunc("/article", createNewArticle).Methods("POST")
	// myRouter.HandleFunc("/article/{id}", updateArticle).Methods("PUT")
	myRouter.HandleFunc("/article/{id}", deleteArticle).Methods("DELETE")
	myRouter.HandleFunc("/article/{id}", returnSingleArticles)
	fmt.Println("Listening")
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {

	handleRequests()
}
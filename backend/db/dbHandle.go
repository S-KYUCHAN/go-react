package db

import (
	"fmt"
	"log"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func DbQuery(conn *sql.DB, query string) *sql.Rows {
	// dataSource := "hawk:mypasswd@tcp(localhost:3306)/mysql"
	// conn, err := sql.Open("mysql", dataSource)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer conn.Close()

	rows, err := conn.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Endpoint Hit: DbQuery")
	return rows
}

func DbExec(conn *sql.DB, query string) sql.Result {
	// dataSource := "hawk:mypasswd@tcp(localhost:3306)/mysql"
	// conn, err := sql.Open("mysql", dataSource)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer conn.Close()

	result, err := conn.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Endpoint Hit: DbQuery")
	return result
}
// func DbExec(query string) sql.Result {
// 	dataSource := "hawk:mypasswd@tcp(localhost:3306)/mysql"
// 	conn, err := sql.Open("mysql", dataSource)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer conn.Close()

// 	result, err := conn.Exec(query)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Println("Endpoint Hit: DbQuery")
// 	return result
// }


func DbQueryContext(query string) *sql.Rows {
	dataSource := "hawk:mypasswd@tcp(localhost:3306)/mysql"
	conn, err := sql.Open("mysql", dataSource)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	rows, err := conn.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Endpoint Hit: DbQueryContext")
	return rows
}
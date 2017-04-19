package design

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("swagger", func() {
	Origin(OriginURL, OriginAllowAll)
	// TODO: ログイン画面できるまでは外しておく
	//Security(JWT, func() {
	//	Scope("api:access")
	//})

	Action("show", func() {
		Routing(GET("/swagger.json"))
		Description("get swagger.json")
		Response(OK, func() {
			HashOf(String, String)
		})
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

	//Files("/swagger.json", "public/swagger/swagger.json")
})

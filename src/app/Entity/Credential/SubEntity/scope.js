class Scope {
    constructor(scope) {
        this.scope = scope
    }

    build() {
        let scope = this.scope
        if (!scope) {
            return this.set_default()
        }
        else if (typeof scope !== "object") {
            throw Error("SCOPE MUST BE AN OBJECT")
        }

        let conditions = [
            scope.hasOwnProperty("read"),
            scope.hasOwnProperty("write"),
            scope.hasOwnProperty("third_party"),
            typeof scope.read === "boolean",
            typeof scope.write === "boolean",
            typeof scope.third_party === "object"
        ]
        for (let i of conditions) {
            if (i !== true) {
                throw Error("INVALID SCOPE OBJECT")
            }
        }
        //
        let third_party_conditions = [
            scope.third_party.hasOwnProperty("read"),
            scope.third_party.hasOwnProperty("write"),
            typeof scope.third_party.read === "boolean",
            typeof scope.third_party.write === "boolean"
        ]
        //
        for (let i of third_party_conditions) {
            if (i !== true) {
                throw Error("INVALID SCOPE OBJECT")
            }
        }
        console.log("VALID THIRD PARTY SCOPE")
        //
        if (scope.third_party.read !== false || scope.third_party.write !== false) {
            throw Error("YOU DONT HAVE CLEARANCE TO SET THAT SCOPE")
        }
        return scope
    }
    set_default() {
        return {
            read: true,
            write: true,
            third_party: {
                read: false,
                write: false
            }
        }
    }
    validate() {
        let scope = this.scope
        if (!scope) {
            return this.set_default()
        }
        else if (typeof scope !== "object") {
            throw Error("SCOPE MUST BE AN OBJECT")
        }

        let conditions = [
            scope.hasOwnProperty("read"),
            scope.hasOwnProperty("write"),
            scope.hasOwnProperty("third_party"),
            typeof scope.read === "boolean",
            typeof scope.write === "boolean",
            typeof scope.third_party === "object"
        ]
        for (let i of conditions) {
            if (i !== true) {
                throw Error("INVALID SCOPE OBJECT")
            }
        }
        //
        let third_party_conditions = [
            scope.third_party.hasOwnProperty("read"),
            scope.third_party.hasOwnProperty("write"),
            typeof scope.third_party.read === "boolean",
            typeof scope.third_party.write === "boolean"
        ]
        //
        for (let i of third_party_conditions) {
            if (i !== true) {
                throw Error("INVALID SCOPE OBJECT")
            }
        }
        return scope
    }
}

module.exports = Scope;
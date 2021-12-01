const admin = require("firebase-admin");
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);

exports.setUserClaim = functions.auth.user().onCreate((user) => {
  grantUserRole(user.uid);
});

const grantAdminRole = (userId) => {
  return admin.auth().setCustomUserClaims(userId, {
    admin: true,
  });
};
const grantUserRole = (userId) => {
  admin.auth().setCustomUserClaims(userId, {
    admin: false,
  });
};

exports.addAdmin = functions.https.onCall((data, context) => {
  const userId = data.userId;
  const token = context.rawRequest.get("Authorization").split("Bearer ")[1];
  if (token) {
    return admin
      .auth()
      .verifyIdToken(token)
      .then((decoded) => {
        grantAdminRole(userId)
          .then(() => {
            return {
              result: `Request fulfilled! ${userId} is now a
                    moderator.`,
            };
          })
          .catch((e) => {
            return {
              result: `Request failed! ${e.message}`,
            };
          });
      })
      .catch((err) => {
        return {
          result: "Not Authorized.",
        };
      });
  } else {
    console.log("Request failed");
    return {
      result: "Request failed",
    };
  }
});

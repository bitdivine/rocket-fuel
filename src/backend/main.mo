import Set "mo:core/Set";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Timestamp = Time.Time;

  module ComicEntry {
    public type Id = Nat;

    public type CreateRequest = {
      title : Text;
      description : Text;
      imageUrl : ?Text;
      series : Text;
      link : ?Text;
    };

    public type ComicEntry = {
      id : Id;
      title : Text;
      description : Text;
      imageUrl : ?Text;
      series : Text;
      link : ?Text;
      createdAt : Timestamp;
    };

    public func compare(entry1 : ComicEntry, entry2 : ComicEntry) : Order.Order {
      Nat.compare(entry1.id, entry2.id);
    };
  };
  type ComicEntry = ComicEntry.ComicEntry;

  var nextComicEntryId = 0;
  let comicEntries = Set.empty<ComicEntry>();

  public query ({ caller }) func getComicEntry(id : ComicEntry.Id) : async ComicEntry {
    switch (comicEntries.values().find(func(e) { e.id == id })) {
      case (?comicEntry) { comicEntry };
      case (null) { Runtime.trap("Entry does not exist") };
    };
  };

  public query ({ caller }) func listComicEntries() : async [ComicEntry] {
    comicEntries.values().toArray();
  };

  public shared ({ caller }) func createComicEntry(request : ComicEntry.CreateRequest) : async ComicEntry {
    let comicEntry : ComicEntry = {
      id = nextComicEntryId;
      title = request.title;
      description = request.description;
      imageUrl = request.imageUrl;
      series = request.series;
      link = request.link;
      createdAt = Time.now();
    };
    nextComicEntryId += 1;
    comicEntries.add(comicEntry);
    comicEntry;
  };
};

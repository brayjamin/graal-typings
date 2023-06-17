import { World } from 'org.bukkit';

declare module 'world.bentobox.bentobox.api.panels' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { Optional, List, Map } from 'java.util';
   import { PanelItemBuilder } from 'world.bentobox.bentobox.api.panels.builders';
   /**
    * Represents an item in a {@link Panel}
    * @author tastybento
    *
    */
   export class PanelItem {
      static empty(): PanelItem;
      constructor(builtItem: PanelItemBuilder);
      getDescription(): string[];
      setDescription(description: string[]);
      getName(): string;
      setName(name: string);
      isInvisible(): boolean;
      setInvisible(invisible: boolean): void;
      getClickHandler(): Optional<ClickHandler>;
      /**
       * @param clickHandler the clickHandler to set
       * @since 1.6.0
       */
      setClickHandler(clickHandler: ClickHandler);
      isGlow(): boolean;
      setGlow(glow: boolean): void;
      /**
       * @return the playerHead
       */
      isPlayerHead(): boolean;
      /**
       * @return the playerHeadName
       * @since 1.9.0
       */
      getPlayerHeadName(): string;
   }
   /**
    * Represents a tab in a {@link TabbedPanel}. Contains {@link PanelItem}'s.
    *
    * @author tastybento
    * @since 1.6.0
    *
    */
   export class Tab {
      getIcon(): PanelItem;
      /**
       * @return the name of this tab
       */
      getName(): string;
      /**
       * Return an immutable list of the panel items for this tab
       * @return a list of items in slot order
       */
      getPanelItems(): PanelItem[];
      /**
       * @return the permission required to view this tab or empty if no permission required
       */
      getPermission(): string;
      /**
       * @return Map of icons to be shown in the tab row when the tab is active
       * Make sure these do not overlap any tabs that are in the tab row
       */
      getTabIcons(): Map<number, PanelItem>;
   }
   /**
    * This will be called if registered and if a player clicks on a panel
    * @author tastybento
    *
    */
   export class PanelListener {
      /**
       * This is called when the panel is first setup
       */
      setup(): void;
      /**
       * Called after a user has clicked on a panel item.
       * Used to refresh the panel in its entirety
       * @since 1.6.0
       */
      refreshPanel(): void;
   }
}
declare module 'world.bentobox.bentobox.listeners' {
   import { Optional } from 'java.util';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   /**
    * Abstracts PlayerPortalEvent and EntityPortalEvent
    * @author tastybento
    * @deprecated replaced not used in new listeners.
    * @since 1.12.1
    */
   export class PlayerEntityPortalEvent {
      /**
       * Returns whether the server will attempt to create a destination portal or not.
       * Only applicable to {@link PlayerPortalEvent}
       * @return whether there should create be a destination portal created
       */
      getCanCreatePortal(): boolean;
      /**
       * @return true if constructed with an {@link EntityPortalEvent}
       */
      isEntityPortalEvent(): boolean;
      /**
       * @return true if constructed with an {@link PlayerPortalEvent}
       */
      isPlayerPortalEvent(): boolean;
      /**
       * Sets the cancellation state of this event. A cancelled event will not be executed in the server, but will still pass to other plugins
       * If a move or teleport event is cancelled, the player will be moved or teleported back to the Location as defined by getFrom(). This will not fire an event
       * Specified by: setCancelled(...) in Cancellable
       * @param cancel true if you wish to cancel this event
       */
      setCancelled(cancel: boolean): void;
      /**
       * Sets whether the server should attempt to create a destination portal or not.
       * Only applicable to {@link PlayerPortalEvent}
       * @param canCreatePortal Sets whether there should be a destination portal created
       */
      setCanCreatePortal(canCreatePortal: boolean): void;
      /**
       * Set the Block radius to search in for available portals.
       * @param searchRadius the radius in which to search for a portal from the location
       */
      setSearchRadius(searchRadius: number);
      /**
       * Get island at the from location
       * @return optional island at from location
       */
      getIsland(): Optional<Island>;
   }
}
declare module 'world.bentobox.bentobox.database.json' {
   import { Class } from 'java.lang';
   import { List } from 'java.util';
   import { File } from 'java.io';
   import { AbstractDatabaseHandler, DatabaseConnector, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { CompletableFuture } from 'java.util.concurrent';
   export class JSONDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * Abstract class that handles insert/select-operations into/from a database.
    * It also provides {@link #getGson()}.
    *
    * @author Poslovitch, tastybento
    *
    * @param
    */
   export class AbstractJSONDatabaseHandler<T> extends AbstractDatabaseHandler<T> {}
   export class JSONDatabaseConnector extends DatabaseConnector {
      /**
       * Looks through the database (or files) and returns a known unique key
       *
       * @param tableName - name of the table
       * @return a unique key for this record
       */
      getUniqueId(tableName: string): string;
      /**
       * Check if a key exists in the database in this table or not
       *
       * @param tableName - name of the table
       * @param key       - key to check
       * @return true if it exists
       */
      uniqueIdExists(tableName: string, key: string): boolean;
      /**
       * Returns the connection url
       *
       * @return the connector's URL
       */
      getConnectionUrl(): string;
      /**
       * Establishes a new connection to the database
       *
       * @param type of class
       * @return A new connection to the database using the settings provided
       */
      createConnection(type: Class<any>): any;
      /**
       * Close the database connection
       * @param type of class being closed
       */
      closeConnection(type: Class<any>): void;
   }
   export class JSONDatabaseHandler<T> extends AbstractJSONDatabaseHandler<T> {
      loadObjects(): T[];
      loadObject(uniqueId: string): T;
      saveObject(instance: T): CompletableFuture<boolean>;
      deleteID(uniqueId: string): void;
      deleteObject(instance: T): void;
      objectExists(uniqueId: string): boolean;
      close(): void;
   }
}
declare module 'world.bentobox.bentobox.database.sql.mysql' {
   import { Class } from 'java.lang';
   import { AbstractDatabaseHandler, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { HikariConfig } from 'com.zaxxer.hikari';
   import { SQLDatabaseConnector, SQLDatabaseHandler } from 'world.bentobox.bentobox.database.sql';
   /**
    *
    * Class that inserts a  into the corresponding database-table.
    *
    * @author tastybento
    *
    * @param
    */
   export class MySQLDatabaseHandler<T> extends SQLDatabaseHandler<T> {}
   export class MySQLDatabaseConnector extends SQLDatabaseConnector {
      /**
       * {@inheritDoc}
       */
      createConfig(): HikariConfig;
   }
   export class MySQLDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
}
declare module 'world.bentobox.bentobox.database.DatabaseSetup' {
   import { Enum } from 'java.lang';
   import { DatabaseSetup } from 'world.bentobox.bentobox.database';
   /**
    * Database types
    *
    */
   export class DatabaseType extends Enum<DatabaseType> {
      static readonly YAML: DatabaseType;
      /**
       * Transition database, from YAML to JSON
       * @since 1.5.0
       */
      static readonly YAML2JSON: DatabaseType;
      /**
       * Transition database, from YAML to MySQL
       * @since 1.5.0
       */
      static readonly YAML2MYSQL: DatabaseType;
      /**
       * Transition database, from YAML to MySQL (MariaDB)
       * @since 1.5.0
       */
      static readonly YAML2MARIADB: DatabaseType;
      /**
       * Transition database, from YAML to MongoDB
       * @since 1.6.0
       */
      static readonly YAML2MONGODB: DatabaseType;
      /**
       * Transition database, from YAML to SQLite
       * @since 1.6.0
       */
      static readonly YAML2SQLITE: DatabaseType;
      static readonly JSON: DatabaseType;
      /**
       * Transition database, from JSON to MySQL
       * @since 1.5.0
       */
      static readonly JSON2MYSQL: DatabaseType;
      /**
       * Transition database, from JSON to MySQL (MariaDB)
       * @since 1.5.0
       */
      static readonly JSON2MARIADB: DatabaseType;
      /**
       * Transition database, from JSON to MongoDB
       * @since 1.6.0
       */
      static readonly JSON2MONGODB: DatabaseType;
      /**
       * Transition database, from JSON to SQLite
       * @since 1.6.0
       */
      static readonly JSON2SQLITE: DatabaseType;
      /**
       * Transition database, from JSON to PostgreSQL
       * @since 1.6.0
       */
      static readonly JSON2POSTGRESQL: DatabaseType;
      static readonly MYSQL: DatabaseType;
      /**
       * Transition database, from MySQL to JSON
       * @since 1.5.0
       */
      static readonly MYSQL2JSON: DatabaseType;
      /**
       * @since 1.1
       */
      static readonly MARIADB: DatabaseType;
      /**
       * Transition database, from MariaDB to JSON
       * @since 1.6.0
       */
      static readonly MARIADB2JSON: DatabaseType;
      static readonly MONGODB: DatabaseType;
      /**
       * Transition database, from MongoDB to JSON
       * @since 1.6.0
       */
      static readonly MONGODB2JSON: DatabaseType;
      /**
       * @since 1.6.0
       */
      static readonly SQLITE: DatabaseType;
      /**
       * Transition database, from SQLite to JSON
       * @since 1.6.0
       */
      static readonly SQLITE2JSON: DatabaseType;
      /**
       * @since 1.6.0
       */
      static readonly POSTGRESQL: DatabaseType;
      /**
       * Transition database, from PostgreSQL to JSON
       * @since 1.6.0
       */
      static readonly POSTGRESQL2JSON: DatabaseType;
      static valueOf(name: string): DatabaseType;
      static values(): DatabaseType[];
   }
}
declare module 'world.bentobox.bentobox.database.sql.postgresql' {
   import { Class } from 'java.lang';
   import { AbstractDatabaseHandler, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { HikariConfig } from 'com.zaxxer.hikari';
   import { CompletableFuture } from 'java.util.concurrent';
   import { SQLDatabaseConnector, SQLDatabaseHandler } from 'world.bentobox.bentobox.database.sql';
   /**
    *
    * @param
    *
    * @since 1.11.0
    * @author tastybento
    */
   export class PostgreSQLDatabaseHandler<T> extends SQLDatabaseHandler<T> {
      /**
       * {@inheritDoc}
       */
      saveObject(instance: T): CompletableFuture<boolean>;
   }
   /**
    * @since 1.6.0
    * @author Poslovitch
    */
   export class PostgreSQLDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @since 1.6.0
    * @author Poslovitch
    */
   export class PostgreSQLDatabaseConnector extends SQLDatabaseConnector {
      /**
       * {@inheritDoc}
       */
      createConfig(): HikariConfig;
   }
}
declare module 'world.bentobox.bentobox.versions' {
   import { ServerVersion, ServerSoftware, Compatibility } from 'world.bentobox.bentobox.versions.ServerCompatibility';
   /**
    * Checks and ensures the current server software is compatible with BentoBox.
    * @author Poslovitch
    */
   export class ServerCompatibility {
      static getInstance(): ServerCompatibility;
      /**
       * Checks the compatibility with the current server software and returns the {@link Compatibility}.
       * Note this is a one-time calculation: further calls won't change the result.
       * @return the {@link Compatibility}.
       */
      checkCompatibility(): Compatibility;
      /**
       * Returns the {@link ServerSoftware} entry corresponding to the current server software, may be null.
       * @return the {@link ServerSoftware} run by this server or null.
       * @since 1.3.0
       */
      getServerSoftware(): ServerSoftware;
      /**
       * Returns the {@link ServerVersion} entry corresponding to the current server software, may be null.
       * @return the {@link ServerVersion} run by this server or null.
       * @since 1.3.0
       */
      getServerVersion(): ServerVersion | null;
      /**
       * Returns whether the server runs on the specified versions.
       * @param versions the {@link ServerVersion}s to check.
       * @return `true` if the server runs on one of the specified versions, `false` otherwise.
       * @since 1.5.0
       */
      isVersion(...versions: ServerVersion[]): boolean;
      /**
       * Returns whether the server runs on the specified software.
       * @param softwares the {@link ServerSoftware}s to check.
       * @return `true` if the server runs on on of these software, `false` otherwise.
       * @since 1.5.0
       */
      isSoftware(...softwares: ServerSoftware[]): boolean;
   }
}
declare module 'world.bentobox.bentobox.api.addons.Addon' {
   import { Enum } from 'java.lang';
   /**
    * Represents the current run-time state of a {@link Addon}.
    *
    * @author Poslovitch
    */
   export class State extends Enum<State> {
      /**
       * The addon has been correctly loaded.
       * @since 1.1
       */
      static readonly LOADED: State;
      /**
       * The addon has been correctly enabled and is now fully working.
       */
      static readonly ENABLED: State;
      /**
       * The addon is fully disabled.
       */
      static readonly DISABLED: State;
      /**
       * The addon has not been loaded because it requires a different version of BentoBox or of the server software.
       */
      static readonly INCOMPATIBLE: State;
      /**
       * The addon has not been enabled because a dependency is missing.
       */
      static readonly MISSING_DEPENDENCY: State;
      /**
       * The addon loading or enabling process has been interrupted by an unhandled error.
       */
      static readonly ERROR: State;
      static valueOf(name: string): State;
      static values(): State[];
   }
}
declare module 'world.bentobox.bentobox.api.logs.LogEntry' {
   import { LogEntry } from 'world.bentobox.bentobox.api.logs';
   import { Map } from 'java.util';
   export class Builder {
      constructor(type: string);
      timestamp(timestamp: number): Builder;
      data(data2: Map<string, string>): Builder;
      /**
       * Puts this key and this value in the currently existing data map.
       * @param key key to set
       * @param value value to set
       * @return the Builder instance
       */
      data(key: string, value: string | null): Builder;
      build(): LogEntry;
   }
}
declare module 'world.bentobox.bentobox.api.events.addon.AddonEvent' {
   import { Map } from 'java.util';
   import { Enum } from 'java.lang';
   import { Addon } from 'world.bentobox.bentobox.api.addons';
   import { AddonBaseEvent } from 'world.bentobox.bentobox.api.events.addon';
   export class Reason extends Enum<Reason> {
      static readonly ENABLE: Reason;
      static readonly DISABLE: Reason;
      static readonly LOAD: Reason;
      static readonly UNKNOWN: Reason;
      static valueOf(name: string): Reason;
      static values(): Reason[];
   }
   export class AddonEventBuilder {
      /**
       * Add a map of key-value pairs to the event. Use this to transfer data from the addon to the external world.
       * @param keyValues - map
       * @return AddonEvent
       */
      keyValues(keyValues: Map<string, any>): AddonEventBuilder;
      addon(addon: Addon): AddonEventBuilder;
      reason(reason: Reason): AddonEventBuilder;
      /**
       * Build and fire event
       * @return event - deprecated event. To obtain the new event use {@link AddonBaseEvent#getNewEvent()}
       */
      build(): AddonBaseEvent;
   }
}
declare module 'world.bentobox.bentobox.nms' {
   import { BentoBox } from 'world.bentobox.bentobox';
   /**
    * Regenerates by using a seed world. The seed world is created using the same generator as the game
    * world so that features created by methods like generateNoise or generateCaves can be regenerated.
    * @author tastybento
    *
    */
   export class CopyWorldRegenerator extends WorldRegenerator {}
   /**
    * A helper class for {@link world.bentobox.bentobox.blueprints.BlueprintPaster}
    */
   export class PasteHandler {}
   export class SimpleWorldRegenerator extends WorldRegenerator {}
   /**
    * A world generator used by {@link world.bentobox.bentobox.util.DeleteIslandChunks}
    */
   export class WorldRegenerator {}
}
declare module 'world.bentobox.bentobox.api.commands' {
   import { Optional, List } from 'java.util';
   import { User } from 'world.bentobox.bentobox.api.user';
   /**
    * Interface for BentoBox Commands
    * @author tastybento
    */
   export class BentoBoxCommand {
      /**
       * Setups anything that is needed for this command.
       *
       * It is recommended you do the following in this method:
       *
       *     Register any of the sub-commands of this command;
       *     Define the permission required to use this command using {@link CompositeCommand#setPermission(String)};
       *     Define whether this command can only be run by players or not using {@link CompositeCommand#setOnlyPlayer(boolean)};
       *
       */
      setup(): void;
      /**
       * Returns whether the command can be executed by this user or not.
       * It is recommended to send messages to let this user know why they could not execute the command.
       * Note that this is run previous to {@link #execute(User, String, List)}.
       * @param user the {@link User} who is executing this command.
       * @param label the label which has been used to execute this command.
       *              It can be {@link CompositeCommand#getLabel()} or an alias.
       * @param args the command arguments.
       * @return `true` if this command can be executed, `false` otherwise.
       * @since 1.3.0
       */
      canExecute(user: User, label: string, args: string[]): boolean;
      /**
       * Defines what will be executed when this command is run.
       * @param user the {@link User} who is executing this command.
       * @param label the label which has been used to execute this command.
       *              It can be {@link CompositeCommand#getLabel()} or an alias.
       * @param args the command arguments.
       * @return `true` if the command executed successfully, `false` otherwise.
       */
      execute(user: User, label: string, args: string[]): boolean;
      /**
       * Tab Completer for CompositeCommands.
       * Note that any registered sub-commands will be automatically added to the list.
       * Use this to add tab-complete for things like names.
       * @param user the {@link User} who is executing this command.
       * @param alias alias for command
       * @param args command arguments
       * @return List of strings that could be used to complete this command.
       */
      tabComplete(user: User, alias: string, args: string[]): Optional<string[]>;
   }
}
declare module 'world.bentobox.bentobox.api.events.addon' {
   import { AddonEventBuilder } from 'world.bentobox.bentobox.api.events.addon.AddonEvent';
   export class AddonEvent {
      /**
       * @return Addon event builder
       */
      builder(): AddonEventBuilder;
   }
}
declare module 'world.bentobox.bentobox.api.logs' {
   import { Map } from 'java.util';
   /**
    * Represents an event that occurred and that is logged.
    *
    * An {@link world.bentobox.bentobox.database.objects.adapters.AdapterInterface AdapterInterface} is provided to be able to save/retrieve
    * a list of instances of this object to/from the database: {@link world.bentobox.bentobox.database.objects.adapters.LogEntryListAdapter LogEntryListAdapter}.
    *
    * @author Poslovitch
    */
   export class LogEntry {
      getTimestamp(): number;
      getType(): string;
      getData(): Map<string, string> | null;
   }
}
declare module 'world.bentobox.bentobox.api.metadata' {
   import { Optional, Map } from 'java.util';
   /**
    * This interface is for all BentoBox objects that have meta data
    * @author tastybento
    * @since 1.15.6
    */
   export class MetaDataAble {
      /**
       * @return the metaData
       */
      getMetaData(): Optional<Map<string, MetaDataValue>>;
      /**
       * @param metaData the metaData to set
       * @since 1.15.4
       */
      setMetaData(metaData: Map<string, MetaDataValue>);
      /**
       * Get meta data by key
       * @param key - key
       * @return the value to which the specified key is mapped, or null if there is no mapping for the key
       * @since 1.15.6
       */
      getMetaData(key: string): Optional<MetaDataValue>;
      /**
       * Put a key, value string pair into the meta data
       * @param key - key
       * @param value - value
       * @return the previous value associated with key, or empty if there was no mapping for key.
       * @since 1.15.6
       */
      putMetaData(key: string, value: MetaDataValue): Optional<MetaDataValue>;
      /**
       * Remove meta data
       * @param key - key to remove
       * @return the previous value associated with key, or empty if there was no mapping for key.
       * @since 1.15.6
       */
      removeMetaData(key: string): Optional<MetaDataValue>;
   }
   /**
    * Stores meta data value in a GSON friendly way so it can be serialized and deserialized.
    * Values that are null are not stored in the database, so only the appropriate type is stored.
    * @author tastybento
    * @since 1.15.4
    *
    */
   export class MetaDataValue {
      /**
       * Initialize this meta data value
       * @param value the value assigned to this metadata value
       */
      constructor(value: any);
      asInt(): number;
      asFloat(): number;
      asDouble(): number;
      asLong(): number;
      asShort(): number;
      asByte(): number;
      asBoolean(): boolean;
      asString(): string;
   }
}
declare module 'world.bentobox.bentobox.managers' {
   import { PlaceholderReplacer } from 'world.bentobox.bentobox.api.placeholders';
   import { Locale, Set, Optional, Collection, List, UUID, Map, Queue, LinkedHashMap } from 'java.util';
   import { BlueprintBundle } from 'world.bentobox.bentobox.blueprints.dataobjects';
   import { CatalogEntry } from 'world.bentobox.bentobox.web.catalog';
   import { Database } from 'world.bentobox.bentobox.database';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { AtomicReference } from 'java.util.concurrent.atomic';
   import { Addon, AddonClassLoader, GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { BentoBoxLocale } from 'world.bentobox.bentobox.api.localization';
   import { Names, IslandDeletion, Island, Players } from 'world.bentobox.bentobox.database.objects';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   import { Runnable, Class } from 'java.lang';
   import { File } from 'java.io';
   import { Contributor } from 'world.bentobox.bentobox.web.credits';
   import { Hook } from 'world.bentobox.bentobox.api.hooks';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { DeleteIslandChunks } from 'world.bentobox.bentobox.util';
   import { Blueprint, BlueprintClipboard } from 'world.bentobox.bentobox.blueprints';
   import { IslandCache } from 'world.bentobox.bentobox.managers.island';
   import { Mode } from 'world.bentobox.bentobox.api.flags.Flag';
   import { CompositeCommand } from 'world.bentobox.bentobox.api.commands';
   export class PlayersManager {
      /**
       * Provides a memory cache of online player information
       * This is the one-stop-shop of player info
       * If the player is not cached, then a request is made to Players to obtain it
       *
       * @param plugin - plugin object
       */
      constructor(plugin: BentoBox);
      /**
       * Used only for testing. Sets the database to a mock database.
       * @param handler - handler
       */
      setHandler(handler: Database<Players>);
      /**
       * Load all players - not normally used as to load all players into memory will be wasteful
       */
      load(): void;
      isSaveTaskRunning(): boolean;
      /**
       * Save all players
       */
      saveAll(): void;
      /**
       * Save all players
       * @param schedule true if we should let the task run over multiple ticks to reduce lag spikes
       */
      saveAll(schedule: boolean): void;
      shutdown(): void;
      /**
       * Get player by UUID. Adds player to cache if not in there already
       * @param uuid of player
       * @return player object or null if it does not exist, for example the UUID is null
       */
      getPlayer(uuid: UUID): Players | null;
      /**
       * Returns an unmodifiable collection of all the players that are currently in the cache.
       * @return unmodifiable collection containing every player in the cache.
       * @since 1.1
       */
      getPlayers(): Collection<Players>;
      /**
       * Adds a player to the cache. If the UUID does not exist, a new player is made
       * @param playerUUID - the player's UUID
       */
      addPlayer(playerUUID: UUID): void;
      /**
       * Checks if the player is known or not.
       * Will check not just the cache but if the object but in the database too.
       *
       * @param uniqueID - unique ID
       * @return true if player is known, otherwise false
       */
      isKnown(uniqueID: UUID): boolean;
      /**
       * Attempts to return a UUID for a given player's name.
       * @param name - name of player
       * @return UUID of player or null if unknown
       */
      getUUID(name: string): UUID | null;
      /**
       * Sets the player's name and updates the name to UUID database
       * @param user - the User
       */
      setPlayerName(playerName: User);
      /**
       * Obtains the name of the player from their UUID
       * Player must have logged into the game before
       *
       * @param playerUUID - the player's UUID
       * @return String - playerName, empty string if UUID is null
       */
      getName(playerUUID: UUID | null): string;
      /**
       * Returns the locale for this player. If missing, will return nothing
       * @param playerUUID - the player's UUID
       * @return name of the locale this player uses
       */
      getLocale(playerUUID: UUID): string;
      /**
       * Sets the locale this player wants to use
       * @param playerUUID - the player's UUID
       * @param localeName - locale name, e.g., en-US
       */
      setLocale(playerUUID: UUID, localeName: string): void;
      /**
       * Sets if a player is mid-teleport or not
       * @param uniqueId - unique ID
       */
      setInTeleport(inTeleport: UUID);
      /**
       * Removes player from in-teleport
       * @param uniqueId - unique ID
       */
      removeInTeleport(uniqueId: UUID): void;
      /**
       * @param uniqueId - unique ID
       * @return true if a player is mid-teleport
       */
      isInTeleport(uniqueId: UUID): boolean;
      /**
       * Saves the player to the database
       * @param playerUUID - the player's UUID
       */
      save(playerUUID: UUID): void;
      /**
       * Tries to get the user from his name
       * @param name - name
       * @return user - user or null if unknown
       */
      getUser(name: string): User;
      /**
       * Tries to get the user from his UUID
       * @param uuid - UUID
       * @return user - user
       */
      getUser(uuid: UUID): User;
      /**
       * Sets the Flags display mode for the Settings Panel for this player.
       * @param playerUUID player's UUID
       * @param displayMode the {@link Flag.Mode} to set
       * @since 1.6.0
       */
      setFlagsDisplayMode(playerUUID: UUID, displayMode: Mode): void;
      /**
       * Returns the Flags display mode for the Settings Panel for this player.
       * @param playerUUID player's UUID
       * @return the {@link Flag.Mode display mode} for the Flags in the Settings Panel.
       * @since 1.6.0
       */
      getFlagsDisplayMode(playerUUID: UUID): Mode;
   }
   /**
    * @author Poslovitch
    */
   export class HooksManager {
      constructor(plugin: BentoBox);
      registerHook(hook: Hook): void;
      /**
       * Returns the list of successfully registered hooks.
       * @return list of successfully registered hooks.
       */
      getHooks(): Hook[];
      getHook(pluginName: string): Optional<Hook>;
   }
   /**
    * @author tastybento, Poslovitch
    */
   export class LocalesManager {
      constructor(plugin: BentoBox);
      /**
       * Gets the translated String corresponding to the reference from the locale file for this user.
       * @param user the User
       * @param reference a reference that can be found in a locale file
       * @return the translated String from the User's locale or from the server's locale or from the en-US locale, or null.
       */
      get(user: User, reference: string): string | null;
      /**
       * Gets the translated String corresponding to the reference from the locale file for this user.
       * @param user the User
       * @param reference a reference that can be found in a locale file
       * @param defaultText to return if the reference cannot be found anywhere
       * @return the translated String from the User's locale or from the server's locale or from the en-US locale, or null.
       */
      getOrDefault(user: User, reference: string, defaultText: string): string;
      /**
       * Gets the translated String corresponding to the reference from the server's or the en-US locale file.
       * @param reference a reference that can be found in a locale file
       * @return the translated String from the server's locale or from the en-US locale, or null.
       */
      get(reference: string): string | null;
      /**
       * Set the translation for a reference for a specific locale. The locale must be a known locale on this server.
       * User {@link #getAvailableLocales(boolean)} to find out what locales are available.
       * Note, the usual default locale is `Locale.US`
       * @param locale locale
       * @param reference reference
       * @param translation translation
       * @return true if successful, false if the locale is not a known locale on this server
       * @since 1.22.1
       */
      setTranslation(locale: Locale, reference: string, translation: string): boolean;
      /**
       * Gets the translated String corresponding to the reference from the server's or the en-US locale file.
       * or if it cannot be found anywhere, use the default text supplied.
       * @param reference a reference that can be found in a locale file.
       * @param defaultText text to return if the reference cannot be found anywhere.
       * @return the translated String from the server's locale or from the en-US locale, or default.
       */
      getOrDefault(reference: string, defaultText: string): string;
      /**
       * Gets the list of prefixes from the user's locale, the server's locale and the en-US locale file.
       * @param user the user to get the locale, not null.
       * @return the set of prefixes from the user's locale, the server's locale and the en-US locale file.
       * @since 1.13.0
       */
      getAvailablePrefixes(user: User): Set<string>;
      /**
       * Loads all the locales available in the locale folder given. Used for loading all locales from plugin and addons
       *
       * @param localeFolder - locale folder location relative to the plugin's data folder
       */
      loadLocalesFromFile(localeFolder: string): void;
      /**
       * Gets a list of all the locales loaded
       * @param sort - if true, the locales will be sorted by language tag
       * @return list of locales
       */
      getAvailableLocales(sort: boolean): Locale[];
      /**
       * Returns `true` if this locale is available, `false` otherwise.
       * @param locale the locale, not null. Consider using {@link Locale#forLanguageTag(String)} if needed.
       * @return `true` if this locale is available, `false` otherwise.
       * @since 1.14.0
       */
      isLocaleAvailable(locale: Locale): boolean;
      /**
       * @return raw map of system locales to BentoBox locales
       */
      getLanguages(): Map<Locale, BentoBoxLocale>;
      /**
       * Reloads all the language files from the filesystem
       */
      reloadLanguages(): void;
      /**
       * Loads all the locales available in the locale folder given.
       * Used for loading all locales from plugin and addons.
       *
       * @param fix whether or not locale files with missing translations should be fixed.
       *            Not currently supported.
       * @since 1.5.0
       */
      analyzeLocales(fix: boolean): void;
   }
   export class CommandsManager {
      registerCommand(command: CompositeCommand): void;
      /**
       * Unregisters all BentoBox registered commands with Bukkit
       */
      unregisterCommands(): void;
      /**
       * Try to get a registered command.
       * @param command - command string
       * @return CompositeCommand or null if it does not exist
       */
      getCommand(command: string): CompositeCommand | null;
      /**
       * @return the commands
       */
      getCommands(): Map<string, CompositeCommand>;
      /**
       * List all commands registered so far
       * @return set of commands
       */
      listCommands(): Set<string>;
   }
   /**
    * @author Poslovitch
    * @author tastybento
    */
   export class FlagsManager {
      constructor(plugin: BentoBox);
      /**
       * Registers a new flag.
       * Consider using {@link #registerFlag(Addon, Flag)} instead if your flag declares a listener.
       * @param flag flag to be registered
       * @return true if successfully registered, false if not, e.g., because one with the same ID already exists
       * @see #registerFlag(Addon, Flag)
       */
      registerFlag(flag: Flag): boolean;
      /**
       * Registers a new flag.
       * @param addon - addon that is registering this flag
       * @param flag flag to be registered
       * @return true if successfully registered, false if not, e.g., because one with the same ID already exists
       * @since 1.5.0
       */
      registerFlag(addon: Addon | null, flag: Flag): boolean;
      /**
       * Register any unregistered listeners.
       * This helps to make sure each flag listener is correctly loaded.
       */
      registerListeners(): void;
      /**
       * @return list of all flags
       */
      getFlags(): Flag[];
      /**
       * Gets a Flag by providing an ID.
       * @param id Unique ID for this Flag.
       * @return Optional containing the Flag instance or empty.
       * @since 1.1
       */
      getFlag(id: string): Optional<Flag>;
      /**
       * Unregister flags for addon
       * @param addon - addon
       * @since 1.5.0
       */
      unregister(addon: Addon): void;
      /**
       * Unregister a specific flag
       * @param flag - flag
       * @since 1.14.0
       */
      unregister(flag: Flag): void;
   }
   /**
    * Ranks Manager
    * Handles ranks and holds constants for various island ranks
    * @author tastybento
    *
    */
   export class RanksManager {
      static readonly ADMIN_RANK_REF: string;
      static readonly MOD_RANK_REF: string;
      static readonly OWNER_RANK_REF: string;
      static readonly SUB_OWNER_RANK_REF: string;
      static readonly MEMBER_RANK_REF: string;
      static readonly TRUSTED_RANK_REF: string;
      static readonly COOP_RANK_REF: string;
      static readonly VISITOR_RANK_REF: string;
      static readonly BANNED_RANK_REF: string;
      static readonly ADMIN_RANK: number;
      static readonly MOD_RANK: number;
      static readonly OWNER_RANK: number;
      static readonly SUB_OWNER_RANK: number;
      static readonly MEMBER_RANK: number;
      static readonly TRUSTED_RANK: number;
      static readonly COOP_RANK: number;
      static readonly VISITOR_RANK: number;
      static readonly BANNED_RANK: number;
      constructor();
      /**
       * Try to add a new rank. Owner, member, visitor and banned ranks cannot be changed.
       * @param reference - a reference that can be found in a locale file
       * @param value - the rank value
       * @return true if the rank was successfully added
       */
      addRank(reference: string, value: number): boolean;
      /**
       * Try to remove a rank. Owner, member, visitor and banned ranks cannot be removed.
       * @param reference - a reference that can be found in a locale file
       * @return true if removed
       */
      removeRank(reference: string): boolean;
      /**
       * Get the rank value for this reference
       * @param reference - locale reference to the name of this rank
       * @return rank value or zero if this is an unknown rank
       */
      getRankValue(reference: string): number;
      /**
       * Get the ranks. Ranks are listed in ascending order
       * @return immutable map of ranks
       */
      getRanks(): Map<string, number>;
      /**
       * Gets the next rank value above the current rank. Highest is {@link RanksManager#OWNER_RANK}
       * @param currentRank - current rank value
       * @return Optional rank value
       */
      getRankUpValue(currentRank: number): number;
      /**
       * Gets the previous rank value below the current rank. Lowest is {@link RanksManager#VISITOR_RANK}
       * @param currentRank - current rank value
       * @return Optional rank value
       */
      getRankDownValue(currentRank: number): number;
      /**
       * Gets the reference to the rank name for value
       * @param rank - value
       * @return Reference
       */
      getRank(rank: number): string;
   }
   /**
    * The job of this class is manage all island related data.
    * It also handles island ownership, including team, trustees, coops, etc.
    * The data object that it uses is Island
    * @author tastybento
    */
   export class IslandsManager {
      /**
       * Islands Manager
       * @param plugin - plugin
       */
      constructor(plugin: BentoBox);
      /**
       * Used only for testing. Sets the database to a mock database.
       * @param handler - handler
       */
      setHandler(handler: Database<Island>);
      /**
       * Deletes island.
       * @param island island to delete, not null
       * @param removeBlocks whether the island blocks should be removed or not
       * @param involvedPlayer - player related to the island deletion, if any
       */
      deleteIsland(island: Island, removeBlocks: boolean, involvedPlayer: UUID | null): void;
      getIslandCount(): number;
      /**
       * Returns an unmodifiable collection of all existing islands (even those who may be unowned).
       * @return unmodifiable collection containing every island.
       * @since 1.1
       */
      getIslands(): Collection<Island>;
      /**
       * Returns the IslandCache instance.
       * @return the islandCache
       * @since 1.5.0
       */
      getIslandAt(location: Location): Optional<Island>;
      getIsland(world: World, user: User): Optional<Island>;
      getIslandCache(): IslandCache;
      /**
       * Used for testing only to inject the islandCache mock object
       * @param islandCache - island cache
       */
      setIslandCache(islandCache: IslandCache);
      /**
       * Gets the maximum number of island members allowed on this island.
       * Will update the value based on world settings or island owner permissions (if online).
       * If the island is unowned, then this value will be 0.
       * The number given for MEMBER_RANK is meant to include this rank and higher, e.g. {@link RanksManager#SUB_OWNER_RANK}
       * and {@link RanksManager#OWNER_RANK}
       * @param island - island
       * @param rank {@link RanksManager#MEMBER_RANK}, {@link RanksManager#COOP_RANK}, or {@link RanksManager#TRUSTED_RANK}
       * @return max number of members. If negative, then this means unlimited.
       * @since 1.16.0
       */
      getMaxMembers(island: Island, rank: number): number;
      /**
       * Sets the island max member size.
       * @param island - island
       * @param rank {@link RanksManager#MEMBER_RANK}, {@link RanksManager#COOP_RANK}, or {@link RanksManager#TRUSTED_RANK}
       * @param maxMembers - max number of members. If negative, then this means unlimited. Null means the world
       * default will be used.
       * @since 1.16.0
       */
      setMaxMembers(island: Island, rank: number, maxMembers: number): void;
      /**
       * Get the maximum number of homes allowed on this island. Will be updated with the owner's permission settings if
       * they exist and the owner is online
       * @param island - island
       * @return maximum number of homes
       * @since 1.16.0
       */
      getMaxHomes(island: Island): number;
      /**
       * Set the maximum numbber of homes allowed on this island
       * @param island - island
       * @param maxHomes - max number of homes allowed, or null if the world default should be used
       * @since 1.16.0
       */
      setMaxHomes(island: Island, maxHomes: number | null): void;
      /**
       * Remove the named home location from this island
       * @param island - island
       * @param name - name of home, or blank for default
       * @return true if successful, false if not
       * @since 1.16.0
       */
      removeHomeLocation(island: Island, name: string): boolean;
      /**
       * Rename a home
       * @param island - island
       * @param oldName - old name
       * @param newName - new name
       * @return true if successful, false if not
       */
      renameHomeLocation(island: Island, oldName: string, newName: string): boolean;
      /**
       * Check if a home name exists or not
       * @param island - island
       * @param name - name being checked
       * @return true if it exists or not
       */
      isHomeLocation(island: Island, name: string): boolean;
      /**
       * Get the number of homes on this island if this home were added
       * @param island - island
       * @param name - name
       * @return number of homes after adding this one
       */
      getNumberOfHomesIfAdded(island: Island, name: string): number;
      /**
       * Sets an Island to be the spawn of its World. It will become an unowned Island.
       *
       * If there was already a spawn set for this World, it will no longer be the spawn but it will remain unowned.
       * @param spawn the Island to set as spawn.
       *              Must not be null.
       */
      setSpawn(spawn: Island);
      /**
       * Clear and reload all islands from database
       * @throws IOException  - if a loaded island distance does not match the expected distance in config.yml
       */
      load(): void;
      /**
       * This teleports players away from an island - used when reseting or deleting an island
       * @param island to remove players from
       */
      removePlayersFromIsland(island: Island): void;
      isSaveTaskRunning(): boolean;
      /**
       * Save the all the islands to the database
       */
      saveAll(): void;
      /**
       * Save the all the islands to the database
       * @param schedule true if we should let the task run over multiple ticks to reduce lag spikes
       */
      saveAll(schedule: boolean): void;
      /**
       * Puts a player in a team. Removes them from their old island if required.
       * @param teamIsland - team island
       * @param playerUUID - the player's UUID
       */
      setJoinTeam(teamIsland: Island, playerUUID: UUID): void;
      shutdown(): void;
      /**
       * Sets this target as the owner for this island
       * @param user requester
       * @param targetUUID new owner
       * @param island island to register
       */
      setOwner(user: User, targetUUID: UUID, island: Island): void;
      /**
       * Removes a player from any island where they hold the indicated rank.
       * Typically this is to remove temporary ranks such as coop.
       * Removal is done in all worlds.
       * @param rank - rank to clear
       * @param uniqueId - UUID of player
       */
      clearRank(rank: number, uniqueId: UUID): void;
      /**
       * Save the island to the database
       * @param island - island
       */
      save(island: Island): void;
      /**
       * Try to get an island by its unique id
       * @param uniqueId - unique id string
       * @return optional island
       * @since 1.3.0
       */
      getIslandById(uniqueId: string): Optional<Island>;
      /**
       * @return the quarantineCache
       * @since 1.3.0
       */
      getQuarantineCache(): Map<UUID, Island[]>;
      /**
       * Remove a quarantined island and delete it from the database completely.
       * This is NOT recoverable unless you have database backups.
       * @param island island
       * @return `true` if island is quarantined and removed
       * @since 1.3.0
       */
      purgeQuarantinedIsland(island: Island): boolean;
      /**
       * Is user mid home teleport?
       * @return true or false
       */
      isGoingHome(user: User): boolean;
   }
   /**
    * Handles web-related stuff.
    * Should be instantiated after all addons are loaded.
    * @author Poslovitch
    * @since 1.3.0
    */
   export class WebManager {
      constructor(plugin: BentoBox);
      requestGitHubData(): void;
      /**
       * Returns the contents of the addons catalog (may be an empty list).
       * @return the contents of the addons catalog.
       * @since 1.5.0
       */
      getAddonsCatalog(): CatalogEntry[];
      /**
       * Returns the contents of the gamemodes catalog (may be an empty list).
       * @return the contents of the gamemodes catalog.
       * @since 1.5.0
       */
      getGamemodesCatalog(): CatalogEntry[];
      /**
       *
       * @param repository - name of the repo
       * @return list of contributors
       * @since 1.9.0
       */
      getContributors(repository: string): Contributor[];
   }
   /**
    * Handles Blueprints
    *
    * @author Poslovitch, tastybento
    * @since 1.5.0
    */
   export class BlueprintsManager {
      static readonly BLUEPRINT_SUFFIX: string;
      static readonly DEFAULT_BUNDLE_NAME: string;
      static readonly FOLDER_NAME: string;
      constructor(plugin: BentoBox);
      /**
       * Extracts the blueprints and bundles provided by this {@link GameModeAddon} in its .jar file.
       * This will do nothing if the blueprints folder already exists for this GameModeAddon.
       *
       * @param addon the {@link GameModeAddon} to extract the blueprints from.
       */
      extractDefaultBlueprints(addon: GameModeAddon): void;
      /**
       * Get the blueprint bundles of this addon.
       *
       * @param addon the {@link GameModeAddon} to get the blueprint bundles.
       */
      getBlueprintBundles(addon: GameModeAddon): Map<string, BlueprintBundle>;
      /**
       * Get the default blueprint bundle for game mode
       * @param addon - game mode addon
       * @return the default blueprint bundle or null if none
       * @since 1.8.0
       */
      getDefaultBlueprintBundle(addon: GameModeAddon): BlueprintBundle | null;
      /**
       * Loads the blueprint bundles of this addon from its blueprints folder.
       *
       * @param addon the {@link GameModeAddon} to load the blueprints of.
       */
      loadBlueprintBundles(addon: GameModeAddon): void;
      /**
       * Check if all blueprints are loaded. Only query after all GameModes have been loaded.
       * @return true if all blueprints are loaded
       */
      isBlueprintsLoaded(): boolean;
      /**
       * Loads all the blueprints of this addon from its blueprints folder.
       *
       * @param addon the {@link GameModeAddon} to load the blueprints of.
       */
      loadBlueprints(addon: GameModeAddon): void;
      /**
       * Adds a blueprint to addon's list of blueprints. If the list already contains a blueprint with the same name
       * it is replaced.
       *
       * @param addon - the {@link GameModeAddon}
       * @param bp    - blueprint
       */
      addBlueprint(addon: GameModeAddon, bp: Blueprint): void;
      /**
       * Saves a blueprint into addon's blueprint folder
       *
       * @param addon - the {@link GameModeAddon}
       * @param bp    - blueprint to save
       */
      saveBlueprint(addon: GameModeAddon, bp: Blueprint): boolean;
      /**
       * Save blueprint bundle for game mode
       *
       * @param addon - gamemode addon
       * @param bb    blueprint bundle to save
       */
      saveBlueprintBundle(addon: GameModeAddon, bb: BlueprintBundle): void;
      /**
       * Saves all the blueprint bundles
       */
      saveBlueprintBundles(): void;
      /**
       * Get blueprints for this game mode
       *
       * @param addon - game mode addon
       * @return Map of name and blueprint or empty map
       */
      getBlueprints(addon: GameModeAddon): Map<string, Blueprint>;
      /**
       * Unregisters the Blueprint from the manager and deletes the file.
       * @param addon game mode addon
       * @param name name of the Blueprint to delete
       * @since 1.9.0
       */
      deleteBlueprint(addon: GameModeAddon, name: string): void;
      /**
       * Paste the islands to world
       *
       * @param addon  - GameModeAddon
       * @param island - island
       * @param name   - bundle name
       */
      paste(addon: GameModeAddon, island: Island, name: string): void;
      /**
       * Paste islands to the world and run task afterwards
       *
       * @param addon  - the game mode addon
       * @param island - the island
       * @param name   - name of bundle to paste
       * @param task   - task to run after pasting is completed
       * @return true if okay, false is there is a problem
       */
      paste(addon: GameModeAddon, island: Island, name: string, task: Runnable): boolean;
      /**
       * Validate if the bundle name is valid or not
       *
       * @param addon - game mode addon
       * @param name  - bundle name
       * @return bundle name or null if it's invalid
       */
      validate(addon: GameModeAddon, name: string): string | null;
      /**
       * Adds a blueprint bundle. If a bundle with the same uniqueId exists, it will be replaced
       *
       * @param addon - the game mode addon
       * @param bb    - the blueprint bundle
       */
      addBlueprintBundle(addon: GameModeAddon, bb: BlueprintBundle): void;
      /**
       * Checks if a player has permission to see or use this blueprint bundle.
       *
       * @param addon - addon making the request
       * @param user  - user making the request
       * @param name  - name of the blueprint bundle
       * @return true if allowed, false if not or bundle does not exist
       */
      checkPerm(addon: Addon, user: User, name: string): boolean;
      /**
       * Removes a blueprint bundle
       *
       * @param addon - Game Mode Addon
       * @param bb    - Blueprint Bundle to delete
       */
      deleteBlueprintBundle(addon: GameModeAddon, bb: BlueprintBundle): void;
      /**
       * Rename a blueprint
       *
       * @param addon - Game Mode Addon
       * @param bp    - blueprint
       * @param name  - new name
       * @param displayName - display name for blueprint
       */
      renameBlueprint(addon: GameModeAddon, bp: Blueprint, name: string, displayName: string): void;
   }
   /**
    * @author tastybento, ComminQ
    */
   export class AddonsManager {
      constructor(plugin: BentoBox);
      /**
       * Loads all the addons from the addons folder
       */
      loadAddons(): void;
      /**
       * Enables all the addons
       */
      enableAddons(): void;
      /**
       * Reloads all the enabled addons
       */
      reloadAddons(): void;
      /**
       * Disable all the enabled addons
       */
      disableAddons(): void;
      /**
       * Gets the addon by name
       * @param name addon name, not null
       * @return Optional addon object
       */
      getAddonByName<T>(name: string): Optional<T>;
      /**
       * Gets the addon by main class name
       * @param name - main class name
       * @return Optional addon object
       */
      getAddonByMainClassName<T>(name: string): Optional<T>;
      getAddons(): Addon[];
      /**
       * @return List of enabled game mode addons
       * @since 1.1
       */
      getGameModeAddons(): GameModeAddon[];
      /**
       * Gets an unmodifiable list of Addons that are loaded.
       * @return list of loaded Addons.
       * @since 1.1
       */
      getLoadedAddons(): Addon[];
      /**
       * Gets an unmodifiable list of Addons that are enabled.
       * @return list of enabled Addons.
       * @since 1.1
       */
      getEnabledAddons(): Addon[];
      getLoader(addon: Addon): AddonClassLoader | null;
      /**
       * Finds a class by name that has been loaded by this loader
       * @param name name of the class, not null
       * @return Class the class or null if not found
       */
      getClassByName(name: string): Class<any> | null;
      /**
       * Sets a class that this loader should know about
       *
       * @param name name of the class, not null
       * @param clazz the class, not null
       */
      setClass(name: string, clazz: Class<any>): void;
      getDataObjects(): Class<any>[];
      /**
       * Notifies all addons that BentoBox has loaded all addons
       * @since 1.8.0
       */
      allLoaded(): void;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintClipboardManager {
      constructor(plugin: BentoBox, blueprintFolder: File);
      constructor(plugin: BentoBox, blueprintFolder: File, clipboard: BlueprintClipboard);
      /**
       * @return the clipboard
       */
      getClipboard(): BlueprintClipboard;
      /**
       * Load a file to clipboard
       * @param fileName - filename in blueprints folder
       * @throws IOException - if there's a load error with unzipping or name
       */
      load(fileName: string): void;
      /**
       * Loads a blueprint
       * @param fileName - the sanitized filename without the suffix
       * @return the blueprint
       * @throws IOException exception if there's an issue loading or unzipping
       */
      loadBlueprint(fileName: string): Blueprint;
      /**
       * Load a blueprint to the clipboard for a user
       * @param user - user trying to load
       * @param fileName - filename
       * @return - true if load is successful, false if not
       */
      load(user: User, fileName: string): boolean;
      /**
       * Save the clipboard to a file
       * @param user - user who is copying
       * @param newName - new name of this blueprint
       * @return - true if successful, false if error
       */
      save(user: User, newName: string, displayName: string): boolean;
      /**
       * Save a blueprint
       * @param blueprint - blueprint
       * @return true if successful, false if not
       */
      saveBlueprint(blueprint: Blueprint): boolean;
   }
   /**
    * Manages placeholder integration.
    *
    * @author Poslovitch
    */
   export class PlaceholdersManager {
      constructor(plugin: BentoBox);
      /**
       * Registers this placeholder on the behalf of BentoBox.
       * @param placeholder the placeholder to register, not null.
       *                    It will be appended with `"bentobox_"` by the placeholder plugin.
       * @param replacer the expression that will return a `String` when executed, which will be this placeholder's replacement.
       */
      registerPlaceholder(placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * Registers this placeholder on the behalf of the specified addon.
       * @param addon the addon to register this placeholder on its behalf.
       *              If null, the placeholder will be registered using {@link #registerPlaceholder(String, PlaceholderReplacer)}.
       * @param placeholder the placeholder to register, not null.
       *                    It will be appended with the addon's name by the placeholder plugin.
       * @param replacer the expression that will return a `String` when executed, which will replace the placeholder.
       */
      registerPlaceholder(addon: Addon | null, placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * Registers default placeholders for this gamemode addon.
       * @param addon the gamemode addon to register the default placeholders too.
       * @since 1.5.0
       */
      registerDefaultPlaceholders(addon: GameModeAddon): void;
      /**
       * Unregisters this placeholder on the behalf of BentoBox.
       * Note that if the placeholder you are trying to unregister has been registered by an addon, you should use {@link #unregisterPlaceholder(Addon, String)} instead.
       * @param placeholder the placeholder to unregister, not null.
       * @since 1.4.0
       */
      unregisterPlaceholder(placeholder: string): void;
      /**
       * Unregisters this placeholder on the behalf of the specified addon.
       * @param addon the addon that originally registered this placeholder.
       *              If null, this placeholder will be unregistered using {@link #unregisterPlaceholder(String)}.
       * @param placeholder the placeholder to unregister, not null.
       * @since 1.4.0
       */
      unregisterPlaceholder(addon: Addon | null, placeholder: string): void;
      /**
       * Checks if a placeholder with this name is already registered
       * @param addon the addon, not null
       * @param placeholder - name of placeholder
       * @return `true` if a placeholder with this name is already registered
       * @since 1.4.0
       */
      isPlaceholder(addon: Addon, placeholder: string): boolean;
      /**
       * Unregisters all the placeholders.
       * @since 1.15.0
       */
      unregisterAll(): void;
   }
   /**
    * Manages the queue of island chunks to be deleted.
    */
   export class IslandChunkDeletionManager extends Runnable {
      constructor(plugin: BentoBox);
      run(): void;
      /**
       * Adds an island deletion to the queue.
       *
       * @param islandDeletion island deletion
       */
      add(islandDeletion: IslandDeletion): void;
   }
}
declare module 'world.bentobox.bentobox.web.catalog' {
   /**
    * @author Poslovitch
    * @since 1.5.0
    */
   export class CatalogEntry {
      getSlot(): number;
      getName(): string;
      getDescription(): string;
      getTopic(): string | null;
      getTag(): string | null;
      getRepository(): string;
   }
}
declare module 'world.bentobox.bentobox.blueprints.dataobjects' {
   import { List } from 'java.util';
   import { DataObject } from 'world.bentobox.bentobox.database.objects';
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintEntity {
      /**
       * @return the customName
       */
      getCustomName(): string;
      /**
       * @param customName the customName to set
       */
      setCustomName(customName: string);
      /**
       * @return the tamed
       */
      getTamed(): boolean;
      /**
       * @param tamed the tamed to set
       */
      setTamed(tamed: boolean): void;
      /**
       * @return the chest
       */
      getChest(): boolean;
      /**
       * @param chest the chest to set
       */
      setChest(chest: boolean): void;
      /**
       * @return the adult
       */
      getAdult(): boolean;
      /**
       * @param adult the adult to set
       */
      setAdult(adult: boolean): void;
      /**
       * @return the domestication
       */
      getDomestication(): number;
      /**
       * @param domestication the domestication to set
       */
      setDomestication(domestication: number);
      /**
       * @return the level
       */
      getLevel(): number;
      /**
       * @param level the level to set
       */
      setLevel(level: number);
      /**
       * @return the experience
       */
      getExperience(): number;
      /**
       * @param experience the experience to set
       */
      setExperience(experience: number);
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintBlock {
      constructor(blockData: string);
      /**
       * @return the blockData
       */
      getBlockData(): string;
      /**
       * @param blockData the blockData to set
       */
      setBlockData(blockData: string);
      /**
       * @return the signLines
       */
      getSignLines(): string[];
      /**
       * @param signLines the signLines to set
       */
      setSignLines(signLines: string[]);
      /**
       * @return the creatureSpawner
       */
      getCreatureSpawner(): BlueprintCreatureSpawner;
      /**
       * @param creatureSpawner the creatureSpawner to set
       */
      setCreatureSpawner(creatureSpawner: BlueprintCreatureSpawner);
      /**
       * @return the glowingText
       */
      isGlowingText(): boolean;
      /**
       * @param glowingText the glowingText to set
       */
      setGlowingText(glowingText: boolean): void;
   }
   /**
    * Represents a bundle of three {@link Blueprint}s.
    * This is what the player will choose when creating his island.
    * @since 1.5.0
    * @author Poslovitch, tastybento
    */
   export class BlueprintBundle extends DataObject {
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      /**
       * @return the displayName
       */
      getDisplayName(): string;
      /**
       * @param displayName the displayName to set
       */
      setDisplayName(displayName: string);
      /**
       * @return the description
       */
      getDescription(): string[];
      /**
       * @param description the description to set
       */
      setDescription(description: string[]): void;
      /**
       * Adds a line to the description
       *
       * @param string description
       */
      setDescription(description: string): void;
      /**
       * @return the requirePermission
       */
      isRequirePermission(): boolean;
      /**
       * @param requirePermission the requirePermission to set
       */
      setRequirePermission(requirePermission: boolean): void;
      /**
       * @return the slot
       */
      getSlot(): number;
      /**
       * @param slot the slot to set
       */
      setSlot(slot: number);
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintCreatureSpawner {
      /**
       * @return the delay
       */
      getDelay(): number;
      /**
       * @param delay the delay to set
       */
      setDelay(delay: number);
      /**
       * @return the maxNearbyEntities
       */
      getMaxNearbyEntities(): number;
      /**
       * @param maxNearbyEntities the maxNearbyEntities to set
       */
      setMaxNearbyEntities(maxNearbyEntities: number);
      /**
       * @return the maxSpawnDelay
       */
      getMaxSpawnDelay(): number;
      /**
       * @param maxSpawnDelay the maxSpawnDelay to set
       */
      setMaxSpawnDelay(maxSpawnDelay: number);
      /**
       * @return the minSpawnDelay
       */
      getMinSpawnDelay(): number;
      /**
       * @param minSpawnDelay the minSpawnDelay to set
       */
      setMinSpawnDelay(minSpawnDelay: number);
      /**
       * @return the requiredPlayerRange
       */
      getRequiredPlayerRange(): number;
      /**
       * @param requiredPlayerRange the requiredPlayerRange to set
       */
      setRequiredPlayerRange(requiredPlayerRange: number);
      /**
       * @return the spawnRange
       */
      getSpawnRange(): number;
      /**
       * @param spawnRange the spawnRange to set
       */
      setSpawnRange(spawnRange: number);
   }
}
declare module 'world.bentobox.bentobox.managers.island.NewIsland' {
   import { Reason } from 'world.bentobox.bentobox.api.events.island.IslandEvent';
   import { GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { NewIslandLocationStrategy } from 'world.bentobox.bentobox.managers.island';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   /**
    * Build a new island for a player
    * @author tastybento
    */
   export class Builder {
      oldIsland(oldIsland: Island): Builder;
      player(player: User): Builder;
      /**
       * Sets the reason
       * @param reason reason, can only be {@link Reason#CREATE} or {@link Reason#RESET}.
       */
      reason(reason: Reason): Builder;
      /**
       * Set the addon
       * @param addon a game mode addon
       */
      addon(addon: GameModeAddon): Builder;
      /**
       * No blocks will be pasted
       */
      noPaste(): Builder;
      /**
       * @param name - name of Blueprint bundle
       */
      name(name: string): Builder;
      /**
       * @param strategy - the location strategy to use
       * @since 1.8.0
       */
      locationStrategy(strategy: NewIslandLocationStrategy): Builder;
      /**
       * @return Island
       * @throws IOException - if there are insufficient parameters, i.e., no user
       */
      build(): Island;
   }
}
declare module 'world.bentobox.bentobox.listeners.flags.clicklisteners' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { List } from 'java.util';
   import { Tab, PanelItem } from 'world.bentobox.bentobox.api.panels';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { EntityLimitTabType } from 'world.bentobox.bentobox.listeners.flags.clicklisteners.GeoMobLimitTab';
   import { User } from 'world.bentobox.bentobox.api.user';
   /**
    * @author tastybento
    *
    */
   export class CommandRankClickListener extends ClickHandler {}
   /**
    * Provide geo limiting to mobs - removed them if they go outside island bounds
    * @author tastybento
    *
    */
   export class GeoLimitClickListener extends ClickHandler {}
   /**
    * Provide limiting of mob types globally
    * @author tastybento
    *
    */
   export class MobLimitClickListener extends ClickHandler {}
   /**
    * Provides a tab GUI for viewing geo-limited mobs
    * @author tastybento
    *
    */
   export class GeoMobLimitTab extends Tab {
      getIcon(): PanelItem;
      /**
       * @return the name of this tab
       */
      getName(): string;
      /**
       * Return an immutable list of the panel items for this tab
       * @return a list of items in slot order
       */
      getPanelItems(): PanelItem[];
      /**
       * @return the permission required to view this tab or empty if no permission required
       */
      getPermission(): string;
   }
   export interface GeoMobLimitTab extends Tab, ClickHandler {}
   /**
    * @author tastybento
    *
    */
   export class CommandCycleClick extends ClickHandler {
      constructor(commandRankClickListener: CommandRankClickListener, c: string);
   }
}
declare module 'world.bentobox.bentobox.listeners.flags.clicklisteners.GeoMobLimitTab' {
   import { Enum } from 'java.lang';
   export class EntityLimitTabType extends Enum<EntityLimitTabType> {
      static readonly GEO_LIMIT: EntityLimitTabType;
      static readonly MOB_LIMIT: EntityLimitTabType;
      static valueOf(name: string): EntityLimitTabType;
      static values(): EntityLimitTabType[];
   }
}
declare module 'world.bentobox.bentobox.database.mongodb' {
   import { Class } from 'java.lang';
   import { Set, List } from 'java.util';
   import { AbstractJSONDatabaseHandler } from 'world.bentobox.bentobox.database.json';
   import {
      AbstractDatabaseHandler,
      DatabaseConnector,
      DatabaseConnectionSettingsImpl,
      DatabaseSetup
   } from 'world.bentobox.bentobox.database';
   import { CompletableFuture } from 'java.util.concurrent';
   import { MongoClient } from 'com.mongodb';
   import { Document } from 'org.bson';
   import { MongoCollection, MongoDatabase } from 'com.mongodb.client';
   export class MongoDBDatabaseConnector extends DatabaseConnector {
      /**
       * Establishes a new connection to the database
       *
       * @param type of class
       * @return A new connection to the database using the settings provided
       */
      createConnection(type: Class<any>): MongoDatabase;
      /**
       * Returns the connection url
       *
       * @return the connector's URL
       */
      getConnectionUrl(): string;
      /**
       * Looks through the database (or files) and returns a known unique key
       *
       * @param tableName - name of the table
       * @return a unique key for this record
       */
      getUniqueId(tableName: string): string;
      /**
       * Check if a key exists in the database in this table or not
       *
       * @param tableName - name of the table
       * @param key       - key to check
       * @return true if it exists
       */
      uniqueIdExists(tableName: string, key: string): boolean;
      /**
       * Close the database connection
       * @param type of class being closed
       */
      closeConnection(type: Class<any>): void;
   }
   /**
    *
    * Class that inserts a  into the corresponding database-table.
    *
    * @author tastybento
    *
    * @param
    */
   export class MongoDBDatabaseHandler<T> extends AbstractJSONDatabaseHandler<T> {
      loadObjects(): T[];
      loadObject(uniqueId: string): T;
      saveObject(instance: T): CompletableFuture<boolean>;
      deleteID(uniqueId: string): void;
      deleteObject(instance: T): void;
      objectExists(uniqueId: string): boolean;
      close(): void;
   }
   export class MongoDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
}
declare module 'world.bentobox.bentobox.database.sql.mariadb' {
   import { Class } from 'java.lang';
   import { AbstractDatabaseHandler, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { HikariConfig } from 'com.zaxxer.hikari';
   import { SQLDatabaseConnector, SQLDatabaseHandler } from 'world.bentobox.bentobox.database.sql';
   /**
    *
    * Class that inserts a  into the corresponding database-table.
    *
    * @author tastybento, barpec12
    *
    * @param
    */
   export class MariaDBDatabaseHandler<T> extends SQLDatabaseHandler<T> {}
   /**
    * @author barpec12
    * @since 1.1
    */
   export class MariaDBDatabaseConnector extends SQLDatabaseConnector {
      /**
       * {@inheritDoc}
       */
      createConfig(): HikariConfig;
   }
   /**
    * @author barpec12
    * @since 1.1
    */
   export class MariaDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
}
declare module 'world.bentobox.bentobox.database.objects' {
   import { LogEntry } from 'world.bentobox.bentobox.api.logs';
   import { MetaDataValue, MetaDataAble } from 'world.bentobox.bentobox.api.metadata';
   import { Set, Optional, List, UUID, Map } from 'java.util';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Pair } from 'world.bentobox.bentobox.util';
   import { Mode } from 'world.bentobox.bentobox.api.flags.Flag';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   /**
    * Stores player names and uuid's
    * @author tastybento
    *
    */
   export class Names extends DataObject {
      constructor();
      constructor(name: string, uuid: UUID);
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      /**
       * @return the uuid
       */
      getUuid(): UUID;
      /**
       * @param uuid the uuid to set
       */
      setUuid(uuid: UUID);
   }
   /**
    * Contains fields that must be in any data object
    * DataObject's canonical name must be no more than 62 characters long otherwise it may not fit in a database table name
    * @author tastybento
    *
    */
   export class DataObject {
      getPlugin(): BentoBox;
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
   }
   /**
    * Record for bonus ranges
    * @author tastybento
    */
   export class BonusRangeRecord {
      /**
       * @param uniqueId an id to identify this bonus
       * @param range the additional bonus range
       * @param message the reference key to a locale message related to this bonus. May be blank.
       */
      constructor(uniqueId: string, range: number, message: string);
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      /**
       * @return the range
       */
      getRange(): number;
      /**
       * @param range the range to set
       */
      setRange(range: number);
      /**
       * @return the message
       */
      getMessage(): string;
      /**
       * @param message the message to set
       */
      setMessage(message: string);
   }
   /**
    * Data object to store islands in deletion
    * @author tastybento
    * @since 1.1
    */
   export class IslandDeletion extends DataObject {
      constructor();
      constructor(island: Island);
      equals(obj: any): boolean;
      /**
       * @return the maxXChunk
       */
      getMaxXChunk(): number;
      /**
       * @return the maxZChunk
       */
      getMaxZChunk(): number;
      /**
       * @return the minXChunk
       */
      getMinXChunk(): number;
      /**
       * @return the minZChunk
       */
      getMinZChunk(): number;
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      hashCode(): number;
      /**
       * @param maxXChunk the maxXChunk to set
       */
      setMaxXChunk(maxXChunk: number);
      /**
       * @param maxZChunk the maxZChunk to set
       */
      setMaxZChunk(maxZChunk: number);
      /**
       * @param minXChunk the minXChunk to set
       */
      setMinXChunk(minXChunk: number);
      /**
       * @param minZChunk the minZChunk to set
       */
      setMinZChunk(minZChunk: number);
      getMinX(): number;
      setMinX(minX: number);
      getMinZ(): number;
      setMinZ(minZ: number);
      getMaxX(): number;
      setMaxX(maxX: number);
      getMaxZ(): number;
      setMaxZ(maxZ: number);
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      inBounds(x: number, z: number): boolean;
      toString(): string;
   }
   /**
    * Tracks the following info on the player
    *
    * @author tastybento
    */
   export class Players extends DataObject {
      /**
       * This is required for database storage
       */
      constructor();
      /**
       * @param plugin - plugin object
       * @param uniqueId - unique ID
       *            Constructor - initializes the state variables
       *
       */
      constructor(plugin: BentoBox, uniqueId: UUID);
      /**
       * @param playerName the playerName to set
       */
      setPlayerName(playerName: string);
      getPlayerUUID(): UUID;
      getPlayerName(): string;
      /**
       * @return the resets
       */
      getResets(): Map<string, number>;
      /**
       * @param resets the resets to set
       */
      setResets(resets: Map<string, number>);
      /**
       * Set the uuid for this player object
       * @param uuid - UUID
       */
      setPlayerUUID(playerUUID: UUID);
      /**
       * @return the locale
       */
      getLocale(): string;
      /**
       * @param locale the locale to set
       */
      setLocale(locale: string);
      /**
       * @return the deaths
       */
      getDeaths(): Map<string, number>;
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      /**
       * @param deaths the deaths to set
       */
      setDeaths(deaths: Map<string, number>);
      /**
       * Returns the pendingKicks value.
       * @return the value of pendingKicks.
       * @since 1.3.0
       */
      getPendingKicks(): Set<string>;
      /**
       * Sets the pendingKicks value.
       * @param pendingKicks the pendingKicks new value.
       * @since 1.3.0
       */
      setPendingKicks(pendingKicks: Set<string>);
      /**
       * Returns the display mode for the Flags in the Settings Panel.
       * @return the display mode for the Flags in the Settings Panel.
       * @since 1.6.0
       */
      getFlagsDisplayMode(): Mode;
      /**
       * Sets the display mode for the Flags in the Settings Panel.
       * @param flagsDisplayMode the display mode for the Flags in the Settings Panel.
       * @since 1.6.0
       */
      setFlagsDisplayMode(flagsDisplayMode: Mode);
      /**
       * @return the metaData
       * @since 1.15.5
       * @see User#getMetaData()
       */
      getMetaData(): Optional<Map<string, MetaDataValue>>;
      /**
       * @param metaData the metaData to set
       * @since 1.15.4
       * @see User#setMetaData(Map)
       */
      setMetaData(metaData: Map<string, MetaDataValue>);
   }
   export interface Players extends DataObject, MetaDataAble {}
   /**
    * Stores all the info about an island
    * Managed by IslandsManager
    * Responsible for team information as well.
    *
    * @author tastybento
    * @author Poslovitch
    */
   export class Island extends DataObject {
      constructor();
      /**
       * Clones an island object
       * @param island - island to clone
       */
      constructor(island: Island);
      /**
       * Adds a team member. If player is on banned list, they will be removed from it.
       * @param playerUUID - the player's UUID
       */
      addMember(playerUUID: UUID): void;
      /**
       * Bans the target player from this Island.
       * If the player is a member, coop or trustee, they will be removed from those lists.
       *
       * Calling this method won't call the {@link world.bentobox.bentobox.api.events.island.IslandBanEvent}.
       * @param issuer UUID of the issuer, may be null.
       *               Whenever possible, one should be provided.
       * @param target UUID of the target, must be provided.
       * @return `true`
       */
      ban(issuer: UUID, target: UUID): boolean;
      /**
       * @return the banned
       */
      getBanned(): Set<UUID>;
      /**
       * Unbans the target player from this Island.
       *
       * Calling this method won't call the {@link world.bentobox.bentobox.api.events.island.IslandUnbanEvent}.
       * @param issuer UUID of the issuer, may be null.
       *               Whenever possible, one should be provided.
       * @param target UUID of the target, must be provided.
       * @return `true` if the target is successfully unbanned, `false` otherwise.
       */
      unban(issuer: UUID, target: UUID): boolean;
      /**
       * @return the date when the island was created
       */
      getCreatedDate(): number;
      /**
       * Gets the Island Guard flag's setting. If this is a protection flag, then this will be the
       * rank needed to bypass this flag. If it is a Settings flag, any non-zero value means the
       * setting is allowed.
       * @param flag - flag
       * @return flag value
       */
      getFlag(flag: Flag): number;
      /**
       * @return the flags
       */
      getFlags(): Map<string, number>;
      /**
       * Returns the members of this island.
       * It contains all players that have any rank on this island, including {@link RanksManager#BANNED_RANK BANNED},
       * {@link RanksManager#TRUSTED_RANK TRUSTED}, {@link RanksManager#MEMBER_RANK MEMBER}, {@link RanksManager#SUB_OWNER_RANK SUB_OWNER},
       * {@link RanksManager#OWNER_RANK OWNER}, etc.
       *
       * @return the members - key is the UUID, value is the RanksManager enum, e.g. {@link RanksManager#MEMBER_RANK}.
       * @see #getMemberSet()
       */
      getMembers(): Map<UUID, number>;
      /**
       * Get the minimum protected X block coordinate based on the island location.
       * It will never be less than {@link #getMinX()}
       * @return the minProtectedX
       */
      getMinProtectedX(): number;
      /**
       * Get the maximum protected X block coordinate based on the island location.
       * It will never be more than {@link #getMaxX()}
       * @return the maxProtectedX
       * @since 1.5.2
       */
      getMaxProtectedX(): number;
      /**
       * Get the minimum protected Z block coordinate based on the island location.
       * It will never be less than {@link #getMinZ()}
       * @return the minProtectedZ
       */
      getMinProtectedZ(): number;
      /**
       * Get the maximum protected Z block coordinate based on the island location.
       * It will never be more than {@link #getMinZ()}
       * @return the maxProtectedZ
       * @since 1.5.2
       */
      getMaxProtectedZ(): number;
      /**
       * @return the minX
       */
      getMinX(): number;
      /**
       * @return the maxX
       * @since 1.5.2
       */
      getMaxX(): number;
      /**
       * @return the minZ
       */
      getMinZ(): number;
      /**
       * @return the maxZ
       * @since 1.5.2
       */
      getMaxZ(): number;
      /**
       * @return the island display name. Might be `null` if none is set.
       */
      getName(): string | null;
      /**
       * Returns the owner of this island.
       * @return the owner, may be null.
       * @see #isOwned()
       * @see #isUnowned()
       */
      getOwner(): UUID | null;
      /**
       * Returns whether this island is owned or not.
       * @return `true` if this island has an owner, `false` otherwise.
       * @since 1.9.1
       * @see #getOwner()
       * @see #isUnowned()
       */
      isOwned(): boolean;
      /**
       * Returns whether this island does not have an owner.
       * @return `true` if this island does not have an owner, `false` otherwise.
       * @since 1.9.1
       * @see #getOwner()
       * @see #isOwned()
       */
      isUnowned(): boolean;
      /**
       * Returns the protection range of this Island plus any bonuses. Will not be greater than getRange().
       * This represents half of the length of the side of a theoretical square around the island center inside which flags are enforced.
       * @return the protection range of this island, strictly positive integer.
       * @see #getRange()
       */
      getProtectionRange(): number;
      /**
       * Returns the protection range of this Island without any bonuses
       * This represents half of the length of the side of a theoretical square around the island center inside which flags are enforced.
       * @return the protection range of this island, strictly positive integer.
       * @since 1.20.0
       */
      getRawProtectionRange(): number;
      /**
       * @return the maxEverProtectionRange or the protection range, whichever is larger
       */
      getMaxEverProtectionRange(): number;
      /**
       * Sets the maximum protection range. This can be used to optimize
       * island deletion. Setting this values to a lower value than the current value
       * will have no effect.
       * @param maxEverProtectionRange the maxEverProtectionRange to set
       */
      setMaxEverProtectionRange(maxEverProtectionRange: number);
      /**
       * @return true if the island is protected from the Purge, otherwise false
       */
      getPurgeProtected(): boolean;
      /**
       * Returns the island range.
       * It is a convenience method that returns the exact same value than island range, although it has been saved into the Island object for easier access.
       * @return the island range
       * @see #getProtectionRange()
       */
      getRange(): number;
      /**
       * Get the rank of user for this island
       * @param user - the User
       * @return rank integer
       */
      getRank(user: User): number;
      /**
       * Get the rank of user for this island
       * @param userUUID - the User's UUID
       * @return rank integer
       * @since 1.14.0
       */
      getRank(userUUID: UUID): number;
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @return the date when the island was updated (team member connection, etc...)
       */
      getUpdatedDate(): number;
      /**
       * @return the x coordinate of the island center
       */
      getX(): number;
      /**
       * @return the y coordinate of the island center
       */
      getY(): number;
      /**
       * @return the z coordinate of the island center
       */
      getZ(): number;
      /**
       * Checks if coords are in the island space
       * @param x - x coordinate
       * @param z - z coordinate
       * @return true if in the island space
       */
      inIslandSpace(x: number, z: number): boolean;
      /**
       * Checks if the coordinates are in full island space, not just protected space
       * @param blockCoordinates - Pair(x,z) coordinates of block
       * @return true or false
       */
      inIslandSpace(blockCoordinates: Pair<number, number>): boolean;
      /**
       * Returns whether this Island has visitors inside its protection range.
       * Note this is equivalent to `!island.getVisitors().isEmpty()`.
       * @return `true` if there are visitors inside this Island's protection range, `false` otherwise.
       *
       * @since 1.3.0
       * @see #getVisitors()
       */
      hasVisitors(): boolean;
      /**
       * Returns whether this Island has players inside its protection range.
       * Note this is equivalent to `!island.getPlayersOnIsland().isEmpty()`.
       * @return `true` if there are players inside this Island's protection range, `false` otherwise.
       *
       * @since 1.6.0
       * @see #getPlayersOnIsland()
       */
      hasPlayersOnIsland(): boolean;
      /**
       * Check if the flag is allowed or not
       * For flags that are for the island in general and not related to rank.
       * @param flag - flag
       * @return true if allowed, false if not
       */
      isAllowed(flag: Flag): boolean;
      /**
       * Check if a user is allowed to bypass the flag or not
       * @param user - the User - user
       * @param flag - flag
       * @return true if allowed, false if not
       */
      isAllowed(user: User, flag: Flag): boolean;
      /**
       * Check if banned
       * @param targetUUID - the target's UUID
       * @return Returns true if target is banned on this island
       */
      isBanned(targetUUID: UUID): boolean;
      /**
       * Returns whether the island is a spawn or not.
       * @return `true` if the island is a spawn, `false` otherwise.
       */
      isSpawn(): boolean;
      /**
       * Removes a player from the team member map. Generally, you should
       * use {@link world.bentobox.bentobox.managers.IslandsManager#removePlayer(World, UUID)}
       * @param playerUUID - uuid of player
       */
      removeMember(playerUUID: UUID): void;
      /**
       * @param createdDate - the createdDate to sets
       */
      setCreatedDate(createdDate: number);
      /**
       * Set the Island Guard flag rank
       * This method affects subflags (if the given flag is a parent flag)
       * @param flag - flag
       * @param value - Use RanksManager settings, e.g. RanksManager.MEMBER
       */
      setFlag(flag: Flag, value: number): void;
      /**
       * Set the Island Guard flag rank
       * Also specify whether subflags are affected by this method call
       * @param flag - flag
       * @param value - Use RanksManager settings, e.g. RanksManager.MEMBER
       * @param doSubflags - whether to set subflags
       */
      setFlag(flag: Flag, value: number, doSubflags: boolean): void;
      /**
       * @param flags the flags to set
       */
      setFlags(flags: Map<string, number>);
      /**
       * Resets the flags to their default as set in config.yml for this island.
       * If flags are missing from the config, the default hard-coded value is used and set
       */
      setFlagsDefaults(): void;
      /**
       * @param members the members to set
       */
      setMembers(members: Map<UUID, number>);
      /**
       * Sets the display name of this Island.
       *
       * An empty String or `null` will remove the display name.
       * @param name The display name to set.
       */
      setName(name: string);
      /**
       * Sets the owner of the island.
       * @param owner the island owner - the owner to set
       */
      setOwner(owner: UUID | null);
      /**
       * @param protectionRange the protectionRange to set
       */
      setProtectionRange(protectionRange: number);
      /**
       * Updates the maxEverProtectionRange based on the current protectionRange
       */
      updateMaxEverProtectionRange(): void;
      /**
       * @param purgeProtected - if the island is protected from the Purge
       */
      setPurgeProtected(purgeProtected: boolean): void;
      /**
       * Sets the island range.
       * This method should NEVER be used except for testing purposes.
       *
       * The range value is a copy of {@link WorldSettings#getIslandDistance()} made when the Island
       * got created in order to allow easier access to this value and must therefore remain
       * AS IS.
       * @param range the range to set
       * @see #setProtectionRange(int)
       */
      setRange(range: number);
      /**
       * Set user's rank to an arbitrary rank value
       * @param user the User
       * @param rank rank value
       */
      setRank(user: User, rank: number): void;
      /**
       * Sets player's rank to an arbitrary rank value.
       * Calling this method won't call the {@link world.bentobox.bentobox.api.events.island.IslandRankChangeEvent}.
       * @param uuid UUID of the player
       * @param rank rank value
       * @since 1.1
       */
      setRank(uuid: UUID | null, rank: number): void;
      /**
       * @param ranks the ranks to set
       */
      setRanks(ranks: Map<UUID, number>);
      /**
       * Sets whether this island is a spawn or not.
       *
       * If `true`, the members and the owner will be removed from this island.
       * The flags will also be reset to default values.
       * @param isSpawn `true` if the island is a spawn, `false` otherwise.
       */
      setSpawn(isSpawn: boolean): void;
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
      /**
       * @param updatedDate - the updatedDate to sets
       */
      setUpdatedDate(updatedDate: number);
      /**
       * Toggles a settings flag
       * This method affects subflags (if the given flag is a parent flag)
       * @param flag - flag
       */
      toggleFlag(flag: Flag): void;
      /**
       * Toggles a settings flag
       * Also specify whether subflags are affected by this method call
       * @param flag - flag
       */
      toggleFlag(flag: Flag, doSubflags: boolean): void;
      /**
       * Sets the state of a settings flag
       * This method affects subflags (if the given flag is a parent flag)
       * @param flag - flag
       * @param state - true or false
       */
      setSettingsFlag(flag: Flag, state: boolean): void;
      /**
       * Sets the state of a settings flag
       * Also specify whether subflags are affected by this method call
       * @param flag - flag
       * @param state - true or false
       */
      setSettingsFlag(flag: Flag, state: boolean, doSubflags: boolean): void;
      /**
       * Removes all of a specified rank from the member list
       * @param rank rank value
       */
      removeRank(rank: number): void;
      /**
       * Gets the history of the island.
       * @return the list of {@link LogEntry} for this island.
       */
      getHistory(): LogEntry[];
      /**
       * Adds a {@link LogEntry} to the history of this island.
       * @param logEntry the LogEntry to add.
       */
      log(logEntry: LogEntry): void;
      /**
       * Sets the history of the island.
       * @param history the list of {@link LogEntry} to set for this island.
       */
      setHistory(history: LogEntry[]);
      /**
       * @return the doNotLoad
       */
      isDoNotLoad(): boolean;
      /**
       * @param doNotLoad the doNotLoad to set
       */
      setDoNotLoad(doNotLoad: boolean): void;
      /**
       * @return the deleted
       */
      isDeleted(): boolean;
      /**
       * @param deleted the deleted to set
       */
      setDeleted(deleted: boolean): void;
      /**
       * Returns the name of the {@link world.bentobox.bentobox.api.addons.GameModeAddon GameModeAddon} this island is handled by.
       * @return the name of the {@link world.bentobox.bentobox.api.addons.GameModeAddon GameModeAddon} this island is handled by.
       * @since 1.5.0
       */
      getGameMode(): string;
      /**
       * Sets the name of the {@link world.bentobox.bentobox.api.addons.GameModeAddon GameModeAddon} this island is handled by.
       * Note this has no effect over the actual location of the island, however this may cause issues with addons using this data.
       * @since 1.5.0
       */
      setGameMode(gameMode: string);
      /**
       * Checks whether this island has its nether island generated or not.
       * @return `true` if this island has its nether island generated, `false` otherwise.
       * @since 1.5.0
       */
      hasNetherIsland(): boolean;
      /**
       * Checks whether this island has its nether island mode enabled or not.
       * @return `true` if this island has its nether island enabled, `false` otherwise.
       * @since 1.21.0
       */
      isNetherIslandEnabled(): boolean;
      /**
       * Checks whether this island has its end island generated or not.
       * @return `true` if this island has its end island generated, `false` otherwise.
       * @since 1.5.0
       */
      hasEndIsland(): boolean;
      /**
       * Checks whether this island has its end island mode enabled or not.
       * @return `true` if this island has its end island enabled, `false` otherwise.
       * @since 1.21.0
       */
      isEndIslandEnabled(): boolean;
      /**
       * Checks if a flag is on cooldown. Only stored in memory so a server restart will reset the cooldown.
       * @param flag - flag
       * @return true if on cooldown, false if not
       * @since 1.6.0
       */
      isCooldown(flag: Flag): boolean;
      /**
       * Sets a cooldown for this flag on this island.
       * @param flag - Flag to cooldown
       */
      setCooldown(cooldown: Flag);
      /**
       * @return the cooldowns
       */
      getCooldowns(): Map<string, number>;
      /**
       * @param cooldowns the cooldowns to set
       */
      setCooldowns(cooldowns: Map<string, number>);
      /**
       * @return the commandRanks
       */
      getCommandRanks(): Map<string, number>;
      /**
       * @param commandRanks the commandRanks to set
       */
      setCommandRanks(commandRanks: Map<string, number>);
      /**
       * Get the rank required to run command on this island.
       * The command must have been registered with a rank.
       * @param command - the string given by {@link CompositeCommand#getUsage()}
       * @return Rank value required, or if command is not set {@link CompositeCommand#getDefaultCommandRank()}
       */
      getRankCommand(command: string): number;
      /**
       *
       * @param command - the string given by {@link CompositeCommand#getUsage()}
       * @param rank value as used by {@link RanksManager}
       */
      setRankCommand(command: string, rank: number): void;
      /**
       * Returns whether this Island is currently reserved or not.
       * If `true`, this means no blocks, except a bedrock one at the center of the island, exist.
       * @return `true` if this Island is reserved, `false` otherwise.
       * @since 1.6.0
       */
      isReserved(): boolean;
      /**
       * @param reserved the reserved to set
       * @since 1.6.0
       */
      setReserved(reserved: boolean): void;
      /**
       * @return the metaData
       * @since 1.15.5
       */
      getMetaData(): Optional<Map<string, MetaDataValue>>;
      /**
       * @param metaData the metaData to set
       * @since 1.15.4
       */
      setMetaData(metaData: Map<string, MetaDataValue>);
      /**
       * @return changed state
       */
      isChanged(): boolean;
      /**
       * Indicates the fields have been changed. Used to optimize saving on shutdown.
       */
      setChanged(): void;
      /**
       * @param changed the changed to set
       */
      setChanged(changed: boolean): void;
      /**
       * Remove a named home from this island
       * @param name - home name to remove
       * @return true if home removed successfully
       * @since 1.16.0
       */
      removeHome(name: string): boolean;
      /**
       * Remove all homes from this island except the default home
       * @return true if any non-default homes removed
       * @since 1.20.0
       */
      removeHomes(): boolean;
      /**
       * Rename a home
       * @param oldName - old name of home
       * @param newName - new name of home
       * @return true if successful, false if oldName does not exist, already exists
       * @since 1.16.0
       */
      renameHome(oldName: string, newName: string): boolean;
      /**
       * Get the max homes. You shouldn't access this directly.
       * Use {@link world.bentobox.bentobox.managers.IslandsManager#getMaxHomes(Island)}
       * @return the maxHomes. If null, then the world default should be used.
       * @since 1.16.0
       */
      getMaxHomes(): number | null;
      /**
       * @param maxHomes the maxHomes to set. If null then the world default will be used.
       * You shouldn't access this directly.
       * Use {@link world.bentobox.bentobox.managers.IslandsManager#setMaxHomes(Island, Integer)}
       * @since 1.16.0
       */
      setMaxHomes(maxHomes: number | null);
      /**
       * @return the maxMembers
       * @since 1.16.0
       */
      getMaxMembers(): Map<number, number>;
      /**
       * @param maxMembers the maxMembers to set
       * @since 1.16.0
       */
      setMaxMembers(maxMembers: Map<number, number>);
      /**
       * Get the maximum number of island members
       * @param rank island rank value from {@link RanksManager}
       * @return the maxMembers for the rank given - if null then the world default should be used. Negative values = unlimited.
       * @since 1.16.0
       */
      getMaxMembers(rank: number): number | null;
      /**
       * Set the maximum number of island members
       * @param rank island rank value from {@link RanksManager}
       * @param maxMembers the maxMembers to set. If null then the world default applies. Negative values = unlimited.
       * @since 1.16.0
       */
      setMaxMembers(rank: number, maxMembers: number): void;
      /**
       * @return the bonusRanges
       */
      getBonusRanges(): BonusRangeRecord[];
      /**
       * @param bonusRanges the bonusRanges to set
       */
      setBonusRanges(bonusRanges: BonusRangeRecord[]);
      /**
       * Get the bonus range provided by all settings of the range giver
       * @param id an id to identify this bonus
       * @return bonus range, or 0 if unknown
       */
      getBonusRange(id: string): number;
      /**
       * Get the BonusRangeRecord for uniqueId
       * @param uniqueId a unique id to identify this bonus
       * @return optional BonusRangeRecord
       */
      getBonusRangeRecord(uniqueId: string): Optional<BonusRangeRecord>;
      /**
       * Add a bonus range amount to the island for this addon or plugin.
       * Note, this will not replace any range set already with the same id
       * @param id an id to identify this bonus
       * @param range range to add to the island protected range
       * @param message the reference key to a locale message related to this bonus. May be blank.
       */
      addBonusRange(id: string, range: number, message: string): void;
      /**
       * Clear the bonus ranges for a unique ID
       * @param id id to identify this bonus
       */
      clearBonusRange(id: string): void;
      /**
       * Clear all bonus ranges for this island
       */
      clearAllBonusRanges(): void;
      toString(): string;
   }
   export interface Island extends DataObject, MetaDataAble {}
   /**
    * Annotation to explicitly name tables
    * @author tastybento
    * @since 1.14.0
    */
   export class Table {}
}
declare module 'world.bentobox.bentobox.database.sql' {
   import { Class } from 'java.lang';
   import { Set, List } from 'java.util';
   import { DatabaseConnector, DatabaseConnectionSettingsImpl } from 'world.bentobox.bentobox.database';
   import { AbstractJSONDatabaseHandler } from 'world.bentobox.bentobox.database.json';
   import { HikariDataSource, HikariConfig } from 'com.zaxxer.hikari';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { DataSource } from 'javax.sql';
   /**
    * Generic SQL database connector.
    */
   export class SQLDatabaseConnector extends DatabaseConnector {
      /**
       * Returns connection url of database.
       * @return Database connection url.
       */
      getConnectionUrl(): string;
      /**
       * Looks through the database (or files) and returns a known unique key
       *
       * @param tableName - name of the table
       * @return a unique key for this record
       */
      getUniqueId(tableName: string): string;
      /**
       * Check if a key exists in the database in this table or not
       *
       * @param tableName - name of the table
       * @param key       - key to check
       * @return true if it exists
       */
      uniqueIdExists(tableName: string, key: string): boolean;
      /**
       * Close the database connection
       * @param type of class being closed
       */
      closeConnection(type: Class<any>): void;
      /**
       * This method creates config that is used to create HikariDataSource.
       * @return HikariConfig object.
       */
      createConfig(): HikariConfig;
      /**
       * Establishes a new connection to the database
       *
       * @param type of class
       * @return A new connection to the database using the settings provided
       */
      createConnection(type: Class<any>): any;
   }
   /**
    *
    * Abstract class that covers SQL style databases
    * Class that inserts a  into the corresponding database-table.
    *
    * @author tastybento
    *
    * @param
    */
   export class SQLDatabaseHandler<T> extends AbstractJSONDatabaseHandler<T> {
      /**
       * @return the sqlConfig
       */
      getSqlConfig(): SQLConfiguration;
      /**
       * @param sqlConfig the sqlConfig to set
       */
      setSqlConfig(sqlConfig: SQLConfiguration);
      /**
       * {@inheritDoc}
       */
      loadObjects(): T[];
      /**
       * {@inheritDoc}
       */
      loadObject(uniqueId: string): T;
      /**
       * {@inheritDoc}
       */
      saveObject(instance: T): CompletableFuture<boolean>;
      /**
       * {@inheritDoc}
       */
      deleteID(uniqueId: string): void;
      /**
       * {@inheritDoc}
       */
      deleteObject(instance: T): void;
      /**
       * {@inheritDoc}
       */
      objectExists(uniqueId: string): boolean;
      /**
       * {@inheritDoc}
       */
      close(): void;
      /**
       * Sets data source of database.
       *
       * @param dataSource the data source
       * @return `true` if data source is set, `false` otherwise.
       */
      setDataSource(dataSource: DataSource);
   }
   /**
    * Contains the SQL strings for the database.
    * The default strings are for MySQL, so only the deltas need to be supplied.
    * @author tastybento
    *
    */
   export class SQLConfiguration {
      constructor(plugin: BentoBox, type: Class<T>);
      loadObject(string: string): SQLConfiguration;
      saveObject(string: string): SQLConfiguration;
      deleteObject(string: string): SQLConfiguration;
      objectExists(string: string): SQLConfiguration;
      schema(string: string): SQLConfiguration;
      loadObjects(string: string): SQLConfiguration;
      renameTable(string: string): SQLConfiguration;
      setUseQuotes(b: boolean): SQLConfiguration;
      /**
       * @return the loadObjectSQL
       */
      getLoadObjectSQL(): string;
      /**
       * @return the saveObjectSQL
       */
      getSaveObjectSQL(): string;
      /**
       * @return the deleteObjectSQL
       */
      getDeleteObjectSQL(): string;
      /**
       * @return the objectExistsSQL
       */
      getObjectExistsSQL(): string;
      /**
       * @return the schemaSQL
       */
      getSchemaSQL(): string;
      /**
       * @return the loadItSQL
       */
      getLoadObjectsSQL(): string;
      /**
       * @return the renameTableSQL
       */
      getRenameTableSQL(): string;
      /**
       * @return the tableName
       */
      getTableName(): string;
      /**
       * @return the oldName
       */
      getOldTableName(): string;
      renameRequired(): boolean;
      /**
       * @return the useQuotes
       */
      isUseQuotes(): boolean;
   }
}
declare module 'world.bentobox.bentobox.panels.settings' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { List, Map } from 'java.util';
   import { Tab, PanelItem } from 'world.bentobox.bentobox.api.panels';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   import { Type } from 'world.bentobox.bentobox.api.flags.Flag';
   /**
    * Implements a {@link Tab} that shows settings for
    * {@link world.bentobox.bentobox.api.flags.Flag.Type#PROTECTION}, {@link world.bentobox.bentobox.api.flags.Flag.Type#SETTING}, {@link world.bentobox.bentobox.api.flags.Flag.Type#WORLD_SETTING}
    * @author tastybento
    * @since 1.6.0
    *
    */
   export class SettingsTab extends Tab {
      /**
       * Show a tab of settings
       * @param user - user who is viewing the tab
       * @param island - the island
       * @param type - flag type
       */
      constructor(user: User, island: Island, type: Type);
      /**
       * Get the icon for this tab
       * @return panel item
       */
      getIcon(): PanelItem;
      /**
       * @return the name of this tab
       */
      getName(): string;
      /**
       * Get all the flags as panel items
       * @return list of all the panel items for this flag type
       */
      getPanelItems(): PanelItem[];
      /**
       * @return Map of icons to be shown in the tab row when the tab is active
       * Make sure these do not overlap any tabs that are in the tab row
       */
      getTabIcons(): Map<number, PanelItem>;
      /**
       * @return the permission required to view this tab or empty if no permission required
       */
      getPermission(): string;
      /**
       * @return the type
       */
      getType(): Type;
      /**
       * @return the user
       */
      getUser(): User;
      /**
       * @return the island
       */
      getIsland(): Island;
   }
   export interface SettingsTab extends Tab, ClickHandler {}
   /**
    * Implements a {@link Tab} that enables the default world protection settings to be set
    * @author tastybento
    * @since 1.6.0
    *
    */
   export class WorldDefaultSettingsTab extends SettingsTab {
      /**
       * Get the icon for this tab
       * @return panel item
       */
      getIcon(): PanelItem;
      /**
       * @return the name of this tab
       */
      getName(): string;
      /**
       * @return the permission required to view this tab or empty if no permission required
       */
      getPermission(): string;
      /**
       * Get all the flags as panel items
       * @return list of all the panel items for this flag type
       */
      getPanelItems(): PanelItem[];
   }
   export interface WorldDefaultSettingsTab extends SettingsTab, Tab {}
}
declare module 'world.bentobox.bentobox.api.flags' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { Comparable } from 'java.lang';
   import { Locale, Set } from 'java.util';
   import { PanelItem } from 'world.bentobox.bentobox.api.panels';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Addon, GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   import { Type, Mode } from 'world.bentobox.bentobox.api.flags.Flag';
   export class Flag extends Comparable<Flag> {
      getID(): string;
      /**
       * @return the cooldown
       */
      getCooldown(): number;
      /**
       * Set the original status of this flag for locations outside of island spaces.
       * May be overridden by the setting for this world.
       * Does not affect subflags.
       * @param defaultSetting - true means it is allowed. false means it is not allowed
       */
      setDefaultSetting(defaultSetting: boolean): void;
      /**
       * @return the type
       */
      getType(): Type;
      /**
       * @return the defaultRank
       */
      getDefaultRank(): number;
      /**
       * @return whether the flag uses a subpanel or not
       */
      hasSubPanel(): boolean;
      /**
       * Get the addon that made this flag
       * @return the addon
       * @since 1.5.0
       */
      getAddon(): Addon;
      hashCode(): number;
      equals(obj: any): boolean;
      /**
       * @return a locale reference for the name of this protection flag
       */
      getNameReference(): string;
      /**
       * @return a locale reference for the icon of this protection flag
       */
      getIconReference(): string;
      /**
       * @return a locale reference for the description of this protection flag
       */
      getDescriptionReference(): string;
      /**
       * @return a locale reference for the hint of this protection flag
       */
      getHintReference(): string;
      /**
       * A set of game mode addons that use this flag. If empty, flag applies to all.
       * @return the gameModeAddon
       */
      getGameModes(): Set<GameModeAddon>;
      /**
       * @param gameModeAddon the gameModeAddon to set
       */
      setGameModes(gameModes: Set<GameModeAddon>);
      /**
       * Add a gameModeAddon to this flag
       * @param gameModeAddon - game mode addon
       */
      addGameModeAddon(gameModeAddon: GameModeAddon): void;
      /**
       * Remove a gameModeAddon to this flag
       * @param gameModeAddon - game mode addon
       * @return true if this set contained the specified element
       */
      removeGameModeAddon(gameModeAddon: GameModeAddon): boolean;
      /**
       * Converts a flag to a panel item. The content of the flag will change depending on who the user is and where they are.
       * @param plugin - plugin
       * @param user - user that will see this flag
       * @param island - target island, if any
       * @param invisible - true if this flag is not visible to players
       * @return - PanelItem for this flag or null if item is invisible to user
       */
      toPanelItem(plugin: BentoBox, user: User, island: Island | null, invisible: boolean): PanelItem | null;
      /**
       * @return the mode
       * @since 1.6.0
       */
      getMode(): Mode;
      /**
       * @return whether the flag has subflags (and therefore is a parent flag)
       * @since 1.17.0
       */
      hasSubflags(): boolean;
      /**
       * @return the subflags, an empty Set if none
       * @since 1.17.0
       */
      getSubflags(): Set<Flag>;
      /**
       * Set the name of this flag for a specified locale. This enables the flag's name to be assigned via API. It will not be stored anywhere
       * and must be rewritten using this call every time the flag is built.
       * @param locale locale (language) to which this name should be assigned. Assigning to `Locale.US` will make this the default
       * @param name the translated name for this flag
       * @return true if successful, false if the locale is unknown to this server.
       * See {@link world.bentobox.bentobox.managers.LocalesManager#getAvailableLocales(boolean sort)}
       * @since 1.22.1
       */
      setTranslatedName(locale: Locale, name: string): boolean;
      setTranslatedDescription(locale: Locale, description: string): boolean;
      toString(): string;
      compareTo(o: Flag): number;
   }
}
declare module 'world.bentobox.bentobox.database.transition' {
   import { Class } from 'java.lang';
   import { List } from 'java.util';
   import { AbstractDatabaseHandler, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { CompletableFuture } from 'java.util.concurrent';
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class MariaDB2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class Json2MySQLDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class Json2MariaDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class Yaml2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class Yaml2MySQLDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class Yaml2SQLiteDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class Yaml2MariaDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class MongoDB2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author Poslovitch
    * @since 1.6.0
    */
   export class PostgreSQL2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * Class that transitions from one database type to another
    *
    * @author tastybento
    *
    * @param  Class  that is to be handled
    * @since 1.5.0
    */
   export class TransitionDatabaseHandler<T> extends AbstractDatabaseHandler<T> {
      loadObjects(): T[];
      loadObject(uniqueId: string): T;
      objectExists(uniqueId: string): boolean;
      saveObject(instance: T): CompletableFuture<boolean>;
      deleteID(uniqueId: string): void;
      deleteObject(instance: T): void;
      close(): void;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class Yaml2MongoDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class MySQL2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class Json2SQLiteDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class SQLite2JsonDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author Poslovitch
    * @since 1.6.0
    */
   export class Json2PostgreSQLDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * @author BONNe
    * @since 1.6.0
    */
   export class Json2MongoDBDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
}
declare module 'world.bentobox.bentobox.util.heads' {
   import { Set, UUID, Map, Queue } from 'java.util';
   import { PanelItem } from 'world.bentobox.bentobox.api.panels';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Pair } from 'world.bentobox.bentobox.util';
   export class HeadRequester {
      /**
       * Replaces the head in an open inventory panel with the supplied panel item
       * @param item - panel item, must be a player head
       */
      setHead(head: PanelItem);
   }
   /**
    * This would allow to implement changeable player head for server owner.
    * @since 1.14.1
    * @author tastybento, BONNe1704
    */
   export class HeadCache {
      /**
       * Base64 Encoded texture link to given player skin.
       */
      readonly encodedTextureLink: string;
      /**
       * Constructor HeadCache creates a new HeadCache instance.
       *
       * @param userName           of type String
       * @param userId             of type String
       * @param encodedTextureLink of type String
       */
      constructor(userName: string, userId: UUID, encodedTextureLink: string);
      /**
       * Constructor HeadCache creates a new HeadCache instance.
       *
       * @param userName           of type String
       * @param userId             of type UUID
       * @param encodedTextureLink of type String
       * @param timestamp          of type long
       */
      constructor(userName: string, userId: UUID, encodedTextureLink: string, timestamp: number);
      /**
       * Method HeadCache#getUserName returns the userName of this object.
       *
       * @return the userName (type String) of this object.
       */
      getUserName(): string;
      /**
       * Method HeadCache#getTimestamp returns the timestamp of this object.
       *
       * @return the timestamp (type long) of this object.
       */
      getTimestamp(): number;
      /**
       * Method HeadCache#getUserId returns the userId of this object.
       *
       * @return the userId (type UUID) of this object.
       */
      getUserId(): UUID;
   }
   /**
    * This class manages getting player heads for requester.
    * @author tastybento, BONNe1704
    */
   export class HeadGetter {
      /**
       * @param plugin - plugin
       */
      constructor(plugin: BentoBox);
      /**
       * @param panelItem - head to update
       * @param requester - callback class
       * @since 1.14.1
       */
      static getHead(panelItem: PanelItem, requester: HeadRequester): void;
      /**
       * This method allows to add HeadCache object into local cache.
       * It will provide addons to use HeadGetter cache directly.
       * @param cache Cache object that need to be added into local cache.
       * @since 1.14.1
       */
      static addToCache(cache: HeadCache): void;
   }
}
declare module 'world.bentobox.bentobox.api.addons.AddonDescription' {
   import { List } from 'java.util';
   import { AddonDescription } from 'world.bentobox.bentobox.api.addons';
   export class Builder {
      /**
       * @since 1.1
       */
      constructor(main: string, name: string, version: string);
      description(description: string): Builder;
      authors(...authors: string[]): Builder;
      dependencies(dependencies: string[]): Builder;
      softDependencies(softDependencies: string[]): Builder;
      /**
       * @since 1.1
       */
      metrics(metrics: boolean): Builder;
      /**
       * Sets the name of the GitHub repository.
       * Must follow the `Owner/Name` format.
       * @since 1.3.0
       */
      repository(repository: string): Builder;
      /**
       * Sets the minimum BentoBox version this addon requires in order to work properly.
       * @param apiVersion the minimum BentoBox version this addon requires in order to work properly.
       * @since 1.11.0
       * @see AddonDescription#getApiVersion()
       */
      apiVersion(apiVersion: string): Builder;
      build(): AddonDescription;
   }
}
declare module 'world.bentobox.bentobox.api.panels.PanelItem' {
   /**
    * Click handler interface
    *
    */
   export class ClickHandler {}
}
declare module 'world.bentobox.bentobox.util.teleport.SafeSpotTeleport' {
   import { Runnable } from 'java.lang';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   import { SafeSpotTeleport } from 'world.bentobox.bentobox.util.teleport';
   export class Builder {
      constructor(plugin: BentoBox);
      /**
       * Set the island to teleport to
       *
       * @param island island destination
       * @return Builder
       */
      island(island: Island): Builder;
      /**
       * Set the home name
       *
       * @param homeName - home name
       * @return Builder
       * @since 1.16.0
       */
      homeName(homeName: string): Builder;
      /**
       * This is a portal teleportation
       *
       * @return Builder
       */
      portal(): Builder;
      /**
       * Set the failure message if this teleport cannot happen
       *
       * @param failureMessage failure message to report to user
       * @return Builder
       */
      failureMessage(failureMessage: string): Builder;
      /**
       * Try to teleport the player
       *
       * @return CompletableFuture that will become true if successful and false if not
       * @since 1.14.0
       */
      buildFuture(): CompletableFuture<boolean> | null;
      /**
       * Try to teleport the player
       *
       * @return SafeSpotTeleport
       */
      build(): SafeSpotTeleport | null;
      /**
       * This method allows stopping "safe" block generation if teleportation fails.
       * @param cancelIfFail - value for canceling
       * @return Builder
       * @since 1.20.1
       */
      cancelIfFail(cancelIfFail: boolean): Builder;
      /**
       * The task to run after the player is safely teleported.
       *
       * @param runnable - task
       * @return Builder
       * @since 1.13.0
       */
      thenRun(runnable: Runnable): Builder;
      /**
       * The task to run if the player is not safely teleported
       *
       * @param runnable - task
       * @return Builder
       * @since 1.18.0
       */
      ifFail(runnable: Runnable): Builder;
      /**
       * @return the plugin
       */
      getPlugin(): BentoBox;
      /**
       * @return the homeNumber
       */
      getHomeNumber(): number;
      /**
       * @return the homeName
       */
      getHomeName(): string;
      /**
       * @return the portal
       */
      isPortal(): boolean;
      /**
       * @return the failureMessage
       */
      getFailureMessage(): string;
      /**
       * @return the runnable
       */
      getRunnable(): Runnable;
      /**
       * @return the result
       * @since 1.14.0
       */
      getResult(): CompletableFuture<boolean>;
      /**
       * @return the failRunnable
       */
      getFailRunnable(): Runnable;
      /**
       * @return the cancelIfFail
       * @since 1.20.1
       */
      isCancelIfFail(): boolean;
   }
}
declare module 'world.bentobox.bentobox.listeners.teleports' {
   import { Set, UUID } from 'java.util';
   import { BentoBox } from 'world.bentobox.bentobox';
   /**
    * This abstract class contains all common methods for entity and player teleportation.
    */
   export class AbstractTeleportListener {}
}
declare module 'world.bentobox.bentobox.api.addons.request' {
   import { Map } from 'java.util';
   export class AddonRequestHandler {
      /**
       * Get request handler label.
       *
       * @return label
       */
      getLabel(): string;
      /**
       * Handle an addon request.
       * This is used only for Addons to respond to addon requests from plugins.
       * Example: request island level from Levels addon.
       *
       * @param metaData meta data
       * @return request response
       */
      handle(metaData: Map<string, any>): any;
   }
   /**
    * API to enable plugins to request data from addons.
    * Addons can expose data that they want to expose. To access it, call this class with the appropriate addon name, the label for the
    * data that is requested and if required, a map of key-value pairs that will be given to the addon.
    * @author HyKurtis
    *
    */
   export class AddonRequestBuilder {
      /**
       * Define the addon you wish to request.
       *
       * @param addonName addon name
       */
      addon(addonName: string): AddonRequestBuilder;
      /**
       * Define label for addon request.
       *
       * @param requestLabel request label
       */
      label(requestLabel: string): AddonRequestBuilder;
      /**
       * Add meta data to addon request.
       *
       * @param key key
       * @param value value
       */
      addMetaData(key: string, value: any): AddonRequestBuilder;
      /**
       * Send request to addon.
       *
       * @return request response, null if no response.
       */
      request(): any;
   }
}
declare module 'world.bentobox.bentobox.api.commands.island.team.Invite' {
   import { Enum } from 'java.lang';
   /**
    * Type of invitation
    *
    */
   export class Type extends Enum<Type> {
      static readonly COOP: Type;
      static readonly TEAM: Type;
      static readonly TRUST: Type;
      static valueOf(name: string): Type;
      static values(): Type[];
   }
}
declare module 'world.bentobox.bentobox.hooks.placeholders' {
   import { PlaceholderReplacer } from 'world.bentobox.bentobox.api.placeholders';
   import { Set, Map } from 'java.util';
   import { Hook } from 'world.bentobox.bentobox.api.hooks';
   import { Addon } from 'world.bentobox.bentobox.api.addons';
   import {
      AddonPlaceholderExpansion,
      BentoBoxPlaceholderExpansion
   } from 'world.bentobox.bentobox.api.placeholders.placeholderapi';
   /**
    * Provides implementations and interfacing needed to register and get placeholders from PlaceholderAPI.
    *
    * @author Poslovitch
    */
   export class PlaceholderAPIHook extends PlaceholderHook {
      constructor();
      hook(): boolean;
      getFailureCause(): string;
      /**
       * {@inheritDoc}
       */
      registerPlaceholder(placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * {@inheritDoc}
       */
      registerPlaceholder(addon: Addon, placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * {@inheritDoc}
       */
      unregisterPlaceholder(placeholder: string): void;
      /**
       * {@inheritDoc}
       */
      unregisterPlaceholder(addon: Addon, placeholder: string): void;
      /**
       * {@inheritDoc}
       */
      isPlaceholder(addon: Addon, placeholder: string): boolean;
      /**
       * {@inheritDoc}
       */
      unregisterAll(): void;
   }
   /**
    * @author Poslovitch
    * @since 1.5.0
    */
   export class PlaceholderHook extends Hook {
      /**
       * Registers this placeholder on the behalf of BentoBox.
       * @param placeholder the placeholder to register, not null
       * @param replacer its replacement, not null
       * @since 1.5.0
       */
      registerPlaceholder(placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * Registers this placeholder on the behalf of this addon.
       * @param addon the addon, not null.
       * @param placeholder the placeholder to register, not null.
       * @param replacer its replacement, not null.
       * @since 1.5.0
       */
      registerPlaceholder(addon: Addon, placeholder: string, replacer: PlaceholderReplacer): void;
      /**
       * Unregisters this placeholder on the behalf of BentoBox.
       * @param placeholder the placeholder to unregister, not null.
       * @since 1.5.0
       */
      unregisterPlaceholder(placeholder: string): void;
      /**
       * Unregister this placeholder on the behalf of this addon.
       * @param addon the addon, not null.
       * @param placeholder the placeholder to unregister, not null.
       * @since 1.5.0
       */
      unregisterPlaceholder(addon: Addon, placeholder: string): void;
      /**
       * Checks if a placeholder with this name is already registered
       * @param addon the addon, not null
       * @param placeholder this placeholder
       * @return `true` if a placeholder with this name is already registered
       * @since 1.5.0
       */
      isPlaceholder(addon: Addon, placeholder: string): boolean;
      /**
       * Unregister all previously registered placeholders
       * @since 1.15.0
       */
      unregisterAll(): void;
   }
}
declare module 'world.bentobox.bentobox.nms.fallback' {
   import { PasteHandler, CopyWorldRegenerator } from 'world.bentobox.bentobox.nms';
   export class PasteHandlerImpl extends PasteHandler {}
   /**
    * @author tastybento
    *
    */
   export class WorldRegeneratorImpl extends CopyWorldRegenerator {}
}
declare module 'world.bentobox.bentobox.panels.ManagementPanel' {
   import { Enum } from 'java.lang';
   export class View extends Enum<View> {
      static readonly GAMEMODES: View;
      static readonly ADDONS: View;
      static readonly HOOKS: View;
      static valueOf(name: string): View;
      static values(): View[];
   }
}
declare module 'world.bentobox.bentobox.database.yaml' {
   import { Class } from 'java.lang';
   import { List } from 'java.util';
   import { File } from 'java.io';
   import { AbstractDatabaseHandler, DatabaseConnector, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   export class ConfigHandler<T> extends YamlDatabaseHandler<T> {
      constructor(plugin: BentoBox, type: Class<T>, databaseConnector: DatabaseConnector);
      saveSettings(instance: T): void;
      loadSettings(uniqueId: string, dbConfig: T): T;
   }
   export class YamlDatabaseConnector extends DatabaseConnector {
      /**
       * Returns the connection url
       *
       * @return the connector's URL
       */
      getConnectionUrl(): string;
      /**
       * Looks through the database (or files) and returns a known unique key
       *
       * @param tableName - name of the table
       * @return a unique key for this record
       */
      getUniqueId(tableName: string): string;
      /**
       * Check if a key exists in the database in this table or not
       *
       * @param tableName - name of the table
       * @param key       - key to check
       * @return true if it exists
       */
      uniqueIdExists(tableName: string, key: string): boolean;
      /**
       * Establishes a new connection to the database
       *
       * @param type of class
       * @return A new connection to the database using the settings provided
       */
      createConnection(type: Class<any>): any;
      /**
       * Close the database connection
       * @param type of class being closed
       */
      closeConnection(type: Class<any>): void;
   }
   export class YamlDatabase extends DatabaseSetup {
      /**
       * Get the config
       * @param  - Class type
       * @param type - config object type
       * @return - the config handler
       */
      getConfig<T>(type: Class<T>): AbstractDatabaseHandler<T>;
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(type: Class<T>): AbstractDatabaseHandler<T>;
   }
   export class YamlDatabaseHandler<T> extends AbstractDatabaseHandler<T> {
      loadObject(key: string): T;
      objectExists(uniqueId: string): boolean;
      loadObjects(): T[];
      /**
       * Inserts T into the corresponding database-table
       *
       * @param instance that should be inserted into the database
       * @return CompletableFuture that will be true if object is saved successfully
       */
      saveObject(instance: T): CompletableFuture<boolean>;
      deleteID(uniqueId: string): void;
      deleteObject(instance: T): void;
      close(): void;
   }
}
declare module 'world.bentobox.bentobox.api.flags.clicklisteners' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   /**
    * Handles clicking on the lock icon
    * @author tastybento
    *
    */
   export class IslandLockClick extends CycleClick {
      /**
       * @param id flag id
       */
      constructor(id: string);
      /**
       * @param id flag id
       * @param minRank minimum rank
       * @param maxRank maximum rank
       */
      constructor(id: string, minRank: number, maxRank: number);
   }
   /**
    * Toggles a island setting on/off
    * @author tastybento
    *
    */
   export class IslandToggleClick extends ClickHandler {
      /**
       * @param id - the flag ID that this click listener is associated with
       */
      constructor(id: string);
   }
   /**
    * Left Clicks increase rank, right clicks lower rank
    * @author tastybento
    *
    */
   export class CycleClick extends ClickHandler {
      /**
       * Construct default cycle clicker with min rank of {@link RanksManager#VISITOR_RANK}
       * and max rank of {@link RanksManager#OWNER_RANK}
       * @param id - the flag id that will be adjusted by this click
       */
      constructor(id: string);
      /**
       * Construct a cycle clicker with a min and max rank
       * @param id flag id
       * @param minRank minimum rank value
       * @param maxRank maximum rank value
       */
      constructor(id: string, minRank: number, maxRank: number);
      /**
       * @param minRank the minRank to set
       */
      setMinRank(minRank: number);
      /**
       * @param maxRank the maxRank to set
       */
      setMaxRank(maxRank: number);
   }
   /**
    * Toggles a worldwide setting on/off
    * @author tastybento
    *
    */
   export class WorldToggleClick extends ClickHandler {
      /**
       * @param id - the flag ID that this click listener is associated with
       */
      constructor(id: string);
   }
}
declare module 'world.bentobox.bentobox.api.placeholders' {
   import { GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   export class PlaceholderReplacer {
      onReplace(user: User | null): string;
   }
   /**
    *
    * @since 1.5.0
    * @author Poslovitch
    */
   export class GameModePlaceholderReplacer {
      /**
       * @param addon the GameModeAddon that registered the placeholder, cannot be null.
       * @param user the User to which the placeholder will be shown, can be null.
       * @param island the Island of the User, can be null.
       * @return the String containing the requested value or an empty String.
       */
      onReplace(addon: GameModeAddon, user: User | null, island: Island | null): string;
   }
}
declare module 'world.bentobox.bentobox.versions.ServerCompatibility' {
   import { Enum } from 'java.lang';
   import { List } from 'java.util';
   export class Compatibility extends Enum<Compatibility> {
      /**
       * The server software is compatible with the current version of BentoBox.
       * There shouldn't be any issues.
       */
      static readonly COMPATIBLE: Compatibility;
      /**
       * The server software might not be compatible but is supported.
       * Issues might occur.
       */
      static readonly SUPPORTED: Compatibility;
      /**
       * The server software is not supported, even though BentoBox may work fine.
       * Issues are likely and will receive limited support.
       */
      static readonly NOT_SUPPORTED: Compatibility;
      /**
       * The server software is explicitly not supported and incompatible.
       * BentoBox won't run on it: that's pointless to try to run it.
       */
      static readonly INCOMPATIBLE: Compatibility;
      static valueOf(name: string): Compatibility;
      static values(): Compatibility[];
      isCanLaunch(): boolean;
   }
   /**
    * Provides a list of server software.
    * Any software that is not listed here is implicitly considered as "INCOMPATIBLE".
    */
   export class ServerSoftware extends Enum<ServerSoftware> {
      static readonly CRAFTBUKKIT: ServerSoftware;
      static readonly BUKKIT: ServerSoftware;
      static readonly GLOWSTONE: ServerSoftware;
      static readonly SPIGOT: ServerSoftware;
      static readonly PAPER: ServerSoftware;
      static readonly PURPUR: ServerSoftware;
      static readonly TACOSPIGOT: ServerSoftware;
      static readonly AKARIN: ServerSoftware;
      /**
       * @since 1.14.0
       */
      static readonly UNKNOWN: ServerSoftware;
      static valueOf(name: string): ServerSoftware;
      static values(): ServerSoftware[];
      /**
       * @return the name
       * @since 1.14.0
       */
      getName(): string;
      /**
       * @param name the name to set
       * @since 1.14.0
       */
      setName(name: string);
      getCompatibility(): Compatibility;
   }
   /**
    * Provides a list of server versions.
    * Any version that is not listed here is implicitly considered as "INCOMPATIBLE".
    */
   export class ServerVersion extends Enum<ServerVersion> {
      static readonly V1_13: ServerVersion;
      static readonly V1_13_1: ServerVersion;
      static readonly V1_13_2: ServerVersion;
      /**
       * @since 1.5.0
       */
      static readonly V1_14: ServerVersion;
      /**
       * @since 1.5.0
       */
      static readonly V1_14_1: ServerVersion;
      /**
       * @since 1.5.0
       */
      static readonly V1_14_2: ServerVersion;
      /**
       * @since 1.6.0
       */
      static readonly V1_14_3: ServerVersion;
      /**
       * @since 1.6.0
       */
      static readonly V1_14_4: ServerVersion;
      /**
       * @since 1.9.2
       */
      static readonly V1_15: ServerVersion;
      /**
       * @since 1.10.0
       */
      static readonly V1_15_1: ServerVersion;
      /**
       * @since 1.11.0
       */
      static readonly V1_15_2: ServerVersion;
      /**
       * @since 1.14.0
       */
      static readonly V1_16_1: ServerVersion;
      /**
       * @since 1.15.0
       */
      static readonly V1_16_2: ServerVersion;
      /**
       * @since 1.15.1
       */
      static readonly V1_16_3: ServerVersion;
      /**
       * @since 1.15.3
       */
      static readonly V1_16_4: ServerVersion;
      /**
       * @since 1.16.0
       */
      static readonly V1_16_5: ServerVersion;
      /**
       * @since 1.17.0
       */
      static readonly V1_17: ServerVersion;
      /**
       * @since 1.17.1
       */
      static readonly V1_17_1: ServerVersion;
      /**
       * @since 1.19.0
       */
      static readonly V1_18: ServerVersion;
      /**
       * @since 1.19.0
       */
      static readonly V1_18_1: ServerVersion;
      /**
       * @since 1.20.1
       */
      static readonly V1_18_2: ServerVersion;
      /**
       * @since 1.21.0
       */
      static readonly V1_19: ServerVersion;
      /**
       * @since 1.21.0
       */
      static readonly V1_19_1: ServerVersion;
      /**
       * @since 1.21.0
       */
      static readonly V1_19_2: ServerVersion;
      /**
       * @since 1.22.0
       */
      static readonly V1_19_3: ServerVersion;
      /**
       * @since 1.22.1
       */
      static readonly V1_19_4: ServerVersion;
      static valueOf(name: string): ServerVersion;
      static values(): ServerVersion[];
      getCompatibility(): Compatibility;
      toString(): string;
      /**
       * @since 1.5.0
       */
      static getVersions(...compatibility: Compatibility[]): ServerVersion[];
   }
}
declare module 'world.bentobox.bentobox.nms.v1_19_R3' {
   import { PasteHandler, CopyWorldRegenerator } from 'world.bentobox.bentobox.nms';
   export class WorldRegeneratorImpl extends CopyWorldRegenerator {}
   export class PasteHandlerImpl extends PasteHandler {}
}
declare module 'world.bentobox.bentobox.database.objects.adapters' {
   import { LogEntry } from 'world.bentobox.bentobox.api.logs';
   import { List, Map } from 'java.util';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   /**
    *
    * Denotes which adapter should be used to serialize or deserialize this field
    * @author tastybento
    */
   export class Adapter {}
   /**
    * @author tastybento
    *
    */
   export class FlagSerializer2 extends AdapterInterface<Map<Flag, number>, Map<string, boolean>> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): Map<Flag, number>;
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): Map<string, boolean>;
   }
   /**
    * Serializes the {@link world.bentobox.bentobox.database.objects.Island#getFlags() getFlags()} and
    * {@link world.bentobox.bentobox.database.objects.Island#setFlags(Map)} () setFlags()}
    * in {@link world.bentobox.bentobox.database.objects.Island}
    * @author tastybento
    * @since 1.6.0
    */
   export class FlagSerializer3 extends AdapterInterface<Map<Flag, number>, Map<string, number>> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): Map<Flag, number>;
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): Map<string, number>;
   }
   /**
    * This Serializer migrates Map of String, Boolean to Map of String, Integer in serialization process.
    * It is necessary because current implementation requires flags to be mapped to Integer value.
    * @author BONNe
    */
   export class FlagBooleanSerializer extends AdapterInterface<Map<string, number>, Map<string, boolean>> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): Map<string, number>;
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): Map<string, boolean>;
   }
   /**
    * Serializes the {@link world.bentobox.bentobox.database.objects.Island#getFlags() getFlags()} and
    * {@link world.bentobox.bentobox.database.objects.Island#setFlags(Map)} () setFlags()}
    * in {@link world.bentobox.bentobox.database.objects.Island}
    * @author tastybento
    *
    */
   export class FlagSerializer extends AdapterInterface<Map<Flag, number>, Map<string, number>> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): Map<Flag, number>;
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): Map<string, number>;
   }
   export class LogEntryListAdapter extends AdapterInterface<LogEntry[], Map<string, any>[]> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): LogEntry[];
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): Map<string, any>[];
   }
   /**
    * Convert from to S or to V
    * @author tastybento
    *
    * @param
    * @param
    */
   export class AdapterInterface<S, V> {
      /**
       * Serialize object
       * @param object - object to serialize
       * @return serialized object
       */
      deserialize(object: any): S;
      /**
       * Deserialize object
       * @param object - object to deserialize
       * @return deserialized object
       */
      serialize(object: any): V;
   }
}
declare module 'world.bentobox.bentobox.api.addons' {
   import { WorldSettings } from 'world.bentobox.bentobox.api.configuration';
   import { Logger } from 'java.util.logging';
   import { PlayersManager, IslandsManager, AddonsManager } from 'world.bentobox.bentobox.managers';
   import { Class } from 'java.lang';
   import { Set, Optional, List, Map } from 'java.util';
   import { URLClassLoader } from 'java.net';
   import { InputStream, File } from 'java.io';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { AddonRequestHandler } from 'world.bentobox.bentobox.api.addons.request';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   import { CompositeCommand } from 'world.bentobox.bentobox.api.commands';
   import { State } from 'world.bentobox.bentobox.api.addons.Addon';
   /**
    * Defines the addon as a game mode.
    * A game mode creates worlds, registers world settings and has blueprints in a jar folder.
    * @author tastybento, Poslovitch
    */
   export class GameModeAddon extends Addon {
      /**
       * Make the worlds for this GameMode in this method. BentoBox will call it
       * after onLoad() and before onEnable(). Do not register flags in this method.
       * They ,ust be registered afterwards in onEnable()
       * {@link #islandWorld} must be created and assigned,
       * {@link #netherWorld} and {@link #endWorld} are optional and may be null.
       */
      createWorlds(): void;
      /**
       * @return WorldSettings for this GameMode
       */
      getWorldSettings(): WorldSettings;
      /**
       * @return the main player command for this Game Mode Addon
       * @since 1.1
       */
      getPlayerCommand(): Optional<CompositeCommand>;
      /**
       * @return the main admin command for this Game Mode Addon
       * @since 1.1
       */
      getAdminCommand(): Optional<CompositeCommand>;
      /**
       * Tells the Game Mode Addon to save its settings. Used when world settings are changed
       * in-game and need to be saved.
       * @since 1.4.0
       */
      saveWorldSettings(): void;
      /**
       * Defines if the game mode uses the latest {@link ChunkGenerator} API or
       * deprecated {@link ChunkGenerator#generateChunkData(World, java.util.Random, int, int, org.bukkit.generator.ChunkGenerator.BiomeGrid)} approach.
       * @return true if this game mode is a void world and should just be deleted as such
       */
      isUsesNewChunkGeneration(): boolean;
   }
   /**
    * Loads addons and sets up permissions
    * @author Tastybento, ComminQ
    */
   export class AddonClassLoader extends URLClassLoader {
      /**
       * This is a custom findClass that enables classes in other addons to be found
       * @param name - class name
       * @param checkGlobal - check globally or not when searching
       * @return Class - class if found
       */
      findClass(name: string, checkGlobal: boolean): Class<any>;
      /**
       * @return the addon
       */
      getAddon(): Addon;
      /**
       * @return class list
       */
      getClasses(): Set<string>;
   }
   /**
    * Add-on class for BentoBox. Extend this to create an add-on. The operation
    * and methods are very similar to Bukkit's JavaPlugin.
    *
    * @author tastybento, ComminQ_Q
    */
   export class Addon {
      /**
       * Executes code when enabling the addon.
       * This is called after {@link #onLoad()}.
       *
       * Note that commands and worlds registration must be done in {@link #onLoad()}, if need be.
       * Failure to do so will result in issues such as tab-completion not working for commands.
       */
      onEnable(): void;
      /**
       * Executes code when disabling the addon.
       */
      onDisable(): void;
      /**
       * Executes code when loading the addon.
       * This is called before {@link #onEnable()}.
       * This must be used to setup configuration, worlds and commands.
       */
      onLoad(): void;
      /**
       * Executes code when reloading the addon.
       */
      onReload(): void;
      getPlugin(): BentoBox;
      /**
       * @return Addon's data folder
       */
      getDataFolder(): File;
      /**
       * @return Addon's description
       */
      getDescription(): AddonDescription;
      /**
       * @return the file
       */
      getFile(): File;
      /**
       * @return Logger
       */
      getLogger(): Logger;
      isEnabled(): boolean;
      /**
       * Gets the current {@link State} of this Addon.
       * @return the current State of this Addon.
       * @since 1.1
       */
      getState(): State;
      /**
       * Saves the FileConfiguration retrievable by getConfig().
       */
      saveConfig(): void;
      /**
       * Discards any data in getConfig() and reloads from disk.
       * @since 1.13.0
       */
      reloadConfig(): void;
      /**
       * Saves the addon's config.yml file to the addon's data folder and loads it. If
       * the file exists already, it will not be replaced.
       */
      saveDefaultConfig(): void;
      /**
       * Saves a resource contained in this add-on's jar file to the addon's data
       * folder.
       *
       * @param resourcePath
       *            in jar file
       * @param replace
       *            - if true, will overwrite previous file
       */
      saveResource(resourcePath: string, replace: boolean): void;
      /**
       * Saves a resource contained in this add-on's jar file to the destination
       * folder.
       *
       * @param jarResource
       *            in jar file
       * @param destinationFolder
       *            on file system
       * @param replace
       *            - if true, will overwrite previous file
       * @param noPath
       *            - if true, the resource's path will be ignored when saving
       * @return file written, or null if none
       */
      saveResource(jarResource: string, destinationFolder: File, replace: boolean, noPath: boolean): File;
      /**
       * Get the resource from Jar file
       * @param jarResource - jar resource filename
       * @return resource or null if there is a problem
       */
      getResource(jarResource: string): InputStream;
      /**
       * Set the file that contains this addon
       *
       * @param f the file to set
       */
      setFile(file: File);
      /**
       * Set this addon's data folder
       *
       * @param file - data folder
       */
      setDataFolder(dataFolder: File);
      /**
       * Set this addons description
       *
       * @param description - description
       */
      setDescription(description: AddonDescription);
      /**
       * Sets the addon's state.
       * @param state the state to set
       */
      setState(state: State);
      /**
       * Get Players Manager
       * @return Players manager
       */
      getPlayers(): PlayersManager;
      /**
       * Get Islands Manager
       * @return Islands manager
       */
      getIslands(): IslandsManager;
      /**
       * Get Islands Manager
       * @return Islands manager
       * @see #getIslands()
       * @since 1.17.1
       */
      getIslandsManager(): IslandsManager;
      /**
       * Get the Addon By Name
       * @return Optional Addon
       */
      getAddonByName(name: string): Optional<Addon>;
      log(string: string): void;
      logWarning(string: string): void;
      logError(string: string): void;
      /**
       * Returns the permission prefix corresponding to this addon.
       * It contains the addon's name plus a trailing dot.
       * @return Permission prefix string
       */
      getPermissionPrefix(): string;
      /**
       * Register request handler to answer requests from plugins.
       * @param handler request handler
       */
      registerRequestHandler(handler: AddonRequestHandler): void;
      /**
       * Send request to addon.
       * @param label label
       * @param metaData meta data
       * @return request response, null if no response.
       */
      request(label: string, metaData: Map<string, any>): any;
      /**
       * Register a flag for this addon.
       * @param flag the flag to register.
       * @return `true` if the flag was registered successfully, `false` otherwise.
       * @since 1.5.0
       */
      registerFlag(flag: Flag): boolean;
      /**
       * Called when all addons have been loaded by BentoBox
       * @since 1.8.0
       */
      allLoaded(): void;
   }
   /**
    * @author tastybento, Poslovitch
    */
   export class AddonDescription {
      getName(): string;
      getMain(): string;
      getVersion(): string;
      getDescription(): string;
      getAuthors(): string[];
      /**
       * @return the dependencies
       */
      getDependencies(): string[];
      /**
       * @return the softDependencies
       */
      getSoftDependencies(): string[];
      /**
       * Returns whether the addon should be included in Metrics or not.
       * @return `true` if the addon should be included in Metrics reports, `false` otherwise.
       * @since 1.1
       */
      isMetrics(): boolean;
      /**
       * Returns the name of the GitHub repository of the addon.
       * It follows a `Owner/Name` format.
       * @return the name of the GitHub repository of the addon or an empty String.
       * @since 1.3.0
       */
      getRepository(): string;
      /**
       * Returns the minimum BentoBox version this addon requires in order to work properly.
       *
       * Examples:
       *
       *     `"1"` means that the addon relies on BentoBox `1.0.0` or higher.
       *     Similarly, `"2"` sets the requirement to BentoBox `2.0.0` or higher.
       *
       *         More specific versions can be provided:
       *
       *             `"1.10"` -> BentoBox `1.10.0` or higher.
       *             `"1.9.2"` -> BentoBox `1.9.2` or higher.
       *
       *
       *
       * Defaults to `"1"`.
       * @return the minimum BentoBox version this addon requires in order to work properly.
       */
      getApiVersion(): string;
      toString(): string;
   }
}
declare module 'world.bentobox.bentobox.api.panels.builders' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { Type } from 'world.bentobox.bentobox.api.panels.Panel';
   import { SortedMap, List, Map } from 'java.util';
   import {
      TemplatedPanel,
      Panel,
      Tab,
      PanelItem,
      TabbedPanel,
      PanelListener
   } from 'world.bentobox.bentobox.api.panels';
   import { File } from 'java.io';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { BiFunction } from 'java.util.function';
   import { ItemSlot } from 'world.bentobox.bentobox.api.panels.TemplatedPanel';
   import { PanelTemplateRecord, ItemTemplateRecord } from 'world.bentobox.bentobox.api.panels.reader';
   /**
    * Builds panels
    * @author tastybento
    *
    */
   export class PanelBuilder {
      name(name: string): PanelBuilder;
      /**
       * Add item to the panel in the last slot.
       * @param item - Panel item
       * @return PanelBuilder
       */
      item(item: PanelItem): PanelBuilder;
      /**
       * Add item into a specific slot. If it is already occupied, it will be replaced.
       * @param slot - slot
       * @param item - Panel item
       * @return PanelBuilder
       */
      item(slot: number, item: PanelItem): PanelBuilder;
      /**
       * Forces panel to be a specific number of slots.
       * @param size - size to be
       * @return PanelBuilder - PanelBuilder
       */
      size(size: number): PanelBuilder;
      /**
       * Sets the user who will get this panel. This will open it immediately when it is built
       * @param user - the User
       * @return PanelBuilder
       */
      user(user: User): PanelBuilder;
      /**
       * Sets which PanelListener will listen for clicks
       * @param listener - listener for this panel
       * @return PanelBuilder
       */
      listener(listener: PanelListener): PanelBuilder;
      /**
       * Sets which Panel.Type will be used.
       * Defaults to {@link Panel.Type#INVENTORY}.
       * @param type - Panel.Type for this panel.
       * @return PanelBuilder
       * @since 1.7.0
       */
      type(type: Type): PanelBuilder;
      /**
       * Get the next free slot number after the largest slot.
       * @return next slot number, or -1 in case none has been found.
       */
      nextSlot(): number;
      /**
       * Checks if a slot is occupied in the panel or not
       * @param slot to check
       * @return true or false
       */
      slotOccupied(slot: number): boolean;
      /**
       * Build the panel
       * @return Panel
       */
      build(): Panel;
      /**
       * @return the name
       */
      getName(): string;
      /**
       * @return the items
       */
      getItems(): SortedMap<number, PanelItem>;
      /**
       * @return the size
       */
      getSize(): number;
      /**
       * @return the user
       */
      getUser(): User;
      /**
       * @return the listener
       */
      getListener(): PanelListener;
      /**
       * @return the panelType
       * @since 1.7.0
       */
      getPanelType(): Type;
   }
   /**
    * Builds {@link TemplatedPanel}'s
    * @author BONNe
    * @since 1.17.3
    */
   export class TemplatedPanelBuilder {
      /**
       * Adds the template that must be loaded for Template panel builder.
       *
       * @param guiName the gui name
       * @param dataFolder the data folder
       * @return the template panel builder
       */
      template(guiName: string, dataFolder: File): TemplatedPanelBuilder;
      /**
       * Adds the template that must be loaded for Template panel builder.
       *
       * @param panelName the gui name
       * @param templateName the name of the file
       * @param dataFolder the data folder
       * @return the template panel builder
       * @since 1.20.0
       */
      template(panelName: string, templateName: string, dataFolder: File): TemplatedPanelBuilder;
      /**
       * Adds the user for template panel builder.
       *
       * @param user the user
       * @return the template panel builder
       */
      user(user: User): TemplatedPanelBuilder;
      /**
       * Parameters for title of templated panel.
       *
       * @param parameters the parameters for title
       * @return the templated panel builder
       * @since 1.20.0
       */
      parameters(...parameters: string[]): TemplatedPanelBuilder;
      /**
       * Adds the panel listener for template panel builder.
       *
       * @param listener the listener
       * @return the template panel builder
       */
      listener(listener: PanelListener): TemplatedPanelBuilder;
      /**
       * Registers new button type builder for template panel builder.
       *
       * @param type the type
       * @param buttonCreator the button creator
       * @return the template panel builder
       */
      registerTypeBuilder(
         type: string,
         buttonCreator: BiFunction<ItemTemplateRecord, ItemSlot, PanelItem>
      ): TemplatedPanelBuilder;
      /**
       * Build templated panel.
       *
       * @return the templated panel
       */
      build(): TemplatedPanel;
      /**
       * Gets panel template.
       *
       * @return the panel template
       */
      getPanelTemplate(): PanelTemplateRecord;
      /**
       * Gets user.
       *
       * @return the user
       */
      getUser(): User;
      /**
       * Get title parameters for panel title.
       *
       * @return the list of parameters for title.
       */
      getParameters(): string[];
      /**
       * Gets listener.
       *
       * @return the listener
       */
      getListener(): PanelListener;
      /**
       * Gets object creator map.
       *
       * @return the object creator map
       */
      getObjectCreatorMap(): Map<string, BiFunction<ItemTemplateRecord, ItemSlot, PanelItem>>;
   }
   /**
    * Builds {@link TabbedPanel}'s
    * @author tastybento
    * @since 1.6.0
    */
   export class TabbedPanelBuilder {
      /**
       * Forces panel to be a specific number of slots.
       * @param size - size to be
       * @return PanelBuilder - PanelBuilder
       */
      size(size: number): TabbedPanelBuilder;
      /**
       * Sets the user who will get this panel. This will open it immediately when it is built
       * @param user - the User
       * @return PanelBuilder
       */
      user(user: User): TabbedPanelBuilder;
      /**
       * Add a tab to the panel
       * @param slot - slot of panel (0 to 9)
       * @param tab - tab to show
       * @return TabbedPanelBuilder
       */
      tab(slot: number, tab: Tab): TabbedPanelBuilder;
      /**
       * The default tab to show
       * @param slot - slot value between 0 and 9
       * @return TabbedPanelBuilder
       */
      startingSlot(slot: number): TabbedPanelBuilder;
      /**
       * Hides the panel from view if there are no panel items in it
       * @return TabbedPanelBuilder
       */
      hideIfEmpty(): TabbedPanelBuilder;
      /**
       * Build the panel
       * @return Panel
       */
      build(): TabbedPanel;
      /**
       * @return the tabs
       */
      getTabs(): Map<number, Tab>;
      /**
       * @return the startingSlot
       */
      getStartingSlot(): number;
      /**
       * @return the size
       */
      getSize(): number;
      /**
       * @return the user
       */
      getUser(): User;
      /**
       * @return the hideIfEmpty
       */
      isHideIfEmpty(): boolean;
   }
   export class PanelItemBuilder {
      /**
       * Set icon to player's head
       * @param playerName - player's name
       * @return PanelItemBuilder
       */
      icon(playerName: string): PanelItemBuilder;
      name(name: string | null): PanelItemBuilder;
      /**
       * Sets amount of items in stack.
       * @param amount new amount of items.
       * @return PanelItemBuilder
       */
      amount(amount: number): PanelItemBuilder;
      /**
       * Adds a list of strings to the descriptions
       * @param description - List of strings
       * @return PanelItemBuilder
       */
      description(description: string[]): PanelItemBuilder;
      /**
       * Add any number of lines to the description
       * @param description strings of lines
       * @return PanelItemBuilder
       */
      description(...description: string[]): PanelItemBuilder;
      /**
       * Adds a line to the description
       * @param description - string
       * @return PanelItemBuilder
       */
      description(description: string): PanelItemBuilder;
      glow(glow: boolean): PanelItemBuilder;
      invisible(invisible: boolean): PanelItemBuilder;
      clickHandler(clickHandler: ClickHandler): PanelItemBuilder;
      build(): PanelItem;
      /**
       * @return the name
       */
      getName(): string | null;
      /**
       * @return the description
       */
      getDescription(): string[];
      /**
       * @return the glow
       */
      isGlow(): boolean;
      /**
       * @return the clickHandler
       */
      getClickHandler(): ClickHandler;
      /**
       * @return the playerHead
       */
      isPlayerHead(): boolean;
      /**
       * @return the playerHead
       * @since 1.9.0
       */
      getPlayerHeadName(): string;
      /**
       * @return the invisible
       */
      isInvisible(): boolean;
      /**
       * @return amount of items in stack.
       * @since 1.13.0
       */
      getAmount(): number;
   }
}
declare module 'world.bentobox.bentobox.api.localization' {
   import { Locale, Set, List } from 'java.util';
   /**
    * @author Poslovitch, tastybento
    */
   export class BentoBoxLocale {
      /**
       * Get text from the yml file for this locale
       * @param reference - the YAML node where the text is
       * @return Text for this locale reference or the reference if nothing has been found
       */
      get(reference: string): string;
      /**
       * Returns the locale language
       * @return the locale language
       */
      getLanguage(): string;
      /**
       * Returns the locale country
       * @return the locale country
       */
      getCountry(): string;
      /**
       * Returns the locale language tag (e.g: en-GB)
       * @return the locale language tag
       */
      toLanguageTag(): string;
      getAuthors(): string[];
      /**
       * Sets a reference and its value in the locale.
       * If the reference already exists, it will overwrite its value.
       * @param reference the reference to add, not null.
       * @param value the value to set, not null.
       * @since 1.6.0
       */
      set(reference: string, value: string): void;
      contains(reference: string): boolean;
      /**
       * Returns the list of prefixes available in this locale.
       * @return Set of prefixes available in this locale.
       * @since 1.13.0
       */
      getPrefixes(): Set<string>;
   }
   /**
    * Contains the common variables that can be used in texts.
    * @author Poslovitch
    */
   export class TextVariables {
      static readonly NAME: string;
      static readonly DISPLAY_NAME: string;
      static readonly DESCRIPTION: string;
      static readonly NUMBER: string;
      static readonly RANK: string;
      static readonly LABEL: string;
      static readonly PERMISSION: string;
      static readonly SPAWN_HERE: string;
      static readonly VERSION: string;
      static readonly START_TEXT: string;
      /**
       * @since 1.6.0
       */
      static readonly NEXT: string;
      /**
       * @since 1.10.0
       */
      static readonly UNIT: string;
      /**
       * @since 1.15.0
       */
      static readonly GAMEMODE: string;
      /**
       * Used for coordinates
       * @since 1.16.0
       */
      static readonly XYZ: string;
      /**
       * @since 1.17.2
       */
      static readonly UUID: string;
   }
}
declare module 'world.bentobox.bentobox.web.credits' {
   /**
    *
    * @since 1.9.0
    * @author Poslovitch
    */
   export class Contributor {
      constructor(name: string, commits: number);
      getName(): string;
      getCommits(): number;
      getURL(): string;
   }
}
declare module 'world.bentobox.bentobox.api.hooks' {
   /**
    * @author Poslovitch
    */
   export class Hook {
      /**
       * Returns the name of the plugin related to this Hook.
       * @return the plugin name.
       */
      getPluginName(): string;
      /**
       * Returns whether the plugin is available or not.
       * @return true if the plugin is available, false otherwise.
       */
      isPluginAvailable(): boolean;
      /**
       * Tries to hook into the plugin and returns whether it succeeded or not.
       * @return true if it successfully hooked into the plugin, false otherwise.
       */
      hook(): boolean;
      /**
       * Returns an explanation that will be sent to the user to tell them why the hook process did not succeed.
       * @return the probable causes why the hook process did not succeed.
       */
      getFailureCause(): string;
   }
}
declare module 'world.bentobox.bentobox.blueprints' {
   import { PasteState } from 'world.bentobox.bentobox.blueprints.BlueprintPaster';
   import { List } from 'java.util';
   import { Void } from 'java.lang';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   import { PasteHandler } from 'world.bentobox.bentobox.nms';
   /**
    * Stores all details of a blueprint
    * @author tastybento
    *
    */
   export class Blueprint {
      /**
       * @return the name
       */
      getName(): string;
      /**
       * @param name the name to set
       */
      setName(name: string);
      /**
       * @return the displayName
       */
      getDisplayName(): string;
      /**
       * @param displayName the displayName to set
       */
      setDisplayName(displayName: string);
      /**
       * @return the description
       */
      getDescription(): string[];
      /**
       * @param description the description to set
       */
      setDescription(description: string[]): void;
      /**
       * @param description the description to set
       */
      setDescription(description: string): void;
      /**
       * @return the xSize
       */
      getxSize(): number;
      /**
       * @param xSize the xSize to set
       */
      setxSize(xSize: number);
      /**
       * @return the ySize
       */
      getySize(): number;
      /**
       * @param ySize the ySize to set
       */
      setySize(ySize: number);
      /**
       * @return the zSize
       */
      getzSize(): number;
      /**
       * @param zSize the zSize to set
       */
      setzSize(zSize: number);
   }
   /**
    * This class pastes the clipboard it is given
    * @author tastybento
    *
    */
   export class BlueprintPaster {
      /**
       * The main pasting method
       */
      paste(): CompletableFuture<boolean>;
   }
   /**
    * The clipboard provides the holding spot for an active blueprint that is being
    * manipulated by a user. It supports copying from the world and setting of coordinates
    * such as the bounding box around the cuboid copy area.
    * Pasting is done by the {@link BlueprintPaster} class.
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintClipboard {
      /**
       * Create a clipboard for blueprint
       * @param blueprint - the blueprint to load into the clipboard
       */
      constructor(blueprint: Blueprint);
      constructor();
      /**
       * Copy the blocks between pos1 and pos2 into the clipboard for a user.
       * This will erase any previously registered data from the clipboard.
       * Copying is done async.
       * @param user - user
       * @return true if successful, false if pos1 or pos2 are undefined.
       */
      copy(user: User, copyAir: boolean, copyBiome: boolean): boolean;
      isFull(): boolean;
      /**
       * @return the blueprint
       */
      getBlueprint(): Blueprint | null;
      /**
       * @param blueprint the blueprint to set
       */
      setBlueprint(blueprint: Blueprint);
   }
}
declare module 'world.bentobox.bentobox.managers.island' {
   import { Set, Collection, UUID, Map } from 'java.util';
   import { Reason } from 'world.bentobox.bentobox.api.events.island.IslandEvent';
   import { Builder } from 'world.bentobox.bentobox.managers.island.NewIsland';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   /**
    * Create and paste a new island
    * @author tastybento
    *
    */
   export class NewIsland {
      constructor(builder: Builder);
      /**
       * @return the island that was created
       */
      getIsland(): Island;
      /**
       * Start building a new island
       * @return New island builder object
       */
      static builder(): Builder;
      /**
       * Makes an island.
       * @param oldIsland old island that is being replaced, if any
       * @throws IOException - if an island cannot be made. Message is the tag to show the user.
       */
      newIsland(oldIsland: Island): void;
   }
   /**
    * The default strategy for generating locations for island
    * @author tastybento, leonardochaia
    * @since 1.8.0
    *
    */
   export class DefaultNewIslandLocationStrategy extends NewIslandLocationStrategy {}
   /**
    * Determines the locations for new islands
    * @author tastybento, leonardochaia
    * @since 1.8.0
    *
    */
   export class NewIslandLocationStrategy {}
   /**
    * @author tastybento
    */
   export class IslandCache {
      constructor();
      /**
       * Adds an island to the grid
       * @param island island to add, not null
       * @return true if successfully added, false if not
       */
      addIsland(island: Island): boolean;
      /**
       * Adds a player's UUID to the look up for islands. Does no checking
       * @param uuid player's uuid
       * @param island island to associate with this uuid. Only one island can be associated per world.
       */
      addPlayer(uuid: UUID, island: Island): void;
      clear(): void;
      /**
       * Deletes an island from the cache.. Does not remove blocks
       * @param island island to delete
       * @return true if successful, false if not
       */
      deleteIslandFromCache(island: Island): boolean;
      /**
       * Delete island from the cache by ID. Does not remove blocks.
       * @param uniqueId - island unique ID
       */
      deleteIslandFromCache(uniqueId: string): void;
      /**
       * Returns an unmodifiable collection of all the islands (even those who may be unowned).
       * @return unmodifiable collection containing every island.
       */
      getIslands(): Collection<Island>;
      /**
       * Get the number of islands in the cache
       * @return the number of islands
       */
      size(): number;
      /**
       * Sets an island owner.
       * Clears out any other owner.
       * @param island island
       * @param newOwnerUUID new owner
       */
      setOwner(island: Island, newOwnerUUID: UUID | null): void;
      /**
       * Get the island by unique id
       * @param uniqueId unique id of the Island.
       * @return island or null if none found
       * @since 1.3.0
       */
      getIslandById(uniqueId: string): Island | null;
      /**
       * Removes an island from the cache completely without altering the island object
       * @param island - island to remove
       * @since 1.3.0
       */
      removeIsland(island: Island): void;
      /**
       * Get all the island ids
       * @return set of ids
       * @since 1.8.0
       */
      getAllIslandIds(): Set<string>;
   }
}
declare module 'world.bentobox.bentobox.api.flags.Flag' {
   import { ClickHandler } from 'world.bentobox.bentobox.api.panels.PanelItem';
   import { Set } from 'java.util';
   import { Enum } from 'java.lang';
   import { Addon, GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   /**
    * Defines the behavior and operation of the flag.
    */
   export class Type extends Enum<Type> {
      /**
       * Flag protecting an island.
       * It can be modified by the players (island owner).
       * It applies differently depending on the rank of the player who performs the action protected by the flag.
       */
      static readonly PROTECTION: Type;
      /**
       * Flag modifying parameters of the island.
       * It can be modified by the players (island owner).
       * This is usually an on/off setting.
       */
      static readonly SETTING: Type;
      /**
       * Flag applying to the world.
       * It can only be modified by administrators (permission or operator).
       * This is usually an on/off setting.
       */
      static readonly WORLD_SETTING: Type;
      static valueOf(name: string): Type;
      static values(): Type[];
   }
   /**
    * Defines the flag mode
    * @author tastybento
    * @since 1.6.0
    */
   export class Mode extends Enum<Mode> {
      /**
       * Flag should be shown in the basic settings
       */
      static readonly BASIC: Mode;
      /**
       * Flag should be shown in the advanced settings
       */
      static readonly ADVANCED: Mode;
      /**
       * Flag should be shown in the expert settings
       */
      static readonly EXPERT: Mode;
      /**
       * Flag should be shown in the top row if applicable
       */
      static readonly TOP_ROW: Mode;
      static valueOf(name: string): Mode;
      static values(): Mode[];
      /**
       * Get the next ranking mode above this one. If at the top, it cycles back to the bottom mode
       * @return next ranking mode
       */
      getNext(): Mode;
      /**
       * Get a list of ranks that are ranked greater than this rank
       * @param rank - rank to compare
       * @return true if ranked greater
       */
      isGreaterThan(rank: Mode): boolean;
   }
   /**
    * Builder for making flags
    * @author tastybento, Poslovitch
    */
   export class Builder {
      /**
       * The type of flag.
       * @param type {@link Type#PROTECTION}, {@link Type#SETTING} or {@link Type#WORLD_SETTING}
       * @return Builder
       */
      type(type: Type): Builder;
      /**
       * The click handler to use when this icon is clicked
       * @param clickHandler - click handler
       * @return Builder
       */
      clickHandler(clickHandler: ClickHandler): Builder;
      /**
       * Set the default setting for {@link Type#SETTING} or {@link Type#WORLD_SETTING} flags
       * @param defaultSetting - true or false
       * @return Builder
       */
      defaultSetting(defaultSetting: boolean): Builder;
      /**
       * Set the default rank for {@link Type#PROTECTION} flags
       * @param defaultRank - default rank
       * @return Builder
       */
      defaultRank(defaultRank: number): Builder;
      /**
       * Set that this flag icon will open up a sub-panel
       * @param usePanel - true or false
       * @return Builder
       */
      usePanel(usePanel: boolean): Builder;
      /**
       * Make this flag specific to this gameMode
       * @param gameModeAddon game mode addon
       * @return Builder
       */
      setGameMode(gameMode: GameModeAddon);
      /**
       * The addon registering this flag. Ensure this is set to enable the addon to be reloaded.
       * @param addon addon
       * @return Builder
       * @since 1.5.0
       */
      addon(addon: Addon): Builder;
      /**
       * Set a cooldown for {@link Type#SETTING} flag. Only applicable for settings.
       * @param cooldown in seconds
       * @return Builder
       * @since 1.6.0
       */
      cooldown(cooldown: number): Builder;
      /**
       * Set the flag difficulty mode.
       * Defaults to {@link Flag.Mode#EXPERT}.
       * @param mode - difficulty mode
       * @return Builder - flag builder
       * @since 1.6.0
       */
      mode(mode: Mode): Builder;
      /**
       * Add subflags and designate this flag as a parent flag.
       * Subflags have their state simultaneously changed with the parent flag.
       * Take extra care to ensure that subflags have the same number of possible values as the parent flag.
       * @param flags all Flags that are subflags
       * @return Builder - flag builder
       * @since 1.17.1
       */
      subflags(...flags: Flag[]): Builder;
      /**
       * Build the flag
       * @return Flag
       */
      build(): Flag;
   }
}
declare module 'world.bentobox.bentobox.api.commands.island.team' {
   import { UUID } from 'java.util';
   import { Type } from 'world.bentobox.bentobox.api.commands.island.team.Invite';
   /**
    * Represents an invite
    * @author tastybento
    * @since 1.8.0
    */
   export class Invite {
      /**
       * @param type - invitation type, e.g., coop, team, trust
       * @param inviter - UUID of inviter
       * @param invitee - UUID of invitee
       */
      constructor(type: Type, inviter: UUID, invitee: UUID);
      /**
       * @return the type
       */
      getType(): Type;
      /**
       * @return the inviter
       */
      getInviter(): UUID;
      /**
       * @return the invitee
       */
      getInvitee(): UUID;
      hashCode(): number;
      equals(obj: any): boolean;
   }
}
declare module 'world.bentobox.bentobox.lists' {
   import { GameModePlaceholderReplacer } from 'world.bentobox.bentobox.api.placeholders';
   import { Enum } from 'java.lang';
   import { List } from 'java.util';
   import { InvincibleVisitorsListener } from 'world.bentobox.bentobox.listeners.flags.worldsettings';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   /**
    * Contains built-in {@link Flag Flags} that are registered by default into the {@link world.bentobox.bentobox.managers.FlagsManager FlagsManager} at startup.
    */
   export class Flags {
      /**
       * Prevents players from breaking blocks on one's island.
       * @see BreakBlocksListener
       */
      static readonly BREAK_BLOCKS: Flag;
      /**
       * Prevents players from breaking spawners on one's island.
       * @see BreakBlocksListener
       * @since 1.13.0
       */
      static readonly BREAK_SPAWNERS: Flag;
      /**
       * Prevents players from breaking hoppers on one's island.
       * @see BreakBlocksListener
       * @since 1.14.0
       */
      static readonly BREAK_HOPPERS: Flag;
      /**
       * Prevents players from placing blocks on one's island.
       * @see PlaceBlocksListener
       */
      static readonly PLACE_BLOCKS: Flag;
      /**
       * Prevents players from generating Frosted Ice on one's island using "Frost Walker" enchanted boots.
       * @see PlaceBlocksListener
       */
      static readonly FROST_WALKER: Flag;
      static readonly ANVIL: Flag;
      static readonly BEACON: Flag;
      static readonly BED: Flag;
      static readonly BREWING: Flag;
      static readonly CHEST: Flag;
      static readonly BARREL: Flag;
      static readonly COMPOSTER: Flag;
      static readonly FLOWER_POT: Flag;
      static readonly SHULKER_BOX: Flag;
      static readonly TRAPPED_CHEST: Flag;
      static readonly DISPENSER: Flag;
      static readonly DROPPER: Flag;
      static readonly HOPPER: Flag;
      static readonly DOOR: Flag;
      static readonly TRAPDOOR: Flag;
      static readonly CRAFTING: Flag;
      static readonly ENCHANTING: Flag;
      static readonly FURNACE: Flag;
      static readonly GATE: Flag;
      static readonly NOTE_BLOCK: Flag;
      static readonly JUKEBOX: Flag;
      static readonly LEVER: Flag;
      static readonly BUTTON: Flag;
      static readonly REDSTONE: Flag;
      static readonly SPAWN_EGGS: Flag;
      static readonly ITEM_FRAME: Flag;
      static readonly CAKE: Flag;
      static readonly HIVE: Flag;
      static readonly CONTAINER: Flag;
      /**
       * Prevents players from interacting with the Dragon Egg.
       * @since 1.3.1
       * @see BlockInteractionListener
       * @see BreakBlocksListener
       */
      static readonly DRAGON_EGG: Flag;
      /**
       * Prevents players from placing a book on a lectern or taking the book from it.
       * @since 1.10.0
       * @see LecternListener
       */
      static readonly LECTERN: Flag;
      static readonly ARMOR_STAND: Flag;
      static readonly RIDING: Flag;
      /**
       * Prevents players from issuing any kind of interactions with Minecarts (entering, placing and opening if chest).
       * @since 1.3.0
       * @see EntityInteractListener
       * @see PlaceBlocksListener
       */
      static readonly MINECART: Flag;
      /**
       * Prevents players from issuing any kind of interactions with Boats (entering, placing).
       * @since 1.3.0
       * @see EntityInteractListener
       * @see PlaceBlocksListener
       */
      static readonly BOAT: Flag;
      static readonly TRADING: Flag;
      static readonly NAME_TAG: Flag;
      /**
       * @since 1.21
       */
      static readonly ALLAY: Flag;
      static readonly BREEDING: Flag;
      static readonly BUCKET: Flag;
      static readonly COLLECT_LAVA: Flag;
      static readonly COLLECT_WATER: Flag;
      /**
       * @since 1.21
       */
      static readonly COLLECT_POWDERED_SNOW: Flag;
      static readonly MILKING: Flag;
      static readonly FISH_SCOOPING: Flag;
      /**
       * @since 1.21
       */
      static readonly AXOLOTL_SCOOPING: Flag;
      static readonly CHORUS_FRUIT: Flag;
      static readonly ENDER_PEARL: Flag;
      static readonly CROP_TRAMPLE: Flag;
      static readonly PRESSURE_PLATE: Flag;
      static readonly TURTLE_EGGS: Flag;
      /**
       * Prevents players from throwing eggs.
       * @see EggListener
       */
      static readonly EGGS: Flag;
      /**
       * Prevents players from throwing potions / experience bottles.
       * @since 1.1
       * @see ThrowingListener
       */
      static readonly POTION_THROWING: Flag;
      /**
       * Prevents players from throwing experience bottles.
       * @since 1.3.1
       * @see ThrowingListener
       */
      static readonly EXPERIENCE_BOTTLE_THROWING: Flag;
      /**
       * Prevents players from starting fires using flint and steel or fire charges.
       * @since 1.3.0
       *
       * @see FireListener
       */
      static readonly FLINT_AND_STEEL: Flag;
      /**
       * Prevents players from priming TNT.
       * @since 1.5.0
       *
       * @see TNTListener
       */
      static readonly TNT_PRIMING: Flag;
      /**
       * Prevents players from extinguishing fires.
       * @see FireListener
       */
      static readonly FIRE_EXTINGUISH: Flag;
      static readonly MOUNT_INVENTORY: Flag;
      static readonly HURT_ANIMALS: Flag;
      static readonly HURT_MONSTERS: Flag;
      static readonly HURT_VILLAGERS: Flag;
      static readonly LEASH: Flag;
      /**
       * Prevents players from going through the Nether Portal.
       * @see PortalListener
       */
      static readonly NETHER_PORTAL: Flag;
      /**
       * Prevents players from going through the End Portal.
       * @see PortalListener
       */
      static readonly END_PORTAL: Flag;
      static readonly SHEARING: Flag;
      static readonly ITEM_DROP: Flag;
      static readonly ITEM_PICKUP: Flag;
      static readonly EXPERIENCE_PICKUP: Flag;
      static readonly COMMAND_RANKS: Flag;
      /**
       * Protects against visitors dying stuff, like sheep or signs
       *
       * @since 1.5.0
       * @see DyeListener
       */
      static readonly DYE: Flag;
      /**
       * Protects against visitors using elytra. By default, it is allowed.
       *
       * @since 1.6.0
       */
      static readonly ELYTRA: Flag;
      static readonly LOCK: Flag;
      /**
       * This flag allows choosing which island members can change island settings values.
       *
       * @since 1.20.0
       */
      static readonly CHANGE_SETTINGS: Flag;
      /**
       * This flag allows choosing which island member group can activate sculk sensors.
       * TODO: Enums#getIfPresent is used to support 1.18
       * @since 1.21.0
       */
      static readonly SCULK_SENSOR: Flag;
      /**
       * This flag allows choosing which island member group can activate sculk shrieker.
       * TODO: Enums#getIfPresent is used to support 1.18
       * @since 1.21.0
       */
      static readonly SCULK_SHRIEKER: Flag;
      static readonly PVP_OVERWORLD: Flag;
      static readonly PVP_NETHER: Flag;
      static readonly PVP_END: Flag;
      /**
       * Prevents fire from burning blocks.
       * @since 1.3.0
       * @see FireListener
       */
      static readonly FIRE_BURNING: Flag;
      /**
       * Prevents fire from being ignited by non-players.
       * @since 1.3.0
       * @see FireListener
       */
      static readonly FIRE_IGNITE: Flag;
      /**
       * Prevents fire from spreading to other blocks.
       * @see FireListener
       */
      static readonly FIRE_SPREAD: Flag;
      /**
       * @deprecated see {@link #ANIMAL_NATURAL_SPAWN} and {@link #ANIMAL_SPAWNERS_SPAWN}.
       * @since 1.14.0
       */
      static readonly ANIMAL_SPAWN: Flag;
      /**
       * @deprecated see {@link #MONSTER_NATURAL_SPAWN} and {@link #MONSTER_SPAWNERS_SPAWN}.
       * @since 1.14.0
       */
      static readonly MONSTER_SPAWN: Flag;
      /**
       * Toggles animal natural spawning.
       * @since 1.14.0
       * @see MobSpawnListener
       */
      static readonly ANIMAL_NATURAL_SPAWN: Flag;
      /**
       * Toggles animal spawning with spawners.
       * @since 1.14.0
       * @see MobSpawnListener
       */
      static readonly ANIMAL_SPAWNERS_SPAWN: Flag;
      /**
       * Toggles monster natural spawning.
       * @since 1.14.0
       * @see MobSpawnListener
       */
      static readonly MONSTER_NATURAL_SPAWN: Flag;
      /**
       * Toggles monster spawning with spawners.
       * @since 1.14.0
       * @see MobSpawnListener
       */
      static readonly MONSTER_SPAWNERS_SPAWN: Flag;
      /**
       * If `false`, prevents leaves from disappearing.
       * @since 1.3.1
       * @see DecayListener
       */
      static readonly LEAF_DECAY: Flag;
      /**
       * If `false`, prevents TNT from breaking blocks and damaging nearby entities.
       * @since 1.5.0
       * @see TNTListener
       */
      static readonly TNT_DAMAGE: Flag;
      /**
       * If `false`, prevents Block Explode from breaking blocks and damaging nearby entities.
       * @since 1.19.1
       * @see TNTListener
       */
      static readonly BLOCK_EXPLODE_DAMAGE: Flag;
      /**
       * If `false`, prevents TNT from breaking blocks and damaging nearby entities outside of island boundaries.
       * @since 1.15.3
       * @see TNTListener
       */
      static readonly WORLD_TNT_DAMAGE: Flag;
      /**
       * If `false`, prevents Block Explode from breaking blocks and damaging nearby entities outside of island boundaries.
       * @since 1.19.1
       * @see TNTListener
       */
      static readonly WORLD_BLOCK_EXPLODE_DAMAGE: Flag;
      static readonly ENDER_CHEST: Flag;
      static readonly ENDERMAN_GRIEFING: Flag;
      /**
       * If `false`, prevents Endermans from teleporting
       * @since 1.22.1
       */
      static readonly ENDERMAN_TELEPORT: Flag;
      /**
       * If `false`, prevents Shulkers from teleporting
       * Uses same listener as ENDERMAN_TELEPORT
       * @since 1.22.1
       */
      static readonly SHULKER_TELEPORT: Flag;
      static readonly ENTER_EXIT_MESSAGES: Flag;
      static readonly PISTON_PUSH: Flag;
      static readonly INVINCIBLE_VISITORS: Flag;
      static readonly GEO_LIMIT_MOBS: Flag;
      /**
       * @since 1.12.0
       */
      static readonly LIMIT_MOBS: Flag;
      static readonly REMOVE_MOBS: Flag;
      static readonly ITEM_FRAME_DAMAGE: Flag;
      static readonly ISLAND_RESPAWN: Flag;
      /**
       * If disabled, prevents redstone from operating on islands whose members are offline.
       * @see OfflineRedstoneListener
       */
      static readonly OFFLINE_REDSTONE: Flag;
      /**
       * If disabled, prevents crops/plants from growing on islands whose members are offline.
       * @since 1.4.0
       * @see OfflineGrowthListener
       */
      static readonly OFFLINE_GROWTH: Flag;
      static readonly CLEAN_SUPER_FLAT: Flag;
      static readonly CHEST_DAMAGE: Flag;
      static readonly CREEPER_DAMAGE: Flag;
      /**
       * Prevents visitors from triggering a creeper to blow up an island.
       * @see CreeperListener
       */
      static readonly CREEPER_GRIEFING: Flag;
      static readonly COARSE_DIRT_TILLING: Flag;
      static readonly PREVENT_TELEPORT_WHEN_FALLING: Flag;
      static readonly OBSIDIAN_SCOOPING: Flag;
      /**
       * Toggles whether liquids can flow outside an island's protection range or not.
       * It is disabled by default in order to avoid cobblestone/stone/obsidian being generated outside an island's protection range and remaining unbreakable by players.
       * Liquids will still flow vertically, however they won't spread horizontally if they're placed outside an island's protection range.
       *
       * @since 1.3.0
       * @see LiquidsFlowingOutListener
       */
      static readonly LIQUIDS_FLOWING_OUT: Flag;
      /**
       * Enables toggling for removal of the end exit island. May not be required on some servers, e.g. PaperSpigot.
       * @since 1.3.0
       * @see world.bentobox.bentobox.listeners.BlockEndDragon
       */
      static readonly REMOVE_END_EXIT_ISLAND: Flag;
      /**
       * Toggles whether trees can grow outside an island's protection range or not.
       * Not only will it prevent saplings placed outside an island's protection range from growing, but it will also block generation of leaves/logs outside of it, thus "cutting" the tree.
       * It is disabled by default in order to avoid leaves/logs being generated outside an island's protection range and remaining unbreakable by players.
       *
       * @since 1.3.0
       * @see TreesGrowingOutsideRangeListener
       */
      static readonly TREES_GROWING_OUTSIDE_RANGE: Flag;
      /**
       * Toggles whether monsters and animals can spawn naturally outside an island's protection range or not.
       * It is allowed by default.
       *
       * @since 1.3.0
       * @see NaturalSpawningOutsideRangeListener
       */
      static readonly NATURAL_SPAWNING_OUTSIDE_RANGE: Flag;
      /**
       * Toggles wither explosion damage
       * @since 1.6.0
       * @see WitherListener
       */
      static readonly WITHER_DAMAGE: Flag;
      /**
       * Toggles whether players can change a spawner's entity using spawn eggs.
       * @since 1.7.0
       * @see SpawnerSpawnEggsListener
       */
      static readonly SPAWNER_SPAWN_EGGS: Flag;
      /**
       * Keeps pets on the player's island.
       * @since 1.16.0
       * @see PetTeleportListener
       */
      static readonly PETS_STAY_AT_HOME: Flag;
      /**
       * Toggles whether island visitors keep their items if they die on another player's island.
       * @since 1.17.0
       * @see VisitorKeepInventoryListener
       */
      static readonly VISITOR_KEEP_INVENTORY: Flag;
      /**
       * Toggles whether island visitors can trigger to start a raid on another player's island.
       * @since 1.21.0
       * @see VisitorsStartingRaidListener
       */
      static readonly VISITOR_TRIGGER_RAID: Flag;
      /**
       * Toggles whether entities can teleport between dimensions using portals.
       * @since 1.21.0
       * @see world.bentobox.bentobox.listeners.teleports.EntityTeleportListener
       */
      static readonly ENTITY_PORTAL_TELEPORT: Flag;
      /**
       * Harvest Setting
       * Controls who gets to harvest any crop related contents. e.g. Wheat, Sugar Cane, melon blocks, not stems, pumpkin blocks, etc.
       * @since 1.23.0
       */
      static readonly HARVEST: Flag;
      /**
       * Crop Planting
       * Controls who gets to plant crops on tilled soil.
       * @since 1.23.0
       */
      static readonly CROP_PLANTING: Flag;
      /**
       * Provides a list of all the Flag instances contained in this class using reflection.
       * Deprecated Flags are ignored.
       * @return List of all the flags in this class
       */
      static values(): Flag[];
   }
   export class GameModePlaceholder extends Enum<GameModePlaceholder> {
      /**
       * World friendly name
       */
      static readonly WORLD_FRIENDLY_NAME: GameModePlaceholder;
      /**
       * Returns the amount of islands in the world.
       * @since 1.5.0
       */
      static readonly WORLD_ISLANDS: GameModePlaceholder;
      static readonly ISLAND_DISTANCE: GameModePlaceholder;
      /**
       * Returns the island distance as a diameter (it is therefore equivalent to twice the island distance).
       * @since 1.5.0
       */
      static readonly ISLAND_DISTANCE_DIAMETER: GameModePlaceholder;
      /**
       * Returns the island's protection range.
       * @since 1.4.0
       */
      static readonly ISLAND_PROTECTION_RANGE: GameModePlaceholder;
      /**
       * Returns the island's protection range as a diameter (it is therefore equivalent to twice the island protection range).
       * @since 1.5.0
       */
      static readonly ISLAND_PROTECTION_RANGE_DIAMETER: GameModePlaceholder;
      static readonly ISLAND_OWNER: GameModePlaceholder;
      static readonly ISLAND_CREATION_DATE: GameModePlaceholder;
      static readonly ISLAND_NAME: GameModePlaceholder;
      /**
       * Return island unique ID
       * @since 1.15.4
       */
      static readonly ISLAND_UUID: GameModePlaceholder;
      /**
       * Returns the coordinates of the island's center.
       * @since 1.5.0
       */
      static readonly ISLAND_CENTER: GameModePlaceholder;
      /**
       * Returns the X coordinate of the island's center.
       * @since 1.5.0
       */
      static readonly ISLAND_CENTER_X: GameModePlaceholder;
      /**
       * Returns the Y coordinate of the island's center.
       * @since 1.5.0
       */
      static readonly ISLAND_CENTER_Y: GameModePlaceholder;
      /**
       * Returns the Z coordinate of the island's center.
       * @since 1.5.0
       */
      static readonly ISLAND_CENTER_Z: GameModePlaceholder;
      /**
       * Returns the coordinates of the island's location, which may be different to the center.
       * @since 1.16.0
       */
      static readonly ISLAND_LOCATION: GameModePlaceholder;
      /**
       * Returns the X coordinate of the island's location.
       * @since 1.16.0
       */
      static readonly ISLAND_LOCATION_X: GameModePlaceholder;
      /**
       * Returns the Y coordinate of the island's location.
       * @since 1.16.0
       */
      static readonly ISLAND_LOCATION_Y: GameModePlaceholder;
      /**
       * Returns the Z coordinate of the island's location.
       * @since 1.16.0
       */
      static readonly ISLAND_LOCATION_Z: GameModePlaceholder;
      /**
       * Returns the maximum number of members the island can have
       * @since 1.5.0
       */
      static readonly ISLAND_MEMBERS_MAX: GameModePlaceholder;
      /**
       * Returns the amount of players that are at least MEMBER on this island.
       * @since 1.5.0
       */
      static readonly ISLAND_MEMBERS_COUNT: GameModePlaceholder;
      /**
       * Returns a comma separated list of player names that are at least MEMBER on this island.
       * @since 1.13.0
       */
      static readonly ISLAND_MEMBERS_LIST: GameModePlaceholder;
      /**
       * Returns the amount of players that are TRUSTED on this island.
       * @since 1.5.0
       */
      static readonly ISLAND_TRUSTEES_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players that are TRUSTED on this island.
       * @since 1.5.0
       */
      static readonly ISLAND_COOPS_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players that are currently visiting the island.
       * @since 1.5.0
       */
      static readonly ISLAND_VISITORS_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players banned from the island.
       * @since 1.5.0
       */
      static readonly ISLAND_BANS_COUNT: GameModePlaceholder;
      /**
       * Returns the protection range of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_PROTECTION_RANGE: GameModePlaceholder;
      /**
       * Returns the protection range of the island the player is standing on as a diameter.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_PROTECTION_RANGE_DIAMETER: GameModePlaceholder;
      /**
       * Returns the name of the owner of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_OWNER: GameModePlaceholder;
      /**
       * Returns the formatted creation date of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_CREATION_DATE: GameModePlaceholder;
      /**
       * Returns the name of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_NAME: GameModePlaceholder;
      /**
       * Returns the coordinates of the center of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_CENTER: GameModePlaceholder;
      /**
       * Returns the X coordinate of the center of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_CENTER_X: GameModePlaceholder;
      /**
       * Returns the Y coordinate of the center of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_CENTER_Y: GameModePlaceholder;
      /**
       * Returns the Z coordinate of the center of the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_CENTER_Z: GameModePlaceholder;
      /**
       * Returns the coordinates of the location of the island the player is standing on.
       * @since 1.16.0
       */
      static readonly VISITED_ISLAND_LOCATION: GameModePlaceholder;
      /**
       * Returns the X coordinate of the location of the island the player is standing on.
       * @since 1.16.0
       */
      static readonly VISITED_ISLAND_LOCATION_X: GameModePlaceholder;
      /**
       * Returns the Y coordinate of the location of the island the player is standing on.
       * @since 1.16.0
       */
      static readonly VISITED_ISLAND_LOCATION_Y: GameModePlaceholder;
      /**
       * Returns the Z coordinate of the location of the island the player is standing on.
       * @since 1.16.0
       */
      static readonly VISITED_ISLAND_LOCATION_Z: GameModePlaceholder;
      /**
       * Returns the maximum number of members the island the player is standing on can have.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_MEMBERS_MAX: GameModePlaceholder;
      /**
       * Returns a comma separated list of player names that are at least MEMBER on the island the player is standing on.
       * @since 1.13.0
       */
      static readonly VISITED_ISLAND_MEMBERS_LIST: GameModePlaceholder;
      /**
       * Returns the amount of players that are at least MEMBER on the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_MEMBERS_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players that are TRUSTED on the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_TRUSTEES_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players that are TRUSTED on the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_COOPS_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players that are currently visiting the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_VISITORS_COUNT: GameModePlaceholder;
      /**
       * Returns the amount of players banned from the island the player is standing on.
       * @since 1.5.2
       */
      static readonly VISITED_ISLAND_BANS_COUNT: GameModePlaceholder;
      /**
       * Get the visited island unique ID
       * @since 1.15.4
       */
      static readonly VISITED_ISLAND_UUID: GameModePlaceholder;
      /**
       * Returns whether this player has an island or not.
       * @since 1.5.0
       */
      static readonly HAS_ISLAND: GameModePlaceholder;
      /**
       * Returns the rank this player has on his island.
       * @since 1.5.0
       */
      static readonly RANK: GameModePlaceholder;
      /**
       * Returns how many times this player reset his island.
       * @since 1.5.0
       */
      static readonly RESETS: GameModePlaceholder;
      /**
       * Returns how many times this player can reset his island.
       * `-1` is unlimited.
       * @since 1.5.0
       */
      static readonly RESETS_LEFT: GameModePlaceholder;
      /**
       * Returns how many times this player died.
       * @since 1.12.0
       */
      static readonly DEATHS: GameModePlaceholder;
      /**
       * Returns whether this player is on his island and has a rank greater than VISITOR_RANK
       * @since 1.13.0
       */
      static readonly ON_ISLAND: GameModePlaceholder;
      /**
       * Returns whether this player is an owner of their island
       * @since 1.14.0
       */
      static readonly OWNS_ISLAND: GameModePlaceholder;
      static valueOf(name: string): GameModePlaceholder;
      static values(): GameModePlaceholder[];
      getPlaceholder(): string;
      /**
       * @since 1.5.0
       */
      getReplacer(): GameModePlaceholderReplacer;
   }
}
declare module 'world.bentobox.bentobox.database' {
   import { Logger } from 'java.util.logging';
   import { Runnable, Class } from 'java.lang';
   import { List, Queue } from 'java.util';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Addon } from 'world.bentobox.bentobox.api.addons';
   /**
    * Handy class to store and load Java POJOs in the Database
    * @author tastybento
    *
    * @param
    */
   export class Database<T> {
      /**
       * Construct a database
       * @param plugin - plugin
       * @param type - to store this type
       */
      constructor(plugin: BentoBox, type: Class<T>);
      /**
       * Construct a database
       * @param addon - addon requesting
       * @param type - to store this type
       */
      constructor(addon: Addon, type: Class<T>);
      /**
       * Load all the config objects and supply them as a list
       * @return list of config objects or an empty list if they cannot be loaded
       */
      loadObjects(): T[];
      /**
       * Loads the config object
       * @param uniqueId - unique id of the object
       * @return the object or null if it cannot be loaded
       */
      loadObject(uniqueId: string): T | null;
      /**
       * Save object async. Saving may be done sync, depending on the underlying database.
       * @param instance to save
       * @return Completable future that results in true if successful.
       * @since 1.13.0
       */
      saveObjectAsync(instance: T): CompletableFuture<boolean>;
      /**
       * Save object. Saving is done async. Same as {@link #saveObjectAsync(Object)}, which is recommended.
       * @param instance to save
       * @return true - always.
       * @since 1.13.0
       */
      saveObject(instance: T): boolean;
      /**
       * Checks if a config object exists or not
       * @param name - unique name of the config object
       * @return true if it exists
       */
      objectExists(name: string): boolean;
      /**
       * Attempts to delete the object with the uniqueId
       * @param uniqueId - uniqueId of object
       * @since 1.1
       */
      deleteID(uniqueId: string): void;
      /**
       * Delete object from database
       * @param object - object to delete
       */
      deleteObject(object: T): void;
      /**
       * Close the database
       */
      close(): void;
   }
   /**
    * @author Poslovitch, tastybento
    */
   export class DatabaseSetup {
      /**
       * Gets the type of database being used.
       * Currently supported options are YAML, JSON, MYSQL, MARIADB and MONGODB.
       * Default is JSON.
       * @return Database type
       */
      static getDatabase(): DatabaseSetup;
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
   /**
    * Creates a connection to a database.
    */
   export class DatabaseConnector {
      /**
       * Establishes a new connection to the database
       *
       * @param type of class
       * @return A new connection to the database using the settings provided
       */
      createConnection(type: Class<any>): any;
      /**
       * Close the database connection
       * @param type of class being closed
       */
      closeConnection(type: Class<any>): void;
      /**
       * Returns the connection url
       *
       * @return the connector's URL
       */
      getConnectionUrl(): string;
      /**
       * Looks through the database (or files) and returns a known unique key
       *
       * @param tableName - name of the table
       * @return a unique key for this record
       */
      getUniqueId(tableName: string): string;
      /**
       * Check if a key exists in the database in this table or not
       *
       * @param tableName - name of the table
       * @param key       - key to check
       * @return true if it exists
       */
      uniqueIdExists(tableName: string, key: string): boolean;
   }
   /**
    * An abstract class that handles insert/select-operations into/from a database
    *
    * @author tastybento
    *
    * @param
    */
   export class AbstractDatabaseHandler<T> {
      /**
       * Get the addon that is accessing the database, if any. May be null.
       * @return the addon
       */
      getAddon(): Addon | null;
      /**
       * Set the addon that is accessing the database, if any.
       * @param addon the addon to set
       */
      setAddon(addon: Addon | null);
      /**
       * Loads all the records in this table and returns a list of them
       * @return list of
       */
      loadObjects(): T[];
      /**
       * Creates a  filled with values from the corresponding
       * database file
       * @param uniqueId - unique ID
       * @return
       */
      loadObject(uniqueId: string): T | null;
      /**
       * Save T into the corresponding database
       *
       * @param instance that should be inserted into the database
       */
      saveObject(instance: T): CompletableFuture<boolean>;
      /**
       * Deletes the object with the unique id from the database. If the object does not exist, it will fail silently.
       * Use {@link #objectExists(String)} if you need to know if the object is in the database beforehand.
       * @param instance - object instance
       */
      deleteObject(instance: T): void;
      /**
       * Checks if a unique id exists or not
       * @param uniqueId - uniqueId to check
       * @return true if this uniqueId exists
       */
      objectExists(uniqueId: string): boolean;
      /**
       * Closes the database
       */
      close(): void;
      /**
       * Attempts to delete the object with the uniqueId. If the object does not exist, it will fail silently.
       * Use {@link #objectExists(String)} if you need to know if the object is in the database beforehand.
       * @param uniqueId - uniqueId of object
       * @since 1.1
       */
      deleteID(uniqueId: string): void;
   }
}
declare module 'world.bentobox.bentobox' {
   import { ConfigObject } from 'world.bentobox.bentobox.api.configuration';
   import { Set, UUID, Map } from 'java.util';
   import { DatabaseType } from 'world.bentobox.bentobox.database.DatabaseSetup';
   /**
    * @author Poslovitch
    */
   export class BStats {
      /**
       * Increases the count of islands that got create since the last "data get" request from BStats.
       * @since 1.1
       */
      increaseIslandsCreatedCount(): void;
      /**
       * Adds given UUID to the connected player set.
       * @param uuid UUID of a player who logins.
       * @since 1.17.1
       */
      addPlayer(uuid: UUID): void;
   }
   /**
    * All the plugin settings are here
    *
    * @author tastybento
    */
   export class Settings extends ConfigObject {
      getDefaultLanguage(): string;
      setDefaultLanguage(defaultLanguage: string);
      isUseEconomy(): boolean;
      setUseEconomy(useEconomy: boolean): void;
      getDatabaseType(): DatabaseType;
      setDatabaseType(databaseType: DatabaseType);
      getDatabaseHost(): string;
      setDatabaseHost(databaseHost: string);
      getDatabasePort(): number;
      /**
       * This method returns the useSSL value.
       * @return the value of useSSL.
       * @since 1.12.0
       */
      isUseSSL(): boolean;
      /**
       * This method sets the useSSL value.
       * @param useSSL the useSSL new value.
       * @since 1.12.0
       */
      setUseSSL(useSSL: boolean): void;
      setDatabasePort(databasePort: number);
      getDatabaseName(): string;
      setDatabaseName(databaseName: string);
      getDatabaseUsername(): string;
      setDatabaseUsername(databaseUsername: string);
      getDatabasePassword(): string;
      setDatabasePassword(databasePassword: string);
      getDatabaseBackupPeriod(): number;
      setDatabaseBackupPeriod(databaseBackupPeriod: number);
      /**
       * @since 1.15.3
       */
      getMaxSavedPlayersPerTick(): number;
      /**
       * @since 1.15.3
       */
      setMaxSavedPlayersPerTick(maxSavedPlayersPerTick: number);
      /**
       * @since 1.15.3
       */
      getMaxSavedIslandsPerTick(): number;
      /**
       * @since 1.15.3
       */
      setMaxSavedIslandsPerTick(maxSavedIslandsPerTick: number);
      getFakePlayers(): Set<string>;
      setFakePlayers(fakePlayers: Set<string>);
      isClosePanelOnClickOutside(): boolean;
      setClosePanelOnClickOutside(closePanelOnClickOutside: boolean): void;
      getInviteCooldown(): number;
      setInviteCooldown(inviteCooldown: number);
      getCoopCooldown(): number;
      setCoopCooldown(coopCooldown: number);
      getTrustCooldown(): number;
      setTrustCooldown(trustCooldown: number);
      getBanCooldown(): number;
      setBanCooldown(banCooldown: number);
      getResetCooldown(): number;
      setResetCooldown(resetCooldown: number);
      getConfirmationTime(): number;
      setConfirmationTime(confirmationTime: number);
      isKickConfirmation(): boolean;
      setKickConfirmation(kickConfirmation: boolean): void;
      isLeaveConfirmation(): boolean;
      setLeaveConfirmation(leaveConfirmation: boolean): void;
      isResetConfirmation(): boolean;
      setResetConfirmation(resetConfirmation: boolean): void;
      getNameMinLength(): number;
      setNameMinLength(nameMinLength: number);
      getNameMaxLength(): number;
      setNameMaxLength(nameMaxLength: number);
      /**
       * @since 1.7.0
       */
      isNameUniqueness(): boolean;
      /**
       * @since 1.7.0
       */
      setNameUniqueness(nameUniqueness: boolean): void;
      /**
       * @param pasteSpeed the pasteSpeed to set
       */
      setPasteSpeed(pasteSpeed: number);
      /**
       * @return paste speed in blocks per tick
       */
      getPasteSpeed(): number;
      /**
       * @return the deleteSpeed
       * @since 1.7.0
       */
      getDeleteSpeed(): number;
      /**
       * @param deleteSpeed the deleteSpeed to set
       * @since 1.7.0
       */
      setDeleteSpeed(deleteSpeed: number);
      isEnableAutoOwnershipTransfer(): boolean;
      setEnableAutoOwnershipTransfer(enableAutoOwnershipTransfer: boolean): void;
      getAutoOwnershipTransferInactivityThreshold(): number;
      setAutoOwnershipTransferInactivityThreshold(autoOwnershipTransferInactivityThreshold: number);
      isAutoOwnershipTransferIgnoreRanks(): boolean;
      setAutoOwnershipTransferIgnoreRanks(autoOwnershipTransferIgnoreRanks: boolean): void;
      isLogCleanSuperFlatChunks(): boolean;
      setLogCleanSuperFlatChunks(logCleanSuperFlatChunks: boolean): void;
      isResetCooldownOnCreate(): boolean;
      setResetCooldownOnCreate(resetCooldownOnCreate: boolean): void;
      isGithubDownloadData(): boolean;
      setGithubDownloadData(githubDownloadData: boolean): void;
      getGithubConnectionInterval(): number;
      setGithubConnectionInterval(githubConnectionInterval: number);
      isCheckBentoBoxUpdates(): boolean;
      setCheckBentoBoxUpdates(checkBentoBoxUpdates: boolean): void;
      isCheckAddonsUpdates(): boolean;
      setCheckAddonsUpdates(checkAddonsUpdates: boolean): void;
      isLogGithubDownloadData(): boolean;
      setLogGithubDownloadData(logGithubDownloadData: boolean): void;
      getDelayTime(): number;
      /**
       * @param delayTime the delayTime to set
       */
      setDelayTime(delayTime: number);
      /**
       * @return the clearRadius
       */
      getClearRadius(): number;
      /**
       * @param clearRadius the clearRadius to set. Cannot be negative.
       */
      setClearRadius(clearRadius: number);
      /**
       * @return the inviteConfirmation
       * @since 1.8.0
       */
      isInviteConfirmation(): boolean;
      /**
       * @param inviteConfirmation the inviteConfirmation to set
       * @since 1.8.0
       */
      setInviteConfirmation(inviteConfirmation: boolean): void;
      /**
       * @return the databasePrefix
       */
      getDatabasePrefix(): string;
      /**
       * @param databasePrefix the databasePrefix to set
       */
      setDatabasePrefix(databasePrefix: string);
      /**
       * Returns whether islands, when reset, should be kept or deleted.
       * @return `true` if islands, when reset, should be kept; `false` otherwise.
       * @since 1.13.0
       */
      isKeepPreviousIslandOnReset(): boolean;
      /**
       * Sets whether islands, when reset, should be kept or deleted.
       * @param keepPreviousIslandOnReset `true` if islands, when reset, should be kept; `false` otherwise.
       * @since 1.13.0
       */
      setKeepPreviousIslandOnReset(keepPreviousIslandOnReset: boolean): void;
      /**
       * Returns a MongoDB client connection URI to override default connection options.
       *
       * @return mongodb client connection.
       * @see MongoDB Documentation
       * @since 1.14.0
       */
      getMongodbConnectionUri(): string;
      /**
       * Set the MongoDB client connection URI.
       * @param mongodbConnectionUri connection URI.
       * @since 1.14.0
       */
      setMongodbConnectionUri(mongodbConnectionUri: string);
      /**
       * Method Settings#getPlayerHeadCacheTime returns the playerHeadCacheTime of this object.
       *
       * @return the playerHeadCacheTime (type long) of this object.
       * @since 1.14.1
       */
      getPlayerHeadCacheTime(): number;
      /**
       * Method Settings#setPlayerHeadCacheTime sets new value for the playerHeadCacheTime of this object.
       * @param playerHeadCacheTime new value for this object.
       * @since 1.14.1
       */
      setPlayerHeadCacheTime(playerHeadCacheTime: number);
      /**
       * Is use cache server boolean.
       *
       * @return the boolean
       * @since 1.16.0
       */
      isUseCacheServer(): boolean;
      /**
       * Sets use cache server.
       *
       * @param useCacheServer the use cache server
       * @since 1.16.0
       */
      setUseCacheServer(useCacheServer: boolean): void;
      /**
       * Gets heads per call.
       *
       * @return the heads per call
       * @since 1.16.0
       */
      getHeadsPerCall(): number;
      /**
       * Sets heads per call.
       *
       * @param headsPerCall the heads per call
       * @since 1.16.0
       */
      setHeadsPerCall(headsPerCall: number);
      /**
       * Gets ticks between calls.
       *
       * @return the ticks between calls
       * @since 1.16.0
       */
      getTicksBetweenCalls(): number;
      /**
       * Sets ticks between calls.
       *
       * @param ticksBetweenCalls the ticks between calls
       * @since 1.16.0
       */
      setTicksBetweenCalls(ticksBetweenCalls: number);
      /**
       * @return the minPortalSearchRadius
       */
      getMinPortalSearchRadius(): number;
      /**
       * @param minPortalSearchRadius the minPortalSearchRadius to set
       */
      setMinPortalSearchRadius(minPortalSearchRadius: number);
      /**
       * Gets safe spot search vertical range.
       *
       * @return the safe spot search vertical range
       */
      getSafeSpotSearchVerticalRange(): number;
      /**
       * Sets safe spot search vertical range.
       *
       * @param safeSpotSearchVerticalRange the safe spot search vertical range
       */
      setSafeSpotSearchVerticalRange(safeSpotSearchVerticalRange: number);
      /**
       * Is slow deletion boolean.
       *
       * @return the boolean
       */
      isSlowDeletion(): boolean;
      /**
       * Sets slow deletion.
       *
       * @param slowDeletion the slow deletion
       */
      setSlowDeletion(slowDeletion: boolean): void;
      /**
       * Gets maximum pool size.
       *
       * @return the maximum pool size
       */
      getMaximumPoolSize(): number;
      /**
       * Gets safe spot search range.
       *
       * @return the safe spot search range
       */
      getSafeSpotSearchRange(): number;
      /**
       * Sets maximum pool size.
       *
       * @param maximumPoolSize the maximum pool size
       */
      setMaximumPoolSize(maximumPoolSize: number);
      /**
       * Gets custom pool properties.
       *
       * @return the custom pool properties
       */
      getCustomPoolProperties(): Map<string, string>;
      /**
       * Sets custom pool properties.
       *
       * @param customPoolProperties the custom pool properties
       */
      setCustomPoolProperties(customPoolProperties: Map<string, string>);
      /**
       * Sets safe spot search range.
       *
       * @param safeSpotSearchRange the safe spot search range
       */
      setSafeSpotSearchRange(safeSpotSearchRange: number);
   }
}
declare module 'world.bentobox.bentobox.api.addons.exceptions' {
   import { Exception } from 'java.lang';
   /**
    * @since 1.11.0
    */
   export class InvalidAddonDescriptionException extends AddonException {
      constructor(errorMessage: string);
   }
   export class InvalidAddonFormatException extends AddonException {
      constructor(errorMessage: string);
      printStackTrace(): void;
   }
   export class InvalidAddonInheritException extends AddonException {
      constructor(errorMessage: string);
   }
   export class AddonRequestException extends AddonException {
      constructor(errorMessage: string);
   }
   export class AddonException extends Exception {}
}
declare module 'world.bentobox.bentobox.panels' {
   import { Map } from 'java.util';
   import { PanelListener } from 'world.bentobox.bentobox.api.panels';
   import { BlueprintBundle } from 'world.bentobox.bentobox.blueprints.dataobjects';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Entry } from 'java.util.Map';
   import { Addon, GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { Blueprint } from 'world.bentobox.bentobox.blueprints';
   import { View as world_bentobox_bentobox_panels_CatalogPanel_View } from 'world.bentobox.bentobox.panels.CatalogPanel';
   import { CompositeCommand } from 'world.bentobox.bentobox.api.commands';
   import { View } from 'world.bentobox.bentobox.panels.ManagementPanel';
   /**
    * @since 1.9.0
    * @author Poslovitch
    */
   export class CreditsPanel {
      static openPanel(user: User, repository: string): void;
      static openPanel(user: User, addon: Addon): void;
   }
   /**
    * @author Poslovitch
    * @since 1.5.0
    */
   export class ManagementPanel {
      /**
       * Dynamically creates the panel.
       * @param user the User to show the panel to
       */
      static openPanel(user: User, view: View): void;
   }
   /**
    * @since 1.5.0
    * @author Poslovitch
    */
   export class CatalogPanel {
      static openPanel(user: User, view: world_bentobox_bentobox_panels_CatalogPanel_View): void;
   }
   /**
    * @author Poslovitch
    */
   export class LanguagePanel {
      /**
       * Dynamically creates the panel.
       * @param user the User to show the panel to
       */
      static openPanel(user: User): void;
   }
   /**
    * Displays the available BlueprintBundles to pick up as the island.
    * @author tastybento
    * @since 1.5.0
    */
   export class IslandCreationPanel {
      /**
       * Shows a player a panel of selectable blueprint bundles. Checks user's permission
       * @param command - the command requesting the panel, e.g., create or reset
       * @param user - the user
       * @param label - label
       */
      static openPanel(command: CompositeCommand, user: User, label: string): void;
   }
   /**
    * @author tastybento
    * @since 1.5.0
    */
   export class BlueprintManagementPanel {
      static readonly MAX_BP_SLOT: number;
      /**
       * Class to display the Blueprint Management Panel
       * @param plugin - BentoBox
       * @param user - user to see the panel
       * @param addon - game mode addon requesting the panel
       */
      constructor(plugin: BentoBox, user: User, addon: GameModeAddon);
      /**
       * Opens the management panel
       */
      openPanel(): void;
      /**
       * Open the Blueprint Bundle panel
       * @param bb - blueprint bundle
       */
      openBB(bb: BlueprintBundle): void;
      /**
       * @return the selected
       */
      getSelected(): Entry<number, Blueprint>;
   }
   /**
    * This class listens to clicks in the inventory and changes the icons of Blueprints and Blueprint Bundles
    * @author tastybento
    *
    */
   export class IconChanger extends PanelListener {
      /**
       * Change the icon of a blueprint bundle or blueprint
       * @param plugin - Bentobox
       * @param addon - the Game Mode Addon
       * @param blueprintManagementPanel - the open Blueprint Management Panel
       * @param bb - the blueprint bundle
       */
      constructor(
         plugin: BentoBox,
         addon: GameModeAddon,
         blueprintManagementPanel: BlueprintManagementPanel,
         bb: BlueprintBundle
      );
      /**
       * This is called when the panel is first setup
       */
      setup(): void;
   }
}
declare module 'world.bentobox.bentobox.panels.CatalogPanel' {
   import { Enum } from 'java.lang';
   export class View extends Enum<View> {
      static readonly GAMEMODES: View;
      static readonly ADDONS: View;
      static valueOf(name: string): View;
      static values(): View[];
   }
}
declare module 'world.bentobox.bentobox.api.configuration' {
   import { Logger } from 'java.util.logging';
   import { Class } from 'java.lang';
   import { List, Map } from 'java.util';
   import { AbstractDatabaseHandler } from 'world.bentobox.bentobox.database';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Addon } from 'world.bentobox.bentobox.api.addons';
   import { DataObject } from 'world.bentobox.bentobox.database.objects';
   import { Flag } from 'world.bentobox.bentobox.api.flags';
   /**
    * @author Poslovitch, tastybento
    */
   export class ConfigEntry {}
   /**
    * Contains world-specific settings that must be provided by the {@link world.bentobox.bentobox.api.addons.GameModeAddon} in order to register its Worlds.
    *
    * Depending on your implementation, you may need to add setters.
    * @author tastybento
    */
   export class WorldSettings extends ConfigObject {
      /**
       * @return default rank settings for new islands
       * @deprecated Map of Flag, Integer does not allow to load other plugin/addon flags.
       *             It cannot be replaced with Map of String, Integer due to compatibility issues.
       * @see WorldSettings#getDefaultIslandFlagNames()
       * @since 1.21.0
       */
      getDefaultIslandFlags(): Map<Flag, number>;
      /**
       * Return map of flags ID's linked to default rank for new island.
       * This is necessary so users could specify any flag names in settings file from other plugins and addons.
       * Otherwise, Flag reader would mark flag as invalid and remove it.
       * Default implementation is compatibility layer so GameModes that are not upgraded still works.
       * @since 1.21
       * @return default rank settings for new islands.
       */
      getDefaultIslandFlagNames(): Map<string, number>;
      /**
       * @return default settings for new
       * @deprecated Map of Flag, Integer does not allow to load other plugin/addon flags.
       *             It cannot be replaced with Map of String, Integer due to compatibility issues.
       * @see WorldSettings#getDefaultIslandSettingNames()
       * @since 1.21.0
       */
      getDefaultIslandSettings(): Map<Flag, number>;
      /**
       * Return map of flags ID's linked to default settings for new island.
       * This is necessary so users could specify any flag names in settings file from other plugins and addons.
       * Otherwise, Flag reader would mark flag as invalid and remove it.
       * Default implementation is compatibility layer so GameModes that are not upgraded still works.
       * @since 1.21.0
       * @return default settings for new islands.
       */
      getDefaultIslandSettingNames(): Map<string, number>;
      /**
       * @return the friendly name of the world. Used in player commands
       */
      getFriendlyName(): string;
      /**
       * @return the islandDistance
       */
      getIslandDistance(): number;
      /**
       * @return the islandHeight
       */
      getIslandHeight(): number;
      /**
       * @return the islandProtectionRange
       */
      getIslandProtectionRange(): number;
      /**
       * @return the islandStartX
       */
      getIslandStartX(): number;
      /**
       * @return the islandStartZ
       */
      getIslandStartZ(): number;
      /**
       * @return the islandXOffset
       */
      getIslandXOffset(): number;
      /**
       * @return the islandZOffset
       */
      getIslandZOffset(): number;
      /**
       * @return Invincible Visitor setting list
       */
      getIvSettings(): string[];
      /**
       * @return the max homes
       */
      getMaxHomes(): number;
      /**
       * 0 or -1 is unlimited. It will block island creation if the island count for the world is higher than this.
       * @return the maxIslands
       */
      getMaxIslands(): number;
      /**
       * @return the max team size for this world
       */
      getMaxTeamSize(): number;
      /**
       * @return the max coop size for this world
       * @since 1.13.0
       */
      getMaxCoopSize(): number;
      /**
       * @return the max trust size for this world
       * @since 1.13.0
       */
      getMaxTrustSize(): number;
      /**
       * @return the netherSpawnRadius
       */
      getNetherSpawnRadius(): number;
      /**
       * @return the permission prefix
       */
      getPermissionPrefix(): string;
      /**
       * @return the seaHeight
       */
      getSeaHeight(): number;
      /**
       * @return hidden flag list
       */
      getHiddenFlags(): string[];
      /**
       * @return the visitorBannedCommands
       */
      getVisitorBannedCommands(): string[];
      /**
       * Optional list of commands that are banned when falling. Not applicable to all game modes so defaults to empty.
       * @return the fallingBannedCommands
       * @since 1.8.0
       */
      getFallingBannedCommands(): string[];
      /**
       * Get world flags
       * @return Map of world flags
       */
      getWorldFlags(): Map<string, boolean>;
      /**
       * @return the worldName
       */
      getWorldName(): string;
      /**
       * @return the dragonSpawn
       */
      isDragonSpawn(): boolean;
      /**
       * @return the endGenerate
       */
      isEndGenerate(): boolean;
      /**
       * @return the endIslands
       */
      isEndIslands(): boolean;
      /**
       * @return the netherGenerate
       */
      isNetherGenerate(): boolean;
      /**
       * @return the netherIslands
       */
      isNetherIslands(): boolean;
      /**
       * @return the onJoinResetEnderChest
       */
      isOnJoinResetEnderChest(): boolean;
      /**
       * @return the onJoinResetInventory
       */
      isOnJoinResetInventory(): boolean;
      /**
       * @return the onJoinResetMoney
       */
      isOnJoinResetMoney(): boolean;
      /**
       * Whether the player's health should be reset upon him joining an island or creating it.
       * @return the onJoinResetHealth
       * @since 1.8.0
       */
      isOnJoinResetHealth(): boolean;
      /**
       * Whether the player's hunger should be reset upon him joining an island or creating it.
       * @return the onJoinResetHunger
       * @since 1.8.0
       */
      isOnJoinResetHunger(): boolean;
      /**
       * Whether the player's XP should be reset upon him joining an island or creating it.
       * @return the onJoinResetXP
       * @since 1.8.0
       */
      isOnJoinResetXP(): boolean;
      /**
       * Returns a list of commands that should be executed when the player joins an island or creates one.
       * These commands are executed by the console, unless otherwise stated using the `[SUDO]` prefix, in which case they are executed by the player.
       *
       * Available placeholders for the commands are the following:
       *
       *     `[player]`: name of the player
       *     `[owner]`: name of the owner of the island. When joining a team, this will be the team leader's name. When
       *     creating an island, it is the name of the player
       *
       *
       * Here are some examples of valid commands to execute:
       *
       *     `"[SUDO] bbox version"`
       *     `"bsbadmin deaths set [player] 0"`
       *
       * @return a list of commands.
       * @since 1.8.0
       * @see #getOnLeaveCommands()
       */
      getOnJoinCommands(): string[];
      /**
       * @return the onLeaveResetEnderChest
       */
      isOnLeaveResetEnderChest(): boolean;
      /**
       * @return the onLeaveResetInventory
       */
      isOnLeaveResetInventory(): boolean;
      /**
       * @return the onLeaveResetMoney
       */
      isOnLeaveResetMoney(): boolean;
      /**
       * Whether the player's health should be reset upon him leaving his island or resetting it.
       * @return the onLeaveResetHealth
       * @since 1.8.0
       */
      isOnLeaveResetHealth(): boolean;
      /**
       * Whether the player's hunger should be reset upon him leaving his island or resetting it.
       * @return the onLeaveResetHunger
       * @since 1.8.0
       */
      isOnLeaveResetHunger(): boolean;
      /**
       * Whether the player's XP should be reset upon him leaving his island or resetting it.
       * @return the onLeaveResetXP
       * @since 1.8.0
       */
      isOnLeaveResetXP(): boolean;
      /**
       * Returns a list of commands that should be executed when the player leaves an island, resets his island or gets kicked from it.
       * These commands are executed by the console, unless otherwise stated using the `[SUDO]` prefix, in which case they are executed by the player.
       *
       * Available placeholders for the commands are the following:
       *
       *     `[player]`: name of the player
       *     `[owner]`: name of the owner of the island. When joining a team, this will be the team leader's name. When
       *     creating an island, it is the name of the player
       *
       *
       * Here are some examples of valid commands to execute:
       *
       *     `"[SUDO] bbox version"`
       *     `"bsbadmin deaths set [player] 0"`
       *
       *
       * Note that player-executed commands might not work, as these commands can be run with said player being offline.
       * @return a list of commands.
       * @since 1.8.0
       * @see #getOnJoinCommands()
       */
      getOnLeaveCommands(): string[];
      /**
       * Returns a list of commands that should be executed when the player respawns after death if {@link Flags#ISLAND_RESPAWN} is true.
       * These commands are executed by the console, unless otherwise stated using the `[SUDO]` prefix, in which case they are executed by the player.
       *
       * Available placeholders for the commands are the following:
       *
       *     `[player]`: name of the player
       *     `[owner]`: name of the owner of the island. When joining a team, this will be the team leader's name. When
       *     creating an island, it is the name of the player
       *
       *
       * Here are some examples of valid commands to execute:
       *
       *     `"[SUDO] bbox version"`
       *     `"bsbadmin deaths set [player] 0"`
       *
       *
       * Note that player-executed commands might not work, as these commands can be run with said player being offline.
       * @return a list of commands.
       * @since 1.14.0
       * @see #getOnJoinCommands()
       */
      getOnRespawnCommands(): string[];
      /**
       * @return true if the default world generator should not operate in this world
       */
      isUseOwnGenerator(): boolean;
      /**
       * @return true if water is not safe in this world, e.g, should not be a home location
       */
      isWaterUnsafe(): boolean;
      /**
       * @return list of entity types that should not exit the island limits
       */
      getGeoLimitSettings(): string[];
      /**
       * Get list of entities that should not spawn in this game mode
       * @return list of entities that should NOT spawn
       * @since 1.12.0
       */
      getMobLimitSettings(): string[];
      /**
       * @return reset limit for world
       */
      getResetLimit(): number;
      /**
       * Get the island reset time stamp. Any player who last logged in before this time will have resets zeroed
       */
      getResetEpoch(): number;
      /**
       * Set the island reset time stamp. Any player who last logged in before this time will have resets zeroed
       */
      setResetEpoch(resetEpoch: number);
      /**
       * @return true if the death count should be reset when joining a team in this world
       */
      isTeamJoinDeathReset(): boolean;
      /**
       * @return max number of deaths for this world
       */
      getDeathsMax(): number;
      /**
       * @return whether deaths should be counted.
       */
      isDeathsCounted(): boolean;
      /**
       * @return true if deaths in the world are reset when the player has a new island
       * @since 1.6.0
       */
      isDeathsResetOnNewIsland(): boolean;
      /**
       * @return whether a player can set their home in the Nether or not.
       */
      isAllowSetHomeInNether(): boolean;
      /**
       * @return whether a player can set their home in the End or not.
       */
      isAllowSetHomeInTheEnd(): boolean;
      /**
       * @return whether a confirmation is required when a player tries to set their home in the Nether.
       */
      isRequireConfirmationToSetHomeInNether(): boolean;
      /**
       * @return whether a confirmation is required when a player tries to set their home in the End.
       */
      isRequireConfirmationToSetHomeInTheEnd(): boolean;
      /**
       * Gets ban limit for this world.
       * Once exceeded, island members won't be able to ban any more players from their island.
       * Set it to -1 for unlimited.
       *
       * Permission to increase the limit: `(permissionprefix).ban.maxlimit.(value)`
       * @return the ban limit for this world.
       */
      getBanLimit(): number;
      /**
       * @return whether leavers should lose a reset or not
       * @since 1.5.0
       */
      isLeaversLoseReset(): boolean;
      /**
       * @return whether players keep their inventory when they are kicked
       * @since 1.5.0
       */
      isKickedKeepInventory(): boolean;
      /**
       *
       * @return true if island should be created on first login
       * @since 1.9.0
       */
      isCreateIslandOnFirstLoginEnabled(): boolean;
      /**
       *
       * @return the island creation delay after login
       * @since 1.9.0
       */
      getCreateIslandOnFirstLoginDelay(): number;
      /**
       *
       * @return if island creation should abort on logout
       * @since 1.9.0
       */
      isCreateIslandOnFirstLoginAbortOnLogout(): boolean;
      /**
       * Check if nether or end islands should be pasted on teleporting
       * @return true if missing nether or end islands should be pasted
       * @since 1.10.0
       */
      isPasteMissingIslands(): boolean;
      /**
       * Toggles whether the player should be teleported on his island after it got created.
       *
       * If set to `true`, the player will be teleported right away.
       *
       * If set to `false`, the player will remain where he is and a message will be sent inviting him to teleport to his island.
       *
       * This does not apply to any other occurrences such as island reset, or island join.
       *
       * Default value: `true` (to retain backward compatibility).
       * @return `true` if the player should be teleported to his island, `false` otherwise.
       * @since 1.10.0
       */
      isTeleportPlayerToIslandUponIslandCreation(): boolean;
      /**
       * Returns all aliases for main admin command.
       * It is assumed that all aliases are split with whitespace between them.
       * String cannot be empty.
       * Default value: `getFriendlyName() + "admin"` (to retain backward compatibility).
       * @return String value
       * @since 1.13.0
       */
      getAdminCommandAliases(): string;
      /**
       * Returns all aliases for main player command.
       * It is assumed that all aliases are split with whitespace between them.
       * String cannot be empty.
       * Default value: `getFriendlyName()` (to retain backward compatibility).
       * @return String value
       * @since 1.13.0
       */
      getPlayerCommandAliases(): string;
      /**
       * Returns sub-command for users when they execute main user command and they have an
       * island.
       * If defined sub-command does not exist in accessible user command list, then it will
       * still call "go" sub-command.
       * Default value: `"go"` (to retain backward compatibility)
       * @return name of default sub-command for main command if user does have an island.
       * @since 1.13.0
       */
      getDefaultPlayerAction(): string;
      /**
       * Returns default sub-command for users when they execute main user command and they
       * do not have an island.
       * If defined sub-command does not exist in accessible user command list, then it will
       * still call "create" sub-command.
       * Default value: `"create"` (to retain backward compatibility)
       * @return name of default sub-command for main command if user does not have an island.
       * @since 1.13.0
       */
      getDefaultNewPlayerAction(): string;
      /**
       * Make a nether portal when teleporting to the nether through an overworld portal
       * @return true if a portal should be made
       * @since 1.16.0
       */
      isMakeNetherPortals(): boolean;
      /**
       * Make an end portal when teleporting to the end through an end portal
       * @return true if a portal should be made
       * @since 1.16.0
       */
      isMakeEndPortals(): boolean;
      /**
       * Check for blocks when searching for a new island. This is a safety net check that does a look
       * around the new island location (3x3x3 block check). If any non-air or non-water blocks are found
       * then the island is marked as being used. It is mainly for migration handling from worlds that
       * do not register island properly. It is incompatible with CaveBlock or other gamemodes that will
       * have blocks there.
       * @return true if a check for blocks should happen
       * @since 1.16.0
       */
      isCheckForBlocks(): boolean;
   }
   export class ConfigComment {}
   /**
    * Defines where this data object will be stored.
    * @author tastybento
    *
    */
   export class StoreAt {}
   /**
    * Config object for YAML objects
    * @author tastybento
    * @since 1.5.0
    */
   export class ConfigObject extends DataObject {
      getPlugin(): BentoBox;
      /**
       * @return the uniqueId
       */
      getUniqueId(): string;
      /**
       * @param uniqueId - unique ID the uniqueId to set
       */
      setUniqueId(uniqueId: string);
   }
   /**
    * Handy config class to store and load Java POJOs as YAML configs
    * @author tastybento
    *
    * @param
    */
   export class Config<T> {
      constructor(plugin: BentoBox, type: Class<T>);
      constructor(addon: Addon, type: Class<T>);
      /**
       * Load all the config objects and supply them as a list
       * @return list of config objects or an empty list if they cannot be loaded
       */
      loadConfigObjects(): T[];
      /**
       * Loads the config object
       * @param uniqueId - unique id of the object
       * @return the object or null if it cannot be loaded
       */
      loadConfigObject(uniqueId: string): T | null;
      /**
       * Loads a config object
       * @return the object or null if it cannot be loaded
       */
      loadConfigObject(): T | null;
      /**
       * Save config object
       * @param instance to save
       */
      saveConfigObject(instance: T): boolean;
      /**
       * Checks if a config object exists or not
       * @param name - unique name of the config object
       * @return true if it exists
       */
      configObjectExists(name: string): boolean;
   }
}
declare module 'world.bentobox.bentobox.api.events.team' {
   import { TeamEventBuilder } from 'world.bentobox.bentobox.api.events.team.TeamEvent';
   /**
    * Fired when a team event happens.
    *
    * @author tastybento
    */
   export class TeamEvent {
      static builder(): TeamEventBuilder;
   }
}
declare module 'world.bentobox.bentobox.hooks' {
   import { Hook } from 'world.bentobox.bentobox.api.hooks';
   import { GameModeAddon } from 'world.bentobox.bentobox.api.addons';
   import { User } from 'world.bentobox.bentobox.api.user';
   /**
    * @author Poslovitch
    */
   export class VaultHook extends Hook {
      constructor();
      hook(): boolean;
      getFailureCause(): string;
      format(amount: number): string;
      /**
       * Gets balance of this User.
       * If this User is not a Player (or OfflinePlayer), it will always return `0.0D`.
       * If player is online, it should return the balance of the world of the player
       * If offline, it should return the general balance
       *
       * @param user the User to get the balance from.
       * @return the balance of this User.
       * @see #getBalance(User, World)
       */
      getBalance(user: User): number;
      /**
       * Checks if this User has the amount.
       * On the balance of the world where is the user
       * If this User is not a Player (or OfflinePlayer), it will always return `false`.
       *
       * @param user the User to check.
       * @param amount the amount to check. Must be positive.
       * @return whether the User has the amount or not.
       * @see #has(User, double, World)
       */
      has(user: User, amount: number): boolean;
   }
   /**
    * @author ApacheZy
    * @since 1.6.0
    */
   export class LangUtilsHook extends Hook {
      constructor();
      hook(): boolean;
      getFailureCause(): string;
      /**
       * Sometimes it is necessary to check whether "LangUtils" exists
       * first to decide what method to use to complete the work.
       *
       * @return LangUtils is loaded correctly.
       */
      static isHooked(): boolean;
      /**
       * Return the enchantment level indicated by Roman numerals.
       * Can only get Roman numerals within 10.
       *
       * @param level The enchantment level.
       * @param user  The user's language will be used for translation.
       * @return The converted enchantment level.
       */
      static getEnchantLevelName(level: number, user: User): string;
      /**
       * Translate the name of the potion level.
       *
       * @param amplifier The  potion level.
       * @param user      The user's language will be used for translation.
       * @return The translated name of the potion level.
       */
      static getEffectAmplifierName(amplifier: number, user: User): string;
      /**
       * Translate merchant's level name.
       *
       * @param level The merchant's level.
       * @param user  The user's language will be used for translation.
       * @return Translated name of merchant's level.
       */
      static getVillagerLevelName(level: number, user: User): string;
   }
   /**
    * Provides implementation and interfacing to interact with MyWorlds.
    *
    * @author bergerkiller (Irmo van den Berge)
    */
   export class MyWorldsHook extends Hook {
      constructor();
      hook(): boolean;
      getFailureCause(): string;
   }
   export interface MyWorldsHook extends Hook, WorldManagementHook {}
   /**
    * Provides implementation and interfacing to interact with Multiverse.
    *
    * @author Poslovitch
    */
   export class MultiverseCoreHook extends Hook {
      constructor();
      hook(): boolean;
      getFailureCause(): string;
   }
   export interface MultiverseCoreHook extends Hook, WorldManagementHook {}
   /**
    * @author Poslovitch
    * @since 1.5.0
    */
   export class DynmapHook extends Hook {
      constructor();
      hook(): boolean;
      registerMarkerSet(addon: GameModeAddon): void;
      getFailureCause(): string;
   }
   /**
    * Hook for a type of Multi-World management plugin that must be made
    * aware of the correct configuration of a BentoBox World.
    *
    * @author bergerkiller (Irmo van den Berge)
    */
   export class WorldManagementHook {}
}
declare module 'world.bentobox.bentobox.api.user' {
   import { MetaDataValue, MetaDataAble } from 'world.bentobox.bentobox.api.metadata';
   import { Locale, Optional, UUID, Map } from 'java.util';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { Addon } from 'world.bentobox.bentobox.api.addons';
   /**
    * Combines {@link Player}, {@link OfflinePlayer} and {@link CommandSender} to provide convenience methods related to
    * localization and generic interactions.
    *
    * Therefore, a User could usually be a Player, an OfflinePlayer or the server's console.
    * Preliminary checks should be performed before trying to run methods that relies on a specific implementation.
    *
    * It is good practice to use the User instance whenever possible instead of Player or CommandSender.
    *
    * @author tastybento
    */
   export class User extends MetaDataAble {
      /**
       * Clears all users from the user list
       */
      static clearUsers(): void;
      /**
       * Gets an instance of User from a UUID. This will always return a user object.
       * If the player is offline then the getPlayer value will be null.
       * @param uuid - UUID
       * @return user - user
       */
      static getInstance(uuid: UUID): User;
      /**
       * Used for testing
       * @param p - plugin
       */
      static setPlugin(plugin: BentoBox);
      /**
       * Get the user's name
       * @return player's name
       */
      getName(): string;
      /**
       * Get the user's display name
       * @return player's display name if the player is online otherwise just their name
       * @since 1.22.1
       */
      getDisplayName(): string;
      /**
       * @return true if this user is a player, false if not, e.g., console
       */
      isPlayer(): boolean;
      /**
       * @return true if this user is an OfflinePlayer, false if not, e.g., console
       * @since 1.3.0
       */
      isOfflinePlayer(): boolean;
      getUniqueId(): UUID;
      /**
       * @param permission permission string
       * @return true if permission is empty or null or if the player has that permission or if the player is op.
       */
      hasPermission(permission: string | null): boolean;
      /**
       * Removes permission from user
       * @param name - Name of the permission to remove
       * @return true if successful
       * @since 1.5.0
       */
      removePerm(name: string): boolean;
      isOnline(): boolean;
      /**
       * Checks if user is Op
       * @return true if user is Op
       */
      isOp(): boolean;
      /**
       * Get the maximum value of a numerical permission setting.
       * If a player is given an explicit negative number then this is treated as "unlimited" and returned immediately.
       * @param permissionPrefix the start of the perm, e.g., `plugin.mypermission`
       * @param defaultValue the default value; the result may be higher or lower than this
       * @return max value
       */
      getPermissionValue(permissionPrefix: string, defaultValue: number): number;
      /**
       * Gets a translation of this reference for this user with colors converted. Translations may be overridden by Addons
       * by using the same reference prefixed by the addon name (from the Addon Description) in lower case.
       * @param reference - reference found in a locale file
       * @param variables - variables to insert into translated string. Variables go in pairs, for example
       *                  "[name]", "tastybento"
       * @return Translated string with colors converted, or the reference if nothing has been found
       */
      getTranslation(reference: string, ...variables: string[]): string;
      /**
       * Gets a translation of this reference for this user without colors translated. Translations may be overridden by Addons
       * by using the same reference prefixed by the addon name (from the Addon Description) in lower case.
       * @param reference - reference found in a locale file
       * @param variables - variables to insert into translated string. Variables go in pairs, for example
       *                  "[name]", "tastybento"
       * @return Translated string or the reference if nothing has been found
       * @since 1.17.4
       */
      getTranslationNoColor(reference: string, ...variables: string[]): string;
      /**
       * Gets a translation of this reference for this user.
       * @param reference - reference found in a locale file
       * @param variables - variables to insert into translated string. Variables go in pairs, for example
       *                  "[name]", "tastybento"
       * @return Translated string with colors converted, or a blank String if nothing has been found
       */
      getTranslationOrNothing(reference: string, ...variables: string[]): string;
      /**
       * Send a message to sender if message is not empty.
       * @param reference - language file reference
       * @param variables - CharSequence target, replacement pairs
       */
      sendMessage(reference: string, ...variables: string[]): void;
      /**
       * Sends a message to sender without any modification (colors, multi-lines, placeholders).
       * @param message - the message to send
       */
      sendRawMessage(message: string): void;
      /**
       * Sends a message to sender if message is not empty and if the same wasn't sent within the previous Notifier.NOTIFICATION_DELAY seconds.
       * @param reference - language file reference
       * @param variables - CharSequence target, replacement pairs
       *
       * @see Notifier
       */
      notify(reference: string, ...variables: string[]): void;
      /**
       * Closes the user's inventory
       */
      closeInventory(): void;
      /**
       * Get the user's locale
       * @return Locale
       */
      getLocale(): Locale;
      /**
       * Forces an update of the user's complete inventory.
       * Deprecated, but there is no current alternative.
       */
      updateInventory(): void;
      /**
       * Performs a command as the player
       * @param command - command to execute
       * @return true if the command was successful, otherwise false
       */
      performCommand(command: string): boolean;
      /**
       * Checks if a user is in one of the game worlds
       * @return true if user is, false if not
       */
      inWorld(): boolean;
      hashCode(): number;
      equals(obj: any): boolean;
      /**
       * Set the addon context when a command is executed
       * @param addon - the addon executing the command
       */
      setAddon(addon: Addon);
      /**
       * Get all the meta data for this user
       * @return the metaData
       * @since 1.15.4
       */
      getMetaData(): Optional<Map<string, MetaDataValue>>;
      /**
       * @param metaData the metaData to set
       * @since 1.15.4
       */
      setMetaData(metaData: Map<string, MetaDataValue>);
   }
   /**
    * Utilities class that helps to avoid spamming the User with potential repeated messages
    * @author Poslovitch, tastybento
    */
   export class Notifier {
      /**
       * Sends message to a user only if the message hasn't been sent recently
       * @param user - user
       * @param message - message to send (already translated)
       * @return true if message sent successfully, false it it has been throttled
       */
      notify(user: User, message: string): boolean;
   }
}
declare module 'world.bentobox.bentobox.util' {
   import { List, UUID, Map } from 'java.util';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { AtomicBoolean } from 'java.util.concurrent.atomic';
   import { User } from 'world.bentobox.bentobox.api.user';
   import { IslandDeletion, Island } from 'world.bentobox.bentobox.database.objects';
   import { WorldRegenerator } from 'world.bentobox.bentobox.nms';
   /**
    * Utility class that parses a String into an ItemStack.
    * It is used for converting config file entries to objects.
    *
    * @author tastybento, Poslovitch
    */
   export class ItemParser {}
   /**
    * Class to store pairs of objects, e.g. coordinates
    * @author tastybento
    *
    * @param  the x part of the pair
    * @param  the z part of the pair
    */
   export class Pair<X, Z> {
      readonly x: X;
      readonly z: Z;
      constructor(x: X, z: Z);
      /**
       * Returns X element as key.
       * @return X element
       */
      getKey(): X;
      /**
       * Returns Z element as value.
       * @return Z element
       */
      getValue(): Z;
      toString(): string;
      hashCode(): number;
      equals(obj: any): boolean;
   }
   /**
    * Deletes islands chunk by chunk
    *
    * @author tastybento
    */
   export class DeleteIslandChunks {
      constructor(plugin: BentoBox, di: IslandDeletion);
      isCompleted(): boolean;
   }
   /**
    * @author Tastybento
    * @author Poslovitch
    */
   export class FileLister {
      /**
       * Returns a list of yml files in the folder given. If the folder does not exist in the file system
       * it can check the plugin jar instead.
       * @param folderPath - folder path
       * @param checkJar - if true, the jar will be checked
       * @return List of file names
       */
      list(folderPath: string, checkJar: boolean): string[];
      listJar(folderPath: string): string[];
   }
   /**
    * @author tastybento
    * @since 1.17.3
    */
   export class IslandInfo {
      /**
       * Get island Info
       * @param island Island to show info
       */
      constructor(island: Island);
      /**
       * Shows admin info of this island
       * @param user user asking
       */
      showAdminInfo(user: User): void;
      /**
       * Shows info of this island to this user.
       * @param user the User who is requesting it
       * @return always true
       */
      showInfo(user: User): boolean;
      /**
       * Shows the members of this island to this user.
       * @param user the User who is requesting it
       */
      showMembers(user: User): void;
   }
   /**
    * A utility class for {@link PasteHandler}
    *
    * @author tastybento
    */
   export class DefaultPasteUtil {}
}
declare module 'world.bentobox.bentobox.api.panels.reader' {
   import { Map } from 'java.util';
   import { File } from 'java.io';
   /**
    * This class manages Template file reading, creating PanelTemplateRecord object and storing it internally.
    * This class just reads and returns given panel template. It does not create a functional panel.
    *
    * @since 1.17.3
    */
   export class TemplateReader {
      /**
       * Read template panel panel template record.
       *
       * @param panelName the panel name
       * @param panelLocation the panel location directory
       * @return the panel template record
       */
      static readTemplatePanel(panelName: string, panelLocation: File): PanelTemplateRecord;
      /**
       * Read template panel panel template record.
       *
       * @param panelName the panel name
       * @param templateName the template file name
       * @param panelLocation the panel location directory
       * @return the panel template record
       * @since 1.20.0
       */
      static readTemplatePanel(panelName: string, templateName: string, panelLocation: File): PanelTemplateRecord;
      /**
       * This method clears loaded panels from the cache.
       */
      static clearPanels(): void;
   }
}
declare module 'world.bentobox.bentobox.util.teleport' {
   import { Runnable } from 'java.lang';
   import { Iterator } from 'java.util';
   import { CompletableFuture } from 'java.util.concurrent';
   import { BentoBox } from 'world.bentobox.bentobox';
   import { AtomicBoolean } from 'java.util.concurrent.atomic';
   import { Pair } from 'world.bentobox.bentobox.util';
   /**
    * A class that calculates finds a safe spot asynchronously and then teleports the player there.
    *
    * @author tastybento
    */
   export class SafeSpotTeleport {}
}
declare module 'world.bentobox.bentobox.database.sql.sqlite' {
   import { Class } from 'java.lang';
   import { AbstractDatabaseHandler, DatabaseSetup } from 'world.bentobox.bentobox.database';
   import { HikariConfig } from 'com.zaxxer.hikari';
   import { CompletableFuture } from 'java.util.concurrent';
   import { SQLDatabaseConnector, SQLDatabaseHandler } from 'world.bentobox.bentobox.database.sql';
   /**
    * @since 1.6.0
    * @author Poslovitch, tastybento
    */
   export class SQLiteDatabaseHandler<T> extends SQLDatabaseHandler<T> {
      saveObject(instance: T): CompletableFuture<boolean>;
   }
   /**
    * @since 1.6.0
    * @author Poslovitch
    */
   export class SQLiteDatabaseConnector extends SQLDatabaseConnector {
      /**
       * {@inheritDoc}
       */
      createConfig(): HikariConfig;
   }
   /**
    * @since 1.6.0
    * @author Poslovitch
    */
   export class SQLiteDatabase extends DatabaseSetup {
      /**
       * Gets a database handler that will store and retrieve classes of type dataObjectClass
       * @param  - Class type
       * @param dataObjectClass - class of the object to be stored in the database
       * @return handler for this database object
       */
      getHandler<T>(dataObjectClass: Class<T>): AbstractDatabaseHandler<T>;
   }
}
declare module 'world.bentobox.bentobox.api.events.team.TeamEvent' {
   import { UUID } from 'java.util';
   import { IslandBaseEvent } from 'world.bentobox.bentobox.api.events';
   import { Enum } from 'java.lang';
   import { Island } from 'world.bentobox.bentobox.database.objects';
   export class Reason extends Enum<Reason> {
      static readonly INVITE: Reason;
      static readonly JOIN: Reason;
      static readonly REJECT: Reason;
      static readonly LEAVE: Reason;
      static readonly KICK: Reason;
      static readonly SETOWNER: Reason;
      static readonly INFO: Reason;
      /**
       * The island has been reset by the owner.
       */
      static readonly DELETE: Reason;
      static readonly UNKNOWN: Reason;
      static readonly UNINVITE: Reason;
      static readonly JOINED: Reason;
      static valueOf(name: string): Reason;
      static values(): Reason[];
   }
   export class TeamEventBuilder {
      island(island: Island): TeamEventBuilder;
      /**
       * True if this is an admin driven event
       * @param admin - true if due to an admin event
       * @return TeamEvent
       */
      admin(admin: boolean): TeamEventBuilder;
      /**
       * @param reason for the event
       * @return TeamEventBuilder
       */
      reason(reason: Reason): TeamEventBuilder;
      /**
       * @param player - the player involved in the event
       * @return TeamEventBuilder
       */
      involvedPlayer(player: UUID): TeamEventBuilder;
      /**
       * Build the event and call it
       * @return event
       */
      build(): IslandBaseEvent;
   }
}

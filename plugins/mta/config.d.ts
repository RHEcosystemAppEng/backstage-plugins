export interface Config {
  /** Configurations for the MTA plugin */
  mta?: {
    /**
     * The proxy path for the MTA instance.
     * @visibility frontend
     */
    proxyPath?: string;
    /**
     * The UI url of the MTA instance.
     * @visibility frontend
     */
    uiUrl?: string;
  };
}

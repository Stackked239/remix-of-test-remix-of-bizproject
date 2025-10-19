import { Helmet } from "react-helmet-async";

const CodyHelmet = () => {
  const settings = `window.codySettings = { widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef', base_url: 'https://getcody.ai' };`;

  return (
    <Helmet>
      {/* Cody.bot settings must be defined before loader */}
      <script id="cody-settings" dangerouslySetInnerHTML={{ __html: settings }} />
      {/* Cody.bot loader script (async, in head) */}
      <script id="cody-widget-loader" async src="https://trinketsofcody.com/cody-widget.js"></script>
    </Helmet>
  );
};

export default CodyHelmet;

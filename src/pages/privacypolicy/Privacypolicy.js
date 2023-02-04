import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Privacypolicy.module.scss";

const Privacypolicy = () => {
    return (
        <section>
          <div className={`container ${styles.contact}`}>
            <h2>Privacy Policy </h2>
            <div className={styles.section}>
             
    
              <div className={styles.details}>
                <Card cardClass={styles.card2}>
                
                  <p>This Privacy Policy explains how onlinedmart.com collects, shares, and uses
any information that relates to you when you use our Site, engage with us on
social media, or otherwise interact with us (your “Personal Data”).
This Privacy Policy also explains the rights you have concerning the Personal
Data that we process and how you can exercise these rights.
</p>

<h3>Principles</h3>
           
<p>YOURCOMPANY manifests its commitment to privacy and data protection
by embracing the following principles.
YOURCOMPANY uses Personal Data lawfully, fairly, and in a transparent
manner.
YOURCOMPANY collects no more Personal Data than necessary, and only
for a legitimate purpose.
YOURCOMPANY retains no more data than necessary or for a longer
period than needed.
YOURCOMPANY protects Personal Data with appropriate security measures.
</p>
<h3>Data We Collect</h3>

<p>This policy applies only to information collected on the Site. We collect two
types of information from visitors to our websites: 1. Personal Data.
2. Non-personal Data.“Personal Data” is information that identifies you personally and that you
provide to us, such as your name, address, telephone number, email address,
and sometimes your Internet Protocol (IP) address. We may collect this
information when you create a profile on our Site, visit our Site, or complete
a purchase.
“Non-personal Data” can be technical in nature. It does not identify you
personally. Examples of non-Personal Data may include (but are not limited
to) cookies, web beacons, and demographic information.
</p>

<h3>Data Use</h3>

<p>onlinedmart.com uses the collected data for various purposes:
To provide and maintain our service
To notify you about changes in policies and order details
To provide customer support
To gather analysis or valuable information so that we can improve our Site
and services
To monitor the propriety of Site usage
To detect, prevent and address technical issues
To provide you with news, special offers and general information about
other goods, services and events which we offer that are similar to those  that you have already purchased or enquired about unless you have
opted not to receive such information
</p>

<h3>Data Access</h3>

<p>Your Personal Data is available and accessible only by those who need the
data to accomplish the intended processing purpose. To the extent
necessary, your Personal Data may be shared with suppliers and
subcontractors (processors and sub-processors) carrying out certain tasks
on YOURCOMPANY’s behalf and with independent third-parties, including,
but not limited to, using personal information you share with us or that we
indirectly collect to verify your identity and for fraud prevention purposes.

</p>
<h3>Data Security</h3>

<p>The security of your data is important to us but remember that no method of
transmission over the Internet or method of electronic storage is 100%
secure. While we strive to use commercially acceptable means to protect
your Personal Data, we cannot guarantee its absolute security

</p>


<h3>Data Disclosure</h3>

<p>Under certain circumstances, YOURCOMPANY may be required to disclose
your Personal Data if required to do so by law or in response to valid
requests by public authorities (e.g. a court or a government agency).

Legal requirements

onlinedmart.com may disclose your Personal Data in the good faith belief
that such action is necessary to:

To comply with a legal obligation
To protect and defend the rights or property of YOURCOMPANY
To prevent or investigate possible wrongdoing in connection with the Site
To protect the personal safety of users of the Site or the public
To protect against legal liability

</p>

<h3>Your Data Protection Rights</h3>
<p>Right to access
    
    You have the right to request information about the Personal Data we hold
on you at any time. You can contact YOURCOMPANY and we will provide you
with your Personal Data via e-mail.

Right to portability

Whenever YOURCOMPANY processes your Personal Data, you have the right
to get a copy of your data transferred to you or to another party. This only
includes the Personal Data you have submitted to us.


</p>

<h3>Exercise Your Rights (Contact Us)</h3>
<p>We take data protection very seriously and therefore we have dedicated
Customer Service personnel to handle your requests in relation to your rights
stated above. You can always reach them at Support@eshop.com.


</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Privacypolicy